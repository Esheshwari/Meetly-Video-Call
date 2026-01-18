# Troubleshooting Guide - Zoom Clone

## Common Issues and Solutions

### 1. Backend Won't Start

#### Error: "Port 8000 already in use"
```bash
# Windows - Find and kill process using port 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :8000
kill -9 <PID>

# Or use a different port
set PORT=8001
npm start
```

#### Error: "Cannot find module 'socket.io'"
```bash
cd Backend
npm install
npm start
```

#### Error: "MongoDB connection failed"
This is normal if you don't have MongoDB set up. The app still works for video/audio/chat.
Check: `Backend/src/app.js` line with MongoDB connection.

---

### 2. Frontend Won't Start

#### Error: "Port 3000 already in use"
```bash
cd Frontend
# The app automatically tries port 3001
npm start

# Or manually set a different port
set PORT=3002
npm start
```

#### Error: "Cannot GET /"
Make sure:
1. Frontend is fully started (wait for "Compiled successfully" message)
2. Visit http://localhost:3001 (not 3000)
3. Check browser console (F12) for JavaScript errors

#### Error: "React is not defined"
Update `Frontend/src/App.js` - ensure React is imported:
```javascript
import React from 'react'
```

---

### 3. No Video/Audio

#### Camera/Microphone Not Working
1. **Check Permissions**: 
   - Browser should prompt for camera/microphone access
   - Click "Allow" when asked
   - Check system settings if browser was denied

2. **Check Device Availability**:
   - Open DevTools (F12) → Console
   - Run: `navigator.mediaDevices.enumerateDevices().then(d => console.log(d))`
   - Ensure cameras and microphones are listed

3. **Check Another Application**:
   - Close Zoom, Teams, other video apps
   - Ensure no other app is using the camera

4. **Restart Browser**:
   - Close all browser windows
   - Reopen and try again

#### Video Shows Black Screen
- Give camera permission again
- Check if device is actually available
- Try refreshing the page
- Check browser console for specific errors

#### "Permission Denied" Error
1. Check browser settings → Privacy → Camera/Microphone
2. Add localhost:3001 to allowed sites
3. If using HTTPS: Ensure certificate is valid
4. Try in a different browser

---

### 4. Can't Connect to Another Browser/Tab

#### Issue: Meeting code not working
1. **Copy URL correctly**:
   - Create meeting → URL appears: `http://localhost:3001/abc123xyz`
   - Copy the FULL URL including the code
   - Paste in new tab or browser

2. **Check Socket Connection**:
   - Open DevTools (F12) → Console
   - Look for: `Connected to server with socket ID: ...`
   - If not present, backend connection failed

3. **For Same Browser (Same Tab)**:
   - This is tricky because both use same camera
   - Best practice: Use separate browser/device
   - If testing in same browser: Use normal tab and private/incognito tab

#### Issue: Can see yourself but not other person
1. Check if other person's video received a stream
2. Look in console for: `Stream received from: ...`
3. Verify peer connection established: `user-joined` event received
4. Check firewall/network issues

---

### 5. Chat Not Working

#### Messages Not Sending
1. **Check Socket Connection**:
   ```javascript
   // In browser console:
   console.log(socketRef.current.connected)  // Should be true
   ```

2. **Empty Message Check**:
   - Message must have at least one character
   - Whitespace-only messages are ignored

3. **Console Errors**:
   - Open DevTools → Console
   - Look for red errors
   - Check network tab → WebSocket

#### Messages Not Receiving
1. **Check Socket ID**:
   - Both users should have different socket IDs
   - View: `Socket ID: ...` in console

2. **Check Room/Meeting Code**:
   - Ensure both users used SAME meeting code
   - Different codes = different rooms

3. **Backend Logs**:
   - Check backend console output
   - Should show: `message <room>: <username> <message>`

---

### 6. Socket Connection Issues

#### Error: "WebSocket is closed before the connection is established"
1. Ensure backend is running on port 8000
2. Check `Frontend/src/environment.js`:
   ```javascript
   const server = "http://localhost:8000"
   ```
3. Wait 2-3 seconds after starting backend before starting frontend

#### Error: "Socket disconnected"
1. Check network connection
2. Ensure backend is still running
3. Socket auto-reconnects (5 attempts with exponential backoff)
4. Manual reconnection: Refresh browser page

