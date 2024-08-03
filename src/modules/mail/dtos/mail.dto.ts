import { Address } from 'nodemailer/lib/mailer';

export class SendEmailDto {
  from?: Address;
  to: Address[];
  subject: string;
  message: string;
}
