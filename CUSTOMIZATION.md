# CUSTOMIZATION GUIDE

A comprehensive guide to customizing your NONI-SOFT website to match your brand.

---

## 🎨 Changing Colors

### Method 1: Edit CSS Variables (Recommended)

Open `styles/main.css` and find the `:root` section at the top:

```css
:root {
    --primary-black: #050505;
    --deep-space-blue: #0A0B10;
    --electric-cobalt: #0080FF;
    --cyber-lime: #CCFF00;
    --radioactive-orange: #FF6B00;
    --glass-white: #FFFFFF;
    --subtle-gray: #1A1B25;
    --accent-purple: #7C3AED;
}
```

Change any color code to your desired color. For example:
```css
--electric-cobalt: #FF00FF;  /* Change to magenta */
--cyber-lime: #00FF00;        /* Change to bright green */
```

### Method 2: Using config.json

Edit `config.json` and update the colors section:
```json
"colors": {
    "primaryBlack": "#050505",
    "deepSpaceBlue": "#0A0B10",
    "electricCobalt": "#0080FF",
    "cyberLime": "#CCFF00",
    "radioactiveOrange": "#FF6B00"
}
```

**Note**: Direct CSS changes take immediate effect; config.json is for reference.

---

## ✏️ Changing Text Content

### Company Information

In `index.html`, find and update:

**Logo/Company Name**:
```html
<div class="logo">
    <span class="logo-text">NONI-SOFT</span>
    <span class="logo-accent">.</span>
</div>
```

**Hero Headline**:
```html
<h1 class="hero-title">ENGINEERING<br>INTELLIGENCE.</h1>
```

**Hero Subtitle**:
```html
<p class="hero-subtitle">We don't just write code; we build the brains of your business.</p>
```

**About Section Title**:
```html
<h2>THE ARCHITECT OF INTELLIGENCE</h2>
```

**About Section Text**:
```html
<p>At NONI-SOFT, we don't just write code—we engineer the computational brains of your business.</p>
```

**Contact Information**:
```html
<a href="mailto:hello@noni-soft.com" class="contact-link">hello@noni-soft.com</a>
<a href="tel:+1234567890" class="contact-link">+1 (234) 567-8900</a>
```

---

## 🛠️ Customizing Services

### Update Service Cards

Find the services grid section in `index.html` and modify:

```html
<div class="service-card">
    <div class="card-icon">
        <span>⚙️</span>  <!-- Change emoji -->
    </div>
    <h3>Custom AI Integration</h3>  <!-- Change title -->
    <p>Seamlessly integrate intelligent systems...</p>  <!-- Change description -->
    <a href="#" class="card-link">EXPLORE →</a>
</div>
```

### Emoji Options
- 🧠 Brain
- ⚙️ Gears
- 🔐 Lock
- ⚡ Lightning
- 📊 Chart
- 🎯 Target
- 🚀 Rocket
- 💡 Lightbulb
- 🔬 Microscope
- 📡 Satellite

---

## 📊 Updating Statistics

### About Section Stats

Find the stats section and update values:

```html
<div class="stat-item">
    <span class="stat-number">500+</span>
    <span class="stat-label">Projects Delivered</span>
</div>
```

Change `500+` to your actual number and update the label as needed.

---

## 🎬 Adjusting Animation Speed

### Loading Screen Duration

In `js/loading.js`:
```javascript
setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
    }
}, 3000); // Change 3000 (3 seconds) to your desired duration in milliseconds
```

### Live Widget Update Interval

In `js/interactions.js`:
```javascript
setInterval(updateLiveData, 4000); // Change 4000 (4 seconds) to desired interval
```

### Canvas Animation Speed

In `js/canvas-animation.js`:
```javascript
time += 0.01; // Increase value (e.g., 0.02) for faster animation
              // Decrease value (e.g., 0.005) for slower animation
```

### Particle Speed

In `js/canvas-animation.js`:
```javascript
this.vx = (Math.random() - 0.5) * 2;  // Change * 2 to adjust speed
this.vy = (Math.random() - 0.5) * 2;
```

---

## 🎯 Changing Button Text

