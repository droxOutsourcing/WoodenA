# WoodenA - Furniture E-commerce Platform

Modern furniture e-commerce web application with comprehensive blog system and user authentication, built with React frontend and serverless backend.

## 🚀 Quick Deployment Guide

### 1. Supabase Database Setup
1. Create account at [supabase.com](https://supabase.com)
2. Create new project: **Project name**: `WoodenA`
3. In SQL Editor, run the `supabase-setup.sql` script
4. Copy API keys from **Settings** → **API**:
   - Project URL: `https://xxx.supabase.co`
   - anon public key: `eyJhbGciOiJIUzI1...`

### 2. Vercel Deployment
1. Connect GitHub repository to [vercel.com](https://vercel.com)
2. Import project and set environment variables:
   ```
   SUPABASE_URL=https://xxx.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1...
   ```
3. Deploy project - automatic build and deployment

### 3. Test Deployment
- `/api/simple` - Basic connectivity test
- `/api/env-check` - Environment variables status
- `/api/login-simple` - Login test (admin/admin123)

## 📊 Sample Data

### User Accounts
- `admin` / `admin123` (Administrator)
- `author1` / `admin123` (Content Author)  
- `user1` / `admin123` (Regular User)

### Features
- Complete e-commerce furniture catalog
- Integrated blog system with categories and comments
- User authentication and role management
- Responsive design for all devices
- Shopping cart and wishlist functionality
- Admin dashboard for content management

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Blog System
- `GET /api/blog/posts` - All blog posts
- `GET /api/blog/posts/:id` - Specific post
- `GET /api/blog/categories` - All categories
- `GET /api/blog/posts/:postId/comments` - Post comments
- `POST /api/blog/posts/:postId/comments` - Add comment

### Testing
- `GET /api/simple` - Basic connectivity test
- `GET /api/env-check` - Environment variables status

This application is production-ready and completely free to deploy and operate.