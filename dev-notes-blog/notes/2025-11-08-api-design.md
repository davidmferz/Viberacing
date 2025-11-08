---
title: "API Design & JSON Schema"
date: "2025-11-08T14:30:00Z"
description: "Designing the API specification and JSON schema for the dev notes system"
tags: ["api", "json-schema", "architecture"]
---

## The API Problem

Needed to figure out how to make these dev notes truly decentralized while keeping them discoverable and consumable. The solution: a simple, standardized JSON API.

## Metadata Endpoint

```json
{
  "version": "1.0.0",
  "profile": {
    "name": "Developer Name",
    "avatar": "https://...",
    "contact": {
      "github": "username",
      "linkedin": "https://...",
      "twitter": "@handle"
    }
  },
  "fileList": {
    "url": "/api/notes.json",
    "format": "json",
    "lastUpdated": "2025-11-08T00:00:00Z"
  }
}
```

This is the entry point. You share your `/api/metadata.json` URL and people can discover everything else from there.

## Notes List Endpoint

Returns an array of note summaries:

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

Intentionally minimal. Just enough info to render a list view.

## Individual Note Endpoint

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

## Why This Works

1. **Stateless** - No database needed, just files
2. **Cacheable** - Perfect for CDN caching
3. **Version Controlled** - Everything is in git
4. **Portable** - Move your notes anywhere
5. **Simple** - Just JSON and markdown

The beauty is in the simplicity. No complex protocols, no authentication (for public notes), no database sync nightmares.

## Implementation Notes

Using Next.js API routes, these endpoints are trivial to implement:

```typescript
// app/api/metadata.json/route.ts
export async function GET() {
  const metadata = JSON.parse(readFileSync('data/metadata.json', 'utf8'));
  return NextResponse.json(metadata);
}
```

Clean. Simple. Fast.

---

*This is how software should be built.*
