# 🚀 QUICK START GUIDE

## Step 1: Install Dependencies
```bash
cd stopwatch-mern
npm run install-all
```

## Step 2: Start MongoDB
Make sure MongoDB is running on your machine:
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB (Linux/Mac)
sudo systemctl start mongod

# Or just run
mongod
```

## Step 3: Run the Application
```bash
# From the root directory (stopwatch-mern)
npm run dev
```

This will start both:
- Backend server on http://localhost:5000
- Frontend React app on http://localhost:3000

## Step 4: Use the App

1. Open http://localhost:3000 in your browser
2. Register a new account
3. Start using the stopwatch!

## Default Test Account (Optional)
You can create a test account:
- Email: test@example.com
- Password: password123

## Keyboard Shortcuts
- **Space**: Start/Pause
- **L**: Record Lap
- **R**: Reset

## Troubleshooting

### MongoDB not starting?
```bash
# Install MongoDB if not installed
# On Ubuntu/Debian:
sudo apt-get install mongodb

# On Mac with Homebrew:
brew install mongodb-community
brew services start mongodb-community
```

### Port already in use?
Change the PORT in server/.env file:
```
PORT=5001
```

### Can't save sessions?
Make sure you're logged in! Only authenticated users can save sessions.

## Project Structure
```
stopwatch-mern/
├── server/          # Backend (Node.js + Express + MongoDB)
├── client/          # Frontend (React)
├── package.json     # Root package for running both
└── README.md        # Full documentation
```

## What's Built?

✅ Stopwatch with lap timing
✅ User authentication (register/login)
✅ Save sessions to database
✅ View session history
✅ Pagination for history
✅ Responsive design
✅ Keyboard shortcuts
✅ Beautiful UI with gradients

## Need Help?

Check the full README.md for detailed documentation, API endpoints, and troubleshooting guide.

Enjoy your MERN Stack Stopwatch! ⏱️
