# MERN Stack Stopwatch Application

A full-stack stopwatch application built with MongoDB, Express.js, React, and Node.js.

## Features

- ⏱️ High-precision stopwatch (10ms accuracy)
- 🏁 Lap timing with fastest/slowest highlighting
- 💾 Save sessions to database
- 📊 View session history with pagination
- 🔐 User authentication (JWT)
- ⌨️ Keyboard shortcuts (Space, L, R)
- 📱 Fully responsive design
- 🎨 Beautiful gradient UI

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing

### Frontend
- React 18
- React Router DOM
- Axios
- Context API for state management

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas account)
- npm or yarn

## Installation

### 1. Clone or Navigate to Project Directory

```bash
cd stopwatch-mern
```

### 2. Install Dependencies

Install dependencies for root, server, and client:

```bash
npm run install-all
```

Or manually:

```bash
# Root dependencies
npm install

# Server dependencies
cd server
npm install

# Client dependencies
cd ../client
npm install
```

### 3. Configure Environment Variables

#### Server (.env)
The server `.env` file is already created at `server/.env`. Update if needed:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/stopwatch_db
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=30d
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

#### Client (.env)
The client `.env` file is already created at `client/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On Linux/Mac
sudo systemctl start mongod

# Or if using MongoDB Community Edition
mongod

# Or if using MongoDB Atlas, update MONGODB_URI in server/.env
```

### 5. Run the Application

From the root directory:

```bash
# Run both client and server concurrently
npm run dev
```

Or run them separately:

```bash
# Terminal 1 - Run server
cd server
npm run dev

# Terminal 2 - Run client
cd client
npm start
```

The application will open at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Session Routes
- `POST /api/sessions` - Create new session (Protected)
- `GET /api/sessions` - Get all user sessions (Protected)
- `GET /api/sessions/:id` - Get single session (Protected)
- `DELETE /api/sessions/:id` - Delete session (Protected)
- `DELETE /api/sessions` - Delete all sessions (Protected)

## Usage

### 1. Register/Login
- Create an account or login with existing credentials
- Without authentication, you can use the stopwatch but cannot save sessions

### 2. Use Stopwatch
- **Start**: Click "Start" button or press `Space`
- **Pause**: Click "Pause" button or press `Space`
- **Lap**: Click "Lap" button or press `L` (only while running)
- **Reset**: Click "Reset" button or press `R`
- **Save**: Click "Save" button (requires authentication)

### 3. View History
- Navigate to "History" page to see all saved sessions
- View lap details for each session
- Delete individual sessions or clear all history
- Pagination for large session lists

## Keyboard Shortcuts

- `Space` - Start/Pause stopwatch
- `L` - Record lap (only while running)
- `R` - Reset stopwatch

## Project Structure

```
stopwatch-mern/
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── sessionController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Session.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── sessionRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Stopwatch.js
│   │   │   ├── LapList.js
│   │   │   └── SessionCard.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── History.js
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── formatTime.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── .env
├── package.json
└── README.md
```

## Features Explained

### Timer Precision
- Uses `Date.now()` for accurate timing
- Updates every 10ms for smooth display
- Displays HH:MM:SS:MS format

### Lap Timing
- Records split time (time since last lap)
- Records total time (from start)
- Highlights fastest lap in green
- Highlights slowest lap in red

### Authentication
- Passwords hashed with bcrypt
- JWT tokens for session management
- Protected routes on both frontend and backend
- Token stored in localStorage

### Session History
- Paginated results (10 per page)
- Sorted by creation date (newest first)
- Individual and bulk delete options
- Displays lap details for each session

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running
```bash
sudo systemctl start mongod
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Kill the process using that port or change PORT in .env
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change PORT in server/.env
PORT=5001
```

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: Verify CLIENT_URL in server/.env matches your frontend URL

### Cannot Save Sessions
**Solution**: Make sure you're logged in. Only authenticated users can save sessions.

## Development Tips

### Testing API with Postman/Thunder Client

1. **Register User**
```json
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

2. **Login**
```json
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

3. **Create Session** (use token from login)
```json
POST http://localhost:5000/api/sessions
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "duration": 125000,
  "laps": [
    {
      "lapNumber": 1,
      "splitTime": 62500,
      "totalTime": 62500
    },
    {
      "lapNumber": 2,
      "splitTime": 62500,
      "totalTime": 125000
    }
  ]
}
```

## Building for Production

### Backend
```bash
cd server
npm start
```

### Frontend
```bash
cd client
npm run build
```

The build folder will contain optimized production files.

## Future Enhancements

- [ ] Export session data as CSV/JSON
- [ ] Statistics dashboard (average time, total sessions)
- [ ] Dark mode toggle
- [ ] Sound effects for start/stop/lap
- [ ] Countdown timer mode
- [ ] Multiple stopwatch instances
- [ ] Session tags/categories
- [ ] Social sharing features
- [ ] PWA support for offline use

## License

MIT

## Author

Built with ❤️ using MERN Stack

## Support

If you encounter any issues, please check:
1. MongoDB is running
2. All dependencies are installed
3. Environment variables are correctly set
4. Ports 3000 and 5000 are available

For more help, refer to the Troubleshooting section above.
