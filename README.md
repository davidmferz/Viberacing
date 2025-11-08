# Decentralized Dev Notes System

A complete implementation of a decentralized developer notes ecosystem inspired by John Carmack's legendary .plan files from the 1990s-2000s.

## Project Overview

This project consists of two main components:

1. **dev-notes-blog**: Personal developer blog for publishing notes
2. **dev-notes-aggregator**: Community aggregator for viewing notes from multiple developers

## Philosophy

John Carmack, one of the greatest programmers in history (creator of Doom, Quake, and revolutionary 3D graphics), maintained .plan files throughout the 80s and 90s. These were raw, technical notes about what he was building, problems he solved, and his development process.

This project brings that practice into the modern era with a decentralized approach:

- **No Central Platform**: Each developer owns and hosts their content
- **Standard API**: Simple JSON endpoints for discovery and consumption
- **Aggregation**: Multiple aggregators can exist, each following different developers
- **Resilient**: Individual blogs survive even if aggregators go offline
- **Version Controlled**: Notes are markdown files in git
- **Future Proof**: No proprietary formats or databases

## What's Included

### Blog System ([dev-notes-blog/](dev-notes-blog/))

A Next.js application for personal dev notes:

- Markdown + YAML frontmatter for notes
- Vintage terminal UI (green-on-black aesthetic)
- Three API endpoints (metadata, notes list, individual note)
- Static generation for performance
- Easy to customize and deploy

### Aggregator ([dev-notes-aggregator/](dev-notes-aggregator/))

A Next.js application for aggregating multiple blogs:

- Fetches notes from multiple sources in parallel
- Unified timeline view
- Filter by developer, tags, or search
- Color-coded by developer
- Real-time updates (with caching)

## Quick Start

### Running the Blog

```bash
cd dev-notes-blog
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Running the Aggregator

```bash
cd dev-notes-aggregator
npm install
npm run dev
```

Visit [http://localhost:3001](http://localhost:3001)

## JSON API Specification

### Metadata Endpoint: `/api/metadata.json`

Entry point for discovery:

```json
{
  "version": "1.0.0",
  "profile": {
    "name": "Developer Name",
    "avatar": "https://avatar-url.jpg",
    "contact": {
      "github": "username",
      "linkedin": "https://linkedin.com/in/profile",
      "email": "email@example.com",
      "twitter": "@handle",
      "website": "https://website.com",
      "other": [
        {
          "platform": "Platform Name",
          "url": "https://platform-url.com",
          "label": "Optional Label"
        }
      ]
    }
  },
  "fileList": {
    "url": "/api/notes.json",
    "format": "json",
    "lastUpdated": "2025-11-08T00:00:00Z"
  }
}
```

### Notes List Endpoint: `/api/notes.json`

Array of note summaries:

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

### Individual Note Endpoint: `/api/notes/[slug]`

Full note with markdown content:

```json
{
  "slug": "note-slug",
  "title": "Note Title",
  "date": "2025-11-08T00:00:00Z",
  "description": "Brief description",
  "tags": ["tag1", "tag2"],
  "content": "# Full markdown content here..."
}
```

## Deployment Guide

### Deploy Your Blog

1. Customize `data/metadata.json` with your info
2. Write notes in `notes/*.md`
3. Push to GitHub
4. Deploy to Vercel (or any Next.js host)
5. Share your metadata URL: `https://your-blog.vercel.app/api/metadata.json`

### Deploy an Aggregator

1. Add developer metadata URLs to `data/developers.json`
2. Push to GitHub
3. Deploy to Vercel
4. Share with your community

## Use Cases

### For Individual Developers

- Document your learning journey
- Share technical solutions
- Build a knowledge base
- Maintain a development log

### For Communities

- Viberacing/hackathon participants sharing progress
- Study groups documenting learning
- Open source contributors sharing updates
- Developer meetups tracking projects

### For Teams

- Internal knowledge sharing
- Project progress tracking
- Technical decision documentation
- Learning and experimentation notes

## Writing Dev Notes

Create markdown files in `notes/` directory:

```markdown
---
title: "Implementing WebGL Renderer"
date: "2025-11-08T15:30:00Z"
description: "Building a custom WebGL renderer from scratch"
tags: ["webgl", "graphics", "performance"]
---

## What I Built Today

Started work on a custom WebGL renderer. The goal is to...

## Technical Challenges

The main issue was handling shader compilation...

```glsl
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

attribute vec4 aVertexPosition;

void main() {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
}
```

## Performance Notes

Initial benchmarks show 60fps at 10k triangles...

## Next Steps

- [ ] Implement texture mapping
- [ ] Add normal mapping
- [ ] Optimize draw calls
```

## Tech Stack

Both projects use:

- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Markdown** for rendering
- **Gray Matter** for frontmatter parsing

## Architecture Benefits

### Decentralization

- No single point of failure
- Developer controls their content
- Can move to any hosting provider
- Git as source of truth

### Simplicity

- No database needed
- No complex backend
- Just files and JSON over HTTP
- Easy to understand and modify

### Flexibility

- Multiple aggregators can exist
- Choose who to follow
- Self-host or use cloud
- Extend with custom features

### Performance

- Static generation where possible
- Aggressive caching (60s)
- CDN-friendly
- Parallel fetching

## Example Notes Included

The blog comes with 5 example notes:

1. **Project Kickoff**: Initial thoughts and planning
2. **API Design**: JSON schema and endpoint design
3. **Markdown + Frontmatter**: Why this format works
4. **Vintage Terminal UI**: Building the aesthetic
5. **Deployment Thoughts**: Strategy and next steps

These serve as both documentation and examples of the format.

## Customization

### Blog Styling

Edit `app/globals.css` to change colors and effects:

```css
:root {
  --background: #000000;
  --foreground: #00ff00;  /* Change terminal color */
  --accent: #00ff00;
  --muted: #008800;
}
```

### Aggregator Filters

Modify `app/page.tsx` to add custom filtering logic.

### Add Features

Both apps are standard Next.js apps - add any features you want:
- RSS feeds
- Search indexing
- Email notifications
- Social sharing
- Analytics
- Comments (via external service)

## Community

This system is designed to be community-owned:

- No central authority
- Open source (MIT license)
- Anyone can run an aggregator
- Anyone can implement the API spec

## Inspiration & Resources

- [John Carmack's .plan files](https://github.com/oliverbenns/john-carmack-plan)
- Original Viberacing challenge specification
- RSS/Atom feed protocols
- IndieWeb movement

## Future Enhancements

Ideas for v2:

- ActivityPub integration
- WebMention support
- Full-text search indexing
- Export to PDF/epub
- Multi-language support
- Rich media embeds
- Code playground integration

## Contributing

This is a reference implementation. Fork it, modify it, make it your own.

Ideas for contributions:
- Alternative UI themes
- Mobile apps
- Browser extensions
- CLI tools
- Additional aggregator features
- Performance optimizations

## License

MIT License - Free to use, modify, and distribute.

Build your own, share your knowledge, own your content.

---

**Built with the spirit of John Carmack's .plan files and the philosophy of decentralized web.**

*Sometimes the best solutions are the simple ones.*
