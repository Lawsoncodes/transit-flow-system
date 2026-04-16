# TransitFlow Complete Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### For Windows Users
1. **Docker Desktop for Windows**
   - Download from: https://www.docker.com/products/docker-desktop/
   - Install with WSL 2 backend (recommended)
   - Restart your computer after installation

2. **Verify Docker Installation**
   ```cmd
   docker --version
   docker-compose --version
   ```

3. **Git** (for cloning the repository)
   - Download from: https://git-scm.com/download/win

### For macOS/Linux Users
1. **Docker**
   ```bash
   # macOS: Install Docker Desktop
   # Linux: Install Docker Engine
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   ```

2. **Docker Compose**
   ```bash
   # Usually comes with Docker Desktop
   # For Linux, install separately if needed
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

3. **Make** (for Linux/macOS)
   ```bash
   # macOS: Install Xcode Command Line Tools
   xcode-select --install
   
   # Linux (Ubuntu/Debian):
   sudo apt-get update
   sudo apt-get install build-essential
   ```

## 🚀 Quick Setup (5 Minutes)

### Step 1: Clone or Navigate to Project
```bash
# If you have the project locally
cd /Users/winmorre/Desktop/Makafui

# Or clone from repository (if applicable)
git clone <repository-url> TransitFlow
cd TransitFlow
```

### Step 2: Install Dependencies
```bash
# Backend dependencies
cd backend
npm install
cd ..

# Frontend dependencies  
cd frontend
npm install
cd ..
```

### Step 3: Setup Environment Files

#### Backend Environment
```bash
# Copy the example environment file
cp backend/.env.example backend/.env

# Edit if needed (optional - defaults work for development)
# nano backend/.env  # or use any text editor
```

#### Frontend Environment
```bash
# Copy the example environment file
cp frontend/.env.local.example frontend/.env.local

# Edit if needed (optional - defaults work for development)
# nano frontend/.env.local  # or use any text editor
```

### Step 4: Build Docker Images
```bash
# Build all services (takes 2-5 minutes on first run)
make build
```

### Step 5: Start the Application
```bash
# Start all services
make start
```

### Step 6: Verify Installation
Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Backend API Health**: http://localhost:5000/health

## 🔧 Windows-Specific Instructions

### Using Command Prompt (cmd)
```cmd
# Navigate to project directory
cd C:\path\to\TransitFlow

# Install dependencies
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# Build and start
make build
make start
```

### Using PowerShell
```powershell
# Navigate to project directory
Set-Location C:\path\to\TransitFlow

# Install dependencies
Set-Location backend; npm install; Set-Location ..
Set-Location frontend; npm install; Set-Location ..

# Build and start
make build
make start
```

### Using Git Bash (Recommended)
```bash
# Same as Linux/macOS commands
cd /c/path/to/TransitFlow
make build
make start
```

## 🐛 Troubleshooting

### Docker Issues

#### Docker Not Running
```bash
# Check Docker status
docker info

# Start Docker Desktop manually from Start Menu (Windows)
# or restart Docker service (Linux)
sudo systemctl restart docker
```

#### Port Already in Use
```bash
# Windows (Command Prompt)
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Kill processes using ports
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9
```

#### Permission Issues (Linux/macOS)
```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Log out and log back in, or use:
sudo chmod 666 /var/run/docker.sock
```

### Build Issues

#### npm ci Fails
```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Use npm install instead
npm install
```

#### Out of Disk Space
```bash
# Clean Docker
docker system prune -a

# Remove unused volumes
docker volume prune
```

### Application Issues

#### Database Connection Failed
```bash
# Reset database
make stop
docker volume rm makafui_postgres_data
make start
```

#### Frontend Not Loading
```bash
# Check logs
make logs

# Restart frontend container
docker-compose restart frontend
```

## 📱 Alternative Setup Methods

### Method 1: Development Mode (No Docker)
If you prefer local development:

#### Backend
```bash
cd backend
npm install
# Create .env file with database URL
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
# Create .env.local file
npm run dev
```

#### Database
```bash
# Install PostgreSQL locally
# Create database 'transitflow_db'
# Run database/init.sql manually
```

### Method 2: Individual Docker Services
```bash
# Start database only
docker-compose up -d database

# Start backend
docker-compose up -d backend

# Start frontend
docker-compose up -d frontend
```

## 🎯 Verification Steps

### 1. Check All Services Running
```bash
docker-compose ps
```
You should see 3 services: `transitflow-db`, `transitflow-backend`, `transitflow-frontend`.

### 2. Test Backend API
```bash
curl http://localhost:5000/health
```
Should return: `{"status":"OK","message":"TransitFlow API is running"}`

### 3. Test Frontend
Open http://localhost:3000 in browser - should show the TransitFlow homepage.

### 4. Test Database
```bash
# Access database shell
make db-shell

# List tables
\dt
```

## 🔄 Common Workflows

### Daily Development
```bash
# Start services
make start

# View logs
make logs

# Stop when done
make stop
```

### Code Changes
```bash
# After changing code, rebuild and restart
make build
make stop
make start
```

### Full Reset
```bash
# Complete cleanup and fresh start
make clean
make build
make start
```

## 📞 Getting Help

### Check Logs
```bash
# All services
make logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs database
```

### Access Containers
```bash
# Backend shell
make backend-shell

# Frontend shell  
make frontend-shell

# Database shell
make db-shell
```

### Useful Commands
```bash
# View running containers
docker ps

# View all containers
docker ps -a

# View images
docker images

# Remove stopped containers
docker container prune

# View resource usage
docker stats
```

## 🎉 Success!

If you've completed all steps and the verification tests pass, your TransitFlow application is running successfully!

**Next Steps:**
1. Explore the web interface at http://localhost:3000
2. Register a new user account
3. Browse available schedules and make bookings
4. Check station congestion levels
5. Review the API documentation at http://localhost:5000/health

For more detailed information, see the main README.md file.
