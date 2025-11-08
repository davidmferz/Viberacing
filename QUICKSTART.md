# Quick Start Guide

Get your decentralized dev notes system running in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Git (optional, for deployment)

## Step 1: Setup Your Personal Blog (2 minutes)

```bash
# Navigate to the blog directory
cd dev-notes-blog

# Install dependencies
npm install

# Customize your profile
# Edit data/metadata.json with your information
nano data/metadata.json  # or use any text editor

# Start development server
npm run dev
```

Your blog is now running at [http://localhost:3000](http://localhost:3000)

## Step 2: Write Your First Note (1 minute)

The project includes 5 example notes. To add your own:

```bash
# Create a new note
touch notes/2025-11-08-my-first-note.md
```

Edit the file with this template:

```markdown
---
title: "My First Dev Note"
date: "2025-11-08T10:00:00Z"
description: "Getting started with decentralized dev notes"
tags: ["intro", "learning"]
---

## What I'm Working On

Today I set up my decentralized dev notes blog...

## What I Learned

The system uses markdown with frontmatter...

## Next Steps

- [ ] Deploy to Vercel
- [ ] Share my metadata URL
- [ ] Write more notes
```

Refresh your browser - your note appears!

## Step 3: Test the API (30 seconds)

Your blog exposes three endpoints:

```bash
# Metadata
curl http://localhost:3000/api/metadata.json | jq

# Notes list
curl http://localhost:3000/api/notes.json | jq

# Individual note
curl http://localhost:3000/api/notes/2025-11-08-project-kickoff | jq
```

## Step 4: Setup the Aggregator (1 minute)

In a new terminal:

```bash
# Navigate to aggregator directory
cd dev-notes-aggregator

# Install dependencies
npm install

# Update developer sources
# Edit data/developers.json to point to your blog
nano data/developers.json

# Change the first entry to:
{
  "name": "Your Name",
  "metadataUrl": "http://localhost:3000/api/metadata.json",
  "color": "#00ff00"
}

# Start development server
npm run dev
```

Your aggregator is now running at [http://localhost:3001](http://localhost:3001)

## Step 5: See It In Action (30 seconds)

1. Open [http://localhost:3001](http://localhost:3001)
2. You should see your notes from localhost:3000
3. Try the filters and search

That's it! You have a working decentralized dev notes system.

## Next Steps

### Customize Your Blog

1. **Change colors**: Edit `dev-notes-blog/app/globals.css`
2. **Add contact links**: Update `data/metadata.json`
3. **Write more notes**: Add `.md` files to `notes/`

### Deploy to Production

#### Deploy Blog to Vercel

```bash
cd dev-notes-blog

# Initialize git if needed
git init
git add .
git commit -m "Initial commit"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/dev-notes-blog.git
git push -u origin main

# Deploy with Vercel CLI
npm install -g vercel
vercel
```

Or use the Vercel dashboard:
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repo
3. Deploy (zero config needed)

#### Deploy Aggregator to Vercel

Same process:

```bash
cd dev-notes-aggregator

git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/dev-notes-aggregator.git
git push -u origin main

vercel
```

### Share Your Metadata URL

Once deployed, your metadata URL will be:

```
https://your-blog.vercel.app/api/metadata.json
```

Share this URL with:
- Event organizers (for Viberacing)
- Community aggregators
- Other developers

They can add it to their aggregator's `developers.json` file.

### Join a Community Aggregator

If someone else is running an aggregator:

1. Send them your metadata URL
2. They add it to their `data/developers.json`
3. Your notes appear in their timeline

### Run Your Own Community Aggregator

To aggregate notes from multiple developers:

1. Deploy your aggregator
2. Ask developers for their metadata URLs
3. Add URLs to `data/developers.json`
4. Notes aggregate automatically

## Troubleshooting

### Port Already in Use

If port 3000 or 3001 is busy:

```bash
# Blog on different port
npm run dev -- -p 3002

# Aggregator on different port
npm run dev -- -p 3003
```

### Notes Not Showing

1. Check frontmatter format (YAML syntax)
2. Ensure date is ISO 8601 format
3. Check file is in `notes/` directory
4. Verify file ends with `.md`

### Aggregator Not Fetching

1. Ensure blog is running
2. Check metadata URL is correct
3. Look for CORS issues (shouldn't happen locally)
4. Check browser console for errors

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Try again
npm run dev
```

## Tips

### Fast Note Writing

Use this script to create a new note:

```bash
#!/bin/bash
DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
SLUG=$(date +"%Y-%m-%d")-$1
FILE="notes/${SLUG}.md"

cat > $FILE << EOF
---
title: "$2"
date: "${DATE}"
description: "$3"
tags: []
---

## What I Built

## Challenges

## Next Steps
EOF

echo "Created: $FILE"
```

Save as `new-note.sh` and use:

```bash
chmod +x new-note.sh
./new-note.sh my-slug "My Note Title" "Brief description"
```

### Auto-Deploy on Push

If using Vercel, every `git push` automatically deploys.

For other platforms:
- Netlify: Same auto-deploy
- GitHub Pages: Use GitHub Actions
- Self-hosted: Setup git hooks

### Backup Your Notes

Your notes are markdown files in git. To backup:

```bash
# Push to GitHub
git push

# Or create a backup
tar -czf notes-backup.tar.gz notes/
```

### Migrate Notes

To move your blog to another platform:

1. Copy `notes/` directory
2. Copy `data/metadata.json`
3. Deploy anywhere that runs Next.js
4. Update your metadata URL

That's it! Your notes are portable.

## What to Do Next

1. **Write notes regularly** - Document what you build
2. **Deploy your blog** - Make it public
3. **Share your metadata URL** - Join the network
4. **Follow other developers** - Add them to your aggregator
5. **Customize the UI** - Make it yours

## Resources

- Main README: [README.md](README.md)
- Blog README: [dev-notes-blog/README.md](dev-notes-blog/README.md)
- Aggregator README: [dev-notes-aggregator/README.md](dev-notes-aggregator/README.md)
- John Carmack's .plan: https://github.com/oliverbenns/john-carmack-plan

## Questions?

Check the main README or the individual project READMEs for more details.

Happy note writing!

---

*"The best time to start was yesterday. The second best time is now."*
