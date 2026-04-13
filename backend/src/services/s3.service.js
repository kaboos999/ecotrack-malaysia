const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { s3 } = require('../config/aws');

function makeUploader() {
  const maxMb = Number(process.env.MAX_UPLOAD_MB || 5);

  return multer({
    storage: multerS3({
      s3,
      bucket: process.env.S3_BUCKET_NAME,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: (req, file, cb) => {
        const ext = path.extname(file.originalname || '').toLowerCase();
        const safeExt = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) ? ext : '.jpg';
        const userId = req.user?.id || 'unknown';
        cb(null, `uploads/${userId}/${Date.now()}${safeExt}`);
      }
    }),
    limits: { fileSize: maxMb * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const ok = ['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype);
      cb(ok ? null : new Error('Only JPG/PNG/WEBP allowed'), ok);
    }
  });
}

module.exports = { makeUploader };
