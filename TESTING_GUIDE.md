# 🎥 Zoom Clone - Complete Guide to Test with Multiple Browsers

## Quick Start

### Terminal 1 - Start Backend
```bash
cd D:\Zoom-clone\backend
npm start
```

### Terminal 2 - Start Frontend
```bash
cd D:\Zoom-clone\frontend
npm start
```

Then open `http://localhost:3000`

---

## How to Test Video Call with Two Browsers

### Method 1: Using Meeting Code (RECOMMENDED)

#### Step 1: Create a Meeting Code
1. Navigate to http://localhost:3000/home (after login)
2. Click the **"Start New Meeting"** card
3. Click **"Generate Meeting Code"** button
4. A unique 10-character code will be created (e.g., `ABC123XYZ0`)
5. Click **"Copy"** button to copy it to clipboard

#### Step 2: Join in First Browser
1. Click **"Join Meeting"** button
2. A new window will open with the video preview
3. Enter your **Name** (e.g., "User 1")
4. Click **"Join Meeting"** button
5. Allow camera and microphone permissions
6. You'll see your video stream and controls

#### Step 3: Join in Second Browser
1. **Open a different browser** (Chrome, Firefox, Edge, Safari, etc.)
2. Go to `http://localhost:3000` and login with another account (or same account)
3. Click on **"Join Existing Meeting"** card
4. Paste the meeting code you copied earlier in the text field
5. Click **"Join Call"** button
6. Enter your **Name** (e.g., "User 2")
7. Click **"Join Meeting"** button

#### Step 4: Test Real-Time Features
✅ **Video Streams**: Both cameras should be visible  
✅ **Real-Time Chat**: Send messages between browsers  
✅ **Microphone Toggle**: Turn mic on/off  
✅ **Camera Toggle**: Turn camera on/off  
✅ **Screen Sharing**: Share your screen (Chrome recommended)  
✅ **Meeting History**: Both calls logged in history  

---

### Method 2: Direct URL (Alternative)

You can also directly access a meeting by URL:

1. In first browser:
   - Click "Generate Meeting Code" to get code (e.g., `ABC123XYZ0`)
   - Join the meeting

2. In second browser:
   - Manually type: `http://localhost:3000/ABC123XYZ0`
   - Enter name and join

---

## Understanding the Architecture

### How Meeting Codes Work

```
Browser 1 (User A)           Browser 2 (User B)
    ↓                            ↓
   Join: ABC123XYZ0    →    Join: ABC123XYZ0
    ↓                            ↓
   Socket.io Connection         Socket.io Connection
    ↓                            ↓
  Backend (Port 8000)
    ↓
  Creates connection with matching meeting ID
    ↓
  Establishes WebRTC Peer Connection
    ↓
  Exchange video/audio streams
    ↓
  Real-time chat messages
```

### Real-Time Features Explained

#### 1. **Video/Audio Streaming (WebRTC)**
- Direct peer-to-peer connection
- Used STUN servers for NAT traversal
- Video quality adapts to network conditions

#### 2. **Real-Time Chat (Socket.io)**
- Server maintains chat history per meeting
- Messages delivered in real-time
- Participants see who sent each message

#### 3. **Screen Sharing**
- Share your desktop to others
- Uses getDisplayMedia API
- Works in Chrome, Edge, Firefox (with permissions)

#### 4. **Meeting History**
- Database stores all meetings attended
- Visible in /history page
- Logged at meeting start

---

## Testing Checklist

### Initial Setup
- [ ] Backend running on http://localhost:8000
- [ ] Frontend running on http://localhost:3000
- [ ] Can access landing page
- [ ] Can login/register

### Single Browser Test
- [ ] Generate meeting code
- [ ] Join call successfully
- [ ] Camera preview shows
- [ ] Microphone works
- [ ] Chat messages send

### Multi-Browser Test
- [ ] Both browsers join same meeting code
- [ ] Both video streams visible
- [ ] Can send/receive chat messages in real-time
- [ ] Toggling video affects both views
- [ ] Toggling audio mutes both sides
- [ ] Screen share works (if browser supports)
- [ ] Meeting appears in history

### Browser Compatibility
Test with multiple browsers:
- ✅ Chrome (Recommended - best support)
- ✅ Firefox
- ✅ Edge
- ✅ Safari (limited WebRTC support)

---

## Troubleshooting

### Issue: Camera/Microphone Permission Denied
**Solution**: 
1. Check browser permissions in settings
2. Reload page and allow when prompted
3. Try incognito/private window

### Issue: No Video Stream from Other User
**Solution**:
1. Check backend is running (http://localhost:8000)
2. Open DevTools → Console for errors
3. Try refreshing the page
4. Both users must allow camera permissions

### Issue: Chat Messages Not Sending
**Solution**:
1. Enter a username first
2. Check Socket.io connection in DevTools
3. Clear browser cache and reload
4. Restart both backend and frontend

### Issue: Can't See Meeting Code
**Solution**:
1. Make sure you're logged in
2. Go to /home page
3. Click "Start New Meeting"
4. Click "Generate Meeting Code" first

### Issue: "Meeting Code Not Found"
**Solution**:
1. Make sure code is entered correctly (case-sensitive)
2. Make sure first user is already in that meeting
3. Try copying and pasting instead of typing

---

## Advanced Features

### Creating Multiple Calls
You can have multiple separate meetings simultaneously:
1. User A: Code = ABC123XYZ0
2. User B: Code = XYZ0ABC123
3. User C: Code = 123XYZ0ABC

Each meeting is completely separate and independent.

### Broadcasting to Many Users
All users with the same meeting code connect to:
- Each other via WebRTC for video/audio
- Server via Socket.io for chat and signaling

---

## Performance Tips

1. **Bandwidth**: Each video stream ~1-3 Mbps
2. **CPU**: Use Chrome for best performance
3. **Network**: Best results on stable WiFi/Ethernet
4. **Browser Tabs**: Close unnecessary tabs to free memory

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Send chat message |
| `Esc` | Close chat panel (when open) |

---

## File Locations

```
Zoom-clone/
├── frontend/                 # React App
│   ├── src/
│   │   ├── pages/
│   │   │   ├── home.jsx      # Meeting creation/joining
│   │   │   ├── VideoMeet.jsx # Video call interface
│   │   │   └── landing.jsx   # Landing page
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx # Auth logic
│   │   └── styles/
│   │       └── videoComponent.module.css
│   └── public/
│       └── index.html
│
├── backend/                  # Node.js Server
│   └── src/
│       ├── app.js           # Main server
│       ├── controllers/
│       │   └── socketManager.js # WebRTC signaling
│       └── routes/
│           └── users.routes.js  # Auth routes
│
└── STARTUP.md               # Startup guide
```

---

## Success Indicators 🎉

✅ Both users see each other's video  
✅ Real-time chat messages appear  
✅ Meeting code is unique and working  
✅ Features toggle (video/audio/screen)  
✅ No console errors  
✅ Smooth video playback  
✅ Fast message delivery (<100ms)  

---

## Next Steps

1. **Deploy to Production**: Use services like Heroku, Render, or AWS
2. **Add More Features**: 
   - Recording functionality
   - Meeting scheduling
   - User profiles
   - Meeting rooms/channels
3. **Optimize**: 
   - Implement bandwidth adaptation
   - Add video quality selection
   - Optimize database queries

---

Happy Testing! 🚀
