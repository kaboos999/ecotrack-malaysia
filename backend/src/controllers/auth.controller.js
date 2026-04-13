const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDb } = require('../config/db');

function asyncQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    const db = getDb();
    if (sql.trim().startsWith('SELECT') || sql.trim().startsWith('INSERT')) {
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

async function register(req, res) {
  const { name, email, password } = req.body;

  const exists = await asyncQuery('SELECT id FROM Users WHERE email = ? LIMIT 1', [email]);
  if (exists.length) return res.status(409).json({ message: 'Email already registered' });

  const password_hash = await bcrypt.hash(password, 12);

  const result = await asyncQuery(
    'INSERT INTO Users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
    [name, email, password_hash, 'user']
  );

  return res.status(201).json({ id: result.insertId, name, email });
}

async function login(req, res) {
  const { email, password } = req.body;

  const rows = await asyncQuery(
    'SELECT id, name, email, password_hash, role FROM Users WHERE email = ? LIMIT 1',
    [email]
  );
  if (!rows.length) return res.status(401).json({ message: 'Invalid credentials' });

  const user = rows[0];
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  return res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
}

module.exports = { register, login };
