/**
 * Vercel Serverless Function — API Handler
 *
 * Entry point for all /api/* routes when deployed to Vercel.
 * Vercel's @vercel/node runtime accepts an Express app exported as default
 * and wraps each request as a serverless function invocation.
 *
 * Required environment variables (set in Vercel dashboard):
 *   DATABASE_URL            — PostgreSQL connection string (Neon, Supabase, etc.)
 *   CLERK_PUBLISHABLE_KEY   — Clerk publishable key (pk_live_…)
 *   CLERK_SECRET_KEY        — Clerk secret key (sk_live_…)
 *   ALLOWED_ORIGINS         — Comma-separated allowed CORS origins
 *                             e.g. https://noteora.vercel.app,https://noteora.com
 *   SESSION_SECRET          — Random 32+ char secret for session signing
 *   NODE_ENV                — Set to "production" automatically by Vercel
 */
import app from "../artifacts/api-server/src/app";

export default app;
