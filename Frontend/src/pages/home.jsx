import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, TextField, Card, CardContent, Grid, Typography, Box, Divider, Chip } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import HistoryIcon from '@mui/icons-material/History';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LogoutIcon from '@mui/icons-material/Logout';

function HomeComponent() {

    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const [newCode, setNewCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        if (meetingCode.trim() === "") {
            alert("Please enter a meeting code");
            return;
        }
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }

    let handleCreateNewMeeting = async () => {
        const code = Math.random().toString(36).substring(2, 12).toUpperCase();
        setNewCode(code);
    }

    let handleJoinNewMeeting = async () => {
        await addToUserHistory(newCode);
        navigate(`/${newCode}`);
    }

    let handleCopyCode = () => {
        navigator.clipboard.writeText(newCode);
        alert("Meeting code copied to clipboard!");
    }

    return (
        <>
            <div className="navBar">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <VideoCameraFrontIcon style={{ marginRight: "10px", fontSize: "2rem" }} />
                    <h2>Zoom Clone</h2>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <Button 
                        startIcon={<HistoryIcon />}
                        onClick={() => navigate("/history")}
                        variant="outlined"
                        sx={{ color: 'white', borderColor: 'white' }}
                    >
                        History
                    </Button>

                    <Button 
                        startIcon={<LogoutIcon />}
                        onClick={() => {
                            localStorage.removeItem("token")
                            navigate("/auth")
                        }}
                        variant="contained"
                        sx={{ background: 'linear-gradient(135deg, #FF9839 0%, #FF6B6B 100%)' }}
                    >
                        Logout
                    </Button>
                </div>
            </div>

            <div style={{ 
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                minHeight: '80vh',
                padding: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Grid container spacing={3} maxWidth="1200px">
                    {/* Create New Meeting Card */}
                    <Grid item xs={12} md={6}>
                        <Card 
                            sx={{ 
                                height: '100%',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                borderRadius: '15px',
                                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 12px 40px rgba(102, 126, 234, 0.6)'
                                }
                            }}
                        >
                            <CardContent>
                                <Box sx={{ textAlign: 'center', mb: 3 }}>
                                    <VideoCameraFrontIcon sx={{ fontSize: '3rem', mb: 1 }} />
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        Start New Meeting
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                        Create a unique meeting code and share it with others
                                    </Typography>
                                </Box>

                                {newCode ? (
                                    <Box sx={{ mb: 2, p: 2, background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px' }}>
                                        <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
                                            Your Meeting Code:
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                            <Chip
                                                label={newCode}
                                                sx={{
                                                    background: 'rgba(255, 255, 255, 0.2)',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: '1rem',
                                                    height: '45px'
                                                }}
                                            />
                                            <Button
                                                variant="contained"
                                                sx={{ background: 'rgba(255, 255, 255, 0.3)' }}
                                                onClick={handleCopyCode}
                                                startIcon={<ContentCopyIcon />}
                                            >
                                                Copy
                                            </Button>
                                        </Box>
                                        <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.8 }}>
                                            Share this code with others to join your meeting
                                        </Typography>
                                    </Box>
                                ) : null}

                                <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                                    {!newCode ? (
                                        <Button
                                            variant="contained"
                                            onClick={handleCreateNewMeeting}
                                            fullWidth
                                            sx={{
                                                background: 'linear-gradient(135deg, #FF9839 0%, #FF6B6B 100%)',
                                                padding: '12px',
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                                '&:hover': {
                                                    background: 'linear-gradient(135deg, #FF6B6B 0%, #FF9839 100%)'
                                                }
                                            }}
                                        >
                                            Generate Meeting Code
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            onClick={handleJoinNewMeeting}
                                            fullWidth
                                            sx={{
                                                background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                                                padding: '12px',
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                                '&:hover': {
                                                    background: 'linear-gradient(135deg, #45a049 0%, #4CAF50 100%)'
                                                }
                                            }}
                                        >
                                            Join Meeting
                                        </Button>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Join Existing Meeting Card */}
                    <Grid item xs={12} md={6}>
                        <Card 
                            sx={{ 
                                height: '100%',
                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                color: 'white',
                                borderRadius: '15px',
                                boxShadow: '0 8px 32px rgba(245, 87, 108, 0.4)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 12px 40px rgba(245, 87, 108, 0.6)'
                                }
                            }}
                        >
                            <CardContent>
                                <Box sx={{ textAlign: 'center', mb: 3 }}>
                                    <RestoreIcon sx={{ fontSize: '3rem', mb: 1 }} />
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        Join Existing Meeting
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                        Enter a meeting code to join a video call
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <TextField
                                        onChange={e => setMeetingCode(e.target.value.toUpperCase())}
                                        value={meetingCode}
                                        placeholder="e.g., ABC123XYZ"
                                        variant="outlined"
                                        fullWidth
                                        sx={{
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
                                            style: { textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '2px' }
                                        }}
                                    />

                                    <Button
                                        onClick={handleJoinVideoCall}
                                        variant='contained'
                                        fullWidth
                                        sx={{
                                            background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                                            padding: '12px',
                                            fontWeight: 'bold',
                                            fontSize: '1rem',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #45a049 0%, #4CAF50 100%)'
                                            }
                                        }}
                                    >
                                        Join Call
                                    </Button>

                                    <Divider sx={{ background: 'rgba(255, 255, 255, 0.3)' }} />

                                    <Typography variant="caption" sx={{ textAlign: 'center', opacity: 0.8 }}>
                                        💡 Tip: Share your meeting code with friends to invite them to the call
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* How to Test */}
                    <Grid item xs={12}>
                        <Card 
                            sx={{ 
                                background: 'rgba(255, 255, 255, 0.9)',
                                borderRadius: '15px',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
                                    🧪 How to Test with Multiple Browsers
                                </Typography>
                                <Box sx={{ color: '#555', lineHeight: '1.8' }}>
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                        <strong>Step 1:</strong> Click "Generate Meeting Code" to create a unique meeting code
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                        <strong>Step 2:</strong> Click "Join Meeting" to enter the call in this browser
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                        <strong>Step 3:</strong> Open the same URL in another browser (Chrome, Firefox, Edge, etc.)
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                        <strong>Step 4:</strong> Enter the same meeting code and click "Join Call"
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#f5576c' }}>
                                        ✨ You should now see both video streams, chat with each other in real-time, and use all features!
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default withAuth(HomeComponent)