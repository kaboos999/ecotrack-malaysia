const { getDb } = require('./src/config/sqlite');

const db = getDb();

db.serialize(() => {
  // Clear existing data
  db.run('DELETE FROM Recycling_Submissions');
  db.run('DELETE FROM Users');
  
  // Insert admin user
  const adminHash = '$2b$12$.4TDevzd84NuVBdWTcfkXeNyvVj6dD5.jJ4zE7RHrl.MFeldFNYgC';
  db.run(`
    INSERT INTO Users (name, email, password_hash, role) 
    VALUES ('EcoCycle Admin', 'admin@ecocycle.my', '${adminHash}', 'admin')
  `);
  
  // Insert demo users
  const userHash = '$2b$12$VeM70LUjrvzDjqO5vU1ffOQn4tna1czvq5Vn6I/2BG2uMaPPDUibW';
  const users = [
    ['Ali Bin Ahmad', 'ali@demo.my', userHash, 'user'],
    ['Siti Nur Aisyah', 'siti@demo.my', userHash, 'user'],
    ['John Tan', 'john@demo.my', userHash, 'user']
  ];
  
  users.forEach(user => {
    db.run(`
      INSERT INTO Users (name, email, password_hash, role) 
      VALUES (?, ?, ?, ?)
    `, user);
  });
  
  // Wait for users to be inserted, then add submissions
  setTimeout(() => {
    const submissions = [
      [2, 'Plastic', 1.20, 'https://example.com/demo/ali1.jpg', 12, '2026-01-10 10:00:00'],
      [2, 'Glass', 2.50, 'https://example.com/demo/ali2.jpg', 20, '2026-01-20 11:00:00'],
      [2, 'Metal', 3.00, 'https://example.com/demo/ali3.jpg', 36, '2026-02-05 09:30:00'],
      [3, 'Paper', 1.80, 'https://example.com/demo/siti1.jpg', 11, '2026-01-08 14:00:00'],
      [3, 'Plastic', 4.20, 'https://example.com/demo/siti2.jpg', 42, '2026-02-01 16:10:00'],
      [3, 'Glass', 2.10, 'https://example.com/demo/siti3.jpg', 17, '2026-02-12 12:00:00'],
      [4, 'Metal', 5.00, 'https://example.com/demo/john1.jpg', 60, '2026-01-15 08:00:00'],
      [4, 'Paper', 2.40, 'https://example.com/demo/john2.jpg', 14, '2026-02-10 18:45:00']
    ];
    
    submissions.forEach(submission => {
      db.run(`
        INSERT INTO Recycling_Submissions (user_id, waste_type, weight, image_url, points, created_at) 
        VALUES (?, ?, ?, ?, ?, ?)
      `, submission);
    });
    
    console.log('SQLite database initialized successfully!');
    db.close();
  }, 1000);
});
