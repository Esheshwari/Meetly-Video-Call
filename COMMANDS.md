# 💻 COMMAND REFERENCE & CHEAT SHEET

## 🚀 STARTUP COMMANDS

### Start Backend
```bash
cd D:\Zoom-clone\backend
npm start
```

### Start Frontend
```bash
cd D:\Zoom-clone\frontend
npm start
```

### Both Running?
```
✅ Backend: http://localhost:8000
✅ Frontend: http://localhost:3000
```

---

## 📍 IMPORTANT URLs

| Purpose | URL |
|---------|-----|
| **Main App** | http://localhost:3000 |
| **Landing Page** | http://localhost:3000 |
| **Login** | http://localhost:3000/auth |
| **Dashboard** | http://localhost:3000/home |
| **Video Call** | http://localhost:3000/{code} |
| **History** | http://localhost:3000/history |
| **Backend API** | http://localhost:8000 |

---

## 🧪 TESTING FLOW

### Test with 2 Browsers

```bash
# Browser 1 (Firefox)
1. Go to http://localhost:3000
2. Login or Register
3. Click "Start New Meeting"
4. Click "Generate Meeting Code"
5. Copy the code (e.g., ABC123XYZ0)
6. Click "Join Meeting"
7. Enter name: "User 1"
8. Click "Join Meeting" ✅

# Browser 2 (Chrome) - Same computer
1. Go to http://localhost:3000
2. Login (same or different account)
3. Click "Join Existing Meeting"
4. Paste the code: ABC123XYZ0
5. Click "Join Call"
6. Enter name: "User 2"
7. Click "Join Meeting" ✅

# Result:
- Both see each other's video ✅
- Can chat in real-time ✅
- Can toggle camera/mic ✅
- Can share screen ✅
```

---

## 🎯 FEATURE CONTROLS IN VIDEO CALL

| Control | Icon | Function |
|---------|------|----------|
| **Camera** | 📹 | Toggle video on/off |
| **Microphone** | 🎤 | Toggle audio on/off |
| **End Call** | 📞 | Exit meeting |
| **Screen Share** | 🖥️ | Share your screen |
| **Chat** | 💬 | Open/close chat panel |

---

## 🔧 INSTALLATION COMMANDS

### First Time Setup

```bash
# Install Frontend
cd D:\Zoom-clone\frontend
npm install

# Install Backend
cd D:\Zoom-clone\backend
npm install
```

### If Dependencies Missing

```bash
# Frontend
cd D:\Zoom-clone\frontend
rm -r node_modules package-lock.json
npm install

# Backend
cd D:\Zoom-clone\backend
rm -r node_modules package-lock.json
npm install
```

---

## 📦 KEY DEPENDENCIES

### Frontend
```json
{
  "react": "^19.2.3",
  "react-dom": "^19.2.3",
  "react-router-dom": "^6.0.0",
  "socket.io-client": "^4.8.3",
  "@mui/material": "^7.3.7",
  "@mui/icons-material": "^7.3.7",
  "axios": "^1.13.2"
}
```

### Backend
```json
{
  "express": "^5.2.1",
  "socket.io": "^4.8.3",
  "mongoose": "^9.1.3",
  "bcrypt": "^6.0.0",
  "nodemon": "^3.1.11"
}
```

---

## 🐛 TROUBLESHOOTING COMMANDS

### Clear Cache & Reinstall Frontend
```bash
cd D:\Zoom-clone\frontend
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm start
```

### Clear Cache & Reinstall Backend
```bash
cd D:\Zoom-clone\backend
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm start
```

### Check Node Version
```bash
node --version
# Should be v18+ (current: v18.20.4)
```

### Check npm Version
```bash
npm --version
# Should be v8+
```

### Kill Port 3000 (Frontend)
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### Kill Port 8000 (Backend)
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :8000
kill -9 <PID>
```

---

## 📝 FILE LOCATIONS

### Frontend Key Files
```
D:\Zoom-clone\frontend\
├── src\
│   ├── pages\
│   │   ├── home.jsx          → Create/join meetings
│   │   ├── VideoMeet.jsx     → Video call interface
│   │   ├── landing.jsx       → Landing page
│   │   ├── authentication.jsx → Login/Register
│   │   └── history.jsx       → Call history
│   ├── App.js                → Main app component
│   ├── App.css               → Global styles
│   ├── index.js              → Entry point
│   ├── environment.js        → Backend URL
│   └── contexts\
│       └── AuthContext.jsx   → Auth logic
└── package.json              → Dependencies
```

### Backend Key Files
```
D:\Zoom-clone\backend\
├── src\
│   ├── app.js                → Main server file
│   ├── controllers\
│   │   └── socketManager.js  → WebRTC logic
│   ├── models\
│   │   ├── user.model.js     → User schema
│   │   └── meeting.model.js  → Meeting schema
│   └── routes\
│       └── users.routes.js   → API routes
└── package.json              → Dependencies
```

---

## 🔐 IMPORTANT CREDENTIALS

### Default Test Account

```
Username: testuser
Password: Test@123
```

### Create Your Own

1. Go to http://localhost:3000
2. Click "Register"
3. Fill in details
4. Click "Register"
5. Login with credentials

---

## 🎨 ENVIRONMENT CONFIGURATION

### Frontend Environment (`src/environment.js`)
```javascript
// Development (Default)
let IS_PROD = false;
const server = "http://localhost:8000"

