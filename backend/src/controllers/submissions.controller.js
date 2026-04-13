const { getDb } = require('../config/db');
const { calculatePoints } = require('../services/points.service');
const { checkAndNotifyMilestones } = require('../services/milestones.service');

function asyncQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    const db = getDb();
    if (sql.trim().startsWith('SELECT')) {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    } else {
      db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve({ insertId: this.lastID, changes: this.changes });
      });
    }
  });
}

async function createSubmission(req, res) {
  const userId = req.user.id;

  const { waste_type, weight } = req.body;
  const weightKg = Number(weight);

  if (!req.file || !req.file.location) {
    return res.status(400).json({ message: 'Image upload is required' });
  }

  const userRows = await asyncQuery('SELECT id, name, email FROM Users WHERE id = ? LIMIT 1', [userId]);
  if (!userRows.length) return res.status(404).json({ message: 'User not found' });

  const sumBeforeRows = await asyncQuery(
    'SELECT COALESCE(SUM(weight),0) AS totalKg FROM Recycling_Submissions WHERE user_id = ?',
    [userId]
  );
  const beforeKg = Number(sumBeforeRows[0].totalKg || 0);

  const points = calculatePoints(waste_type, weightKg);

  const result = await asyncQuery(
    'INSERT INTO Recycling_Submissions (user_id, waste_type, weight, image_url, points) VALUES (?, ?, ?, ?, ?)',
    [userId, waste_type, weightKg, req.file.location, points]
  );

  const afterKg = beforeKg + weightKg;

  await checkAndNotifyMilestones({
    beforeKg,
    afterKg,
    user: userRows[0]
  });

  return res.status(201).json({
    id: result.insertId,
    waste_type,
    weight: weightKg,
    image_url: req.file.location,
    points
  });
}

module.exports = { createSubmission };
