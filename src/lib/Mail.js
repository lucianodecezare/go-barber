import { resolve } from 'path';
import nodemailer from 'nodemailer';
import expHandle from 'express-handlebars';
import mailerHandle from 'nodemailer-express-handlebars';

import { mailConfig } from '../config/mail';

class Mail {
  constructor() {
    const { auth, host, port, secure } = mailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null
    });

    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    this.transporter.use(
      'compile',
      mailerHandle({
        viewEngine: expHandle.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs'
        }),
        viewPath,
        extName: '.hbs'
      })
    );
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message
    });
  }
}

export default new Mail();
