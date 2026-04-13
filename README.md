# EcoCycle Malaysia – Smart Recycling Reward & Waste Monitoring System

## Project Overview
EcoCycle Malaysia is a cloud-based web application that supports SDG 12 (Sustainable Consumption and Production), Target 4, by enabling users to log recyclable waste submissions with image proof, earn points, view dashboard analytics, and receive milestone notifications. An admin dashboard supports monitoring and system statistics.

## Tech Stack (Fixed)
- Compute: Amazon EC2 (Ubuntu 22.04)
- Backend: Node.js + Express.js
- Database: Amazon RDS MySQL
- Storage: Amazon S3 (image uploads)
- Notifications: Amazon SNS (email milestone)
- Monitoring: Amazon CloudWatch + AWS X-Ray
- Frontend: HTML/CSS/Vanilla JS + Chart.js

## Repository Structure
- `backend/`: Node.js Express API
- `frontend/`: Static pages (HTML/CSS/JS)
- `database/`: MySQL schema + seed scripts
- `deployment/`: AWS setup guides
- `documentation/`: report-ready writeups
- `presentation/`: 20-minute video script

## Backend Setup (Local/EC2)
1. Copy `backend/.env.example` to `backend/.env` and fill values.
2. Install dependencies:
   - `npm install`
3. Start API:
   - `npm start`
4. Health check:
   - `GET http://localhost:3000/health`

## Frontend Setup
- Update `frontend/assets/api.js` and set `API_BASE` to your API URL.
- Open `frontend/login.html` in the browser (or serve via Nginx on EC2).

## Database Setup
Run scripts in order (from `database/`):
1. `01_schema.sql`
2. `03_admin_user.sql` (generate bcrypt hash as instructed)
3. `02_seed_demo.sql`

## Default Demo Accounts
- Admin is created via `database/03_admin_user.sql`
- Demo users are seeded via `database/02_seed_demo.sql` (bcrypt hashes need to be generated as instructed)

## Core API Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/submissions` (multipart/form-data with `image`)
- `GET /api/dashboard/me`
- Admin:
  - `GET /api/admin/users`
  - `GET /api/admin/submissions`
  - `GET /api/admin/stats`
  - `GET /api/admin/usage`

## Notes
- Milestone emails are triggered when creating submissions via the API.
- For production: run with PM2 and proxy through Nginx (see `deployment/`).
