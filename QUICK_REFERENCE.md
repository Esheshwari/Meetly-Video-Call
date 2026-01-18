# 🎬 ZOOM CLONE - QUICK REFERENCE

## 🚀 START IN 2 STEPS

### Terminal 1:
```bash
cd D:\Zoom-clone\backend
npm start
```

### Terminal 2:
```bash
cd D:\Zoom-clone\frontend
npm start
```

**Open**: http://localhost:3000

---

## 📊 TEST WITH 2 BROWSERS (Best Way to Test)

### Browser 1:
1. Login at http://localhost:3000
2. Go to **Home** (after login)
3. Click **"Start New Meeting"**
4. Click **"Generate Meeting Code"** → Get code like `ABC123XYZ0`
5. Click **"Join Meeting"** → Enter name → Join
6. See your video! ✅

### Browser 2 (Different Browser):
1. Login at http://localhost:3000
2. Go to **Home**
3. Click **"Join Existing Meeting"**
4. Paste the meeting code from Browser 1
5. Click **"Join Call"** → Enter name → Join
6. See BOTH videos now! ✅

---

## ✨ FEATURES TO TEST

| Feature | How to Test |
|---------|------------|
| **Video/Audio** | Both users see each other |
| **Real-Time Chat** | Type message → Appears instantly in other browser |
| **Video Toggle** | Click camera icon on/off |
| **Mic Toggle** | Click mic icon on/off |
| **Screen Share** | Click screen icon (Chrome best) |
| **End Call** | Click red phone icon |
| **History** | Click History button (shows past calls) |

---

## 🔗 KEY URLs

| Page | URL |
|------|-----|
| Landing | http://localhost:3000 |
| Login/Register | http://localhost:3000/auth |
| Dashboard | http://localhost:3000/home |
| Video Call | http://localhost:3000/{meeting-code} |
| History | http://localhost:3000/history |
| Backend | http://localhost:8000 |

---

## 🎯 MEETING CODE LOGIC

```
Step 1: User A generates code "ABC123"
Step 2: User A joins with "ABC123"
        ↓
        Backend stores meeting "ABC123" with User A
        
Step 3: User B enters code "ABC123"
Step 4: User B joins with "ABC123"
        ↓
        Backend connects User A & User B
        WebRTC peer connection established
        
Step 5: Video streams exchange in real-time
        Chat messages also transfer via Socket.io
```

---

## 🐛 QUICK FIXES

| Problem | Solution |
|---------|----------|
| No video | Check camera permissions |
| Can't see other user | Make sure both use SAME code |
| Chat not working | Refresh page |
| Backend won't start | Check if port 8000 is free |
| Frontend won't start | Make sure `npm install` finished |

---

## 📱 TECH STACK

- **Frontend**: React 19, Material-UI
- **Backend**: Node.js, Express
- **Real-Time**: Socket.io (chat) + WebRTC (video)
- **Database**: MongoDB
- **Authentication**: JWT Tokens

---

## 💡 WHAT MAKES IT WORK

1. **Socket.io**: Sends meeting code signals between users
2. **WebRTC**: Directly connects users for video/audio (peer-to-peer)
3. **Server**: Routes messages and stores meeting data
4. **Database**: Keeps user info and call history

---

## ✅ SUCCESS LOOKS LIKE

- Two browsers → Same meeting code → Both see video → Can chat → Can toggle features
- No errors in console
- Video smooth and clear
- Chat instant
- Meeting saved in history

---

## 🎉 YOU'RE READY!

```
npm start (Terminal 1: Backend)
npm start (Terminal 2: Frontend)
Open localhost:3000
Generate code → Join in 2 browsers → Enjoy!
```

---

**Need Help?** Check TESTING_GUIDE.md for detailed troubleshooting
