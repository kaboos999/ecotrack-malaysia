const { S3Client } = require('@aws-sdk/client-s3');
const { SNSClient } = require('@aws-sdk/client-sns');

const region = process.env.AWS_REGION;

const s3 = new S3Client({ region });
const sns = new SNSClient({ region });

module.exports = { s3, sns };
