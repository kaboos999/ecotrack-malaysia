-- Demo seed data (bcrypt required for demo users)
-- For each demo password (e.g., User@12345), generate bcrypt hash:
--   node -e "const bcrypt=require('bcrypt'); bcrypt.hash('User@12345',12).then(h=>console.log(h))"
-- Replace BCRYPT_HASH_* placeholders then run.

USE ecocycle_db;

INSERT INTO Users (name, email, password_hash, role) VALUES
('Ali Bin Ahmad', 'ali@demo.my', '$2b$12$VeM70LUjrvzDjqO5vU1ffOQn4tna1czvq5Vn6I/2BG2uMaPPDUibW', 'user'),
('Siti Nur Aisyah', 'siti@demo.my', '$2b$12$VeM70LUjrvzDjqO5vU1ffOQn4tna1czvq5Vn6I/2BG2uMaPPDUibW', 'user'),
('John Tan', 'john@demo.my', '$2b$12$VeM70LUjrvzDjqO5vU1ffOQn4tna1czvq5Vn6I/2BG2uMaPPDUibW', 'user');

-- After inserting users, get IDs:
-- SELECT id, email FROM Users;
-- Replace the user_id values below accordingly.

INSERT INTO Recycling_Submissions (user_id, waste_type, weight, image_url, points, created_at) VALUES
(2, 'Plastic', 1.20, 'https://example.com/demo/ali1.jpg', 12, '2026-01-10 10:00:00'),
(2, 'Glass',   2.50, 'https://example.com/demo/ali2.jpg', 20, '2026-01-20 11:00:00'),
(2, 'Metal',   3.00, 'https://example.com/demo/ali3.jpg', 36, '2026-02-05 09:30:00'),

(3, 'Paper',   1.80, 'https://example.com/demo/siti1.jpg', 11, '2026-01-08 14:00:00'),
(3, 'Plastic', 4.20, 'https://example.com/demo/siti2.jpg', 42, '2026-02-01 16:10:00'),
(3, 'Glass',   2.10, 'https://example.com/demo/siti3.jpg', 17, '2026-02-12 12:00:00'),

(4, 'Metal',   5.00, 'https://example.com/demo/john1.jpg', 60, '2026-01-15 08:00:00'),
(4, 'Paper',   2.40, 'https://example.com/demo/john2.jpg', 14, '2026-02-10 18:45:00');
