# e-Falcon API Test Server

A complete NestJS + PostgreSQL API server for managing centers.

## Tech Stack

- **NestJS** - Progressive Node.js framework
- **PostgreSQL 15** - Database
- **TypeORM** - ORM for database operations
- **Docker** - Optional containerization

## Quick Start - Local Development

### Prerequisites
- Node.js 18+ installed
- PostgreSQL installed and running locally

### Setup Instructions

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment:**
The `.env` file is already created with these default values:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=efalcon_db
DB_USER=postgres
DB_PASS=postgres
PORT=8081
```

Update these values to match your local PostgreSQL configuration.

3. **Create the database:**
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE efalcon_db;

# Exit
\q
```

4. **Start the application:**
```bash
npm run start:dev
```

The API will be available at `http://localhost:8081`

The database table will be created automatically on first run (TypeORM synchronize is enabled).

## API Endpoints

### 1. GET /v1/centers?centerId=XXX
Get a center by ID

**Example:**
```bash
curl http://localhost:8081/v1/centers?centerId=C001
```

**Success Response (200):**
```json
{
  "success": true,
  "payload": {
    "id": 1,
    "centerId": "C001",
    "centerName": "Main Center",
    "centerTelNo": "123-456-7890",
    "centerZipCode": "12345",
    "centerAddress1": "123 Main St",
    "centerAddress2": "Suite 100",
    "centerAddress3": "Building A",
    "timezone": "America/New_York",
    "createdAt": "2025-11-18T00:00:00.000Z",
    "updatedAt": "2025-11-18T00:00:00.000Z"
  },
  "timestamp": "2025-11-18T00:00:00.000Z",
  "traceId": "uuid-here"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": {
    "code": 404,
    "message": "Center with ID C001 not found"
  },
  "timestamp": "2025-11-18T00:00:00.000Z",
  "traceId": "uuid-here"
}
```

### 2. POST /v1/centers
Create a new center

**Example:**
```bash
curl -X POST http://localhost:8081/v1/centers \
  -H "Content-Type: application/json" \
  -d '{
    "centerId": "C001",
    "centerName": "Main Center",
    "centerTelNo": "123-456-7890",
    "centerZipCode": "12345",
    "centerAddress1": "123 Main St",
    "centerAddress2": "Suite 100",
    "centerAddress3": "Building A",
    "timezone": "America/New_York"
  }'
```

**Success Response (201):**
```json
{
  "success": true,
  "payload": {
    "id": 1,
    "centerId": "C001",
    "centerName": "Main Center",
    "centerTelNo": "123-456-7890",
    "centerZipCode": "12345",
    "centerAddress1": "123 Main St",
    "centerAddress2": "Suite 100",
    "centerAddress3": "Building A",
    "timezone": "America/New_York",
    "createdAt": "2025-11-18T00:00:00.000Z",
    "updatedAt": "2025-11-18T00:00:00.000Z"
  },
  "timestamp": "2025-11-18T00:00:00.000Z",
  "traceId": "uuid-here"
}
```

**Error Response (409 - Conflict):**
```json
{
  "success": false,
  "error": {
    "code": 409,
    "message": "Center with ID C001 already exists"
  },
  "timestamp": "2025-11-18T00:00:00.000Z",
  "traceId": "uuid-here"
}
```

### 3. PATCH /v1/centers/:centerId
Update an existing center

**Example:**
```bash
curl -X PATCH http://localhost:8081/v1/centers/C001 \
  -H "Content-Type: application/json" \
  -d '{
    "centerName": "Updated Center Name",
    "centerTelNo": "987-654-3210"
  }'
```

**Success Response (200):**
```json
{
  "success": true,
  "payload": {
    "id": 1,
    "centerId": "C001",
    "centerName": "Updated Center Name",
    "centerTelNo": "987-654-3210",
    "centerZipCode": "12345",
    "centerAddress1": "123 Main St",
    "centerAddress2": "Suite 100",
    "centerAddress3": "Building A",
    "timezone": "America/New_York",
    "createdAt": "2025-11-18T00:00:00.000Z",
    "updatedAt": "2025-11-18T00:00:00.000Z"
  },
  "timestamp": "2025-11-18T00:00:00.000Z",
  "traceId": "uuid-here"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": {
    "code": 404,
    "message": "Center with ID C001 not found"
  },
  "timestamp": "2025-11-18T00:00:00.000Z",
  "traceId": "uuid-here"
}
```

## Database Schema

**Table:** `centers`

| Column | Type | Constraints |
|--------|------|-------------|
| id | integer | Primary Key, Auto-increment |
| center_id | varchar | Unique, Indexed |
| center_name | varchar | Not Null |
| center_tel_no | varchar | Not Null |
| center_zip_code | varchar | Not Null |
| center_address1 | varchar | Not Null |
| center_address2 | varchar | Not Null |
| center_address3 | varchar | Not Null |
| timezone | varchar | Not Null |
| created_at | timestamp | Auto-generated |
| updated_at | timestamp | Auto-updated |

## Development Scripts

```bash
# Start in development mode with hot-reload
npm run start:dev

# Build the application
npm run build

# Start in production mode
npm run start:prod

# Run tests
npm test

# Run linter
npm run lint

# Format code
npm run format
```

## Docker Setup (Optional)

If you prefer to use Docker:

### Running with Docker Compose

```bash
docker-compose up
```

The API will be available at `http://localhost:8081`

### Ports (Docker)
- **API:** 8081 (external) → 8080 (internal)
- **PostgreSQL:** 5433 (external) → 5432 (internal)

### Stop Docker Containers

```bash
docker-compose down
```

### Clean Restart (removes volumes)

```bash
docker-compose down -v
docker-compose up --build
```

## Project Structure

```
.
├── src/
│   ├── centers/
│   │   ├── dto/
│   │   │   ├── create-center.dto.ts
│   │   │   └── update-center.dto.ts
│   │   ├── entities/
│   │   │   └── center.entity.ts
│   │   ├── centers.controller.ts
│   │   ├── centers.service.ts
│   │   └── centers.module.ts
│   ├── common/
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   └── interceptors/
│   │       └── response.interceptor.ts
│   ├── app.module.ts
│   └── main.ts
├── .env (your local config)
├── .env.example (template)
├── docker-compose.yml
├── Dockerfile
├── package.json
└── tsconfig.json
```

## Features

✅ RESTful API endpoints
✅ PostgreSQL database with TypeORM
✅ Input validation with class-validator
✅ Global response formatting
✅ Global exception handling
✅ Unique constraint on centerId
✅ Auto-generated timestamps
✅ Docker support (optional)
✅ Auto-create database tables
✅ Hot-reload in development

## Troubleshooting

### Database Connection Issues

1. **Make sure PostgreSQL is running:**
```bash
# macOS (if installed via Homebrew)
brew services list

# Start PostgreSQL if not running
brew services start postgresql
```

2. **Verify connection details in .env file match your PostgreSQL setup**

3. **Create the database if it doesn't exist:**
```bash
psql -U postgres -c "CREATE DATABASE efalcon_db;"
```

### Port Already in Use

If port 8081 is already in use, change the PORT in `.env` file:
```
PORT=3000  # or any available port
```

### Module Not Found Errors

Make sure you've installed all dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```
# dummy_falcon
