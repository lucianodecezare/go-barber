import * as Yup from 'yup';
import { isBefore, format, parseISO, startOfHour } from 'date-fns';
import BR from 'date-fns/locale/pt-BR';

import { Appointment } from '../models/Appointment';
import { File } from '../models/File';
import { User } from '../models/User';

import Notification from '../schemas/Notification';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      attributes: ['id', 'date'],
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] }
          ]
        }
      ]
    });

    return res.json(appointments);
  }

  async store(req, res) {
    const { userId } = req;

    // Validation schema
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      provider_id: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { provider_id, date } = req.body;

    // Check if provider_id is a provider
    const isProvider = await User.findOne({
      where: {
        id: provider_id,
        provider: true
      }
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers' });
    }

    // Check for past dates
    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    // Check date availability
    const availability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart
      }
    });

    if (availability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    // Create appointment
    const appointment = await Appointment.create({
      user_id: userId,
      provider_id,
      date: hourStart
    });

    // Notify provider
    const user = await User.findByPk(userId);
    const formattedDate = format(hourStart, "dd 'de' MMMM, H:mm'h'", {
      locale: BR
    });

    await Notification.create({
      content: `Novo agendamento: ${user.name} - ${formattedDate}`,
      user: provider_id
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
