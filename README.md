# URL Shortener Fullstack App

This is a **fullstack URL shortener** application built with **TypeScript, Node.js, Express, React, PostgreSQL, and Docker**.  
It allows users to **shorten URLs, track visits, and manage their links** with authentication.

## Features
### **Frontend (React + Vite)**
- User authentication (Login/Register)
- Shorten URLs with custom slugs
- Track visit statistics
- View and edit previously shortened URLs
- Responsive UI with Material UI
- Protected routes for authenticated users

### **Backend (Node.js + Express + Prisma)**
- JWT-based authentication
- CRUD operations for URLs
- Visit tracking for analytics
- Rate limiting middleware for API protection
- PostgreSQL database with Prisma ORM
- Dockerized with automatic database migrations and seeding

---

## **Technologies Used**
- **Frontend:** React, Vite, Material UI, React Router
- **Backend:** Node.js, Express, Prisma, PostgreSQL, JWT
- **Database:** PostgreSQL (via Docker)
- **Authentication:** JWT (JSON Web Token)
- **Containerization:** Docker & Docker Compose
- **Logging & Monitoring:** Winston Logger

---

## **Setup Instructions**
### **1 - Prerequisites**
- Docker & Docker Compose installed

### **2 - Clone the Repository**
```sh
git clone https://github.com/giilmaroliveira/url-shortener.git
cd url-shortener
```
### **3 - Run the Application**
```sh
docker-compose up -d --build
```
This will:
- Start PostgreSQL, Backend, and Frontend in Docker containers.
- Run database migrations.
- Seed the database with a default user.

### **4 - Access the Application**
- Frontend: `http://localhost:8080`
- Backend API: `http://localhost:3000/api`
- Database: Runs inside Docker (`postgres://postgres:postgres@localhost:5432/url_shortener`)

### **Default Credentials (Seed User)**
After running migrations, a default user is created:
- Email: `admin@example.com`
- Password: `password123`
Use these credentials to log in.


### API Endpoints

Authentication
|Method|Endpoint            |Description            |
|:-----|:-------------------|:----------------------|
|`POST`|`/api/auth/register`|Register a new user    |
|`POST`|`/api/auth/login`   |Login and get JWT token|

URL Management
|Method |Endpoint             |Description              |
|:------|:--------------------|:------------------------|
|`POST` |`/api/url`           |Shorten a URL            |
|`GET`  |`/api/url/my-urls`   |Get user's shortened URLs|
|`GET`  |`/api/url/:slug`     |Redirect to original URL |
|`PATCH`|`/api/url/:id`       |Edit a shortened URL     |

Visit Tracking
|Method|Endpoint                |Description            |
|:-----|:-----------------------|:----------------------|
|`GET` |`/api/visit/:slug/stats`|Get visit statistics   |

### **Stopping the Containers**
To stop the project, run:
```sh
docker-compose down
```

### **Rebuilding the Project**
If you make changes and need to rebuild:
```sh
docker-compose up -d --build
```