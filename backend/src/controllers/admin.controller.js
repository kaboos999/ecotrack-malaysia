const { getDb } = require('../config/db');

function asyncQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    const db = getDb();
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

async function listUsers(req, res) {
  const rows = await asyncQuery(
    'SELECT id, name, email, role, created_at FROM Users ORDER BY created_at DESC'
  );
  res.json(rows);
}

async function listSubmissions(req, res) {
  const rows = await asyncQuery(
    `SELECT rs.id, rs.user_id, u.name, u.email, rs.waste_type, rs.weight, rs.points, rs.image_url, rs.created_at
     FROM Recycling_Submissions rs
     JOIN Users u ON u.id = rs.user_id
     ORDER BY rs.created_at DESC
     LIMIT 1000`
  );
  res.json(rows);
}

async function systemStats(req, res) {
  const totals = await asyncQuery(
    `SELECT 
        COALESCE(SUM(weight),0) AS totalKg,
        COALESCE(SUM(points),0) AS totalPoints,
        COUNT(*) AS submissionsCount
     FROM Recycling_Submissions`
  );

  const byType = await asyncQuery(
    `SELECT waste_type, COALESCE(SUM(weight),0) AS totalKg
     FROM Recycling_Submissions
     GROUP BY waste_type
     ORDER BY totalKg DESC`
  );

  res.json({
    totals: {
      totalKg: Number(totals[0].totalKg || 0),
      totalPoints: Number(totals[0].totalPoints || 0),
      submissionsCount: Number(totals[0].submissionsCount || 0)
    },
    byType: byType.map(r => ({ waste_type: r.waste_type, totalKg: Number(r.totalKg || 0) }))
  });
}

async function usageSummary(req, res) {
  const usersCount = await asyncQuery('SELECT COUNT(*) AS c FROM Users');
  const activeUsers = await asyncQuery(
    `SELECT COUNT(DISTINCT user_id) AS c FROM Recycling_Submissions
     WHERE created_at >= date('now', '-30 days')`
  );

  res.json({
    usersCount: Number(usersCount[0].c || 0),
    activeUsersLast30Days: Number(activeUsers[0].c || 0)
  });
}

module.exports = { listUsers, listSubmissions, systemStats, usageSummary };
