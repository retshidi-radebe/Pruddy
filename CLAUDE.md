# Tshepang — Full-Stack Next.js Application

## Project Overview

A production-ready full-stack web application built with:
- **Runtime**: Bun
- **Framework**: Next.js 16 (App Router, standalone output)
- **Language**: TypeScript 5 (strict mode, noImplicitAny: false)
- **Styling**: Tailwind CSS 4 with oklch color space
- **UI**: shadcn/ui (new-york style, 48 components)
- **Database**: Prisma ORM + SQLite (`db/custom.db`)
- **State**: Zustand (client) + TanStack React Query (server)
- **Forms**: React Hook Form + Zod
- **Auth**: NextAuth.js v4 (installed, not wired up)
- **i18n**: next-intl (installed, not configured)
- **Animations**: Framer Motion
- **Icons**: lucide-react
- **Charts**: Recharts
- **WebSocket**: Socket.io
- **Proxy**: Caddy (port 81)

## Commands

```bash
bun run dev          # Start dev server on port 3000
bun run build        # Build Next.js (standalone output)
bun run start        # Start production server on port 3000
bun run lint         # Run ESLint
bun run db:push      # Push Prisma schema to database
bun run db:generate  # Generate Prisma client
bun run db:migrate   # Run Prisma migrations (dev)
bun run db:reset     # Reset database and re-run migrations
```

### Build & Deploy Scripts

```bash
bash .zscripts/build.sh              # Full-stack build pipeline
bash .zscripts/start.sh              # Production start (Next.js + mini-services + Caddy)
bash .zscripts/mini-services-build.sh    # Build mini-services
bash .zscripts/mini-services-install.sh  # Install mini-service deps
bash .zscripts/mini-services-start.sh    # Start mini-services
```

## Architecture

### App Router
- All pages/routes live under `src/app/`
- API routes in `src/app/api/`
- Server components by default, add `"use client"` for client components

### Path Aliases
- `@/*` maps to `./src/*` (e.g., `@/components/ui/button`)

### UI Components
- 48 shadcn/ui components in `src/components/ui/`
- Components are copied in-repo for full ownership
- Use `cn()` from `@/lib/utils` for class merging

### Styling
- Tailwind CSS 4 with `@tailwindcss/postcss`
- oklch color space for theme tokens
- CSS variables defined in `src/app/globals.css`
- Dark mode via `class` strategy
- Geist font family (sans + mono)

### Database
- Prisma ORM with SQLite at `db/custom.db`
- Singleton pattern in `src/lib/db.ts` to prevent connection exhaustion
- Schema in `prisma/schema.prisma`

### State Management
- **Zustand** for client-side state
- **TanStack React Query** for server state / data fetching
- **React Hook Form + Zod** for form handling and validation

### Auth
- NextAuth.js v4 is installed but not configured
- Wire up providers in `src/app/api/auth/[...nextauth]/route.ts` when needed

### i18n
- next-intl is installed but not configured
- Set up when internationalization is needed

### Mini-Services
- Optional microservices in `mini-services/` directory
- Each subdirectory with an `index.ts` gets built to a single Bun-executable JS file
- Built artifacts go to `mini-services-dist/`

### Reverse Proxy
- Caddy on port 81 proxies to Next.js on port 3000
- Dynamic port forwarding via `?XTransformPort=PORT` query parameter

### Utilities
- `cn()` — class name merger (clsx + tailwind-merge)
- `useIsMobile()` — mobile breakpoint detection (768px)
- `useToast()` — toast notification hook

## Key Conventions

- **React 19** — latest React with server components
- **React Strict Mode OFF** — disabled in next.config.ts
- **Server/Client Components** — default to server, use `"use client"` directive when needed
- **shadcn/ui** — components copied into `src/components/ui/` for full customization
- **ESLint** — all rules disabled for maximum developer freedom; lint separately
- **TypeScript** — strict mode on but build errors ignored; noImplicitAny off
- **Framer Motion** — use for all animations
- **Lucide icons** — use `lucide-react` for all icons

## Key Architectural Decisions

1. **Standalone output** — Next.js builds to a self-contained server (no node_modules needed at runtime)
2. **TypeScript build errors ignored** — flexible development, lint separately
3. **All ESLint rules disabled** — maximum developer freedom, no friction
4. **oklch color space** — modern color system with wide gamut support
5. **Prisma singleton** — prevents connection pool exhaustion in dev mode HMR
6. **Caddy reverse proxy** — unified entry point on port 81, dynamic routing via query param
7. **Mini-services architecture** — optional microservices built as single Bun-executable JS files
8. **shadcn/ui components copied in** — full ownership and customization ability
