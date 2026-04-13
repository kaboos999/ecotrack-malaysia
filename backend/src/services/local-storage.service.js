const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

function makeUploader() {
  const maxMb = Number(process.env.MAX_UPLOAD_MB || 5);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const userId = req.user?.id || 'unknown';
      const userUploadDir = path.join(uploadsDir, String(userId));
      if (!fs.existsSync(userUploadDir)) {
        fs.mkdirSync(userUploadDir, { recursive: true });
      }
      cb(null, userUploadDir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname || '').toLowerCase();
      const safeExt = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) ? ext : '.jpg';
      const filename = `${Date.now()}${safeExt}`;
      cb(null, filename);
    }
  });

  return multer({
    storage,
    limits: { fileSize: maxMb * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const ok = ['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype);
      cb(ok ? null : new Error('Only JPG/PNG/WEBP allowed'), ok);
    }
  });
}

// Middleware to add file location to request
function addFileLocation(req, res, next) {
  if (req.file) {
    // Convert local file path to a URL-like format for consistency
    const baseUrl = process.env.CORS_ORIGIN || 'http://localhost:3001';
    req.file.location = `${baseUrl}/uploads/${req.user?.id || 'unknown'}/${req.file.filename}`;
  }
  next();
}

module.exports = { makeUploader, addFileLocation };
