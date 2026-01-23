# ShubhVenue - Full Stack Application

A full-stack web application with React (Vite) + Tailwind CSS frontend and Node.js + Express + MongoDB backend.

## Project Structure

```
shubhvenue/
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                 # Node.js backend
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── controllers/
│   │   └── exampleController.js
│   ├── models/
│   │   └── Item.js
│   ├── routes/
│   │   └── api.js
│   ├── views/             # EJS templates
│   │   └── admin.ejs
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **EJS** - Template engine for server-side rendering

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)

### Installation

1. **Clone and navigate to project**
   ```bash
   cd shubhvenue
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Configuration

1. **Backend Environment Variables**
   ```bash
   cd server
   cp .env.example .env
   ```
   Edit `.env` and add your MongoDB URI:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/shubhvenue
   NODE_ENV=development
   ```

2. **Frontend Environment Variables** (optional)
   ```bash
   cd client
   cp .env.example .env
   ```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   Backend will run on http://localhost:5000

2. **Start Frontend (in a new terminal)**
   ```bash
   cd client
   npm run dev
   ```
   Frontend will run on http://localhost:3000

### Available Routes

**Backend API:**
- `GET /` - Server info
- `GET /api/test` - Test endpoint
- `GET /api/items` - Get all items
- `POST /api/items` - Create new item
- `GET /admin` - EJS rendered admin page

**Frontend:**
- `http://localhost:3000` - Main React application

## Development

- Frontend hot-reloading is enabled via Vite
- Backend auto-restart is enabled via nodemon
- API proxy is configured in Vite to forward `/api` requests to backend

## Build for Production

**Frontend:**
```bash
cd client
npm run build
```

**Backend:**
```bash
cd server
npm start
```

## License

MIT
