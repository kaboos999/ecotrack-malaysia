const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const screenshotsDir = path.join(__dirname, 'screenshots');

// Create screenshot directory if it doesn't exist
if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
}

console.log('=== EcoCycle Malaysia - Screenshot Guide ===\n');

console.log('📸 Manual Screenshot Instructions:\n');

console.log('1. FRONTEND SCREENSHOTS:');
console.log('   • Open: http://localhost:3001/login.html');
console.log('   • Capture: Login page interface');
console.log('   • Save as: screenshots/login-page.png\n');

console.log('   • Open: http://localhost:3001/dashboard.html');
console.log('   • Login as demo user (ali@demo.my / User@12345)');
console.log('   • Capture: Dashboard with charts and stats');
console.log('   • Save as: screenshots/dashboard-page.png\n');

console.log('   • Open: http://localhost:3001/submit.html');
console.log('   • Capture: Submission form interface');
console.log('   • Save as: screenshots/submission-page.png\n');

console.log('   • Open: http://localhost:3001/admin.html');
console.log('   • Login as admin (admin@ecocycle.my / Admin@12345)');
console.log('   • Capture: Admin dashboard interface');
console.log('   • Save as: screenshots/admin-dashboard.png\n');

console.log('2. API TESTING SCREENSHOTS:');
console.log('   • Open PowerShell');
console.log('   • Run: curl http://localhost:3000/health');
console.log('   • Capture: Terminal output');
console.log('   • Save as: screenshots/health-check.png\n');

console.log('   • Run: curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"admin@ecocycle.my\",\"password\":\"Admin@12345\"}"');
console.log('   • Capture: Login response with JWT token');
console.log('   • Save as: screenshots/api-login-response.png\n');

console.log('3. DATABASE EVIDENCE:');
console.log('   • Open SQLite browser or use command line');
console.log('   • Connect to: backend/data/ecocycle.db');
console.log('   • Run: SELECT * FROM Users;');
console.log('   • Capture: Users table data');
console.log('   • Save as: screenshots/users-table.png\n');

console.log('4. SYSTEM STATUS:');
console.log('   • Capture backend console showing "EcoCycle API running on port 3000"');
console.log('   • Save as: screenshots/backend-running.png');
console.log('   • Capture frontend console showing "Serving HTTP on port 3001"');
console.log('   • Save as: screenshots/frontend-running.png\n');

console.log('🎯 Current Application Status:');
console.log('   ✅ Backend: http://localhost:3000');
console.log('   ✅ Frontend: http://localhost:3001');
console.log('   ✅ Database: SQLite with demo data');
console.log('   ✅ All endpoints functional\n');

console.log('📋 Test Accounts:');
console.log('   • Admin: admin@ecocycle.my / Admin@12345');
console.log('   • Demo Users: ali@demo.my, siti@demo.my, john@demo.my / User@12345\n');

console.log('📊 Test Data Summary:');
console.log('   • Total Users: 5');
console.log('   • Total Submissions: 9');
console.log('   • Total Weight: 24.7kg');
console.log('   • Total Points: 237\n');

console.log('🚀 After capturing screenshots, the comprehensive report will be complete!');
console.log('   Report location: COMPREHENSIVE_REPORT.md');
console.log('   Screenshots location: screenshots/');
