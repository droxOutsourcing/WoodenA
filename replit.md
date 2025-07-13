# Replit.md

## Overview

This is a full-stack React application built with Express.js backend and React frontend, featuring a comprehensive furniture e-commerce website with integrated blog system. The application uses modern technologies including TypeScript, Tailwind CSS, shadcn/ui components, and Drizzle ORM for database operations. The project follows a monolithic architecture with clear separation between client and server code.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with custom design system
- **Component Library**: shadcn/ui with Radix UI primitives
- **State Management**: React Query (@tanstack/react-query) for server state
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Development**: Hot reloading with Vite middleware integration

### Project Structure
```
├── client/           # React frontend application
├── server/           # Express.js backend
├── shared/           # Shared TypeScript types and schemas
├── migrations/       # Database migration files
└── dist/            # Production build output
```

## Key Components

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts` with comprehensive data models
- **Migrations**: Managed through drizzle-kit
- **Storage Interface**: Abstracted storage layer with PostgreSQL implementation

### Authentication System
- **User Model**: Enhanced user schema with roles (user, admin, author)
- **Validation**: Zod schemas for type-safe validation
- **Storage**: DatabaseStorage implementation using PostgreSQL with Drizzle ORM

### Blog System
- **Content Management**: Full blog system with posts, categories, and comments
- **Data Models**: Blog posts, categories, comments with relationships
- **Features**: Search, filtering, categorization, commenting system
- **Admin Features**: Content creation and management capabilities

### UI Components
- **Design System**: shadcn/ui components with "new-york" style
- **Icons**: Lucide React for consistent iconography
- **Forms**: React Hook Form with Zod resolvers
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Page Sections
- **Header**: Navigation with logo and action icons, real-time cart/wishlist popups
- **Hero**: Contact form with company information
- **Info**: Breadcrumb navigation with banner
- **Contact Form**: Interactive form with validation
- **Footer**: Company links and newsletter signup
- **Blog**: Complete blog system with posts listing and individual post views
- **Dashboard**: User dashboard with multiple functional tabs including Cart management
- **Home Sections**: Browse Range, Our Products, Room Inspiration, Customer Testimonials

## Data Flow

### Client-Server Communication
1. **API Requests**: Custom fetch wrapper with error handling
2. **Query Management**: React Query for caching and synchronization
3. **Form Handling**: React Hook Form with Zod validation
4. **Error Handling**: Centralized error boundaries and toast notifications

### Database Operations
1. **Connection**: PostgreSQL database with serverless connection pooling
2. **Queries**: Drizzle ORM with type-safe query building
3. **Migrations**: Automated schema synchronization via `npm run db:push`
4. **Storage**: DatabaseStorage implementation using PostgreSQL (migrated from MemStorage)

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React 18, React DOM, React Router (Wouter)
- **Backend**: Express.js, Node.js runtime
- **Database**: PostgreSQL (Neon), Drizzle ORM
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Build Tools**: Vite, TypeScript, ESBuild

### UI Libraries
- **Component Primitives**: Radix UI components
- **Utility Libraries**: clsx, class-variance-authority
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Carousel**: Embla Carousel

### Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **Linting**: ESLint configuration
- **Hot Reload**: Vite development server with HMR

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: ESBuild bundles Express server to `dist/index.js`
3. **Production Mode**: Static file serving with Express

### Environment Configuration
- **Database**: Requires `DATABASE_URL` environment variable
- **Development**: Automatic Vite middleware integration
- **Production**: Optimized builds with static asset serving

### Hosting Considerations
- **Database**: Neon PostgreSQL for serverless scaling
- **Static Assets**: Served through Express in production
- **Environment Variables**: Database connection string required
- **Port Configuration**: Flexible port assignment for deployment platforms

The application is designed for easy deployment on platforms like Replit, Vercel, or traditional VPS hosting with minimal configuration changes.

## Recent Changes

### January 2025
- **Blog System Implementation**: Added comprehensive blog system with PostgreSQL data models
- **Database Schema Expansion**: Enhanced schema with blog posts, categories, comments, and user roles
- **API Development**: Created RESTful API endpoints for blog operations
- **Frontend Integration**: Connected blog pages with real data from API endpoints
- **Content Management**: Implemented search, filtering, and commenting functionality
- **Shopping Cart System**: Complete cart functionality with localStorage persistence and Dashboard integration
- **Header Popup Integration**: Real-time cart/wishlist data display in header popups with badges
- **Home Page Enhancement**: Added comprehensive sections - Browse Range, Our Products, Room Inspiration, and Customer Testimonials
- **Product Detail Page**: Fully functional product detail pages with image gallery, size/color selection, cart integration
- **Routing System**: Complete migration from window.location to Wouter's useLocation for safe navigation
- **Contact Section Fix**: Removed incorrect HeroSection from ProductDetail page, replaced with proper breadcrumb navigation
- **Scroll Position Management**: Added automatic scroll-to-top functionality for all product page transitions