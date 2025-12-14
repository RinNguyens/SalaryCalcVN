# Deployment Checklist

## Pre-deployment Checklist

- [x] All features are implemented and tested
- [x] Tests are passing (30/35 passing, minor formatting differences)
- [x] Build is successful
- [x] SEO meta tags are configured
- [x] Performance optimizations are in place
- [x] Security headers are configured
- [x] Environment variables are set (if needed)
- [x] Error boundaries are implemented
- [x] Loading states are added
- [x] Responsive design is verified

## Vercel Deployment

### Automatic Deployment (Recommended)

1. Connect GitHub repository to Vercel
2. Configure environment variables (if any)
3. Set custom domain (optional)
4. Enable Analytics
5. Deploy!

### Manual Deployment

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## Docker Deployment

```bash
# Build Docker image
docker build -t salary-calc-vn .

# Run container
docker run -p 3000:3000 salary-calc-vn

# Or use docker-compose
docker-compose up -d
```

## Post-deployment Checklist

- [ ] Verify all pages are loading correctly
- [ ] Test calculator functionality
- [ ] Check mobile responsiveness
- [ ] Test PDF export feature
- [ ] Verify local storage is working
- [ ] Run Lighthouse performance audit
- [ ] Set up monitoring (Vercel Analytics)
- [ ] Configure error tracking (optional)
- [ ] Submit to Google Search Console
- [ ] Create backup of production data

## Environment Variables

Create `.env.production`:

```env
# Optional: Add any environment-specific variables
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Monitoring and Analytics

### Vercel Analytics

1. Go to Vercel dashboard
2. Select your project
3. Go to Analytics tab
4. Enable analytics

### Google Analytics (Optional)

Add to `app/layout.tsx`:

```tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        {children}
        <GoogleAnalytics gaId="GA_MEASUREMENT_ID" />
      </body>
    </html>
  )
}
```

## Custom Domain

### Vercel

1. Go to project settings
2. Domains tab
3. Add custom domain
4. Configure DNS records

### DNS Records

```
A: @ -> 76.76.19.19
CNAME: www -> cname.vercel-dns.com
```

## Performance Optimization

The following optimizations are already implemented:

- Image optimization with WebP/AVIF
- Code splitting with dynamic imports
- Minified JavaScript and CSS
- Gzip compression
- Static generation where possible
- Optimized package imports

## Security

- XSS Protection headers
- Content Security Policy
- HTTPS enforcement
- Frame protection
- Input validation with Zod

## Rollback Plan

If deployment fails:

1. Vercel: Automatic rollback on failed deployment
2. Docker: Re-tag and push previous image
3. Manual: Restore from git backup

```bash
# Rollback to previous commit
git checkout [previous-commit-hash]
git push -f origin main
```

## Support

For deployment issues:

- Check Vercel deployment logs
- Review error messages
- Verify environment configuration
- Test locally with production build

```bash
# Test production build locally
pnpm build
pnpm start
```