// Production
let IS_PROD = true;
const server = "https://your-backend-url.com"
```

### Backend Port (`src/app.js`)
```javascript
app.set("port", process.env.PORT || 8000)
```

---

## 📊 BROWSER CONSOLE DEBUGGING

### Check Socket Connection
```javascript
// In browser console
socket.connected // true/false
socket.id        // Your socket ID
socket.rooms     // Rooms you're in
```

### Check Local Stream
```javascript
// In VideoMeet.jsx
window.localStream // Your media stream
```

### Check Peer Connections
```javascript
// In VideoMeet.jsx
connections // Object of all peer connections
```

---

## 🎯 QUICK TEST CHECKLIST

```
☐ Backend running on :8000
☐ Frontend running on :3000
☐ Can access http://localhost:3000
☐ Can login/register
☐ Can generate meeting code
☐ Can join meeting
☐ Video preview shows
☐ Audio working
☐ Can join in 2nd browser
☐ Both see each other's video
☐ Chat messages work
☐ Can toggle video/audio
☐ Can end call
☐ Redirected to home after end
☐ Meeting saved in history
```

---

## 💾 GIT COMMANDS (If Using Git)

```bash
# Initialize repo (if needed)
git init

# Add all files
git add .

# Commit changes
git commit -m "Zoom Clone Implementation Complete"

# View status
git status

# View logs
git log --oneline
```

---

## 📚 Documentation Files

```
D:\Zoom-clone\
├── README.md                    → Main documentation
├── STARTUP.md                   → Setup guide
├── QUICK_REFERENCE.md           → This file (quick commands)
├── TESTING_GUIDE.md             → Detailed testing
├── HOW_IT_WORKS.md              → Technical explanation
├── VISUAL_GUIDE.md              → Diagrams
└── IMPLEMENTATION_COMPLETE.md   → Completion summary
```

---

## 🌐 DEPLOYMENT COMMANDS

### Build Frontend for Production
```bash
cd D:\Zoom-clone\frontend
npm run build
# Creates optimized build in ./build folder
```

### Build Backend for Production
```bash
cd D:\Zoom-clone\backend
npm start
# Already optimized, no build step needed
```

---

## 📞 COMMON ERROR SOLUTIONS

### Error: "Cannot find module"
```bash
# Solution: Reinstall dependencies
npm install
```

### Error: "Port already in use"
```bash
# Solution: Kill the process using that port
# (See "Kill Port" section above)
```

### Error: "Cannot connect to backend"
```bash
# Solution: Check backend is running
# Check environment.js has correct URL
# Check backend is on :8000
```

### Error: "No camera/microphone"
```bash
# Solution: Check browser permissions
# Reload page and allow when prompted
# Try different browser
```

---

## ✅ SUCCESS INDICATORS

```
✅ Both terminals show "listening" messages
✅ http://localhost:3000 loads without errors
✅ Can login/register
✅ Video preview shows immediately
✅ Meeting code generates randomly
✅ Two browsers see each other's video
✅ Chat appears instantly
✅ Console has no errors (warnings OK)
✅ Video is clear and smooth
✅ Meeting history saves data
```

---

## 🎉 ALL SYSTEMS GO!

When everything works:
- Terminal 1: "LISTENING ON PORT 8000" ✅
- Terminal 2: "webpack compiled successfully" ✅
- Browser: http://localhost:3000 loads ✅
- 2 Browsers: Same code = Same video ✅

You're done! 🚀

---

## 💡 QUICK TIPS

1. **Always start Backend FIRST**
2. **Use Chrome for best experience**
3. **Different browsers test P2P better**
4. **Check console for detailed errors**
5. **Refresh page if things act weird**
6. **Meeting codes are case-sensitive in server**
7. **Allow permissions when browser asks**
8. **Use same WiFi for best connectivity**

---

## 🔗 USEFUL LINKS

- [React Documentation](https://react.dev)
- [Socket.io Documentation](https://socket.io/docs/)
- [WebRTC MDN Guide](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)
- [Material-UI Docs](https://mui.com/)
- [Express.js Docs](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

**Save this file for quick reference!** 📌

*Last Updated: January 2026*
