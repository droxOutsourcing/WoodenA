# WoodenA - Furniture E-commerce Platform

Modern furniture e-commerce web application with comprehensive blog system and user authentication, built with React frontend and serverless backend.

## 🚀 Deployment Guide

### Vercel + Supabase Serverless Deployment

#### 1. Supabase Database Setup
1. Create account at [supabase.com](https://supabase.com)
2. Create new project: **Project name**: `WoodenA`
3. Set strong database password and select nearest region
4. In SQL Editor, run the `supabase-setup.sql` script
5. Copy API keys from **Settings** → **API**:
   - Project URL: `https://xxx.supabase.co`
   - anon public key: `eyJhbGciOiJIUzI1...`

#### 2. Vercel Deployment
1. Connect GitHub repository to [vercel.com](https://vercel.com)
2. Import project and set environment variables:
   ```
   SUPABASE_URL=https://xxx.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1...
   ```
3. Deploy project - automatic build and deployment

#### 3. Verify Deployment
Test these endpoints after deployment:
- `/api/simple` - Basic response test
- `/api/env-check` - Environment variables check
- `/api/login-simple` - Login functionality

## 📊 Sample Data Included

### User Accounts
- `admin` / `admin123` (Administrator)
- `author1` / `admin123` (Content Author)
- `user1` / `admin123` (Regular User)

### Blog Content
- **Categories**: Furniture Care, Interior Design, Wood Types, DIY Projects
- **Posts**: Complete sample articles with comments
- **Comments**: User interactions on blog posts

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

## 💰 Free Tier Resources

### Supabase (Free Plan)
- **Projects**: 2
- **Database**: 500MB
- **Storage**: 1GB
- **Monthly Active Users**: 10,000
- **API Requests**: Unlimited

### Vercel (Free Plan)
- **Bandwidth**: 100GB/month
- **Serverless Functions**: 100,000 invocations/month
- **Function Runtime**: 10 seconds
- **Deployments**: Unlimited

## 🎯 Project Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Query for server state
- **Routing**: Wouter for client-side routing

### Backend
- **Runtime**: Vercel Serverless Functions
- **Database**: Supabase PostgreSQL
- **ORM**: Drizzle ORM with type-safe queries
- **Authentication**: Custom JWT-based system

### Features
- Complete e-commerce furniture catalog
- Integrated blog system with categories and comments
- User authentication and role management
- Responsive design for all devices
- Shopping cart and wishlist functionality
- Admin dashboard for content management

This application is production-ready and completely free to deploy and operate.