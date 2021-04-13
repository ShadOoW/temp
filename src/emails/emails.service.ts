import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { EmailParams } from './templates';
import { SendMailOptions } from './interfaces/SendMailOptions';

@Injectable()
export class EmailsService {
  constructor(@InjectQueue('email') private readonly mailQueue: Queue) {}

  async sendMail(
    type: string,
    to: string,
    subject: string,
    params: EmailParams,
  ) {
    const mailOptions: SendMailOptions<EmailParams> = {
      type,
      subject,
      to,
      params,
    };
    return this.mailQueue.add('sendMail', mailOptions);
  }
}
