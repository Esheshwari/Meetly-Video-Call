# Meetly – Real-Time Video Conferencing App

**Meetly** is a full-stack video conferencing web application inspired by platforms like Zoom.  
The project is built to understand **real-time communication, WebRTC signaling, and scalable full-stack architecture**.

> **Disclaimer:** This is a personal, educational project.  
> It is not affiliated with Zoom or any commercial video conferencing platform.

---

## Overview

This repository contains a **production-style full-stack application** with a React frontend and a Node.js backend, combined with **real-time communication using WebRTC and Socket.io**.

The focus of this project is on **system design, real-time data flow, and backend–frontend coordination**, rather than UI cloning.

---

## Tech Stack

### Frontend
- React.js
- Material UI
- WebRTC
- Axios
- CSS

### Backend
- Node.js
- Express.js
- Socket.io
- JWT Authentication
- bcrypt (password hashing)
- Crypto utilities

---

## Features

- User authentication (login & signup)
- Secure password handling
- Create and join video meetings
- Real-time video and audio communication
- Live signaling using Socket.io
- Responsive and clean user interface

---

## Project Structure

/frontend → React client (UI + WebRTC)
/backend → Express server (auth, sockets, APIs)


The frontend handles UI and peer connections, while the backend manages authentication, signaling, and session logic.

---

## Local Setup

### Prerequisites
- Node.js (v18+)
- Git

### Clone Repository
```bash
git clone https://github.com/your-username/meetly.git
cd meetly
```
## Backend Setup

cd backend
npm install
npm start

**Create a .env file:**

```
PORT=5000
JWT_SECRET=your_secret_key


PORT=5000
```

## Frontend Setup

```
cd frontend
npm install
npm start
```
## Demonstration



## License

**MIT License**

## Author

**Esheshwari Kumari -**
Computer Science Undergraduate 

> Building production-grade systems at the intersection of **software engineering and data**, with a focus on **scalable APIs, secure architectures, and analytics-driven decision making.**

## Final Note

This project reflects how modern video conferencing platforms are built, with emphasis on architecture, real-time communication, and clean code structure.
If you're a recruiter or engineer reviewing this repo - thank you for your time!

