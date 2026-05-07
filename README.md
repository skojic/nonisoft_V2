# NONI-SOFT | The Architect of Intelligence

A cutting-edge, dark futuristic AI services website showcasing a premium brand identity with advanced interactive design elements.

## 🎨 Design Concept

**"The Architect of Intelligence"** — A dark, neon-accented digital experience that positions NONI-SOFT as a strategic AI partner building the computational brains of modern businesses.

### Visual Identity

- **Color Palette (Digital Midnight)**
  - Primary Black: `#050505`
  - Deep Space Blue: `#0A0B10`
  - Electric Cobalt: `#0080FF` (Primary links & buttons)
  - Cyber Lime: `#CCFF00` (CTAs & highlights)
  - Radioactive Orange: `#FF6B00` (Accent accents)

- **Typography**
  - Headers: Wide, imposing sans-serif (Inter - bold & extrabold weights)
  - Code/Labels: JetBrains Mono (monospace for technical credibility)

## ✨ Key Features

### Interactive Elements
- **Custom Cursor**: Glowing crosshair that reacts to interactive elements
- **Terminal Boot Sequence**: Loading screen with animated code-like terminal text
- **Live AI Widget**: Dashboard showing real-time metrics (data streams, processing power, predictions)
- **Scanning Effect**: Horizontal line animation over the 3D sphere
- **Mesh Gradients**: Animated gas-cloud-like background gradients

### Visual Effects
- **3D Canvas Animation**: Particle-based AI sphere with orbiting rings and neural networks
- **Glass Morphism Panels**: Semi-transparent floating panels with glassmorphic design
- **Smooth Parallax**: Hero section moves with scroll
- **Glow Effects**: Neon-inspired glowing text and borders
- **Dynamic Hover States**: Interactive buttons and cards with elevated states

### Content Sections
1. **Hero Section**: Bold headline "ENGINEERING INTELLIGENCE." with CTA
2. **Services Grid**: 6 service cards with hover animations
3. **About Section**: Company mission and key statistics
4. **Contact Section**: Direct call-to-action with contact information
5. **Live AI Widget**: Fixed widget showing real-time metrics

## 📁 Project Structure

```
nonisoft_V2/
├── index.html                 # Main HTML file
├── styles/
│   ├── main.css              # Primary styles & layout
│   └── animations.css        # Advanced animation definitions
├── js/
│   ├── cursor.js             # Custom cursor implementation
│   ├── loading.js            # Boot sequence & loading screen
│   ├── canvas-animation.js   # 3D sphere & particle system
│   ├── interactions.js       # Hover effects & interactions
│   └── mesh-gradient.js      # Background gradient animation
└── README.md                 # This file
```

## 🚀 How to Use

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nonisoft_V2
   ```

2. **Serve locally**
   - Using Python 3:
     ```bash
     python -m http.server 8000
     ```
   - Using Python 2:
     ```bash
     python -m SimpleHTTPServer 8000
     ```
   - Using Node.js (http-server):
     ```bash
     npx http-server
     ```

3. **Open in browser**
   - Navigate to `http://localhost:8000`

### Keyboard Shortcuts
- Press **S** - Jump to Services section
- Press **C** - Jump to Contact section
- Press **A** - Jump to About section

## 🎯 Core Messaging

**Main Headline:** "ENGINEERING INTELLIGENCE."

**Tagline:** "We don't just write code; we build the brains of your business."

This messaging immediately positions NONI-SOFT as:
- Not just a service provider, but a strategic partner
- Focused on AI and intelligent systems
- Committed to transforming business operations

## 🛠️ Customization Guide

### Changing Colors
Edit the CSS variables in `styles/main.css`:
```css
:root {
    --primary-black: #050505;
    --deep-space-blue: #0A0B10;
    --electric-cobalt: #0080FF;
    --cyber-lime: #CCFF00;
    --radioactive-orange: #FF6B00;
}
```

### Modifying Content
- **Hero Section**: Edit hero title, subtitle, and CTA in `index.html`
- **Services**: Update service cards with your offerings
- **About Section**: Customize company information and statistics
- **Contact**: Update email, phone, and social links

### Adjusting Animations
- **Canvas Speed**: Edit `time += 0.01` in `canvas-animation.js`
- **Loading Duration**: Modify timeout in `loading.js` (currently 3 seconds)
- **Widget Update Interval**: Change interval in `interactions.js` (currently 4 seconds)

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px and above)
- Tablet (768px - 1024px)
- Mobile (below 768px)

Breakpoints are defined in `main.css`.

## 🔧 Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## 📈 Performance Optimizations

- Canvas rendering with requestAnimationFrame
- CSS animations instead of JS where possible
- Intersection Observer for lazy loading effects
- Optimized particle system with configurable count

## 🎬 Loading Sequence

The loading screen displays:
1. "INITIALIZING NONI-SOFT ARCHITECTURE..."
2. "LOADING INTELLIGENCE CORE..."
3. "SYNCING AI NETWORKS..."
4. "ESTABLISHING SECURE CONNECTION..."
5. "READY..." (with animated dots)

Automatically closes after 3 seconds or when all resources are loaded.

## 🚀 Deployment

### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### Vercel
```bash
npm install -g vercel
vercel
```

### GitHub Pages
Push to your `gh-pages` branch:
```bash
git push origin main:gh-pages
```

### Traditional Hosting
1. Upload all files to your web server
2. Ensure `.htaccess` or server configuration serves `index.html` for routing
3. No build process required - pure HTML/CSS/JS

## 📝 License

This project is proprietary to NONI-SOFT. All rights reserved.

## 🤝 Contact

- Email: hello@noni-soft.com
- Phone: +1 (234) 567-8900

---

**Built with precision. Engineered for impact.**
