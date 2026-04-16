# TransitFlow Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   # Backend dependencies
   cd backend && npm install
   
   # Frontend dependencies  
   cd frontend && npm install
   ```

2. **Build Docker Images**
   ```bash
   make build
   ```

3. **Start Services**
   ```bash
   make start
   ```

4. **Access Applications**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Database: localhost:5432

## Available Commands

- `make build` - Build all Docker images
- `make start` - Start all services
- `make stop` - Stop all services
- `make clean` - Stop and remove all containers/images
- `make logs` - View service logs
- `make dev` - Development mode with hot reload

## Environment Setup

### Backend
Copy `backend/.env.example` to `backend/.env`:
```bash
cp backend/.env.example backend/.env
```

### Frontend
Copy `frontend/.env.local.example` to `frontend/.env.local`:
```bash
cp frontend/.env.local.example frontend/.env.local
```

## Database

The PostgreSQL database is automatically initialized with:
- Sample stations
- Sample vehicles  
- Sample schedules

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Schedules
- `GET /api/schedules` - Get available schedules

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my-bookings` - Get user bookings

### Stations
- `GET /api/stations` - Get all stations

### Vehicles
- `GET /api/vehicles` - Get all vehicles

## Troubleshooting

### Port Conflicts
If ports 3000 or 5000 are in use:
```bash
# Find processes using ports
lsof -ti:3000
lsof -ti:5000

# Kill processes
kill -9 <PID>
```

### Database Issues
If database doesn't initialize properly:
```bash
# Remove database volume
docker volume rm makafui_postgres_data

# Restart services
make stop && make start
```

## Development

### Backend Development
```bash
cd backend
npm run dev
```

### Frontend Development
```bash
cd frontend
npm run dev
```

### Database Access
```bash
make db-shell
```

## Features Implemented

✅ **Core Features**
- User authentication (register/login)
- Schedule browsing and filtering
- Station congestion monitoring
- Booking system
- Real-time seat availability

✅ **Technical Features**
- Docker containerization
- PostgreSQL database
- RESTful API
- Responsive frontend
- TypeScript support

🚧 **Pending Features**
- Admin panel for transportation providers
- Payment gateway integration
- Real-time GPS tracking
- Advanced analytics dashboard
- Mobile app

## Architecture

```
├── backend/          # Node.js/Express API
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── config/
│   └── Dockerfile
├── frontend/         # Next.js Web App
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── lib/
│   │   └── types/
│   └── Dockerfile
├── database/         # Database schemas
├── docker-compose.yml # Service orchestration
└── Makefile         # Build commands
```
