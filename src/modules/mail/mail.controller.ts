import { Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-email')
  public async sendMail() {
    return this.mailService.sendEmail({
      from: {
        name: 'Justin',
        address: 'justin@example.com',
      },
      to: [
        {
          name: 'Danny Doe',
          address: 'danny@example.com',
        },
      ],
      subject: 'Test subject',
      text: 'This is a test message',
    });
  }
}
