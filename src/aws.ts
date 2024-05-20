import * as AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: process.env.S3_REGION,
});

const ses = new AWS.SES({
  accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
  secretAccessKey: process.env.SES_SECRET_KEY,
  region: process.env.SES_REGION,
  apiVersion: '2010-12-01',
});

export { s3, ses };

