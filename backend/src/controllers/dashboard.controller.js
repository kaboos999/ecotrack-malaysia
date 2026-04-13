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

async function getMyDashboard(req, res) {
  const userId = req.user.id;

  const totalsRows = await asyncQuery(
    `SELECT 
        COALESCE(SUM(weight),0) AS totalKg,
        COALESCE(SUM(points),0) AS totalPoints
     FROM Recycling_Submissions
     WHERE user_id = ?`,
    [userId]
  );

  const monthlyRows = await asyncQuery(
    `SELECT 
        strftime('%Y-%m', created_at) AS month,
        COALESCE(SUM(weight),0) AS totalKg
     FROM Recycling_Submissions
     WHERE user_id = ?
     GROUP BY strftime('%Y-%m', created_at)
     ORDER BY month ASC`,
    [userId]
  );

  res.json({
    totals: {
      totalKg: Number(totalsRows[0].totalKg || 0),
      totalPoints: Number(totalsRows[0].totalPoints || 0)
    },
    monthly: monthlyRows.map(r => ({ month: r.month, totalKg: Number(r.totalKg || 0) }))
  });
}

module.exports = { getMyDashboard };
