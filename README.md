# TransitFlow - Smart Transportation Reservation & Scheduling Platform

A comprehensive transportation reservation and congestion management system that allows users to pre-book rides and optimize travel schedules.

## Features

- **User Pre-booking**: Book seats on buses, trains, and shared taxis
- **Real-time Availability**: Track seat/vehicle availability in real-time
- **Dynamic Scheduling**: Intelligent scheduling based on peak/off-peak hours
- **User Profiles**: Manage travel history and preferences
- **Admin Panel**: Tools for transportation providers to manage fleets
- **Congestion Analytics**: Heatmaps and analytics for stations

## Architecture

This is a monorepo containing:
- **Frontend**: Next.js web application
- **Backend**: Node.js/Express API with PostgreSQL database
- **Docker**: Containerized deployment setup

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Make (for convenient commands)

### Development

```bash
# Build all services
make build

# Start the entire application
make start

# Stop and remove all containers
make stop
```

### Services

After running `make start`, the following services will be available:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database**: localhost:5432
- **Admin Panel**: http://localhost:3000/admin

## Project Structure

```
transitflow/
├── frontend/          # Next.js frontend application
├── backend/           # Node.js/Express API
├── database/          # Database schemas and migrations
├── docker-compose.yml # Docker orchestration
├── Makefile          # Build and deployment commands
└── README.md         # This file
```

## Development Workflow

1. **Backend Development**: API endpoints, business logic, database operations
2. **Frontend Development**: User interfaces, booking flows, dashboards
3. **Admin Development**: Transportation provider tools
4. **Testing**: Unit tests, integration tests, load testing
5. **Deployment**: Docker-based deployment with CI/CD

## Technologies

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Containerization**: Docker, Docker Compose
- **Deployment**: Cloud-ready (AWS, Azure, GCP)
