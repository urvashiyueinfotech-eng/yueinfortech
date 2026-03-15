# Gemini Project Context: seo-inux-header-next

This project is a high-performance, SEO-optimized web application built with **Next.js 16 (React 19)**. It serves as a professional platform for Yue Infotech, featuring dynamic services, a blog, and integrated contact solutions.

## 🚀 Project Overview

*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS, Framer Motion (animations)
*   **UI Components:** Radix UI, Lucide React (icons), Sonner (toasts)
*   **Backend & Data:**
    *   **Firebase Firestore:** Primary database, accessed via REST API for optimized Next.js Data Caching.
    *   **Cloudinary:** Image hosting and optimization.
    *   **AWS S3:** Used for secure asset signing (`s3-sign` route).
    *   **NodeMailer:** Handles contact form submissions.
*   **Data Fetching:** TanStack React Query (client-side), Native `fetch` with `revalidate` (server-side).

## 🛠 Building and Running

*   **Install Dependencies:** `npm install`
*   **Development Server:** `npm run dev` (runs on `http://localhost:3000`)
*   **Production Build:** `npm run build`
*   **Start Production:** `npm start`
*   **Linting:** `npm run lint`

## 📂 Directory Structure

*   `src/app/`: Next.js App Router pages and layouts.
*   `src/components/`: Reusable UI elements (`ui/`) and layout components.
*   `src/sections/`: Large-scale page sections (e.g., `Hero`, `FeaturedServices`).
*   `src/lib/`: Backend logic, Firebase configuration, and data fetching utilities (`firestoreServer.ts`).
*   `src/data/` & `src/utils/data/`: Static and fallback data constants.
*   `src/types/`: Centralized TypeScript definitions.
*   `public/`: Static assets and theme images.

## 📏 Development Conventions

1.  **Architecture:** Aim for the **Repository Pattern**. Avoid mixing data fetching and transformation logic in components. Refer to `ARCHITECTURAL_REVIEW.md` for specific refactoring goals.
2.  **Data Fetching:**
    *   Prefer Server Components for initial data fetching to leverage the Next.js Data Cache.
    *   Use `decodeDocument` and `decodeValue` in `firestoreServer.ts` to handle Firestore's REST JSON format.
3.  **Styling:**
    *   Use Tailwind CSS utility classes.
    *   Maintain consistent spacing and responsive design (tested at 320px to 1440px).
    *   Use the `figtree` font family (defined as `--font-body`).
4.  **SEO:**
    *   Utilize `generateMetadata` for dynamic routes (`/blog/[slug]`, `/services/[slug]`).
    *   Ensure important images in the Hero section use the `priority` attribute.
5.  **Icons:** Always use `lucide-react` icons for consistency.

## 🧪 Testing & Validation

*   **Manual Testing:** Follow the guidelines in `how-to-test.md` for responsiveness and interactive elements (navbar, header transitions).
*   **Production Sanity:** Always run `npm run build` before final confirmation to catch TypeScript or build-time errors.
*   **Performance:** Aim for high Lighthouse scores, focusing on LCP and CLS.
