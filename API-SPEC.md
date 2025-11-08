# Decentralized Dev Notes API Specification v1.0

This document defines the standard API for decentralized developer notes.

## Overview

The API consists of three required endpoints that enable discovery and consumption of developer notes in a decentralized manner.

## Base Requirements

- All endpoints MUST return valid JSON
- All endpoints SHOULD support CORS for cross-origin requests
- All endpoints SHOULD include appropriate caching headers
- Date/time values MUST be in ISO 8601 format
- All URLs SHOULD use HTTPS in production

## Endpoint 1: Metadata

**Path**: `/api/metadata.json`

**Method**: `GET`

**Description**: Entry point for API discovery. Provides developer profile information and location of notes list.

### Response Schema

```typescript
{
  version: string;           // API version (e.g., "1.0.0")
  profile: {
    name: string;            // Developer name (required)
    avatar?: string;         // URL to avatar image
    contact?: {
      github?: string;       // GitHub username
      linkedin?: string;     // LinkedIn profile URL
      email?: string;        // Contact email
      twitter?: string;      // Twitter/X handle
      website?: string;      // Personal website URL
      other?: Array<{
        platform: string;    // Platform name
        url: string;         // Profile URL
        label?: string;      // Display label
      }>;
    };
  };
  fileList: {
    url: string;             // URL to notes list (required)
    format?: string;         // Format type (default: "json")
    lastUpdated?: string;    // ISO 8601 timestamp
  };
}
```

### Example Response

```json
{
  "version": "1.0.0",
  "profile": {
    "name": "John Developer",
    "avatar": "https://example.com/avatar.jpg",
    "contact": {
      "github": "johndeveloper",
      "linkedin": "https://linkedin.com/in/johndeveloper",
      "email": "john@example.com",
      "twitter": "@johndev",
      "website": "https://johndev.com"
    }
  },
  "fileList": {
    "url": "/api/notes.json",
    "format": "json",
    "lastUpdated": "2025-11-08T15:30:00Z"
  }
}
```

### Response Headers

```
Content-Type: application/json
Cache-Control: public, s-maxage=60, stale-while-revalidate=30
Access-Control-Allow-Origin: *
```

## Endpoint 2: Notes List

**Path**: Specified in `metadata.fileList.url`

**Typical Path**: `/api/notes.json`

**Method**: `GET`

**Description**: Returns an array of URLs pointing to individual markdown note files.

### Response Schema

```typescript
string[]  // Array of URLs to markdown files
```

### Example Response

```json
[
  "https://example.com/api/notes/2025-11-08-first-note.md",
  "https://example.com/api/notes/2025-11-07-webgl-renderer.md",
  "https://example.com/api/notes/2025-11-06-another-note.md"
]
```

### Sorting

- Notes SHOULD be sorted by date, newest first
- If not sorted, aggregators SHOULD sort client-side

### Response Headers

```
Content-Type: application/json
Cache-Control: public, s-maxage=60, stale-while-revalidate=30
Access-Control-Allow-Origin: *
```

## Endpoint 3: Individual Note

**Path**: `/api/notes/[slug].md`

**Method**: `GET`

**Description**: Returns the raw markdown file with YAML frontmatter.

### URL Parameter

- `slug`: The unique identifier (filename without extension)

### Response Format

Returns the complete markdown file including frontmatter:

```markdown
---
title: "Note Title"
date: "2025-11-08T10:00:00Z"
description: "Brief description"
tags: ["tag1", "tag2"]
---

## Note Content

Your markdown content here...
```

### Example Response

```
---
title: "My First Dev Note"
date: "2025-11-08T10:00:00Z"
description: "Getting started with dev notes"
tags: ["intro", "meta"]
---

## What I Built Today

Started working on a decentralized dev notes system...

## Challenges

The main challenge was...
```

### Error Response (404)

```
Note not found
```

### Response Headers

```
Content-Type: text/markdown; charset=utf-8
Cache-Control: public, s-maxage=3600, stale-while-revalidate=60
Access-Control-Allow-Origin: *
```

## Content Format

### Markdown

The `content` field MUST contain valid Markdown.

Recommended support:
- Headers (h1-h6)
- Bold, italic, strikethrough
- Links and images
- Code blocks with syntax highlighting
- Lists (ordered and unordered)
- Blockquotes
- Tables (GitHub Flavored Markdown)
- Task lists

### Frontmatter

