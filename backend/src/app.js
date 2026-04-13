require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { errorHandler } = require('./middleware/errorHandler');
const { setupStaticFiles } = require('./middleware/staticFiles');

const authRoutes = require('./routes/auth.routes');
const submissionsRoutes = require('./routes/submissions.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const adminRoutes = require('./routes/admin.routes');

const AWSXRay = require('aws-xray-sdk');
AWSXRay.captureHTTPsGlobal(require('https'));
AWSXRay.captureHTTPsGlobal(require('http'));

const app = express();

app.use(AWSXRay.express.openSegment('EcoCycle-API'));

app.use(cors({
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
  credentials: false
}));

app.use(express.json({ limit: '1mb' }));

// Setup static file serving
setupStaticFiles(app);

app.get('/health', (req, res) => res.json({ ok: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'EcoCycle Malaysia API',
    version: '1.0.0',
    status: 'Running',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      submissions: '/api/submissions',
      dashboard: '/api/dashboard',
      admin: '/api/admin'
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/submissions', submissionsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);

app.use(AWSXRay.express.closeSegment());

module.exports = app;
