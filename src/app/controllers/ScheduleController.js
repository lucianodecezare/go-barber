import { endOfDay, parseISO, startOfDay } from 'date-fns';
import { Op } from 'sequelize';

import { Appointment } from '../models/Appointment';
import { User } from '../models/User';

class ScheduleController {
  async index(req, res) {
    // Check provider
    const isProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true
      }
    });

    if (!isProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    const { date } = req.query;
    const ISODate = parseISO(date);

    const schedule = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(ISODate), endOfDay(ISODate)]
        }
      },
      order: ['date']
    });

    return res.json(schedule);
  }
}

export default new ScheduleController();
