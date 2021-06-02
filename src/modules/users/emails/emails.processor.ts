import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { renderFile } from 'ejs';
import { join } from 'path';
import * as AWS from 'aws-sdk';
import { EmailParams } from './templates';
import { SendMailOptions } from './interfaces/SendMailOptions';

AWS.config.update({
  accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});

@Processor('email')
export class EmailProcessor {
  emailTemplatesDir = join(
    process.cwd(),
    'src',
    'modules',
    'users',
    'emails',
    './templates',
  );

  private async renderTemplate(template: string, data: unknown) {
    return await renderFile(join(this.emailTemplatesDir, template), data);
  }

  @Process('sendMail')
  async sendMail(job: Job<SendMailOptions<EmailParams>>) {
    const ses = new AWS.SES({ apiVersion: '2010-12-01' });
    const { data } = job;
    const { type, to, subject, params } = data;
    const html = await this.renderTemplate(`${type}.ejs`, params);

    try {
      const email = {
        Destination: {
          ToAddresses: [to],
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: html,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: subject,
          },
        },
        Source: 'm2m@abwebcommunity.com',
      };

      const sendEmail = ses.sendEmail(email).promise();
      sendEmail
        .then((data) => {
          console.log('email submitted to SES', data);
        })
        .catch((e) => {
          console.error(e);
        });
    } catch (e) {
      console.error(e);
    }
  }
}
