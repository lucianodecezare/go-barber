import { format, parseISO } from 'date-fns';
import BR from 'date-fns/locale/pt-BR';

import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;

    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Appointment Cancel',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(parseISO(appointment.date), "dd 'de' MMMM, H:mm'h'", {
          locale: BR
        })
      }
    });
  }
}

export default new CancellationMail();
