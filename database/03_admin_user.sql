-- Admin account creation (bcrypt required)
-- 1) Generate bcrypt hash (run inside backend folder where bcrypt is installed):
--    node -e "const bcrypt=require('bcrypt'); bcrypt.hash('Admin@12345',12).then(h=>console.log(h))"
-- 2) Paste the hash below and run this SQL.

USE ecocycle_db;

INSERT INTO Users (name, email, password_hash, role)
VALUES ('EcoCycle Admin', 'admin@ecocycle.my', '$2b$12$.4TDevzd84NuVBdWTcfkXeNyvVj6dD5.jJ4zE7RHrl.MFeldFNYgC', 'admin');
