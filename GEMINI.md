# Project Overview: SEO Linux Header Next

This project is a high-performance, SEO-optimized web application built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS**. It serves as a professional platform (likely for Yueinfotech) featuring services, blogs, and contact capabilities, integrated with **Firebase** and **AWS S3**.

## Core Technologies
- **Framework:** Next.js 16 (React 19)
- **Styling:** Tailwind CSS with `framer-motion` for animations.
- **Backend/Database:** Firebase (Firestore) & Firebase Admin SDK.
- **File Storage:** AWS S3 (via `@aws-sdk/client-s3`).
- **UI Components:** Radix UI primitives, Lucide React icons, and custom components in `src/components`.
- **Forms & Communication:** Nodemailer for email handling, `react-phone-number-input` for validated inputs.
- **State & Data Fetching:** TanStack Query (React Query) for client-side state, native `fetch` with Next.js caching for server-side.

## Project Structure
- `src/app/`: App Router directory containing pages (`page.tsx`), layouts (`layout.tsx`), and API routes (`api/`).
- `src/components/`: Reusable UI components. `src/components/ui/` contains low-level primitives (buttons, toasts, etc.).
- `src/sections/`: Large, page-specific UI blocks (e.g., `Hero`, `AboutHero`, `ServicesGrid`).
- `src/lib/`: Core logic including Firebase configuration (`firebase.ts`, `firebaseAdmin.ts`), Firestore fetching (`firestoreServer.ts`), and Cloudinary/S3 utilities.
- `src/types/`: Centralized TypeScript interfaces and types.
- `src/data/` & `src/utils/data/`: Static data and constants used across the site.
- `firebase/`: Contains `firestore.rules` and `firestore.indexes.json`.
- `public/`: Static assets like images and SVGs.

## Building and Running
- **Development:** `npm run dev` (Starts server at `http://localhost:3000`)
- **Production Build:** `npm run build`
- **Production Start:** `npm run start`
- **Linting:** `npm run lint`

## Development Conventions & Standards
- **Component Pattern:** Prefer functional components with TypeScript. Use `src/sections` for large page blocks to keep `src/app` pages clean.
- **Data Fetching:**
    - Use Server Components for initial data fetching from Firestore.
    - Follow the **Repository/Adapter Pattern** (as suggested in `ARCHITECTURAL_REVIEW.md`) to decouple Firestore logic from UI.
    - Use `Suspense` boundaries for data-heavy sections to improve perceived performance.
- **SEO:**
    - Always implement `generateMetadata` for dynamic routes (`blog/[slug]`, `services/[slug]`).
    - Use JSON-LD for structured data (Articles/Services).
    - Ensure images in the Hero section use the `priority` attribute.
- **Styling:**
    - Use Tailwind CSS classes.
    - Follow the responsive breakpoints defined in `how-to-test.md` (320px to 1440px).
    - Use `framer-motion` for entry animations and interactive elements.
- **Security:**
    - Validate all form inputs on both client and server using Zod (recommended).
    - Keep sensitive keys in `.env` and never commit them.
    - Use `firebase-admin` for secure server-side operations.

## Testing & Validation
- **Manual UI Testing:** Refer to `how-to-test.md` for specific manual check procedures, including navbar toggles, scroll transitions, and hero readability across devices.
- **Performance:** Use Lighthouse to monitor LCP (Largest Contentful Paint) and CLS (Cumulative Layout Shift).
