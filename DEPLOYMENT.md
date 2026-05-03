# Vercel Production Deployment Guide

This guide walks you through deploying Note-Saver to Vercel for production.

## Prerequisites

- Vercel account (create at [vercel.com](https://vercel.com))
- GitHub repository with your code
- Database provider account (Neon, Supabase, or Railway recommended)
- Clerk authentication account (for user auth)

## Step 1: Connect Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Select the root directory (automatic detection should work)
5. Click **"Deploy"**

## Step 2: Configure Environment Variables

Vercel will ask for environment variables during the deployment. Set these in the Vercel dashboard under **Project Settings → Environment Variables**:

### Required Variables

```bash
# Database Connection (PostgreSQL)
DATABASE_URL=postgresql://user:password@host:5432/noteora

# Clerk Authentication Keys (from clerk.com)
CLERK_PUBLISHABLE_KEY=pk_live_xxxxx
CLERK_SECRET_KEY=sk_live_xxxxx
VITE_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx

# CORS Configuration (comma-separated)
ALLOWED_ORIGINS=https://noteora.vercel.app

# Security
SESSION_SECRET=[generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"]

# Optional: Clerk Proxy URL (leave empty for CDN)
VITE_CLERK_PROXY_URL=

# Logging (trace | debug | info | warn | error | fatal)
LOG_LEVEL=info

# Build Configuration
NODE_ENV=production
BASE_PATH=/
```

### Environment Variable Security Best Practices

- ✅ Set different secrets for Production and Preview deployments
- ✅ Use **Vercel Secret Storage** for sensitive values (automatically masked in logs)
- ✅ Rotate `SESSION_SECRET` and `CLERK_SECRET_KEY` regularly
- ✅ Never commit `.env` file to Git (already in `.gitignore`)
- ✅ Review environment variables in each deployment

## Step 3: Database Setup

### Option A: Neon (Recommended - Serverless PostgreSQL)

1. Go to [Neon Console](https://console.neon.tech)
2. Create a new project and database
3. Copy the connection string from dashboard
4. In Vercel: Set `DATABASE_URL` to your Neon connection string
5. The connection string includes pooling endpoint by default ✅

### Option B: Supabase

1. Go to [Supabase](https://supabase.com)
2. Create a project and database
3. Navigate to **Settings → Database**
4. Copy the connection string (use **Pooling Connection String** for Vercel)
5. Set `DATABASE_URL` in Vercel environment variables

### Option C: Railway

1. Create project on [Railway](https://railway.app)
2. Add PostgreSQL plugin
3. Copy the generated `DATABASE_URL`
4. Set in Vercel environment variables

**Important:** Use a **pooling-enabled connection string** for serverless functions to avoid connection exhaustion.

## Step 4: Clerk Authentication Setup

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Navigate to **API Keys** in your application
3. Copy `Publishable Key` (pk_live_...) and `Secret Key` (sk_live_...)
4. In Vercel: Set `CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`
5. In Vercel: Set `VITE_CLERK_PUBLISHABLE_KEY` (frontend only needs this)

### Configure Clerk for Your Domain

1. In Clerk Dashboard → **Domains**
2. Add your production domain (e.g., `noteora.vercel.app` and `noteora.com`)
3. Add your preview domain (e.g., `noteora-staging.vercel.app`)
4. Configure allowed redirect URLs

## Step 5: Configure CORS Origins

Update `ALLOWED_ORIGINS` environment variable with all domains where your API will be called from:

```bash
# For single domain
ALLOWED_ORIGINS=https://noteora.vercel.app

# For multiple domains (comma-separated)
ALLOWED_ORIGINS=https://noteora.vercel.app,https://noteora.com,https://www.noteora.com
```

## Step 6: Verify Deployment

After deployment completes:

1. Visit `https://your-app.vercel.app`
2. Check the health endpoint: `https://your-app.vercel.app/api/health`
3. Test authentication flow
4. Verify database connectivity

### Health Check Response (Expected)

```json
{
  "status": "ok",
  "timestamp": "2026-01-15T10:30:00Z",
  "environment": "production"
}
```

## Troubleshooting

### Build Fails with TypeScript Errors

```bash
# Ensure all packages build correctly
pnpm run typecheck
pnpm run build
```

### 500 Errors on `/api` Routes

1. Check Vercel function logs: **Deployments → Logs**
2. Verify all environment variables are set
3. Ensure `DATABASE_URL` is accessible
4. Check database connection pooling is enabled

### CORS Errors in Frontend

1. Verify `ALLOWED_ORIGINS` includes your domain
2. Check `VITE_CLERK_PROXY_URL` configuration
3. Ensure frontend requests include credentials when needed

### Cold Start Delays

Serverless functions experience cold starts. This is normal and typically takes 1-2 seconds.

- API is optimized with 1024MB memory allocation
- Add monitoring to track cold start frequency

## Monitoring & Maintenance

### Enable Vercel Analytics

1. **Vercel Dashboard** → **Project Settings** → **Analytics**
2. Use the analytics dashboard to monitor:
   - Build times
   - Deployment frequency
   - Function execution time
   - Edge requests

### Set Up Error Alerts

1. **Project Settings** → **Notifications**
2. Configure failed deployment notifications
3. Set up error tracking (Sentry, Rollbar, etc.)

### Regular Maintenance

- **Weekly:** Review Vercel logs for errors/warnings
- **Monthly:** Check for dependency updates
  ```bash
  pnpm update --interactive
  ```
- **Quarterly:** Rotate `SESSION_SECRET` and re-generate Clerk keys

## Preview Deployments

Vercel automatically creates preview deployments for pull requests:

1. Preview environment variables are separate from production
2. Set up a staging database for preview deployments
3. Use different Clerk keys for preview if possible

Configure in Vercel → **Project Settings** → **Environment Variables**:
- Select **Preview** environment
- Set preview-specific DATABASE_URL and keys

## Production Checklist

- [ ] All environment variables set in Vercel dashboard
- [ ] Database connection verified and pooling enabled
- [ ] Clerk keys configured for production domain
- [ ] CORS origins updated for production domain
- [ ] Health endpoint returns 200 status
- [ ] Login/authentication flow tested
- [ ] All API endpoints working
- [ ] SSL certificate auto-configured (Vercel handles this)
- [ ] Custom domain configured (if applicable)
- [ ] Monitoring/error tracking enabled
- [ ] Database backups configured
- [ ] Performance metrics monitored

## Rollback Plan

If production has critical issues:

1. Vercel Dashboard → **Deployments**
2. Find the last known good deployment
3. Click the three dots → **Redeploy**
4. Or use Git: Push to trigger a new deployment from stable commit

## Advanced Configuration

### Custom Domain

1. In Vercel Dashboard → **Project Settings** → **Domains**
2. Add your custom domain (e.g., `noteora.com`)
3. Update DNS records as instructed by Vercel
4. Update `ALLOWED_ORIGINS` for new domain

### Edge Middleware

For additional security at the edge, consider adding Vercel's Edge Middleware:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Rate limiting, geo-blocking, etc.
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
```

### Cron Jobs

Configure serverless cron jobs in `vercel.json`:

```json
"crons": [
  {
    "path": "/api/cron/cleanup",
    "schedule": "0 2 * * *"
  }
]
```

## Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Neon Documentation](https://neon.tech/docs)
- Project GitHub Issues
- Vercel Support Dashboard

---

**Last Updated:** January 2026  
**Version:** 1.0.0
