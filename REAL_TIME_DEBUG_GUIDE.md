# 🔧 REAL-TIME DEBUGGING GUIDE - Zoom Clone Connection Issues

## ⚠️ YOUR ISSUE: "Generating code in tab 1, joining in tab 2 doesn't work"

This guide will help you identify and fix the exact problem.

---

## 🎯 Step 1: Verify Both Servers Are Running

### Check Backend (Port 8000)
Open a **NEW PowerShell window** and run:
```powershell
netstat -ano | findstr ":8000"
```

**Expected Output:**
```
TCP    0.0.0.0:8000           0.0.0.0:0              LISTENING       12345
```

If you see `LISTENING` - **Backend is running ✅**
If you DON'T see it - **Backend is NOT running ❌**

**To start backend:**
```powershell
cd D:\Zoom-clone\Backend
npm start
```

---

### Check Frontend (Port 3001)
Open another **NEW PowerShell window** and run:
```powershell
netstat -ano | findstr ":3001"
```

**Expected Output:**
```
TCP    0.0.0.0:3001           0.0.0.0:0              LISTENING       54321
```

If you see `LISTENING` - **Frontend is running ✅**
If you DON'T see it - **Frontend is NOT running ❌**

**To start frontend:**
```powershell
cd D:\Zoom-clone\Frontend
npm start
```

---

## 🧪 Step 2: Open Two Tabs and Test Connection

### In Tab 1:
1. Go to: **http://localhost:3001**
2. Click **"Create New Meeting"**
3. You should see a meeting code like: `ABCD1234`
4. Click **Copy Code** button
5. **DO NOT** join yet - just copy the code
6. Open **DevTools** (Press F12)
7. Go to **Console** tab

### In Tab 2:
1. **Open new tab** in same browser
2. Go to: **http://localhost:3001**
3. Click **"Join Meeting"**
4. Paste the meeting code you copied
5. Click "Join"
6. **DO NOT** open DevTools yet

---

## 🔍 Step 3: Check Console Logs in Tab 1

In **Tab 1's DevTools Console**, you should see messages like:

```
✅ Socket CONNECTED: socket-id-here
📞 User joining: socket-id-here Meeting code/URL: ABCD1234
📢 Broadcasting user-joined to 1 participants
  → Sending to: socket-id-here
👤 User joined. ID: another-socket-id-here Total in room: 2 IDs: [socket-id, another-socket-id]
```

### 🚨 **If you DON'T see these messages:**

Press F12 and check for **RED ERROR MESSAGES**

- **"Failed to connect to server"** → Backend not running
- **"Socket connection timeout"** → Backend not responding
- **"Permission denied"** → Firewall blocking connection

---

## 🎥 Step 4: Check If Video Appears

After 2-3 seconds:
- Tab 1 should show TWO video boxes (your camera + remote)
- Tab 2 should show TWO video boxes (your camera + remote)

### 🚨 **If you only see ONE video box:**

This means the **peer connection didn't establish**. The issue is likely:

1. **Meeting codes are different** 
   - Tab 1 URL: `http://localhost:3001/ABCD1234`
   - Tab 2 URL: `http://localhost:3001/ABCD1234`
   - They MUST match exactly ✅

2. **One tab didn't connect to socket**
   - Check console in BOTH tabs
   - Both should say "✅ Socket CONNECTED"

3. **Firewall blocking WebRTC**
   - Try a different network
   - Or disable firewall temporarily (for testing only)

---

## 📊 Step 5: Run the Browser Console Tester

In **Tab 1's Console** (F12), paste this entire code:

```javascript
console.log('%c🔍 ZOOM CLONE DIAGNOSTICS', 'color: blue; font-size: 16px; font-weight: bold');

// Check socket
if (typeof socketRef !== 'undefined' && socketRef.current) {
    console.log('%c✅ Socket Connected', 'color: green; font-weight: bold');
    console.log('  Socket ID:', socketRef.current.id);
    console.log('  Connected:', socketRef.current.connected);
} else {
    console.log('%c❌ Socket NOT Connected', 'color: red; font-weight: bold');
}

// Check meeting code
const meetingCode = window.location.pathname.split('/').pop();
console.log('%c📍 Meeting Code:', 'color: orange; font-weight: bold', meetingCode);

// Check local stream
if (window.localStream) {
    console.log('%c✅ Local Stream Active', 'color: green; font-weight: bold');
    console.log('  Video tracks:', window.localStream.getVideoTracks().length);
    console.log('  Audio tracks:', window.localStream.getAudioTracks().length);
}

// Check peer connections
if (typeof connections !== 'undefined') {
    const count = Object.keys(connections).length;
    console.log(`%c👥 Peer Connections: ${count}`, 'color: purple; font-weight: bold');
}
```