#### Slow Socket Connection
1. Check network latency: `ping localhost`
2. Try closing other network-heavy applications
3. Restart backend: `npm start`
4. Clear browser cache: DevTools → Application → Clear storage

---

### 7. Backend Errors

#### Error: "CORS error"
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: Backend already has CORS enabled. If issue persists:
```javascript
// In Backend/src/app.js
app.use(cors({
  origin: '*',
  credentials: true
}));
```

#### Error: "Cannot find module '@socket.io'"
```bash
cd Backend
npm install
```

#### Error: "Unexpected token" or Syntax Error
1. Check Node.js version: `node --version` (should be 14+)
2. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules
   npm install
   ```

---

### 8. Performance Issues

#### Laggy Video
1. **Reduce Bandwidth**:
   - Close other applications
   - Disable screen sharing
   - Close other browser tabs

2. **Check Network**:
   - Run: `ping localhost`
   - Should be < 5ms
   - If > 100ms, check network connection

3. **Multiple Users**:
   - P2P works best with 2-4 people
   - More than 4 increases CPU usage significantly

#### High CPU Usage
1. Close unnecessary browser tabs
2. Disable screen sharing
3. Reduce video resolution (if possible)
4. Close other video applications

---

### 9. Browser Specific Issues

#### Chrome/Brave
- Usually works best
- If issues: Clear cache (Ctrl+Shift+Delete)
- Check: Settings → Privacy → Site permissions → Camera/Microphone

#### Firefox
- Works fine
- If issues: Check about:preferences → Privacy
- May need to allow localhost separately

#### Safari
- Full support in recent versions
- May ask for permission multiple times (normal)
- Check: Settings → Websites → Camera/Microphone

#### Edge
- Full support
- Similar to Chrome (Chromium-based)

---

### 10. Debugging Tips

#### Enable Verbose Console Logging
The application already includes helpful console logs:
- `Connected to server with socket ID: ...`
- `User joined. ID: ...`
- `Stream received from: ...`
- `Message received: ...`

#### Check Network Tab
1. Open DevTools → Network
2. Click WS (WebSocket) filter
3. Find `localhost:8000` connection
4. Check status (should be 101 Switching Protocols)
5. Click to see messages sent/received

#### Check Application Tab
1. Open DevTools → Application
2. View Storage → WebStorage → LocalStorage
3. Check any stored data
4. Clear if issues persist

#### Backend Logs
Check the backend terminal window for logs:
- User connections: `SOMETHING CONNECTED`
- Messages: `message <room>: <sender> <text>`
- Disconnections: Watch for socket disconnections

---

## Testing Checklist

Use this to verify everything works:

- [ ] Backend starts: `npm start` in Backend folder
- [ ] Frontend loads: Can see home page
- [ ] Camera permission: Browser asks for camera access
- [ ] Meeting creation: Click "Create Meeting" shows code
- [ ] Copy URL: Can copy meeting link
- [ ] Open new tab: Paste URL in new tab/browser
- [ ] Both users see: Own camera preview
- [ ] Remote video: Appears in grid after few seconds
- [ ] Toggle video: Icon changes and video pauses
- [ ] Toggle audio: Icon changes (audio mutes on other end)
- [ ] Chat send: Can type and send message
- [ ] Chat receive: Message appears for other user
- [ ] Multiple messages: Chat history visible
- [ ] End call: Connection closes cleanly
- [ ] Network resilience: Can resume if page refreshed

---

## Getting Help

1. **Check Console**: F12 → Console for error messages
2. **Check Backend Terminal**: Look for error logs
3. **Check Network**: DevTools → Network tab for connection issues
4. **Restart Everything**: 
   - Close all terminals
   - Close all browser windows
   - Kill any node processes
   - Start fresh with `npm start`

5. **Clear Cache**:
   ```bash
   # Frontend
   cd Frontend
   rm -rf node_modules package-lock.json
   npm install
   npm start

   # Backend
   cd Backend
   rm -rf node_modules package-lock.json
   npm install
   npm start
   ```

---

## Contact & Support

If issues persist:
1. Check browser console error messages (F12)
2. Provide error screenshots
3. Note exact steps to reproduce
4. Include browser and OS version

---

**Last Updated**: December 2024
**Version**: 1.0
