# DEPLOYMENT GUIDE

## Quick Start

Your NONI-SOFT website is ready to deploy. Follow the guide below for your preferred hosting platform.

---

## 📦 Option 1: Netlify (Recommended)

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Deploy
```bash
cd /Users/828108/Projects/nonisoft_V2
netlify deploy
```

### Step 3: Follow prompts
- Connect to your Netlify account
- Select the current directory as publish folder
- Deploy!

### Custom Domain
1. Go to Netlify dashboard
2. Go to Domain settings
3. Add your custom domain (e.g., noni-soft.com)

---

## 🚀 Option 2: Vercel

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
```bash
cd /Users/828108/Projects/nonisoft_V2
vercel
```

### Step 3: Follow prompts
- Link to your Vercel account
- Confirm project settings
- Deploy!

---

## 📄 Option 3: GitHub Pages

### Step 1: Create GitHub Repository
```bash
cd /Users/828108/Projects/nonisoft_V2
git init
git add .
git commit -m "Initial commit: NONI-SOFT website"
git remote add origin https://github.com/YOUR_USERNAME/nonisoft_V2.git
git branch -M main
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to repository Settings
2. Navigate to Pages section
3. Select "Deploy from a branch"
4. Choose `main` branch, root folder
5. Click Save

Your site will be available at: `https://YOUR_USERNAME.github.io/nonisoft_V2`

### Custom Domain
1. In repository settings > Pages
2. Add custom domain (e.g., noni-soft.com)
3. Update DNS records with GitHub's IP addresses

---

## 🌐 Option 4: Traditional Web Hosting (Shared/Dedicated Server)

### Via FTP

1. **Download FTP Client**
   - FileZilla (free & recommended)
   - Cyberduck
   - WinSCP (Windows)

2. **Connect to Server**
   - Host: your-server-address.com
   - Username: your-ftp-username
   - Password: your-ftp-password
   - Port: 21 (or your host's specified port)

3. **Upload Files**
   - Navigate to `/public_html/` or `/www/` directory
   - Upload all files from nonisoft_V2 folder
   - Ensure `index.html` is in the root

4. **Test**
   - Visit your-domain.com
   - All files should load correctly

### Via SSH (Command Line)

```bash
# Connect to server
ssh user@your-server.com

# Navigate to web root
cd ~/public_html/

# Clone repository or upload files
# (Option A - if using GitHub)
git clone https://github.com/YOUR_USERNAME/nonisoft_V2.git

# (Option B - upload via scp)
scp -r /Users/828108/Projects/nonisoft_V2/* user@your-server.com:~/public_html/
```

---

## ☁️ Option 5: AWS Amplify

### Step 1: Connect GitHub Repository
1. Go to AWS Amplify Console
2. Click "New app" → "Host web app"
3. Select GitHub and authorize
4. Select your nonisoft_V2 repository

### Step 2: Configure Build Settings
- Framework: `None (or Static site)`
- Build command: (leave empty)
- Output directory: `.`

### Step 3: Deploy
Click "Deploy app" and wait for completion.

---

## 📦 Option 6: Firebase Hosting

### Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

### Step 2: Initialize Firebase
```bash
firebase login
cd /Users/828108/Projects/nonisoft_V2
firebase init hosting
```

### Step 3: Configure
- Select your Firebase project
- Set public directory to `.`
- Configure as single-page app: `No`

### Step 4: Deploy
```bash
firebase deploy
```

---

## 🔧 Option 7: Docker Containerization

### Dockerfile
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Build & Run
```bash
cd /Users/828108/Projects/nonisoft_V2
docker build -t nonisoft-website .
docker run -p 8080:80 nonisoft-website
```

Access at: `http://localhost:8080`

---

## 🌍 Domain Registration & DNS Setup

### Where to Register
- **Namecheap** (affordable, user-friendly)
- **GoDaddy** (popular, lots of options)
- **Google Domains** (simple, integrated)
- **Cloudflare** (fast, great features)

### DNS Configuration Example (for Netlify)

If deploying to Netlify:
1. Go to domain registrar
2. Find DNS settings
3. Update nameservers to Netlify's:
   - dns1.p02.nsone.net
   - dns2.p02.nsone.net
   - dns3.p02.nsone.net
   - dns4.p02.nsone.net

Or add CNAME record:
- **Type**: CNAME
- **Name**: www
- **Value**: your-site.netlify.app

---

## 🔒 SSL/HTTPS Certificate

### Automatic (Recommended)
- **Netlify**: Automatic Let's Encrypt certificate
- **Vercel**: Automatic certificate
- **GitHub Pages**: Automatic with custom domain
- **Firebase**: Automatic certificate

### Manual (Traditional Hosting)
- Use **Let's Encrypt** (free):
  ```bash
  certbot certonly --webroot -w /var/www/html -d noni-soft.com
  ```
- Or purchase from your hosting provider

---

## 📊 Post-Deployment Checklist

- [ ] Website loads without errors
- [ ] Custom cursor works
- [ ] Loading screen displays correctly
- [ ] 3D sphere canvas animates
- [ ] Live AI widget updates
- [ ] All links work (internal and external)
- [ ] Navigation smooth scrolling works
- [ ] Responsive design on mobile
- [ ] All images and assets load
- [ ] Contact information is correct
- [ ] Performance is acceptable (< 3s load time)

---

## 🚨 Troubleshooting

### Blank Page or 404 Error
- Ensure `index.html` is in root directory
- Check file permissions (755 for directories, 644 for files)
- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)

### Styles/Scripts Not Loading
- Check file paths in HTML (must be relative: `./styles/main.css`)
- Verify .css and .js files exist in correct folders
- Check browser console for 404 errors (F12)

### Custom Cursor Not Working
- Confirm JavaScript is enabled
- Check for browser console errors
- Try different browser to isolate issue

### Performance Issues
- Use browser DevTools (F12) to profile
- Consider image optimization
- Enable gzip compression on server
- Use CDN for faster delivery

### Animations Not Smooth
- Check GPU acceleration is enabled
- Try different browser
- Reduce particle count in `canvas-animation.js`
- Check CPU usage during animation

---

## 📈 SEO & Analytics Setup

### Google Analytics
Add to `<head>` in `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Meta Tags for SEO
Already included, but verify:
```html
<meta name="description" content="...">
<meta name="keywords" content="AI, software, engineering">
<meta name="author" content="NONI-SOFT">
```

---

## 🔄 Continuous Deployment

### GitHub Actions (Auto-deploy on push)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Netlify

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: '.'
          production-deploy: true
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## 📞 Support

For deployment issues:
1. Check the platform's documentation
2. Review browser console errors (F12)
3. Contact hosting platform support
4. Review logs in deployment dashboard

---

## 🎉 You're Ready!

Your NONI-SOFT website is now deployed and ready to showcase your AI expertise to the world.

**Next steps:**
- Share on LinkedIn
- Send to potential clients
- Add to your email signature
- Integrate contact form backend

Good luck! 🚀
