import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { createTransport } from 'nodemailer';
import { renderFile } from 'ejs';
import { join } from 'path';
import * as aws from 'aws-sdk';

import * as SMTP_CONFIG from '../shared/smtp';

import { HelloParams } from './templates';
import { SendMailOptions } from './interfaces/SendMailOptions';

@Processor('email')
export class EmailProcessor {
  transporter = createTransport({
    SES: new aws.SES({
      accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
      region: 'us-east-1',
    }),
  });

  emailTemplatesDir = join(process.cwd(), 'src', 'emails', './templates');

  private async renderTemplate(template: string, data: unknown) {
    return await renderFile(join(this.emailTemplatesDir, template), data);
  }

  @Process('sendHelloMail')
  async sendHelloMail(job: Job<SendMailOptions<HelloParams>>) {
    const { data } = job;
    const { params, from, to, subject } = data;
    const html = await this.renderTemplate('hello/index.ejs', params);
    this.transporter.sendMail({ from, to, subject, html });
  }
}
