const { publishMilestoneEmail } = require('./sns.service');

const MILESTONES = [10, 25, 50];

async function checkAndNotifyMilestones({ beforeKg, afterKg, user }) {
  for (const m of MILESTONES) {
    if (beforeKg < m && afterKg >= m) {
      await publishMilestoneEmail({
        email: user.email,
        name: user.name,
        totalKg: afterKg,
        milestoneKg: m
      });
    }
  }
}

module.exports = { checkAndNotifyMilestones };