### CTA Buttons

```html
<button class="cta-button primary-cta">START YOUR PROJECT</button>
```

Change "START YOUR PROJECT" to your desired text (keep it short and action-oriented).

### Other Links

**Navigation Links**:
```html
<li><a href="#services" class="nav-link">Services</a></li>
```

Change "Services" to any label you prefer. Maintain the same `href` for proper linking.

---

## 🎨 Modifying Typography

### Change Header Font

In `styles/main.css`, locate:
```css
.hero-title {
    font-family: 'Inter', ...;
}
```

Change to alternative fonts:
```css
font-family: 'Poppins', sans-serif;
/* or */
font-family: 'Playfair Display', serif;
```

Add to `index.html` `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&display=swap" rel="stylesheet">
```

### Change Body Font

In `styles/main.css`:
```css
body {
    font-family: 'Inter', ...;
}
```

### Change Monospace Font

```css
.terminal-boot, .widget-title, .panel-label, .metric-label {
    font-family: 'JetBrains Mono', monospace;
}
```

Replace with:
```css
font-family: 'Courier New', monospace;
/* or any other monospace font */
```

---

## 🌐 Adding Social Links

Add social media links in the footer or contact section:

```html
<div class="social-links">
    <a href="https://twitter.com/yourhandle" target="_blank">Twitter</a>
    <a href="https://linkedin.com/company/yourcompany" target="_blank">LinkedIn</a>
    <a href="https://github.com/yourhandle" target="_blank">GitHub</a>
</div>
```

Add CSS styling:
```css
.social-links {
    display: flex;
    gap: var(--spacing-md);
    justify-content: center;
    margin-top: var(--spacing-lg);
}

.social-links a {
    color: var(--electric-cobalt);
    text-decoration: none;
    font-weight: var(--fw-semibold);
    transition: color 0.3s ease;
}

.social-links a:hover {
    color: var(--cyber-lime);
}
```

---

## 📱 Customizing Mobile Behavior

### Hide Elements on Mobile

Add to elements in `styles/main.css`:

```css
@media (max-width: 768px) {
    .element-to-hide {
        display: none;
    }
}
```

### Change Spacing on Mobile

```css
@media (max-width: 768px) {
    .service-card {
        padding: var(--spacing-md); /* Smaller padding */
    }
    
    .hero-title {
        font-size: 2rem; /* Smaller font */
    }
}
```

---

## 🎥 Adding Images/Videos

### Add Hero Background Image

```html
<div class="hero">
    <img src="path/to/image.jpg" alt="Hero" class="hero-background">
    <!-- Rest of content -->
</div>
```

CSS:
```css
.hero-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.1;
    z-index: 1;
}
```

### Add Background Video

```html
<video autoplay muted loop class="hero-video">
    <source src="path/to/video.mp4" type="video/mp4">
</video>
```

CSS:
```css
.hero-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.15;
    z-index: 1;
}
```

---

## 🔗 Adding Links & Routing

### Update Navigation Links

In `index.html`, modify the `href` attributes:

```html
<a href="#services" class="nav-link">Services</a>
<a href="#about" class="nav-link">About</a>
<a href="#contact" class="nav-link">Contact</a>
```

To link to external pages:
```html
<a href="https://example.com/portfolio" class="nav-link" target="_blank">Portfolio</a>
```

### Add New Sections

1. Add new section in HTML:
```html
<section class="portfolio" id="portfolio">
    <h2>Our Portfolio</h2>
    <!-- Content here -->
</section>
```

2. Add to navigation:
```html
<li><a href="#portfolio" class="nav-link">Portfolio</a></li>
```

3. Add CSS styling in `styles/main.css`

---

## 🔄 Changing Widget Content

### Update Live Metrics

In `index.html`, modify widget metrics:

```html
<div class="metric-item">
    <span class="metric-label">Your Custom Metric</span>
    <div class="metric-bar">
        <div class="metric-fill" style="width: 75%"></div>
    </div>
</div>
```

---

## 🎯 Performance Customization

### Reduce Particle Count

In `js/canvas-animation.js`:
```javascript
const particleCount = 50; // Change 50 to lower number (e.g., 30)
```

