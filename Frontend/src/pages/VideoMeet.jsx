import React, { useEffect, useRef, useState } from 'react'
import io from "socket.io-client";
import { Badge, IconButton, TextField } from '@mui/material';
import { Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import styles from "../styles/videoComponent.module.css";
import CallEndIcon from '@mui/icons-material/CallEnd'
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
import ChatIcon from '@mui/icons-material/Chat'
import server from '../environment';

const server_url = server;

var connections = {};

const peerConfigConnections = {
    "iceServers": [
        { "urls": "stun:stun.l.google.com:19302" }
    ]
}

export default function VideoMeetComponent() {

    var socketRef = useRef();
    let socketIdRef = useRef();

    let localVideoref = useRef();

    let [videoAvailable, setVideoAvailable] = useState(true);

    let [audioAvailable, setAudioAvailable] = useState(true);

    let [video, setVideo] = useState([]);

    let [audio, setAudio] = useState();

    let [screen, setScreen] = useState();

    let [showModal, setModal] = useState(true);

    let [screenAvailable, setScreenAvailable] = useState();

    let [messages, setMessages] = useState([])

    let [message, setMessage] = useState("");

    let [newMessages, setNewMessages] = useState(3);

    let [askForUsername, setAskForUsername] = useState(true);

    let [username, setUsername] = useState("");

    const videoRef = useRef([])

    let [videos, setVideos] = useState([])

    // TODO
    // if(isChrome() === false) {


    // }

    // Helper function to add stream tracks to peer connection
    const addStreamToPeerConnection = (peerConnection, stream) => {
        if (stream) {
            stream.getTracks().forEach(track => {
                try {
                    peerConnection.addTrack(track, stream);
                } catch (e) {
                    console.error("Error adding track:", e);
                    // Fallback to deprecated addStream
                    peerConnection.addStream(stream);
                }
            });
        }
    };

    useEffect(() => {
        getPermissions();
    }, [])

    let getDislayMedia = () => {
        if (screen) {
            if (navigator.mediaDevices.getDisplayMedia) {
                navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
                    .then(getDislayMediaSuccess)
                    .then((stream) => { })
                    .catch((e) => console.log(e))
            }
        }
    }

    const getPermissions = async () => {
        try {
            const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoPermission) {
                setVideoAvailable(true);
                console.log('Video permission granted');
            } else {
                setVideoAvailable(false);
                console.log('Video permission denied');
            }

            const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
            if (audioPermission) {
                setAudioAvailable(true);
                console.log('Audio permission granted');
            } else {
                setAudioAvailable(false);
                console.log('Audio permission denied');
            }

            if (navigator.mediaDevices.getDisplayMedia) {
                setScreenAvailable(true);
            } else {
                setScreenAvailable(false);
            }

            if (videoAvailable || audioAvailable) {
                const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable });
                if (userMediaStream) {
                    window.localStream = userMediaStream;
                    if (localVideoref.current) {
                        localVideoref.current.srcObject = userMediaStream;
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (video !== undefined && audio !== undefined) {
            getUserMedia();
        }
    }, [video, audio])
    let getMedia = () => {
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();

    }




    let getUserMediaSuccess = (stream) => {
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        window.localStream = stream
        localVideoref.current.srcObject = stream

        for (let id in connections) {
            if (id === socketIdRef.current) continue

            addStreamToPeerConnection(connections[id], window.localStream)

            connections[id].createOffer().then((description) => {
                console.log(description)
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setVideo(false);
            setAudio(false);

            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { console.log(e) }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            localVideoref.current.srcObject = window.localStream

            for (let id in connections) {
                addStreamToPeerConnection(connections[id], window.localStream)

                connections[id].createOffer().then((description) => {
                    connections[id].setLocalDescription(description)
                        .then(() => {
                            socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                        })
                        .catch(e => console.log(e))
                })
            }
        })
    }

    let getUserMedia = () => {
        if ((video && videoAvailable) || (audio && audioAvailable)) {
            navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
                .then(getUserMediaSuccess)
                .then((stream) => { })
                .catch((e) => console.log(e))
        } else {
            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { }
        }
    }





    let getDislayMediaSuccess = (stream) => {
        console.log("HERE")
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        window.localStream = stream
        localVideoref.current.srcObject = stream

        for (let id in connections) {
            if (id === socketIdRef.current) continue

            addStreamToPeerConnection(connections[id], window.localStream)

            connections[id].createOffer().then((description) => {
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setScreen(false)

            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { console.log(e) }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            localVideoref.current.srcObject = window.localStream

            getUserMedia()

        })
    }

    // Helper function to set up a peer connection
    const createPeerConnectionTo = (peerId) => {
        console.log('🔗 Creating peer connection to:', peerId);
        connections[peerId] = new RTCPeerConnection(peerConfigConnections);
        
        // Handle ICE candidates
        connections[peerId].onicecandidate = function (event) {
            if (event.candidate != null) {
                socketRef.current.emit('signal', peerId, JSON.stringify({ 'ice': event.candidate }))
            }
        }

        // Handle remote tracks
        connections[peerId].ontrack = (event) => {
            console.log("🎬 Track received from:", peerId, "Track kind:", event.track.kind);

            // Only create video box when VIDEO track arrives (skip audio-only)
            if (event.track.kind === 'audio') {
                console.log("🔄 Audio track received, checking if video entry exists");
                let videoExists = videoRef.current.find(video => video.socketId === peerId);
                if (videoExists) {
                    console.log("➕ Adding audio track to existing peer");
                    videoExists.stream.addTrack(event.track);
                } else {
                    console.log("⏳ Waiting for video track before creating entry");
                }
                return;
            }

            // VIDEO TRACK RECEIVED
            let videoExists = videoRef.current.find(video => video.socketId === peerId);

            if (videoExists) {
                console.log("➕ Adding video track to existing peer");
                videoExists.stream.addTrack(event.track);
            } else {
                console.log("✨ Creating new video entry for peer (HAS VIDEO):", peerId);
                
                const remoteStream = new MediaStream([event.track]);
                let newVideo = {
                    socketId: peerId,
                    stream: remoteStream,
                    autoplay: true,
                    playsinline: true
                };

                setVideos(videos => {
                    const updatedVideos = [...videos, newVideo];
                    videoRef.current = updatedVideos;
                    console.log("📊 Total videos now:", updatedVideos.length);
                    return updatedVideos;
                });
            }
        };

        // Add local stream
        if (window.localStream !== undefined && window.localStream !== null) {
            addStreamToPeerConnection(connections[peerId], window.localStream)
        } else {
            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            addStreamToPeerConnection(connections[peerId], window.localStream)
        }

        return connections[peerId];
    }

    let gotMessageFromServer = (fromId, message) => {
        var signal = JSON.parse(message)

        if (fromId !== socketIdRef.current) {
            // If we don't have a connection to this peer yet, create one
            if (!connections[fromId]) {
                console.log('⚠️ Connection not found for', fromId, '- creating now');
                createPeerConnectionTo(fromId);
            }

            if (signal.sdp) {
                connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
                    if (signal.sdp.type === 'offer') {
                        console.log('📨 Received offer from', fromId, '- sending answer');
                        connections[fromId].createAnswer().then((description) => {
                            connections[fromId].setLocalDescription(description).then(() => {
                                socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }))
                                console.log('✉️ Sent answer to:', fromId);
                            }).catch(e => console.log(e))
                        }).catch(e => console.log(e))
                    } else {
                        console.log('📨 Received answer from', fromId);
                    }
                }).catch(e => console.log('Error setting remote description:', e))
            }

            if (signal.ice) {
                connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
            }
        }
    }




    let connectToSocketServer = () => {
        // Extract meeting code from URL
        const meetingCode = window.location.pathname.split('/').pop();
        console.log('📞 Meeting code extracted:', meetingCode);
        
        socketRef.current = io.connect(server_url, { 
            secure: false,
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 5,
            transports: ['websocket', 'polling']
        })

        socketRef.current.on('connect', () => {
            console.log('✅ Connected to server with socket ID:', socketRef.current.id);
            // Send just the meeting code, not the full URL
            socketRef.current.emit('join-call', meetingCode)
            socketIdRef.current = socketRef.current.id
            console.log('📤 Sent join-call with meeting code:', meetingCode)
        })

        socketRef.current.on('signal', gotMessageFromServer)

        socketRef.current.on('chat-message', addMessage)

        socketRef.current.on('user-joined', (id, clients) => {
            console.log('👤 User joined. ID:', id, 'Total in room:', clients.length, 'IDs:', clients);
            clients.forEach((socketListId) => {
                
                // Don't create connection to yourself!
                if (socketListId === socketIdRef.current) {
                    console.log('⏭️  Skipping self connection');
                    return;
                }
                
                // Don't create duplicate connections
                if (connections[socketListId]) {
                    console.log('⏭️  Connection already exists for', socketListId);
                    return;
                }

                // Create the peer connection using helper function
                createPeerConnectionTo(socketListId);

                // IMPORTANT: Only initiator (older connection) sends offer first
                // For simplicity, compare socket IDs - if my ID is "less than" theirs, I initiate
                if (socketIdRef.current < socketListId) {
                    console.log('📤 I am initiator, creating offer to:', socketListId);
                    connections[socketListId].createOffer().then((description) => {
                        connections[socketListId].setLocalDescription(description)
                            .then(() => {
                                socketRef.current.emit('signal', socketListId, JSON.stringify({ 'sdp': connections[socketListId].localDescription }))
                                console.log('✉️ Sent offer to:', socketListId);
                            })
                            .catch(e => console.log('Error setting local description:', e))
                    }).catch(e => console.log('Error creating offer:', e))
                } else {
                    console.log('⏳ I am non-initiator, waiting for offer from:', socketListId);
                }
            })
        })

        socketRef.current.on('user-left', (id) => {
            console.log('User left:', id);
            setVideos((videos) => videos.filter((video) => video.socketId !== id))
        })

        socketRef.current.on('connect_error', (error) => {
            console.error('Connection error:', error);
        })

        socketRef.current.on('error', (error) => {
            console.error('Socket error:', error);
        })

        socketRef.current.on('disconnect', () => {
            console.log('Disconnected from server');
        })
    }

    let silence = () => {
        let ctx = new AudioContext()
        let oscillator = ctx.createOscillator()
        let dst = oscillator.connect(ctx.createMediaStreamDestination())
        oscillator.start()
        ctx.resume()
        return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false })
    }
    let black = ({ width = 640, height = 480 } = {}) => {
        let canvas = Object.assign(document.createElement("canvas"), { width, height })
        canvas.getContext('2d').fillRect(0, 0, width, height)
        let stream = canvas.captureStream()
        return Object.assign(stream.getVideoTracks()[0], { enabled: false })
    }

    let handleVideo = () => {
        if (window.localStream) {
            window.localStream.getVideoTracks().forEach(track => {
                track.enabled = !track.enabled;
            });
            setVideo(!video);
            console.log("Video toggled:", !video);
        } else {
            console.error("Local stream not available");
        }
    }
    let handleAudio = () => {
        if (window.localStream) {
            window.localStream.getAudioTracks().forEach(track => {
                track.enabled = !track.enabled;
            });
            setAudio(!audio);
            console.log("Audio toggled:", !audio);
        } else {
            console.error("Local stream not available");
        }
    }

    useEffect(() => {
        if (screen !== undefined) {
            getDislayMedia();
        }
    }, [screen])
    let handleScreen = () => {
        setScreen(!screen);
    }

    let handleEndCall = () => {
        try {
            let tracks = localVideoref.current.srcObject.getTracks()
            tracks.forEach(track => track.stop())
        } catch (e) { }
        window.location.href = "/"
    }

    // Chat handlers are now inline in the JSX

    const addMessage = (data, sender, socketIdSender) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: sender, data: data }
        ]);
        if (socketIdSender !== socketIdRef.current) {
            setNewMessages((prevNewMessages) => prevNewMessages + 1);
        }
    };



    let sendMessage = () => {
        if (message.trim() === '') return;
        if (socketRef.current && socketRef.current.connected) {
            socketRef.current.emit('chat-message', message, username);
            setMessage("");
        } else {
            console.error('Socket not connected');
        }
    }

    
    let connect = () => {
        setAskForUsername(false);
        getMedia();
    }


    return (
        <div>

            {askForUsername === true ?

                <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    padding: '2rem'
                }}>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '20px',
                        padding: '3rem',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                        maxWidth: '500px',
                        width: '100%',
                        textAlign: 'center'
                    }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome to Meeting</h1>
                        <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2rem' }}>
                            Enter your name to join the video call
                        </p>

                        <div style={{
                            marginBottom: '2rem',
                            borderRadius: '15px',
                            overflow: 'hidden',
                            border: '3px solid rgba(255, 255, 255, 0.3)'
                        }}>
                            <video 
                                ref={localVideoref} 
                                autoPlay 
                                muted
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                    maxHeight: '300px',
                                    objectFit: 'cover'
                                }}
                            ></video>
                        </div>

                        <TextField 
                            id="outlined-basic" 
                            label="Enter Your Name" 
                            value={username} 
                            onChange={e => setUsername(e.target.value)}
                            variant="outlined"
                            fullWidth
                            sx={{
                                mb: 2,
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    '& fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'white',
                                    }
                                },
                                '& .MuiOutlinedInput-input::placeholder': {
                                    opacity: 0.7,
                                }
                            }}
                            inputProps={{
                                style: { textAlign: 'center', fontSize: '1.1rem' }
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && username.trim() !== '') {
                                    connect();
                                }
                            }}
                        />

                        <Button 
                            variant="contained" 
                            onClick={connect}
                            fullWidth
                            disabled={username.trim() === ''}
                            sx={{
                                background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                                padding: '12px',
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #45a049 0%, #4CAF50 100%)'
                                },
                                '&:disabled': {
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    color: 'rgba(255, 255, 255, 0.5)'
                                }
                            }}
                        >
                            Join Meeting
                        </Button>

                        <p style={{ marginTop: '2rem', opacity: 0.8, fontSize: '0.95rem' }}>
                            💡 Your camera preview is shown above. Make sure you're comfortable before joining!
                        </p>
                    </div>
                </div> :


                <div className={styles.meetVideoContainer}>

                    {showModal ? <div className={styles.chatRoom}>

                        <div className={styles.chatContainer}>
                            <h1>Chat</h1>

                            <div className={styles.chattingDisplay}>

                                {messages.length !== 0 ? messages.map((item, index) => {

                                    console.log(messages)
                                    return (
                                        <div style={{ marginBottom: "20px" }} key={index}>
                                            <p style={{ fontWeight: "bold" }}>{item.sender}</p>
                                            <p>{item.data}</p>
                                        </div>
                                    )
                                }) : <p>No Messages Yet</p>}


                            </div>

                            <div className={styles.chattingArea}>
                                <TextField value={message} onChange={(e) => setMessage(e.target.value)} id="outlined-basic" label="Enter Your chat" variant="outlined" />
                                <Button variant='contained' onClick={sendMessage}>Send</Button>
                            </div>


                        </div>
                    </div> : <></>}


                    <div className={styles.buttonContainers}>
                        <IconButton onClick={handleVideo} style={{ color: "white" }}>
                            {(video === true) ? <VideocamIcon /> : <VideocamOffIcon />}
                        </IconButton>
                        <IconButton onClick={handleEndCall} style={{ color: "red" }}>
                            <CallEndIcon  />
                        </IconButton>
                        <IconButton onClick={handleAudio} style={{ color: "white" }}>
                            {audio === true ? <MicIcon /> : <MicOffIcon />}
                        </IconButton>

                        {screenAvailable === true ?
                            <IconButton onClick={handleScreen} style={{ color: "white" }}>
                                {screen === true ? <ScreenShareIcon /> : <StopScreenShareIcon />}
                            </IconButton> : <></>}

                        <Badge badgeContent={newMessages} max={999} color='orange'>
                            <IconButton onClick={() => setModal(!showModal)} style={{ color: "white" }}>
                                <ChatIcon />                        </IconButton>
                        </Badge>

                    </div>


                    <video className={styles.meetUserVideo} ref={localVideoref} autoPlay muted></video>

                    <div className={styles.conferenceView}>
                        {videos.map((video) => (
                            <div key={video.socketId}>
                                <video

                                    data-socket={video.socketId}
                                    ref={ref => {
                                        if (ref && video.stream) {
                                            ref.srcObject = video.stream;
                                        }
                                    }}
                                    autoPlay
                                >
                                </video>
                            </div>

                        ))}

                    </div>

                </div>

            }

        </div>
    )
}