# Production Configuration Checklist

Complete this checklist before deploying to Vercel production.

## Pre-Deployment Checks

### Code Quality
- [ ] All TypeScript errors resolved: `pnpm run typecheck`
- [ ] All tests passing: `pnpm run test` (if applicable)
- [ ] No console.logs or debug code in production build
- [ ] ESLint warnings addressed: `pnpm run lint` (if applicable)
- [ ] No commented-out code blocks

### Build Verification
- [ ] Local build succeeds: `pnpm run verify:production`
- [ ] No build warnings
- [ ] Bundle size acceptable (check Vite output)
  - Recommended: Main app < 200KB gzipped
  - Vendors split correctly for caching
- [ ] Assets optimized:
  - Images compressed
  - SVGs minified
  - Fonts optimized

### Environment Configuration
- [ ] `.env` file created locally (never commit)
- [ ] All required environment variables set in Vercel dashboard:
  - [ ] `DATABASE_URL` (connection pooling enabled)
  - [ ] `CLERK_PUBLISHABLE_KEY` (live key)
  - [ ] `CLERK_SECRET_KEY` (live key)
  - [ ] `SESSION_SECRET` (randomly generated)
  - [ ] `ALLOWED_ORIGINS` (correct domains)
  - [ ] `VITE_CLERK_PUBLISHABLE_KEY` (frontend only)
  - [ ] `NODE_ENV=production`
  - [ ] `LOG_LEVEL=info`
- [ ] Preview environment has separate variables
- [ ] No secrets in code or repository

### Database
- [ ] Production database created (Neon/Supabase/Railway)
- [ ] Connection pooling enabled
- [ ] Migrations applied
- [ ] Database backups configured
- [ ] Connection string tested locally
- [ ] Read replicas configured (if high traffic expected)

### Authentication (Clerk)
- [ ] Using live Clerk keys (pk_live_*, sk_live_*)
- [ ] Production domain added in Clerk dashboard
- [ ] Allowed redirect URLs configured
- [ ] Email templates reviewed
- [ ] Two-factor authentication enabled (if desired)

### Security
- [ ] `SESSION_SECRET` is cryptographically random (32+ chars)
- [ ] CORS origins whitelisted (no wildcard *)
- [ ] Security headers configured in vercel.json:
  - [ ] X-Content-Type-Options
  - [ ] X-Frame-Options
  - [ ] X-XSS-Protection
  - [ ] Strict-Transport-Security
  - [ ] Content-Security-Policy
- [ ] All sensitive data removed from repository
- [ ] API rate limiting enabled (configured in app.ts)
- [ ] HTTPS enforced (automatic on Vercel)
- [ ] `.env` and `.env.*` in .gitignore

### Performance
- [ ] Cache headers configured:
  - [ ] Static assets (1 year)
  - [ ] API responses (no-cache)
- [ ] Compression enabled (gzip, brotli)
- [ ] Lazy loading configured for routes
- [ ] Code splitting optimized (Vite chunks)
- [ ] Unnecessary dependencies removed
- [ ] Tree-shaking enabled

### Monitoring & Logging
- [ ] Health check endpoint tested: `/api/healthz`
- [ ] Log level set to `info` (not debug)
- [ ] Error tracking service configured (optional):
  - Sentry
  - Datadog
  - New Relic
- [ ] Performance monitoring enabled (Vercel Analytics)
- [ ] Uptime monitoring configured (optional)

### Domain & SSL
- [ ] Custom domain configured (if applicable)
- [ ] DNS records updated
- [ ] SSL certificate provisioned (automatic on Vercel)
- [ ] Domain in ALLOWED_ORIGINS
- [ ] Subdomain redirects configured (if needed)

### Verification Steps

1. **Test Local Build**
   ```bash
   pnpm run verify:production
   ```

2. **Deploy to Vercel**
   - Push to main branch, or
   - Use Vercel CLI: `vercel --prod`

3. **Test Production URL**
   ```bash
   # Health check
   curl https://your-app.vercel.app/api/healthz
   
   # Frontend loads
   curl https://your-app.vercel.app
   ```

4. **Test Key Features**
   - [ ] Login/signup flow works
   - [ ] Create/view/edit projects
   - [ ] API requests succeed
   - [ ] Database queries work
   - [ ] File uploads succeed (if applicable)
   - [ ] Notifications work (if applicable)

5. **Monitor First Hour**
   - [ ] Check Vercel function logs
   - [ ] Monitor error rate (should be 0%)
   - [ ] Check response times
   - [ ] Verify no database connection issues

## Post-Deployment Monitoring

### First 24 Hours
- Monitor error logs continuously
- Track API response times
- Check database connection pool usage
- Verify no unexpected costs

### Ongoing (Daily)
- Check daily error rate
- Monitor performance metrics
- Review Vercel analytics
- Check for security alerts

### Ongoing (Weekly)
- Review access logs for suspicious activity
- Check dependency update notifications
- Monitor cost trends
- Verify backups are working

### Ongoing (Monthly)
- Update dependencies: `pnpm update`
- Review security patches
- Rotate secrets if needed
- Analyze usage patterns

## Rollback Procedure

If critical issues arise:

1. **Immediate Rollback (< 1 minute)**
   ```bash
   # Find previous deployment in Vercel dashboard
   # Click "..." → "Redeploy"
   # Or use CLI: vercel rollback
   ```

2. **Gradual Rollback (< 5 minutes)**
   - Switch to previous Git commit
   - Push to production branch
   - Deploy normally

3. **Scheduled Rollback (planned maintenance)**
   - Schedule maintenance window in status page
   - Communicate with users
   - Deploy fix
   - Verify in production
   - Remove maintenance message

## Documentation

- [ ] DEPLOYMENT.md reviewed and up-to-date
- [ ] Run-book created for common issues
- [ ] Team trained on deployment process
- [ ] Incident response plan defined
- [ ] Status page configured (if applicable)

## Performance Targets

Aim for these metrics in production:

- **Core Web Vitals:**
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1
  
- **API Performance:**
  - Average response time: < 200ms
  - 95th percentile: < 500ms
  - 99th percentile: < 1000ms
  
- **Availability:**
  - Uptime: > 99.9%
  - Error rate: < 0.1%

## Emergency Contacts

- Vercel Support: https://vercel.com/support
- Clerk Support: https://clerk.com/support
- Database Provider Support: [provider dashboard]
- Team Lead: [contact]
- On-Call Rotation: [schedule]

---

**Last Updated:** January 2026  
**Version:** 1.0.0  
**Status:** ✅ Production Ready
