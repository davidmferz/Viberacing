# Guía de Deployment - Viberacing Dev Notes

## Paso 1: Push a GitHub ✅

Ya completado con:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/davidmferz/Viberacing.git
```

Ahora ejecuta:

```bash
git push -u origin main
```

## Paso 2: Deploy Blog Personal en Vercel

### Opción A: Vercel Dashboard (Recomendado)

1. Ve a [vercel.com](https://vercel.com)
2. Haz login con GitHub
3. Click en "Add New..." → "Project"
4. Selecciona el repositorio `davidmferz/Viberacing`
5. **Configuración importante:**
   - **Framework Preset**: Next.js
   - **Root Directory**: `dev-notes-blog`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
6. Click "Deploy"

### Opción B: Vercel CLI

```bash
cd dev-notes-blog

# Instalar Vercel CLI (si no lo tienes)
npm install -g vercel

# Deploy
vercel

# Seguir prompts:
# - Set up and deploy? Yes
# - Link to existing project? No
# - Project name? dev-notes-blog
# - Directory? ./
# - Override settings? No

# Production deployment
vercel --prod
```

### Configuración Post-Deploy del Blog

1. **Personalizar metadata**:
   - Edita `dev-notes-blog/data/metadata.json`
   - Cambia nombre, avatar, contactos
   - Commit y push

2. **Obtener tu Metadata URL**:
   ```
   https://tu-proyecto.vercel.app/api/metadata.json
   ```

3. **Compartir URL** en el chat del Viberacing

## Paso 3: Deploy Agregador Comunitario en Vercel

### Opción A: Vercel Dashboard

1. Ve a [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Selecciona el mismo repositorio `davidmferz/Viberacing`
4. **Configuración:**
   - **Framework Preset**: Next.js
   - **Root Directory**: `dev-notes-aggregator`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
5. Click "Deploy"

### Opción B: Vercel CLI

```bash
cd dev-notes-aggregator
vercel
vercel --prod
```

### Configuración Post-Deploy del Agregador

1. **Agregar participantes**:
   - Edita `dev-notes-aggregator/data/developers.json`
   - Añade metadata URLs de otros participantes
   - Ejemplo:

```json
[
  {
    "name": "David",
    "metadataUrl": "https://tu-blog.vercel.app/api/metadata.json",
    "color": "#00ff00"
  },
  {
    "name": "Otro Dev",
    "metadataUrl": "https://otro-blog.vercel.app/api/metadata.json",
    "color": "#00ffff"
  }
]
```

2. **Commit y push** para auto-deploy

## Estructura de Deployment

```
GitHub Repo: davidmferz/Viberacing
│
├── dev-notes-blog/
│   └── Vercel Project 1: tu-nombre-blog.vercel.app
│       └── Metadata URL: /api/metadata.json
│
└── dev-notes-aggregator/
    └── Vercel Project 2: viberacing-aggregator.vercel.app
        └── Timeline: Todas las notas de la comunidad
```

## Verificación del Deployment

### Blog Deployado

Verifica estos endpoints:

```bash
# Metadata
curl https://tu-blog.vercel.app/api/metadata.json

# Lista de notas
curl https://tu-blog.vercel.app/api/notes.json

# Nota individual
curl https://tu-blog.vercel.app/api/notes/2025-11-08-project-kickoff.md
```

### Agregador Deployado

Verifica:

```bash
# Timeline agregado
curl https://tu-agregador.vercel.app/api/notes
```

## Customización Rápida

### Cambiar Información Personal

Edita `dev-notes-blog/data/metadata.json`:

```json
{
  "version": "1.0.0",
  "profile": {
    "name": "Tu Nombre Real",
    "avatar": "https://github.com/davidmferz.png",
    "contact": {
      "github": "davidmferz",
      "linkedin": "https://linkedin.com/in/tuprofile",
      "email": "tu@email.com"
    }
  },
  "fileList": {
    "url": "/api/notes.json",
    "format": "json"
  }
}
```

Commit y push → auto-deploy en Vercel.

### Agregar Tus Notas

1. Crea archivos en `dev-notes-blog/notes/`
2. Formato:

```markdown
---
title: "Mi Nota del Viberacing"
date: "2025-11-08T20:00:00Z"
description: "Lo que construí hoy"
tags: ["viberacing", "nextjs"]
---

