import { Address } from 'nodemailer/lib/mailer';

export class SendMailDto {
  from?: Address;
  to: Address[];
  subject: string;
  text: string;
}