**Copy and paste the code above into Browser Console (F12) and press Enter**

---

## 🛠️ Step 6: Backend Logging

While testing in tabs 1 and 2, **watch the Backend terminal window**. You should see:

```
✅ SOCKET CONNECTED: socket-id-123abc
📞 User joining: socket-id-123abc Meeting code/URL: ABCD1234
📌 Created new room: ABCD1234
👥 Room participants: 1 IDs: [socket-id-123abc]
✅ SOCKET CONNECTED: socket-id-456def
📞 User joining: socket-id-456def Meeting code/URL: ABCD1234
👥 Room participants: 2 IDs: [socket-id-123abc, socket-id-456def]
📢 Broadcasting user-joined to 2 participants
  → Sending to: socket-id-123abc
  → Sending to: socket-id-456def
```

### 🚨 **If Backend terminal shows NO messages when you join Tab 2:**

This means **the socket connection isn't reaching the backend**. Check:
1. Is backend actually running? (Run `npm start` again)
2. Is it on port 8000?
3. Check frontend console for errors

---

## ✅ Quick Checklist

Use this to verify everything:

- [ ] Backend running on port 8000 (check with netstat)
- [ ] Frontend running on port 3001 (check with netstat)
- [ ] Tab 1 shows "✅ Socket CONNECTED" in console
- [ ] Tab 2 shows "✅ Socket CONNECTED" in console
- [ ] Both tabs have SAME meeting code in URL
- [ ] Backend terminal shows both users connecting
- [ ] Both tabs show 2 video boxes (yours + other person)
- [ ] You can see the other person's camera
- [ ] Other person can see your camera
- [ ] Chat messages appear in both tabs

---

## 🆘 Still Not Working? Try This:

### 1. **Kill Everything and Restart Fresh**
```powershell
# Kill all Node processes
Get-Process node | Stop-Process -Force

# Wait 2 seconds
Start-Sleep -Seconds 2

# Start backend
cd D:\Zoom-clone\Backend
npm start

# In NEW terminal start frontend
cd D:\Zoom-clone\Frontend
npm start
```

### 2. **Clear Browser Cache**
- Press Ctrl+Shift+Delete
- Select "All time"
- Check "Cookies" and "Cached images"
- Click Clear

### 3. **Try Different Browsers**
- Chrome (best for WebRTC)
- Firefox
- Edge

### 4. **Check Firewall**
- Windows Defender might be blocking connections
- Temporarily disable for testing
- Add localhost:3001 and localhost:8000 to whitelist

### 5. **Check if Ports Are Correct**
Frontend console should show:
```javascript
server_url = "http://localhost:8000"  // NOT 8001, NOT different IP
```

To check:
1. Open DevTools (F12)
2. Go to Console
3. Type: `server_url`
4. Press Enter
5. Should show: `"http://localhost:8000"`

---

## 📞 Expected Behavior (When Working)

### Tab 1 Console:
```
✅ Connected to server with socket ID: abc123
📤 Sent join-call with meeting code: ABCD1234
👤 User joined. ID: def456 Total in room: 2 IDs: [abc123, def456]
```

### Tab 2 Console:
```
✅ Connected to server with socket ID: def456
📤 Sent join-call with meeting code: ABCD1234
👤 User joined. ID: abc123 Total in room: 2 IDs: [abc123, def456]
```

### Backend Terminal:
```
✅ SOCKET CONNECTED: abc123
📞 User joining: abc123 Meeting code/URL: ABCD1234
📌 Created new room: ABCD1234
👥 Room participants: 1 IDs: [abc123]

✅ SOCKET CONNECTED: def456
📞 User joining: def456 Meeting code/URL: ABCD1234
👥 Room participants: 2 IDs: [abc123, def456]
📢 Broadcasting user-joined to 2 participants
  → Sending to: abc123
  → Sending to: def456
```

---

## 🎬 Video Should Show

After the "user-joined" messages appear:

1. **Local video** (your camera) - should already be visible
2. **Remote video** (other person) - should appear in a different box
3. You should see them and they should see you

---

## 💬 Chat Test

1. Click the 💬 button to open chat
2. Type: "Can you see this?"
3. Press Enter
4. Message should appear in **your chat** box
5. Go to Tab 2 and check if the message appears there too

---

## 🚀 Next Steps If Still Not Working

1. **Share this information with me:**
   - What error messages do you see in browser console?
   - What messages appear in backend terminal?
   - Are both ports (3001 and 8000) showing LISTENING?
   - Do both tabs have the same meeting code in URL?

2. **I can help you debug by seeing:**
   - Screenshot of backend terminal
   - Screenshot of browser console (both tabs)
   - Copy of the error messages

---

**Remember: The app is working, but there may be a small configuration issue. These diagnostics will help identify it!**
