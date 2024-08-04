import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { compile } from 'handlebars';

@Injectable()
export class MailService {
  private mailTransport: Mail;

  constructor(private readonly configService: ConfigService) {
    this.mailTransport = createTransport({
      host: configService.get<string>('MAIL_HOST'),
      port: configService.get<number>('MAIL_PORT'),
      secure: false,
      auth: {
        user: configService.get<string>('MAIL_USER'),
        pass: configService.get<string>('MAIL_PASS'),
      },
    });
  }

  public async sendConfirmationMail(email: string, token: string) {
    const url = `${this.configService.get<string>('MAIL_CONFIRMATION_URL')}?token=${token}`;

    const templateFile = await readFile(
      join(process.cwd(), 'src/modules/mail/templates/confirmation.hbs'),
      'utf-8',
    );

    try {
      return this.mailTransport.sendMail({
        from: {
          address: this.configService.get<string>('DEFAULT_MAIL_FROM'),
          name: this.configService.get<string>('APP_NAME'),
        },
        to: [{ name: 'User', address: email }],
        subject: 'Confirm Your Registration',
        html: compile(templateFile)({ url }),
      });
    } catch (error) {
      console.log('ERROR: ', error);
    }
  }
}
