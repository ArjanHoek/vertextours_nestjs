import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import { SendEmailDto } from './dtos/mail.dto';
import Mail from 'nodemailer/lib/mailer';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { compile } from 'handlebars';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  mailTransport() {
    return createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    });
  }

  public async sendEmail({ from, to, subject, message }: SendEmailDto) {
    const file = await readFile(
      join(process.cwd(), 'src/modules/mail/templates/confirmation.hbs'),
      'utf-8',
    );

    const template = compile(file);

    const options: Mail.Options = {
      from: from ?? {
        address: this.configService.get<string>('DEFAULT_MAIL_FROM'),
        name: this.configService.get<string>('APP_NAME'),
      },
      to,
      subject,
      html: template({ message }),
    };

    const transport = this.mailTransport();

    try {
      const result = await transport.sendMail(options);

      return result;
    } catch (error) {
      console.log('ERROR: ', error);
    }
  }
}
