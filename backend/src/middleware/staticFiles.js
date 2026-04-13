const express = require('express');
const path = require('path');

function setupStaticFiles(app) {
  // Serve uploads directory
  app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));
}

module.exports = { setupStaticFiles };
