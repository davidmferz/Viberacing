# Quick Deploy Guide - 5 Minutos ⚡

## ✅ Paso 1: GitHub (COMPLETADO)

```bash
✓ git init
✓ git add .
✓ git commit -m "Initial commit"
✓ git branch -M main
✓ git remote add origin https://github.com/davidmferz/Viberacing.git
✓ git push -u origin main
```

**Repo live**: https://github.com/davidmferz/Viberacing

---

## 🚀 Paso 2: Deploy en Vercel (AHORA)

### Blog Personal

**Opción Rápida - Dashboard:**

1. **Ir a**: https://vercel.com/new
2. **Login** con GitHub
3. **Import** → Seleccionar `davidmferz/Viberacing`
4. **Configurar**:
   ```
   Framework: Next.js
   Root Directory: dev-notes-blog
   ```
5. **Deploy** → Click y espera ~2 minutos

**Tu blog estará en**: `https://[proyecto].vercel.app`

### Agregador Comunitario (Opcional)

Mismo proceso pero:
```
Root Directory: dev-notes-aggregator
```

---

## ⚙️ Paso 3: Personalizar (Post-Deploy)

### 1. Editar tu Perfil

En GitHub, edita: `dev-notes-blog/data/metadata.json`

```json
{
  "version": "1.0.0",
  "profile": {
    "name": "David Fernández",  ← Cambia esto
    "avatar": "https://github.com/davidmferz.png",  ← Y esto
    "contact": {
      "github": "davidmferz",
      "linkedin": "tu-perfil",
      "email": "tu@email.com"
    }
  },
  "fileList": {
    "url": "/api/notes.json",
    "format": "json"
  }
}
```

**Commit & Push** → Auto-deploy en Vercel

### 2. Agregar Tus Notas

Crea archivos en: `dev-notes-blog/notes/`

Ejemplo: `2025-11-08-mi-primera-nota.md`

```markdown
---
title: "Mi Primera Nota del Viberacing"
date: "2025-11-08T20:00:00Z"
description: "Setup inicial del proyecto"
tags: ["viberacing", "setup"]
---

## Lo que hice

Hoy configuré...

## Desafíos

El principal reto fue...
```

**Commit & Push** → Auto-deploy

---

## 📋 Checklist de Deployment

### Blog Personal
- [ ] Deploy en Vercel con root `dev-notes-blog`
- [ ] Editar `data/metadata.json` con tus datos
- [ ] Verificar endpoints funcionan:
  - [ ] `https://tu-blog.vercel.app/api/metadata.json`
  - [ ] `https://tu-blog.vercel.app/api/notes.json`
  - [ ] `https://tu-blog.vercel.app`
- [ ] Compartir metadata URL en chat de Viberacing

### Durante el Evento
- [ ] Escribir nota 1 (Setup/Kickoff)
- [ ] Escribir nota 2 (Arquitectura/Decisiones)
- [ ] Escribir nota 3 (Implementación)
- [ ] Escribir nota 4 (Desafíos/Soluciones)
- [ ] Escribir nota 5 (Resumen Final)

### Agregador (Si eres organizador)
- [ ] Deploy en Vercel con root `dev-notes-aggregator`
- [ ] Agregar participantes a `data/developers.json`
- [ ] Compartir URL del agregador con comunidad

---

## 🔗 URLs Importantes

**Después del deploy tendrás:**

```
Blog: https://tu-proyecto.vercel.app
Metadata: https://tu-proyecto.vercel.app/api/metadata.json
Notas: https://tu-proyecto.vercel.app/api/notes.json
```

**Compartir en Viberacing:**
```
Metadata URL para agregador: https://tu-proyecto.vercel.app/api/metadata.json
```

---

## 💡 Tips Rápidos

### Git Workflow
```bash
# Agregar nota nueva
git add notes/nueva-nota.md
git commit -m "Add: nueva nota sobre X"
git push

# Vercel auto-deploya en ~1 minuto
```

### Verificar Deployment
```bash
# Metadata
curl https://tu-blog.vercel.app/api/metadata.json | jq

# Lista de notas
curl https://tu-blog.vercel.app/api/notes.json | jq

# Nota individual
curl https://tu-blog.vercel.app/api/notes/2025-11-08-project-kickoff.md
```

### Cambiar Colores
Edita `dev-notes-blog/app/globals.css`:
```css
:root {
  --foreground: #00ff00;  /* Verde */
  /* --foreground: #00ffff;  Cyan */
  /* --foreground: #ffff00;  Amarillo */
}
```

---

## ⚠️ Troubleshooting Rápido

**Build Failed?**
→ Verifica Root Directory en Vercel Settings

**404 Not Found?**
→ Espera 1-2 minutos, Vercel está deployando

**CORS Errors?**
→ Ya configurado, no debería pasar

**Notas no aparecen?**
→ Verifica formato frontmatter YAML

---

## 📱 Siguiente Paso

1. **Ahora**: Deploy en Vercel (2 minutos)
2. **Luego**: Personalizar metadata (1 minuto)
3. **Durante evento**: Escribir 5 notas
4. **Al final**: Compartir y presentar

---

**¡Listo para deploy!** 🎯

Ve a https://vercel.com/new y despliega `dev-notes-blog` primero.
