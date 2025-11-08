# Installation & Setup Guide

Complete installation instructions for the Decentralized Dev Notes System.

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.x or higher ([download](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn**
- **Git** (for deployment)
- **Code editor** (VS Code, Vim, etc.)

### Verify Installation

```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be 8.0.0 or higher
git --version   # Should be 2.0.0 or higher
```

## Installation

### Option 1: Clone This Repository

```bash
# Clone the repo
git clone https://github.com/yourusername/decentralized-dev-notes.git
cd decentralized-dev-notes
```

### Option 2: Download ZIP

1. Download the ZIP file
2. Extract to your desired location
3. Open terminal in that directory

## Setup Personal Blog

### 1. Install Dependencies

```bash
cd dev-notes-blog
npm install
```

This will install:
- Next.js 15.0.3
- React 19
- TypeScript
- Tailwind CSS
- gray-matter (frontmatter parsing)
- react-markdown (rendering)

**Expected time**: 1-2 minutes

### 2. Configure Your Profile

Edit `data/metadata.json`:

```bash
nano data/metadata.json
# or
code data/metadata.json
# or use any text editor
```

Update with your information:

```json
{
  "version": "1.0.0",
  "profile": {
    "name": "Your Name Here",
    "avatar": "https://github.com/yourusername.png",
    "contact": {
      "github": "yourusername",
      "linkedin": "https://linkedin.com/in/yourprofile",
      "email": "you@example.com",
      "twitter": "@yourhandle",
      "website": "https://yoursite.com"
    }
  },
  "fileList": {
    "url": "/api/notes.json",
    "format": "json"
  }
}
```

**Tip**: For GitHub avatar, use `https://github.com/USERNAME.png`

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

You should see the blog with 5 example notes!

### 4. Write Your First Note (Optional)

Create a file in `notes/`:

```bash
touch notes/2025-11-08-my-first-note.md
```

Edit with this template:

```markdown
---
title: "My First Note"
date: "2025-11-08T10:00:00Z"
description: "Testing my dev notes blog"
tags: ["test", "intro"]
---

## Hello World

This is my first dev note!

## What I Learned

Setting up this blog was easy...
```

Refresh browser - your note appears!

## Setup Aggregator

### 1. Install Dependencies

In a **new terminal window**:

```bash
cd dev-notes-aggregator
npm install
```

**Expected time**: 1-2 minutes

### 2. Configure Developer Sources

Edit `data/developers.json`:

```bash
nano data/developers.json
```

Add your blog (running on localhost):

```json
[
  {
    "name": "My Blog",
    "metadataUrl": "http://localhost:3000/api/metadata.json",
    "color": "#00ff00"
  }
]
```

### 3. Run Development Server

```bash
npm run dev
```

**Note**: Uses port 3001 by default (3000 is taken by blog)

Open [http://localhost:3001](http://localhost:3001)

You should see your notes aggregated!

## Verify Installation

### Check Blog Endpoints

```bash
# Metadata
curl http://localhost:3000/api/metadata.json

# Notes list
curl http://localhost:3000/api/notes.json

# Individual note
curl http://localhost:3000/api/notes/2025-11-08-project-kickoff
```

### Check Aggregator

```bash
# Aggregated notes
curl http://localhost:3001/api/notes
```

All should return valid JSON.

## Common Installation Issues

### Port Already in Use

**Error**: `Port 3000 is already in use`

**Solution**: Use a different port:

```bash
npm run dev -- -p 3002
```

### Module Not Found

**Error**: `Cannot find module 'next'`

**Solution**: Install dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

**Error**: TypeScript compilation errors

**Solution**: Ensure TypeScript is installed:

```bash
npm install --save-dev typescript @types/node @types/react @types/react-dom
```

### Permission Denied

**Error**: `EACCES: permission denied`

**Solution**: Don't use sudo. Fix npm permissions:

```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile
```

## Deployment

### Deploy to Vercel (Recommended)

#### 1. Create GitHub Repository

```bash
cd dev-notes-blog

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/yourusername/dev-notes-blog.git
git branch -M main
git push -u origin main
```

#### 2. Deploy with Vercel

**Option A: Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? dev-notes-blog
# - Directory? ./
# - Override settings? No

# Production deployment
vercel --prod
```

**Option B: Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

**Done!** Your blog is live at `https://your-project.vercel.app`

#### 3. Deploy Aggregator

Same process for aggregator:

```bash
cd dev-notes-aggregator
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/dev-notes-aggregator.git
git push -u origin main
vercel --prod
```

### Deploy to Netlify

#### 1. Create `netlify.toml`

```bash
cd dev-notes-blog
cat > netlify.toml << EOF
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
EOF
```

#### 2. Deploy

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

Or use Netlify dashboard (similar to Vercel).

### Self-Hosting

#### Using PM2

```bash
# Build
npm run build

# Install PM2
npm install -g pm2

# Start
pm2 start npm --name "dev-notes-blog" -- start

# Make persistent
pm2 save
pm2 startup
```

#### Using Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t dev-notes-blog .
docker run -p 3000:3000 dev-notes-blog
```

## Post-Installation

### Update Dependencies

Keep dependencies updated:

```bash
npm update
```

Check for outdated packages:

```bash
npm outdated
```

### Environment Variables

For production, set environment variables:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-blog.vercel.app
```

### Custom Domain

On Vercel:
1. Go to project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS settings as instructed

### Analytics (Optional)

Add Vercel Analytics:

```bash
npm install @vercel/analytics
```

Update `app/layout.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## Development Workflow

### Daily Workflow

1. **Write notes**: Create `.md` files in `notes/`
2. **Preview locally**: `npm run dev`
3. **Commit**: `git add . && git commit -m "Add note"`
4. **Deploy**: `git push` (auto-deploys on Vercel)

### Adding Features

1. **Create branch**: `git checkout -b feature-name`
2. **Make changes**: Edit code
3. **Test locally**: `npm run dev`
4. **Build**: `npm run build` (verify no errors)
5. **Commit and push**: `git push origin feature-name`
6. **Merge**: Create PR and merge

## Maintenance

### Backups

Your notes are in git, but also backup:

```bash
# Backup notes
tar -czf notes-backup-$(date +%Y%m%d).tar.gz notes/

# Backup entire project
git bundle create dev-notes-blog.bundle --all
```

### Monitoring

Check your deployments:

```bash
# Vercel CLI
vercel logs

# Or visit dashboard
```

### Updates

Update Next.js and dependencies periodically:

```bash
npm update next react react-dom
```

## Uninstallation

To remove:

```bash
# Delete local files
rm -rf dev-notes-blog dev-notes-aggregator

# Delete from Vercel
vercel remove dev-notes-blog
vercel remove dev-notes-aggregator

# Delete GitHub repos (via web interface)
```

## Getting Help

### Documentation

- [README.md](README.md) - Overview
- [QUICKSTART.md](QUICKSTART.md) - Quick guide
- [API-SPEC.md](API-SPEC.md) - API documentation
- [VIBERACING-GUIDE.md](VIBERACING-GUIDE.md) - Event guide

### Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Troubleshooting

Check [QUICKSTART.md](QUICKSTART.md) for common issues.

## Next Steps

After installation:

1. ✅ Customize your profile
2. ✅ Write your first note
3. ✅ Deploy to production
4. ✅ Share your metadata URL
5. ✅ Join or create an aggregator

**Happy coding! Happy writing!**

---

*Installation complete. Time to start documenting your journey.*