Lower numbers = better performance on slower devices

### Disable Animations

In `styles/main.css`, add:
```css
* {
    animation: none !important;
    transition: none !important;
}
```

### Reduce Parallax Effect

In `js/interactions.js`:
```javascript
hero.style.transform = `translateY(${scrollPosition * 0.3}px)`; // Change 0.5 to 0.3
```

Lower number = less parallax effect

---

## 🔍 SEO Customization

### Update Meta Tags

In `index.html` `<head>`:

```html
<meta name="description" content="Your company description here">
<meta name="keywords" content="AI, machine learning, software development">
<meta name="author" content="Your Company Name">
<meta property="og:title" content="Your Site Title">
<meta property="og:description" content="Your description">
<meta property="og:image" content="path/to/preview-image.jpg">
```

### Update Page Title

```html
<title>Your Company | AI Solutions</title>
```

---

## 📧 Contact Form Integration

### Add Contact Form

```html
<form id="contact-form" class="contact-form">
    <input type="email" placeholder="Your Email" required>
    <textarea placeholder="Your Message" required></textarea>
    <button type="submit" class="primary-cta">Send Message</button>
</form>
```

### Add Form Handler

Create `js/form-handler.js`:
```javascript
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    // Send to your backend/service
    // Example: Formspree, Netlify Forms, etc.
});
```

---

## 🎨 Advanced: Custom Cursor Customization

In `styles/main.css`, modify:

```css
.custom-cursor {
    width: 20px;
    height: 20px;
    border: 2px solid var(--electric-cobalt);
    border-radius: 50%;
}

.custom-cursor.active {
    transform: scale(1.5);
    box-shadow: 0 0 20px rgba(204, 255, 0, 0.8);
}
```

Change `border-radius: 50%` to `border-radius: 0` for square cursor.

---

## 🔧 Quick Reference: Common Changes

| What | Where | How |
|------|-------|-----|
| Main Color | `styles/main.css` | Change `--electric-cobalt` value |
| Company Name | `index.html` | Find `.logo-text` |
| Headline Text | `index.html` | Find `.hero-title` |
| Button Text | `index.html` | Find `.primary-cta` |
| Contact Email | `index.html` | Find `contact-link` with href="mailto:" |
| Animation Speed | `js/canvas-animation.js` | Change `time += 0.01` |
| Widget Interval | `js/interactions.js` | Change `setInterval` time |
| Particles | `js/canvas-animation.js` | Change `particleCount` |
| Font | `styles/main.css` | Change `font-family` |

---

## 💾 Saving Changes

After making changes:

1. **Save files** in VS Code (Cmd+S or Ctrl+S)
2. **Refresh browser** (Cmd+Shift+R or Ctrl+Shift+R)
3. **Clear cache** if needed (Browser Settings > Clear Browsing Data)
4. **Commit to Git** if using version control:
   ```bash
   git add .
   git commit -m "Update customizations"
   git push
   ```

---

## ⚠️ Common Issues & Solutions

### Changes not showing?
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)
- Close and reopen browser
- Check for typos in CSS/HTML

### Colors not updating?
- Ensure you changed the correct CSS variable
- Clear cache (as above)
- Check for conflicting CSS rules
- Use browser DevTools to inspect element

### Animations broken?
- Check browser console (F12) for errors
- Verify JavaScript file paths are correct
- Ensure CSS animations are not disabled globally
- Try in different browser

### Text overflowing?
- Adjust font-size in CSS
- Add `word-wrap: break-word` to container
- Increase container width/padding

---

## 📚 Resources

- **Google Fonts**: https://fonts.google.com/
- **Color Picker**: https://htmlcolorcodes.com/
- **CSS Reference**: https://developer.mozilla.org/en-US/docs/Web/CSS
- **HTML Reference**: https://developer.mozilla.org/en-US/docs/Web/HTML

---

## 🎉 You're Ready!

Your NONI-SOFT website is highly customizable. Don't be afraid to experiment and make it uniquely yours!

For questions or issues, refer to the README.md and IMPLEMENTATION.md files.

Happy customizing! ✨
