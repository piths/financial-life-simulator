# Deployment Guide 🚀

## Quick Deploy to Vercel (Recommended)

### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/financial-life-simulator)

### Option 2: Manual Deploy
1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for hackathon submission"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Environment Variables** (Optional):
   - Add AI API keys in Vercel dashboard
   - Go to Project Settings → Environment Variables
   - Add: `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GOOGLE_API_KEY`

## Alternative Deployment Options

### Netlify
1. Connect GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `.next`

### Railway
1. Connect GitHub repository
2. Railway auto-detects Next.js configuration
3. Deploy automatically

### Self-Hosted
```bash
npm run build
npm start
```

## Environment Variables

### Required (None - app works without AI)
The app functions fully without any environment variables.

### Optional (AI Features)
```env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=...
```

## Performance Optimizations

### Already Implemented:
- ✅ Next.js 14 with App Router
- ✅ Static generation where possible
- ✅ Optimized images and assets
- ✅ Mobile-first responsive design
- ✅ Efficient state management with Zustand
- ✅ Code splitting and lazy loading

### Build Output:
- **Landing Page**: 118 kB (fast loading)
- **Game Page**: 268 kB (includes charts and AI)
- **Total Bundle**: Optimized for performance

## Domain Setup (Optional)

### Custom Domain on Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

### Free Alternatives:
- Use the provided `.vercel.app` domain
- GitHub Pages (requires additional setup)
- Netlify free tier with custom subdomain

## Monitoring & Analytics

### Built-in Monitoring:
- Vercel provides automatic performance monitoring
- Real-time error tracking
- Usage analytics

### Optional Additions:
- Google Analytics (add tracking ID)
- Sentry for error monitoring
- PostHog for user analytics

## Security Considerations

### Already Implemented:
- ✅ No sensitive data stored client-side
- ✅ API keys properly secured (server-side only)
- ✅ HTTPS enforced on all deployments
- ✅ No user authentication required (privacy-first)

## Troubleshooting

### Common Issues:

**Build Fails**:
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

**Environment Variables Not Working**:
- Ensure variables are set in deployment platform
- Restart deployment after adding variables
- Check variable names match exactly

**Mobile Issues**:
- App is fully responsive and tested
- If issues persist, check viewport meta tag in layout.tsx

## Post-Deployment Checklist

- [ ] Test all major features on deployed version
- [ ] Verify mobile responsiveness
- [ ] Check AI features (if API keys configured)
- [ ] Test decision flow from start to finish
- [ ] Verify charts render correctly
- [ ] Test theme toggle functionality

## Support

If you encounter any deployment issues:
1. Check the build logs in your deployment platform
2. Ensure all dependencies are properly installed
3. Verify environment variables are correctly set
4. Test locally first with `npm run build && npm start`

---

**Your app is ready for the hackathon! 🎉**

The Financial Life Simulator is optimized for instant deployment and will work perfectly for judges to test and evaluate.