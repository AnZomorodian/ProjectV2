# Solvix

## Overview

Solvix is a full-stack advanced engineering solutions platform built with a React frontend and Express.js backend. The application provides professional formula calculations across multiple engineering disciplines (Mechanical, Electrical, Civil, Chemical) with features like calculation history, unit conversion, custom formula creation, and comprehensive statistics.

## Recent Changes (January 22, 2025)

- ✓ Enhanced UI with glass effects, gradient backgrounds, and custom scrollbars
- ✓ Improved header design with professional badges and animations
- ✓ Enhanced navigation tabs with individual color themes
- ✓ Added comprehensive GitHub README with all project details
- ✓ Created Privacy Policy page with detailed data protection information
- ✓ Implemented Terms of Service with engineering-specific disclaimers
- ✓ Built comprehensive Documentation system with searchable sections
- ✓ Integrated documentation pages into Settings with easy navigation
- ✓ Fixed duplicate formula IDs causing React key warnings
- ✓ Added social media links (Telegram, Discord, GitHub) throughout
- ✓ **Rebranded application to "Solvix"** - Updated all references across components and documentation
- ✓ **Enhanced logo design** - Created modern gradient logo with hover animations and glow effects
- ✓ **Implemented smart page navigation** - Clicking main tabs or logo closes all modals and returns to main view

### Latest Major Updates (January 22, 2025 - Evening)

- ✓ **Added 15 New Advanced Engineering Formulas**: Including fatigue life prediction, heat exchanger effectiveness, Euler buckling, antenna gain, soil consolidation, crystal growth rate, wind load pressure, magnetic field calculations, distillation efficiency, seismic response, battery energy density, thermal expansion, fluid viscosity, and signal-to-noise ratio
- ✓ **Implemented Real-time Settings System**: Created comprehensive SettingsContext with instant application of appearance changes
- ✓ **Enhanced Appearance Controls**: Working theme switching (light/dark/auto), font size adjustment (small to extra-large), color scheme selection (5 color options), high contrast mode, compact mode
- ✓ **Added Innovative Interface Settings**: Border radius control (sharp/rounded/extra-rounded), spacing options (compact/normal/relaxed), unit display preferences, visual effects
- ✓ **Smart Features Implementation**: Auto-complete formulas, live formula preview, keyboard shortcuts toggle, sound effects, calculation timeout control, history size management
- ✓ **Live Preview System**: Real-time settings preview showing current configuration with instant visual feedback
- ✓ **CSS Variables Integration**: Dynamic theming system using CSS variables for colors, fonts, spacing, and border radius

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between client and server:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React hooks with local state
- **Build System**: Vite for frontend, ESBuild for backend

## Key Components

### Frontend Architecture
- **React SPA**: Single-page application with component-based architecture
- **TypeScript**: Full type safety across the application
- **Component Library**: shadcn/ui for consistent UI components
- **Animations**: Framer Motion for smooth interactions
- **Charts**: Recharts for data visualization
- **Math Processing**: mathjs for formula evaluation

### Backend Architecture
- **Express.js**: RESTful API server
- **TypeScript**: Type-safe server implementation
- **Modular Design**: Separated routes, storage, and server logic
- **Database Abstraction**: Storage interface allows switching between implementations

### Database Design
- **PostgreSQL**: Production database using Neon Database serverless
- **Drizzle ORM**: Type-safe database operations
- **Schema**: Centralized schema definition in shared directory
- **Migrations**: Database migrations managed through Drizzle Kit

### Component Structure
- **Calculator**: Main calculation interface with input validation
- **Formula Cards**: Display formulas with filtering and search
- **History Tracking**: Save and manage calculation history
- **Statistics**: Visual analytics of usage patterns
- **Unit Converter**: Built-in unit conversion utilities
- **Formula Builder**: Create custom formulas

## Data Flow

1. **Formula Management**: Formulas stored in TypeScript data files with type definitions
2. **Calculation Process**: Input validation → Formula evaluation → Result storage
3. **Data Persistence**: User data and calculations stored in PostgreSQL
4. **Real-time Updates**: Immediate feedback and calculation results
5. **Export/Import**: JSON-based data export for calculations and formulas

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless connection
- **drizzle-orm**: Database ORM and query builder
- **@tanstack/react-query**: Server state management
- **framer-motion**: Animation library
- **mathjs**: Mathematical expression evaluator
- **recharts**: Data visualization components

### UI Dependencies
- **@radix-ui**: Headless UI components (dialogs, dropdowns, etc.)
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe CSS class variants
- **lucide-react**: Icon library

### Development Tools
- **vite**: Frontend build tool and dev server
- **typescript**: Type checking and compilation
- **drizzle-kit**: Database migration tool
- **esbuild**: Backend bundling

## Deployment Strategy

### Development Environment
- **Vite Dev Server**: Hot module replacement for frontend development
- **tsx**: TypeScript execution for backend development
- **Concurrent Development**: Frontend and backend run simultaneously
- **Database**: Uses environment variable `DATABASE_URL` for connection

### Production Build
- **Frontend**: Vite builds optimized React application
- **Backend**: ESBuild bundles Express server to single file
- **Static Serving**: Express serves built frontend assets
- **Database Migrations**: Automated through `db:push` command

### Environment Configuration
- **Database**: PostgreSQL connection via `DATABASE_URL`
- **Node Environment**: Configured via `NODE_ENV`
- **Build Targets**: Modern ES modules with proper platform targeting

### Key Architectural Decisions

1. **Monorepo Structure**: Single repository with client/server/shared directories for code organization
2. **Shared Types**: Common interfaces and schemas shared between frontend and backend
3. **Storage Abstraction**: Interface-based storage allows easy switching between implementations
4. **Type Safety**: Full TypeScript implementation ensures compile-time error detection
5. **Component-Based UI**: Modular React components with shadcn/ui for consistency
6. **Real-time Calculations**: Immediate feedback without server round-trips for basic calculations
7. **Progressive Enhancement**: Works without JavaScript, enhanced with React interactivity