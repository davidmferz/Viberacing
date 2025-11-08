# API Changes - Array of URLs Format

## Cambio Importante en el API

Hemos actualizado el API para usar un formato más descentralizado y flexible, basado en URLs directas a archivos markdown.

## Antes (JSON Objects)

```json
// GET /api/notes.json
[
  {
    "slug": "my-note",
    "title": "My Note",
    "date": "2025-11-08T00:00:00Z",
    "description": "...",
    "tags": ["tag1"]
  }
]
```

## Ahora (Array of URLs)

```json
// GET /api/notes.json
[
  "https://your-blog.vercel.app/api/notes/2025-11-08-first-note.md",
  "https://your-blog.vercel.app/api/notes/2025-11-07-second-note.md",
  "https://your-blog.vercel.app/api/notes/2025-11-06-third-note.md"
]
```

## Ventajas del Nuevo Formato

### 1. Más Descentralizado
- Cada nota es un archivo independiente
- No necesitas parsear JSON para obtener la lista
- Los URLs son portables y persistentes

### 2. Contenido Directo
- Los endpoints retornan markdown puro con frontmatter
- No hay conversión a JSON intermedia
- El formato original se preserva completamente

### 3. Más Flexible
- Puedes hostear notas en diferentes ubicaciones
- Fácil migración a CDN o static hosting
- Compatible con cualquier servidor que sirva archivos

### 4. Estándar Web
- Content-Type: text/markdown
- Seguimos convenciones web estándar
- Más fácil de cachear

## Cambios en los Endpoints

### Endpoint 2: Notes List

**Antes:**
```typescript
// GET /api/notes.json
Array<{
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
}>
```

**Ahora:**
```typescript
// GET /api/notes.json
string[]  // Array of URLs to .md files
```

**Ejemplo:**
```json
[
  "https://your-blog.com/api/notes/note-1.md",
  "https://your-blog.com/api/notes/note-2.md"
]
```

### Endpoint 3: Individual Note

**Antes:**
```typescript
// GET /api/notes/[slug]
{
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  content: string;  // Markdown content
}
```

**Ahora:**
```
// GET /api/notes/[slug].md
// Content-Type: text/markdown

---
title: "Note Title"
date: "2025-11-08T00:00:00Z"
description: "Description"
tags: ["tag1", "tag2"]
---

Markdown content here...
```

## Flujo de Consumo

### Agregador Actualizado

```typescript
// 1. Fetch metadata
const metadata = await fetch('https://blog.com/api/metadata.json')
  .then(r => r.json());

// 2. Get array of note URLs
const noteUrls = await fetch(metadata.fileList.url)
  .then(r => r.json());  // ["https://blog.com/api/notes/note1.md", ...]

// 3. Fetch and parse each note
const notes = await Promise.all(
  noteUrls.map(async (url) => {
    const markdown = await fetch(url).then(r => r.text());
    const { data, content } = matter(markdown);  // Parse frontmatter

    return {
      ...data,
      content,
      noteUrl: url.replace('/api/notes/', '/notes/').replace('.md', '')
    };
  })
);
```

## Compatibilidad

### ¿Rompe Compatibilidad?

Sí, este es un cambio **breaking**. Los agregadores existentes necesitarán actualización.

### Migración para Agregadores

Si tienes un agregador existente, actualiza así:

```typescript
// Antes
const notes = await fetch(notesListUrl).then(r => r.json());

// Ahora
import matter from 'gray-matter';

const noteUrls = await fetch(notesListUrl).then(r => r.json());
const notes = await Promise.all(
  noteUrls.map(async (url) => {
    const markdown = await fetch(url).then(r => r.text());
    const { data } = matter(markdown);
    const slug = url.split('/').pop()?.replace('.md', '');
    return { slug, ...data };
  })
);
```

## Archivos Actualizados

Los siguientes archivos han sido actualizados:

### Blog
- [app/api/notes.json/route.ts](dev-notes-blog/app/api/notes.json/route.ts) - Retorna array de URLs
- [app/api/notes/[slug]/route.ts](dev-notes-blog/app/api/notes/[slug]/route.ts) - Retorna markdown puro

### Agregador
- [lib/aggregator.ts](dev-notes-aggregator/lib/aggregator.ts) - Parsea markdown con gray-matter
- [package.json](dev-notes-aggregator/package.json) - Añadido gray-matter dependency

### Documentación
- [API-SPEC.md](API-SPEC.md) - Spec actualizada
- [CHANGES.md](CHANGES.md) - Este archivo

## Ejemplo Completo

```bash
# 1. Obtener metadata
curl https://blog.com/api/metadata.json

# 2. Obtener lista de URLs
curl https://blog.com/api/notes.json
# ["https://blog.com/api/notes/note1.md", ...]

# 3. Obtener nota individual
curl https://blog.com/api/notes/note1.md
# ---
# title: "My Note"
# date: "2025-11-08T00:00:00Z"
# ---
# Content here...
```

## Beneficios para el Viberacing

1. **URLs Compartibles**: Cada nota tiene una URL única y permanente
2. **Formato Portable**: Markdown puro puede ser leído por cualquier herramienta
3. **Sin Lock-in**: No dependes de un formato JSON propietario
4. **Más Simple**: Menos transformaciones de datos
5. **Web Native**: Usa estándares web (text/markdown)

## Preguntas Frecuentes

### ¿Por qué cambiar ahora?

El formato de array de URLs es más alineado con la filosofía de descentralización. Cada nota es un recurso independiente con su propia URL.

### ¿Puedo seguir usando JSON?

Técnicamente sí, pero no sería compatible con el spec oficial. Para máxima interoperabilidad, usa el formato de URLs.

### ¿Funciona con Next.js?

Sí, perfectamente. Los cambios están implementados y funcionando.

### ¿Necesito actualizar algo?

Si ya tienes un blog deployado con el formato anterior, necesitarás:
1. Actualizar los endpoints API
2. Re-deployear

Si tienes un agregador, necesitarás:
1. Añadir `gray-matter` a dependencies
2. Actualizar la lógica de fetching
3. Re-deployear

## Conclusión

Este cambio hace el sistema más verdaderamente descentralizado y alineado con la filosofía de John Carmack de compartir conocimiento en formatos simples y accesibles.

El markdown con frontmatter es el formato más portable y duradero para notas de desarrollador.

---

**Fecha del cambio**: 8 de Noviembre, 2025
**Versión del API**: 1.1.0 (antes 1.0.0)
**Compatibilidad**: Breaking change
