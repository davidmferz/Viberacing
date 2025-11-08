---
title: "Building a Vintage Terminal UI"
date: "2025-11-08T18:20:00Z"
description: "Creating that classic hacker terminal aesthetic with modern web tech"
tags: ["ui", "css", "design", "retro"]
---

## The Aesthetic Goal

Want this to feel like a terminal from the 90s. Green text on black background, monospace fonts, maybe some scanline effects. Nostalgic but functional.

## The Color Palette

```css
:root {
  --background: #000000;
  --foreground: #00ff00;  /* Classic terminal green */
  --accent: #00ff00;
  --muted: #008800;
}
```

Pure black background, bright green text. Can't get more terminal than that.

## The Glow Effect

Terminal text has a subtle glow:

```css
.glow {
  text-shadow: 0 0 5px var(--accent);
}
```

Applied to headers and interactive elements. Gives that CRT screen feel.

## Scanlines

This is the fun part. CSS animation for that old monitor look:

```css
.scanline::before {
  content: " ";
  display: block;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%,
    rgba(0, 0, 0, 0.25) 50%
  );
  background-size: 100% 4px;
  animation: scanline 8s linear infinite;
}

@keyframes scanline {
  0% { background-position: 0 0; }
  100% { background-position: 0 100%; }
}
```

Subtle but effective. Adds movement without being distracting.

## The Terminal Border

```css
.terminal {
  border: 2px solid var(--accent);
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
}
```

Every major section gets this treatment. Headers, content blocks, all framed like terminal windows.

## Typography

```css
body {
  font-family: 'Courier New', monospace;
}
```

Courier New. The classic. Could use a fancier monospace font but why? This IS the terminal font.

## Code Blocks

Special treatment for code:

```css
.markdown code {
  background: #003300;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
}

.markdown pre {
  background: #003300;
  padding: 1rem;
  border: 1px solid var(--accent);
}
```

Darker green background makes code stand out while staying on-theme.

## Interactive Elements

Links get the terminal treatment:

```css
.markdown a {
  color: var(--accent);
  text-decoration: underline;
}

.markdown a:hover {
  text-shadow: 0 0 5px var(--accent);
}
```

Hover effect uses the same glow. Consistent.

## Accessibility Considerations

Yeah, green on black isn't great for everyone. But this is a personal dev blog, not a commercial site. The aesthetic is part of the statement.

That said, the contrast ratio is actually pretty good (>7:1) so it's more readable than you'd think.

## Mobile

Everything scales down fine. Tailwind's responsive utilities handle it:

```tsx
<div className="p-4 md:p-8">
```

Less padding on mobile, more on desktop. Simple.

## The Result

It looks like a terminal. It feels like a terminal. But it's modern, fast, and works on any device.

---

*Form follows function, but that doesn't mean it can't look cool.*
