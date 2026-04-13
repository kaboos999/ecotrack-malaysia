const sqlite3 = require('sqlite3').verbose();
const path = require('path');

let db;

function getDb() {
  if (!db) {
    const dbPath = path.join(__dirname, '../../data/ecocycle.db');
    db = new sqlite3.Database(dbPath);
    
    // Create tables if they don't exist
    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS Users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password_hash TEXT NOT NULL,
          role TEXT NOT NULL DEFAULT 'user',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
      
      db.run(`
        CREATE TABLE IF NOT EXISTS Recycling_Submissions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          waste_type TEXT NOT NULL,
          weight REAL NOT NULL,
          image_url TEXT NOT NULL,
          points INTEGER NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES Users(id)
        )
      `);
    });
  }
  return db;
}

module.exports = { getDb };
