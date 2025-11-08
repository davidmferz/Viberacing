# Dev Notes Aggregator

A decentralized aggregator for developer notes. Collects and displays notes from multiple developers in a unified timeline.

## Features

- **Decentralized**: Each developer hosts their own notes
- **Aggregated Timeline**: View all notes from multiple sources in one place
- **Filtering**: Filter by developer, tags, or search
- **Real-time**: Fetches latest notes from all sources
- **Vintage UI**: Retro terminal aesthetic matching the blog theme

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Developer Sources

Edit `data/developers.json` to add developer metadata URLs:

```json
[
  {
    "name": "Developer Name",
    "metadataUrl": "https://their-blog.vercel.app/api/metadata.json",
    "color": "#00ff00"
  },
  {
    "name": "Another Developer",
    "metadataUrl": "https://another-blog.vercel.app/api/metadata.json",
    "color": "#00ffff"
  }
]
```

Each developer needs:
- `name`: Display name
- `metadataUrl`: URL to their `/api/metadata.json` endpoint
- `color`: Terminal color for that developer (optional)

### 3. Run Locally

```bash
npm run dev
```

Visit [http://localhost:3001](http://localhost:3001)

### 4. Deploy

Deploy to Vercel:

```bash
git init
git add .
git commit -m "Initial commit"
git push

# Connect repo in Vercel dashboard
```

Or use Vercel CLI:

```bash
vercel
```

## How It Works

### Discovery Flow

1. Aggregator reads `data/developers.json`
2. For each developer, fetches their metadata endpoint
3. From metadata, discovers their notes list endpoint
4. Fetches all notes from each developer
5. Combines and sorts by date
6. Displays in unified timeline

### API Flow

```
Aggregator
  │
  ├─> Developer 1: metadata.json
  │   └─> notes.json
  │       └─> [Note 1, Note 2, ...]
  │
  ├─> Developer 2: metadata.json
  │   └─> notes.json
  │       └─> [Note 3, Note 4, ...]
  │
  └─> Aggregated Timeline
      └─> [All notes sorted by date]
```

## Features

### Filtering

- **By Developer**: Click a developer badge to filter
- **By Tag**: Click a tag to see related notes
- **Search**: Full-text search across titles, descriptions, and developer names

### Color Coding

Each developer gets a unique terminal color:
- Green (#00ff00)
- Cyan (#00ffff)
- Yellow (#ffff00)
- Magenta (#ff00ff)

Colors cycle for more than 4 developers.

### Caching

API responses are cached for 60 seconds to reduce load:

```typescript
fetch(url, { next: { revalidate: 60 } })
```

## File Structure

```
dev-notes-aggregator/
├── app/
│   ├── api/
│   │   └── notes/route.ts          # Aggregated notes endpoint
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Main timeline view
│   └── globals.css                 # Styles
├── data/
│   └── developers.json             # Developer sources
├── lib/
│   └── aggregator.ts               # Aggregation logic
└── types/
    └── index.ts                    # TypeScript types
```

## Adding Your Blog

To add your dev notes blog to an aggregator:

1. Deploy your dev notes blog
2. Get your metadata URL: `https://your-blog.vercel.app/api/metadata.json`
3. Share it with the aggregator maintainer
4. They add it to their `developers.json`
5. Your notes appear in the timeline

## Running Your Own Aggregator

Anyone can run an aggregator! Steps:

1. Clone this repo
2. Add developer sources you want to follow
3. Deploy to Vercel
4. Share with your community

Multiple aggregators can exist, each following different sets of developers.

## API Endpoint

### GET /api/notes

Returns aggregated notes from all sources:

```json
[
  {
    "slug": "note-slug",
    "title": "Note Title",
    "date": "2025-11-08T00:00:00Z",
    "description": "Brief description",
    "tags": ["tag1", "tag2"],
    "developer": {
      "name": "Developer Name",
      "avatar": "https://...",
      "contact": { ... }
    },
    "sourceUrl": "https://their-blog.vercel.app/api/metadata.json",
    "noteUrl": "https://their-blog.vercel.app/notes/note-slug"
  }
]
```

## Tech Stack

- **Next.js 14** (App Router with Client Components)
- **TypeScript**
- **Tailwind CSS**
- **Parallel Fetching** (Promise.all for performance)

## Community Usage

This aggregator is designed for communities like:

- Developer meetups
- Coding bootcamps
- Open source projects
- Study groups
- Hackathons

Everyone maintains their own notes, the aggregator provides a community view.

## Future Ideas

Potential enhancements:

- [ ] RSS feed generation
- [ ] Export to markdown
- [ ] Email notifications for new notes
- [ ] Local developer following (browser storage)
- [ ] Advanced search (full-text, regex)
- [ ] Date range filtering
- [ ] Note statistics/analytics
- [ ] Cross-posting to social media

## Philosophy

**Decentralization First**: No central database. Each developer owns their content.

**Simple Protocols**: Just JSON over HTTP. No complex auth or sync.

**Resilient**: If aggregator goes down, individual blogs survive.

**Open**: Anyone can run an aggregator, follow any developers.

**Vintage Aesthetic**: Because terminals are cool.

## Inspiration

Built for the Viberacing dev notes challenge, inspired by John Carmack's .plan files.

## License

MIT - Build your own aggregator, follow who you want.
