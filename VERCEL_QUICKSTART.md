# Vercel Quick Start Deployment Guide

Get your Note-Saver app to production in 15 minutes.

## 5-Minute Setup (Automated)

### 1. Prepare Your Repository
```bash
# Ensure all changes are committed
git status
git add .
git commit -m "chore: prepare for production deployment"
git push origin main
```

### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "**Add New**" → "**Project**"
3. Select your GitHub repository
4. Vercel auto-detects the configuration ✓

### 3. Set Environment Variables
In Vercel Dashboard → Project Settings → Environment Variables:

```
DATABASE_URL                 = postgresql://...
CLERK_PUBLISHABLE_KEY       = pk_live_...
CLERK_SECRET_KEY            = sk_live_...
VITE_CLERK_PUBLISHABLE_KEY  = pk_live_...
SESSION_SECRET              = [generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"]
ALLOWED_ORIGINS             = https://your-app.vercel.app
LOG_LEVEL                   = info
```

### 4. Deploy
1. Click **"Deploy"**
2. Wait for build to complete (~2-3 minutes)
3. Once deployment is done, you'll see a **"Visit"** button

That's it! 🎉

## Detailed Setup (Explained)

### Database Setup (Choose One)

#### Neon (Recommended)
```
1. Go to https://console.neon.tech
2. Create a project
3. Copy "Connection string" (Pooling endpoint)
4. Paste as DATABASE_URL in Vercel
```

#### Supabase
```
1. Go to https://supabase.com
2. Create a project
3. Go to Settings → Database → Connection String
4. Copy "Pooling Connection String"
5. Paste as DATABASE_URL in Vercel
```

#### Railway
```
1. Create project at https://railway.app
2. Add PostgreSQL plugin
3. Copy DATABASE_URL from the plugin
4. Set in Vercel environment variables
```

### Clerk Setup
```
1. Go to https://clerk.com
2. Create application
3. Go to API Keys
4. Copy "Publishable Key" → CLERK_PUBLISHABLE_KEY
5. Copy "Secret Key" → CLERK_SECRET_KEY
6. In Clerk → Domains → Add your Vercel domain
7. Configure allowed redirect URIs
```

### Generate SESSION_SECRET
```bash
# Run once and copy the output
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Paste into Vercel as SESSION_SECRET environment variable
```

## Verify Deployment

```bash
# Check health endpoint
curl https://your-app.vercel.app/api/healthz

# Should return:
# {"status":"ok","timestamp":"2026-01-15T10:30:00Z","environment":"production","version":"1.0.0","uptime":123.45}

# Test frontend loads
curl https://your-app.vercel.app
```

## Common Issues & Fixes

### ❌ Build Fails - "Cannot find module"
```bash
# Solution: Ensure all dependencies are installed
pnpm install
pnpm run verify:production
```

### ❌ "Cannot connect to database"
- Verify DATABASE_URL is correct
- Ensure connection pooling is enabled
- Check database is accessible from Vercel (IP whitelist)

### ❌ "Clerk authentication not working"
- Verify CLERK_PUBLISHABLE_KEY matches frontend VITE_CLERK_PUBLISHABLE_KEY
- Add your domain to Clerk's "Allowed Origins"
- Check redirect URLs in Clerk dashboard

### ❌ "CORS error in browser"
- Add your domain to ALLOWED_ORIGINS
- Use comma-separated values for multiple domains
- Example: `https://app.vercel.app,https://app.com`

### ❌ "Timeout on /api routes"
- Check database connection pooling
- Verify SESSION_SECRET is set
- Review API logs in Vercel dashboard

## Monitoring After Deployment

### Check Logs
```
Vercel Dashboard → Deployments → [Your deployment] → Logs
```

### Monitor Performance
```
Vercel Dashboard → Analytics
```

### Set Up Alerts
```
Vercel Dashboard → Project Settings → Notifications
→ Enable: Failed Deployments, Critical Status
```

## Updates & Rollback

### Deploy Updates
```bash
# Make changes locally
git add .
git commit -m "your changes"
git push origin main

# Vercel automatically deploys!
```

### Quick Rollback
```
Vercel Dashboard → Deployments → [Previous deployment]
→ Click "..." → "Redeploy"
```

## Next Steps

1. ✅ Complete [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)
2. ✅ Review [DEPLOYMENT.md](./DEPLOYMENT.md) for advanced setup
3. ✅ Set up monitoring and error tracking
4. ✅ Configure custom domain (if applicable)
5. ✅ Train team on deployment process

## Useful Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Vercel Docs:** https://vercel.com/docs
- **Clerk Console:** https://dashboard.clerk.com
- **Database Console:**
  - Neon: https://console.neon.tech
  - Supabase: https://supabase.com/dashboard
  - Railway: https://railway.app

---

**Problems?** Check [DEPLOYMENT.md](./DEPLOYMENT.md) Troubleshooting section