While not required in the API response, notes stored as markdown files SHOULD use YAML frontmatter:

```markdown
---
title: "Note Title"
date: "2025-11-08T10:00:00Z"
description: "Brief description"
tags: ["tag1", "tag2"]
---

Markdown content here...
```

## Discovery Flow

Standard flow for aggregators to discover and consume notes:

1. Fetch `/api/metadata.json`
2. Extract `fileList.url` from metadata
3. Fetch notes list from that URL
4. For each note, construct URL: `/api/notes/[slug]`
5. Fetch individual notes as needed

## Caching Strategy

### Recommended Cache Headers

**Metadata**: 60 seconds with stale-while-revalidate

```
Cache-Control: public, s-maxage=60, stale-while-revalidate=30
```

**Notes List**: 60 seconds with stale-while-revalidate

```
Cache-Control: public, s-maxage=60, stale-while-revalidate=30
```

**Individual Note**: 3600 seconds (notes rarely change after publication)

```
Cache-Control: public, s-maxage=3600, stale-while-revalidate=60
```

### ETags

Servers SHOULD support ETags for efficient caching:

```
ETag: "abc123"
```

Clients can use `If-None-Match` header for conditional requests.

## CORS Support

All endpoints SHOULD include CORS headers to enable cross-origin consumption:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

## Rate Limiting

Implementations SHOULD be lenient with rate limits since:
- Most traffic will be cached by CDNs
- Aggregators fetch infrequently (every 60s)
- No write operations exist

If rate limiting is needed:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1699564800
```

## Error Handling

### HTTP Status Codes

- `200 OK`: Successful request
- `304 Not Modified`: Content unchanged (with ETags)
- `404 Not Found`: Note not found
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error
- `503 Service Unavailable`: Temporary unavailability

### Error Response Format

```json
{
  "error": "Error message here"
}
```

## Versioning

The API version is specified in `metadata.version`.

Current version: `1.0.0`

Future versions:
- **Patch** (1.0.x): Bug fixes, no breaking changes
- **Minor** (1.x.0): New optional fields, backward compatible
- **Major** (x.0.0): Breaking changes

## Optional Extensions

These are OPTIONAL extensions implementers MAY support:

### Full-Text Search

```
GET /api/search?q=query&tag=tagname
```

### RSS Feed

```
GET /rss.xml
GET /atom.xml
```

### Pagination

For large note collections:

```
GET /api/notes.json?page=2&limit=20
```

Response includes pagination metadata:

```json
{
  "notes": [...],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 150,
    "hasMore": true
  }
}
```

### Filtering

```
GET /api/notes.json?tag=webgl
GET /api/notes.json?since=2025-11-01
```

## Implementation Checklist

To implement a compliant dev notes blog:

- [ ] Expose `/api/metadata.json` with required fields
- [ ] Expose notes list endpoint (path in metadata)
- [ ] Expose individual note endpoints
- [ ] Use ISO 8601 dates throughout
- [ ] Return valid JSON
- [ ] Include appropriate cache headers
- [ ] Support CORS (Access-Control-Allow-Origin: *)
- [ ] Return 404 for missing notes
- [ ] Sort notes by date (newest first)

## Testing Your Implementation

### Manual Tests

```bash
# Test metadata
curl https://your-blog.com/api/metadata.json | jq

# Test notes list
curl https://your-blog.com/api/notes.json | jq

# Test individual note
curl https://your-blog.com/api/notes/your-slug | jq
```

### Automated Validation

```bash
# Validate JSON schema
npm install -g ajv-cli

ajv validate -s metadata-schema.json -d https://your-blog.com/api/metadata.json
```

## Security Considerations

### Content Security

- Sanitize markdown output to prevent XSS
- Validate frontmatter input
- Don't expose sensitive files (env, config)

### Rate Limiting

- Implement reasonable rate limits
- Use CDN for DDoS protection
- Cache aggressively

### Authentication

This spec is for PUBLIC notes only. For private notes:
- Add authentication layer
- Use API keys or OAuth
- Restrict CORS appropriately

## Reference Implementation

See:
- `dev-notes-blog/` - Full Next.js implementation
- `dev-notes-aggregator/` - Reference aggregator

## License

This specification is public domain. Implement freely.

## Changelog

### v1.0.0 (2025-11-08)

- Initial specification
- Three core endpoints defined
- JSON schema specified
- Caching recommendations added

---

**Questions?** Open an issue or contribute to the spec.
