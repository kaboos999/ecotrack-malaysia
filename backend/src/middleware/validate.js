function isEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateRegister(req, res, next) {
  const { name, email, password } = req.body || {};
  if (!name || typeof name !== 'string' || name.length < 2) {
    return res.status(400).json({ message: 'Invalid name' });
  }
  if (!isEmail(email)) return res.status(400).json({ message: 'Invalid email' });
  if (!password || typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' });
  }
  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body || {};
  if (!isEmail(email)) return res.status(400).json({ message: 'Invalid email' });
  if (!password || typeof password !== 'string') return res.status(400).json({ message: 'Invalid password' });
  next();
}

function validateSubmission(req, res, next) {
  const { waste_type, weight } = req.body || {};
  const allowed = ['Plastic', 'Glass', 'Paper', 'Metal'];

  if (!allowed.includes(waste_type)) return res.status(400).json({ message: 'Invalid waste_type' });

  const w = Number(weight);
  if (!Number.isFinite(w) || w <= 0 || w > 200) {
    return res.status(400).json({ message: 'Invalid weight' });
  }
  next();
}

module.exports = { validateRegister, validateLogin, validateSubmission };
