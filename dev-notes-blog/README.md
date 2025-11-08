# Dev Notes Blog

A personal developer notes blog inspired by John Carmack's legendary .plan files. Part of a decentralized dev notes ecosystem.

## Features

- **Personal Blog**: Share your development notes, thoughts, and progress
- **Markdown + Frontmatter**: Write notes in simple markdown with YAML frontmatter
- **Standard API**: Expose your notes through standardized JSON endpoints
- **Vintage Terminal UI**: Retro hacker aesthetic with green-on-black terminal styling
- **Fast & Static**: Built with Next.js for optimal performance

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Customize Your Profile

Edit `data/metadata.json` with your information:

```json
{
  "version": "1.0.0",
  "profile": {
    "name": "Your Name",
    "avatar": "https://your-avatar-url.jpg",
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

### 3. Write Your First Note

Create a markdown file in the `notes/` directory:

```markdown
---
title: "My First Dev Note"
date: "2025-11-08T10:00:00Z"
description: "Getting started with dev notes"
tags: ["intro", "meta"]
---

## What I'm Building

Today I started working on...

## Challenges

The main challenge was...

## Next Steps

- [ ] Finish feature X
- [ ] Optimize Y
- [ ] Deploy to production
```

### 4. Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 5. Deploy

Deploy to Vercel (recommended):

```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git push

# Then connect your repo in Vercel dashboard
```

Or use the Vercel CLI:

```bash
npm install -g vercel
vercel
```

## API Endpoints

Your blog exposes three standard endpoints:

### GET /api/metadata.json

Returns your profile and API information:

```json
{
  "version": "1.0.0",
  "profile": { ... },
  "fileList": {
    "url": "/api/notes.json",
    "format": "json",
    "lastUpdated": "2025-11-08T00:00:00Z"
  }
}
```

### GET /api/notes.json

Returns a list of all your notes:

```json
[
  {
    "slug": "note-slug",
    "title": "Note Title",
    "date": "2025-11-08T00:00:00Z",
    "description": "Brief description",
    "tags": ["tag1", "tag2"]
  }
]
```

### GET /api/notes/[slug]

Returns a specific note with full markdown content:

```json
{
  "slug": "note-slug",
  "title": "Note Title",
  "date": "2025-11-08T00:00:00Z",
  "description": "Brief description",
  "tags": ["tag1", "tag2"],
  "content": "# Full markdown content..."
}
```

## Sharing Your Notes

Once deployed, share your metadata URL with others:

```
https://your-blog.vercel.app/api/metadata.json
```

This allows aggregators to discover and display your notes alongside other developers' notes.

## File Structure

```
dev-notes-blog/
├── app/
│   ├── api/
│   │   ├── metadata.json/route.ts    # Metadata endpoint
│   │   ├── notes.json/route.ts       # Notes list endpoint
│   │   └── notes/[slug]/route.ts     # Individual note endpoint
│   ├── notes/[slug]/page.tsx         # Note detail page
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home page (notes list)
│   └── globals.css                   # Styles
├── notes/                            # Your markdown notes
│   └── *.md
├── data/
│   └── metadata.json                 # Your profile
├── lib/
│   └── notes.ts                      # Note parsing utilities
└── types/
    └── index.ts                      # TypeScript types
```

## Writing Notes

### Frontmatter Fields

- `title` (required): Note title
- `date` (required): ISO 8601 date string
- `description` (optional): Brief description
- `tags` (optional): Array of tags

### Markdown Features

Supports GitHub Flavored Markdown:

- Headers
- Code blocks with syntax highlighting
- Lists (ordered and unordered)
- Links and images
- Tables
- Blockquotes
- And more...

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **gray-matter** (frontmatter parsing)
- **react-markdown** (markdown rendering)

## Inspiration

Inspired by John Carmack's .plan files from the 1990s-2000s. Read them here:
https://github.com/oliverbenns/john-carmack-plan

## License

MIT - Build your own, share your knowledge.
