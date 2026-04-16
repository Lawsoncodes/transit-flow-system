.PHONY: build start stop clean logs

# Build all Docker images
build:
	@echo "Building all Docker images..."
	docker-compose build

# Start all services
start:
	@echo "Starting TransitFlow services..."
	docker-compose up -d
	@echo "Services are starting..."
	@echo "Frontend: http://localhost:3000"
	@echo "Backend API: http://localhost:5000"
	@echo "Database: localhost:5432"
	@sleep 3
	docker-compose logs --tail=20

# Stop all services
stop:
	@echo "Stopping TransitFlow services..."
	docker-compose down

# Stop and remove all containers and images
clean:
	@echo "Stopping and removing all containers and images..."
	docker-compose down --rmi all --volumes --remove-orphans

# View logs
logs:
	docker-compose logs -f

# Access backend container
backend-shell:
	docker-compose exec backend sh

# Access frontend container
frontend-shell:
	docker-compose exec frontend sh

# Access database
db-shell:
	docker-compose exec database psql -U transitflow -d transitflow_db

# Run database migrations
migrate:
	docker-compose exec backend npm run migrate

# Seed database with sample data
seed:
	docker-compose exec backend npm run seed

# Development mode with hot reload
dev:
	docker-compose up --build

# Production deployment
deploy:
	@echo "Building for production..."
	docker-compose -f docker-compose.prod.yml build
	docker-compose -f docker-compose.prod.yml up -d
