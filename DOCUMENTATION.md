# DEazy Tech Solutions - Project Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Frontend Architecture](#frontend-architecture)
5. [Backend Architecture](#backend-architecture)
6. [Database Schema](#database-schema)
7. [API Documentation](#api-documentation)
8. [Authentication & Authorization](#authentication--authorization)
9. [Installation Guide](#installation-guide)
10. [Deployment Guide](#deployment-guide)

## Project Overview

DEazy Tech Solutions is a full-stack web application built with Next.js for the frontend and Laravel for the backend. The application serves as a company website and project management system with an admin dashboard for managing projects, experts, and other content.

## Technology Stack

### Frontend

- Next.js 14.1.0
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Axios (API client)
- Various UI libraries:
  - @radix-ui components
  - @headlessui/react
  - lucide-react (icons)
  - react-hot-toast (notifications)

### Backend

- Laravel 12
- PHP 8.2+
- MySQL/MariaDB
- Laravel Sanctum (API authentication)
- Laravel Storage (file handling)

## Project Structure

### Frontend Structure

```
src/
├── components/
│   ├── admin/         # Admin dashboard components
│   ├── layouts/       # Layout components
│   ├── ui/           # Reusable UI components
│   └── ...           # Other components
├── lib/
│   ├── api.ts        # API client configuration
│   └── utils.ts      # Utility functions
├── pages/
│   ├── dashboard_deazytech/  # Admin dashboard pages
│   ├── _app.tsx     # Next.js app configuration
│   ├── index.tsx    # Home page
│   └── ...          # Other pages
└── styles/
    └── globals.css   # Global styles
```

### Backend Structure

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── Admin/    # Admin controllers
│   │   └── Auth/     # Authentication controllers
│   └── Middleware/   # Custom middleware
├── Models/           # Eloquent models
└── Providers/        # Service providers

routes/
├── api.php          # API routes
└── web.php          # Web routes

database/
├── migrations/      # Database migrations
└── seeders/        # Database seeders
```

## Frontend Architecture

### Key Components

1. **Layouts**

   - RootLayout: Main application layout
   - DashboardLayout: Admin dashboard layout

2. **Pages**

   - Home Page: Company landing page
   - Services Page: Service offerings
   - Projects Page: Portfolio showcase
   - Admin Dashboard: Project and expert management

3. **State Management**
   - React hooks for local state
   - API context for global state
   - Cookies for authentication state

### Component Structure

- Modular components with TypeScript interfaces
- Tailwind CSS for styling
- Framer Motion for animations
- Responsive design patterns

## Backend Architecture

### API Structure

1. **Public Routes**

```php
GET /api/projects
GET /api/projects/{project}
GET /api/experts
GET /api/experts/{expert}
```

2. **Admin Routes** (Protected)

```php
POST /api/admin/projects
PUT /api/admin/projects/{project}
DELETE /api/admin/projects/{project}
POST /api/admin/experts
PUT /api/admin/experts/{expert}
DELETE /api/admin/experts/{expert}
```

3. **Authentication Routes**

```php
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
```

### Middleware Stack

- CORS handling
- Authentication (Sanctum)
- Admin access control
- Rate limiting

## Database Schema

### Users Table

```sql
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    email_verified_at TIMESTAMP NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### Projects Table

```sql
CREATE TABLE projects (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) NOT NULL,
    tags JSON NOT NULL,
    link VARCHAR(255) NOT NULL,
    features JSON,
    gradient VARCHAR(255),
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### Experts Table

```sql
CREATE TABLE experts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    image VARCHAR(255) NOT NULL,
    github_link VARCHAR(255) NULL,
    linkedin_link VARCHAR(255) NULL,
    twitter_link VARCHAR(255) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

## Installation Guide

### Prerequisites

- PHP 8.2 or higher
- Node.js 18 or higher
- MySQL/MariaDB
- Composer
- npm or yarn

### Backend Setup

1. Clone the repository

```bash
git clone <repository-url>
cd deazytech-backend
```

2. Install PHP dependencies

```bash
composer install
```

3. Configure environment

```bash
cp .env.example .env
php artisan key:generate
```

4. Configure database in .env

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=deazytech
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

5. Run migrations and seeders

```bash
php artisan migrate
php artisan db:seed
```

6. Set up storage links

```bash
php artisan storage:link
```

7. Start the development server

```bash
php artisan serve
```

### Frontend Setup

1. Navigate to frontend directory

```bash
cd ../
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Configure environment

```bash
cp .env.example .env.local
```

4. Update API URL in .env.local

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

5. Start development server

```bash
npm run dev
# or
yarn dev
```

## Deployment Guide

### Backend Deployment (cPanel)

1. **Prepare the Laravel Application**

   - Create a production build

   ```bash
   composer install --optimize-autoloader --no-dev
   ```

   - Set proper permissions

   ```bash
   chmod -R 755 storage bootstrap/cache
   ```

2. **Upload to cPanel**

   - Upload all files to public_html or a subdirectory
   - Create a MySQL database in cPanel
   - Update .env with production settings

3. **Configure Apache**

   - Create/modify .htaccess in public directory

   ```apache
   <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteBase /
       RewriteRule ^$ public/index.php [L]
       RewriteRule ^((?!public/).*)$ public/$1 [L,NC]
   </IfModule>
   ```

4. **Final Steps**
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

### Frontend Deployment Options

1. **Vercel (Recommended)**

   - Connect your GitHub repository
   - Configure environment variables
   - Deploy with zero configuration

2. **Traditional Hosting**

   - Build the application

   ```bash
   npm run build
   ```

   - Upload the build files to your hosting
   - Configure server rewrites

3. **Docker Deployment**
   - Use the provided Dockerfile
   - Build and push to container registry
   - Deploy using Docker Compose

### SSL Configuration

- Install SSL certificate
- Update .env with HTTPS settings
- Configure force HTTPS in production

### Maintenance

- Regular backups
- Monitor error logs
- Update dependencies
- Security patches

## Security Considerations

1. **API Security**

   - CORS configuration
   - Rate limiting
   - Input validation
   - Secure headers

2. **Authentication**

   - Sanctum tokens
   - Password policies
   - Session management

3. **File Upload Security**
   - File type validation
   - Size limits
   - Secure storage

## Troubleshooting

### Common Issues

1. **Storage Permissions**

   ```bash
   chmod -R 775 storage bootstrap/cache
   chown -R www-data:www-data storage bootstrap/cache
   ```

2. **Database Connection**

   - Check .env configuration
   - Verify database credentials
   - Check MySQL user permissions

3. **API Connection**
   - Verify API URL in frontend .env
   - Check CORS settings
   - Validate API tokens

### Support

For additional support or questions, please contact:

- Email: support@deazytech.com
- GitHub Issues: [Repository Issues](https://github.com/yourusername/deazytech/issues)
