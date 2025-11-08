---
title: "Markdown + Frontmatter: The Perfect Note Format"
date: "2025-11-08T16:45:00Z"
description: "Why markdown with YAML frontmatter is the ideal format for developer notes"
tags: ["markdown", "content", "dx"]
---

## The Format Question

Spent some time thinking about the note format. Considered:
- Plain text (too limited)
- HTML (too verbose, not portable)
- Custom format (reinventing the wheel)
- **Markdown + Frontmatter** (winner)

## Why Frontmatter?

Frontmatter lets you embed structured metadata in your markdown files:

```markdown
---
title: "My Note"
date: "2025-11-08T00:00:00Z"
tags: ["tech", "programming"]
---

# Your actual content here
```

It's YAML at the top, markdown below. Simple. Elegant.

## The Benefits

### 1. Version Control Friendly
Each note is just a `.md` file. Git diffs work perfectly. Merge conflicts are rare and easy to resolve.

### 2. Editor Agnostic
Write in VSCode, Vim, Obsidian, even Notepad. Doesn't matter. It's just text.

### 3. Future Proof
Markdown isn't going anywhere. Files you write today will be readable in 20 years without special software.

### 4. Rich Content
Code blocks with syntax highlighting, links, images, lists, tables - markdown has it all.

```javascript
function example() {
  return "Code blocks just work";
}
```

### 5. Easy to Parse
Libraries like `gray-matter` make parsing trivial:

```typescript
import matter from 'gray-matter';

const { data, content } = matter(fileContents);
// data = frontmatter object
// content = markdown string
```

## The Implementation

Reading a note:

```typescript
export function getNoteBySlug(slug: string): Note {
  const fullPath = path.join(notesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    ...data,
    content,
  };
}
```

That's it. No database queries, no ORMs, no migrations. Just read a file and parse it.

## Rendering

Using `react-markdown` for rendering:

```tsx
<ReactMarkdown remarkPlugins={[remarkGfm]}>
  {note.content}
</ReactMarkdown>
```

GitHub Flavored Markdown support included. Tables, task lists, strikethrough - all work out of the box.

## Performance

Static generation means we read these files at build time, not on every request. Lightning fast.

```typescript
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}
```

Next.js handles the rest.

---

*Sometimes the old ways are still the best ways.*
