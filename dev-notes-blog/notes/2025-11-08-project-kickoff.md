---
title: "Project Kickoff: Decentralized Dev Notes"
date: "2025-11-08T10:00:00Z"
description: "Starting the journey of building a decentralized developer notes system inspired by John Carmack's .plan files"
tags: ["project-start", "architecture", "planning"]
---

## Initial Thoughts

Started working on a pretty cool concept today - a decentralized dev notes system. The idea is heavily inspired by John Carmack's legendary .plan files from the 90s. Those notes were raw, technical, and gave incredible insight into the development process.

## The Core Concept

Instead of centralizing all developer notes on one platform, each developer hosts their own notes and exposes them through a standardized API. Think RSS feeds but for developer notes.

### Key Requirements

1. **Personal Blog** - Each dev maintains their own note repository
2. **Standard API** - Three endpoints:
   - `/api/metadata.json` - Developer profile and API discovery
   - `/api/notes.json` - List of all notes
   - `/api/notes/[slug]` - Individual note content
3. **Markdown + Frontmatter** - Simple, portable, version-controllable
4. **Aggregator Client** - Read notes from multiple developers

## Technical Decisions

Went with **Next.js 14** for this. Reasons:
- Built-in API routes (no separate backend needed)
- Static generation for performance
- File-based routing is clean
- TypeScript support out of the box

For the markdown parsing, using `gray-matter` to handle frontmatter. It's battle-tested and does exactly what we need.

## The Aesthetic

Going for that vintage terminal/hacker look. Green text on black background, monospace fonts, scanline effects. It's both a nod to Carmack's era and just looks damn cool.

## Next Steps

- [ ] Build the aggregator client
- [ ] Test with multiple endpoints
- [ ] Deploy to Vercel
- [ ] Share metadata URL with the community

This is going to be fun.

---

*Time spent: ~2 hours*
*Mood: Excited*
