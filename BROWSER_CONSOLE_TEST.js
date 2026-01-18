#!/usr/bin/env node

/**
 * ZOOM CLONE - REAL-TIME CONNECTION TESTER
 * 
 * This script helps diagnose connection issues
 * Run this in your browser console (F12) while in the app
 */

console.log('%c🔍 ZOOM CLONE DIAGNOSTICS', 'color: blue; font-size: 16px; font-weight: bold');

// 1. Check if socket is connected
if (typeof socketRef !== 'undefined' && socketRef.current) {
    console.log('%c✅ Socket Reference Found', 'color: green; font-weight: bold');
    console.log('  Socket ID:', socketRef.current.id);
    console.log('  Connected:', socketRef.current.connected);
    console.log('  Server URL:', server_url);
} else {
    console.log('%c❌ Socket Reference NOT Found', 'color: red; font-weight: bold');
}

// 2. Check window location
console.log('%c📍 Current URL Info', 'color: orange; font-weight: bold');
console.log('  Full URL:', window.location.href);
console.log('  Pathname:', window.location.pathname);
const meetingCode = window.location.pathname.split('/').pop();
console.log('  Extracted Meeting Code:', meetingCode);

// 3. Check local stream
if (typeof window !== 'undefined' && window.localStream) {
    console.log('%c📹 Local Stream Active', 'color: green; font-weight: bold');
    console.log('  Video Tracks:', window.localStream.getVideoTracks().length);
    console.log('  Audio Tracks:', window.localStream.getAudioTracks().length);
    window.localStream.getTracks().forEach(track => {
        console.log(`    - ${track.kind}: enabled=${track.enabled}`);
    });
} else {
    console.log('%c❌ No Local Stream', 'color: red; font-weight: bold');
}

// 4. Check connections object (peer connections)
if (typeof connections !== 'undefined') {
    const connectionCount = Object.keys(connections).length;
    console.log(`%c👥 Peer Connections: ${connectionCount}`, 'color: purple; font-weight: bold');
    Object.entries(connections).forEach(([id, connection]) => {
        console.log(`  - ${id}: ${connection.connectionState}`);
    });
} else {
    console.log('%c❌ Connections object not found', 'color: red; font-weight: bold');
}

// 5. Create a simple test
console.log('%c🧪 Quick Test Instructions', 'color: teal; font-weight: bold');
console.log('  1. Open this app in TWO TABS with the SAME meeting code');
console.log('  2. Check console in both tabs');
console.log('  3. Both should show "Connected: true"');
console.log('  4. Both should show "👤 User joined" in console');
console.log('  5. Both should see each other\'s video');

console.log('%c💡 If still not working:', 'color: orange; font-weight: bold');
console.log('  - Check if both tabs have the SAME meeting code in URL');
console.log('  - Check if backend is running (port 8000)');
console.log('  - Check if you allowed camera/microphone permissions');
console.log('  - Refresh both pages and wait 3-5 seconds');
