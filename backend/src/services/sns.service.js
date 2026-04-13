const { PublishCommand } = require('@aws-sdk/client-sns');
const { sns } = require('../config/aws');

async function publishMilestoneEmail({ email, name, totalKg, milestoneKg }) {
  const msg =
`EcoCycle Malaysia Milestone Reached!

Hello ${name},
Congratulations! You have reached ${milestoneKg} kg total recycling.
Your current total is: ${totalKg.toFixed(2)} kg.

Thank you for supporting SDG 12: Sustainable Consumption and Production.
`;

  await sns.send(new PublishCommand({
    TopicArn: process.env.SNS_TOPIC_ARN,
    Subject: `EcoCycle Milestone: ${milestoneKg}kg reached`,
    Message: msg
  }));
}

module.exports = { publishMilestoneEmail };
