import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import { SendMailDto } from './dtos/send-mail.dto';
import Mail, { Address } from 'nodemailer/lib/mailer';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { compile } from 'handlebars';

@Injectable()
export class MailService {
  private mailTransport: Mail;
  private defaultFrom: Address;

  constructor(configService: ConfigService) {
    this.mailTransport = createTransport({
      host: configService.get<string>('MAIL_HOST'),
      port: configService.get<number>('MAIL_PORT'),
      secure: false,
      auth: {
        user: configService.get<string>('MAIL_USER'),
        pass: configService.get<string>('MAIL_PASS'),
      },
    });

    this.defaultFrom = {
      address: configService.get<string>('DEFAULT_MAIL_FROM'),
      name: configService.get<string>('APP_NAME'),
    };
  }

  public async sendEmail({ to, subject, text, ...dto }: SendMailDto) {
    const file = await readFile(
      join(process.cwd(), 'src/modules/mail/templates/confirmation.hbs'),
      'utf-8',
    );

    const template = compile(file);
    const html = template({ text });
    const from = dto.from ?? this.defaultFrom;

    try {
      return this.mailTransport.sendMail({ from, to, subject, html });
    } catch (error) {
      console.log('ERROR: ', error);
    }
  }
}
