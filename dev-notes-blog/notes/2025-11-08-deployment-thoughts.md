---
title: "Deployment Strategy & Next Steps"
date: "2025-11-08T20:00:00Z"
description: "Planning deployment and thinking about the aggregator client"
tags: ["deployment", "vercel", "planning"]
---

## Deployment Options

Need to get this live. Options:

1. **Vercel** - Obvious choice for Next.js. Zero config deployment.
2. **Netlify** - Also good, but Vercel has better Next.js integration.
3. **Self-hosted** - Could do, but defeats the "quick to deploy" goal.

Going with Vercel. Push to GitHub, connect the repo, done.

## Static vs. Dynamic

The blog can be fully static since notes don't change frequently. Using `output: 'export'` would make it pure static HTML.

But keeping it dynamic has benefits:
- API routes work
- Can add dynamic features later
- ISR (Incremental Static Regeneration) for best of both worlds

Decision: Keep it dynamic but use aggressive caching.

## Caching Strategy

```typescript
headers: {
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
}
```

- `s-maxage=60`: CDN caches for 60 seconds
- `stale-while-revalidate=30`: Serve stale content while revalidating

Means notes updates appear within ~60 seconds, but most requests are instant.

## The Aggregator Client

This is step 2. The fun part.

### Concept

A separate Next.js app that:
1. Maintains a list of developer metadata URLs
2. Fetches all notes from all developers
3. Aggregates them in a unified timeline
4. Allows filtering by developer, tags, date range

### Data Flow

```
[Developer Blog 1] --metadata--> [Aggregator]
[Developer Blog 2] --metadata--> [Aggregator]
[Developer Blog 3] --metadata--> [Aggregator]
                                      |
                                      v
                            [Unified Timeline View]
```

### Technical Approach

Use Next.js server components to fetch all notes at build time:

```typescript
async function fetchAllNotes() {
  const developers = await loadDeveloperList();

  const allNotes = await Promise.all(
    developers.map(async (dev) => {
      const metadata = await fetch(dev.metadataUrl).then(r => r.json());
      const notes = await fetch(metadata.fileList.url).then(r => r.json());

      return notes.map(note => ({
        ...note,
        developer: metadata.profile,
      }));
    })
  );

  return allNotes.flat().sort((a, b) => b.date - a.date);
}
```

Parallel fetching for speed. Flatten and sort by date.

### Features to Add

- **Search** - Full-text search across all notes
- **Tag Cloud** - See popular tags across community
- **Developer Filter** - Show notes from specific developers
- **RSS Feed** - Classic feed for the aggregated timeline
- **Local Storage** - Remember which developers you follow

### UI Considerations

Keep the terminal aesthetic but add some color coding:
- Each developer gets a unique terminal color
- Maybe subtle backgrounds to distinguish sources
- Click developer name to filter to just their notes

## Timeline

- **Today**: Get blog deployed ✓
- **Tomorrow**: Build basic aggregator
- **Next**: Add advanced filtering
- **Future**: Community features?

## Thoughts on Decentralization

This approach is interesting because:
1. No central server owns the content
2. Each developer controls their own notes
3. Aggregator is just a view layer
4. Multiple aggregators can exist
5. Notes survive even if aggregator dies

It's like RSS but for dev notes. Which is basically what RSS was meant for anyway.

## Final Note

Need to create at least 5 notes for the event. This is number 5. Mission accomplished.

Now to deploy and share the metadata URL with the community.

---

*Ship it.*

## Update: Post-Deployment

Deployed to Vercel. The process was literally:
1. Push to GitHub
2. Import repo in Vercel
3. Deploy

Time: ~2 minutes.

Metadata URL: `https://your-blog.vercel.app/api/metadata.json`

Share that URL and others can consume your notes. Decentralized dev notes achieved.

---

*Sometimes the best solutions are the simple ones.*