## Lo que hice

Hoy implementé...

## Desafíos

El principal reto fue...

## Next Steps

- [ ] Terminar feature X
```

3. Commit y push → auto-deploy

### Cambiar Colores del Terminal

Edita `dev-notes-blog/app/globals.css`:

```css
:root {
  --background: #000000;
  --foreground: #00ff00;  /* Verde clásico */
  --accent: #00ff00;
  --muted: #008800;
}

/* Para cyan/azul: */
:root {
  --foreground: #00ffff;
  --accent: #00ffff;
}

/* Para amarillo: */
:root {
  --foreground: #ffff00;
  --accent: #ffff00;
}
```

## Dominios Personalizados (Opcional)

### En Vercel

1. Ve a tu proyecto → Settings → Domains
2. Agrega tu dominio
3. Configura DNS según instrucciones
4. SSL automático incluido

## Auto-Deploy

Vercel está configurado para auto-deploy en cada push a main:

```bash
# Hacer cambios
git add .
git commit -m "Agregué nueva nota"
git push

# Vercel detecta el push y deploya automáticamente
```

## Monitoreo

### Ver Logs de Deployment

```bash
# CLI
vercel logs

# O en dashboard:
# https://vercel.com/tu-usuario/tu-proyecto/deployments
```

### Analytics (Opcional)

Vercel incluye analytics gratis. Activa en Settings → Analytics.

## URLs Finales

Después del deployment, tendrás:

**Blog Personal:**
- URL: `https://tu-proyecto.vercel.app`
- Metadata: `https://tu-proyecto.vercel.app/api/metadata.json`
- Notas: `https://tu-proyecto.vercel.app/api/notes.json`

**Agregador:**
- URL: `https://agregador.vercel.app`
- API: `https://agregador.vercel.app/api/notes`

## Compartir en Viberacing

En el chat del evento, comparte:

```
Mi blog de dev notes: https://tu-blog.vercel.app
Metadata URL: https://tu-blog.vercel.app/api/metadata.json

Para agregador comunitario, agreguen mi URL a sus developers.json
```

## Troubleshooting

### Build Failed

**Error común**: Dependencies faltantes

```bash
# Verifica package.json esté completo
cd dev-notes-blog
npm install
npm run build

# Si funciona local, funciona en Vercel
```

### 404 en las Notas

**Causa**: Root Directory incorrecto en Vercel

**Solución**:
1. Settings → General → Root Directory
2. Cambiar a `dev-notes-blog` o `dev-notes-aggregator`
3. Redeploy

### CORS Errors

Ya está configurado con:
```typescript
'Access-Control-Allow-Origin': '*'
```

Si persiste, verifica headers en los endpoints API.

### Notas No Aparecen en Agregador

**Checklist**:
1. ✓ Blog deployado y funcionando
2. ✓ Metadata URL correcta en developers.json
3. ✓ CORS habilitado
4. ✓ Formato de notas correcto (frontmatter YAML)
5. ✓ Agregador re-deployado después de cambios

## Next Steps Post-Deployment

1. ✅ Deploy blog personal
2. ✅ Customizar metadata
3. ✅ Compartir metadata URL
4. ✅ Deploy agregador (opcional, si eres organizador)
5. ✅ Agregar participantes al agregador
6. ✅ Escribir mínimo 5 notas durante evento

## Costos

**Vercel Free Tier incluye:**
- Deployments ilimitados
- 100GB bandwidth/mes
- SSL automático
- Auto-deploy desde Git
- Serverless functions

**Suficiente para este proyecto y más!**

## Recursos

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Troubleshooting Vercel](https://vercel.com/support)

---

**¡Listo para deploy!** 🚀

Sigue los pasos arriba y tendrás tu blog y agregador live en minutos.
