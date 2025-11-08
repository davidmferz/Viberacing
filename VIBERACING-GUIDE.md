# Viberacing Event Guide

Quick guide for using this dev notes system during the Viberacing event.

## For Event Participants

### Quick Setup (10 minutes)

1. **Clone or Download this Project**

```bash
cd dev-notes-blog
npm install
```

2. **Customize Your Profile**

Edit `data/metadata.json`:

```json
{
  "version": "1.0.0",
  "profile": {
    "name": "Tu Nombre",
    "avatar": "https://github.com/tu-usuario.png",
    "contact": {
      "github": "tu-usuario",
      "linkedin": "https://linkedin.com/in/tu-perfil",
      "twitter": "@tu-handle"
    }
  },
  "fileList": {
    "url": "/api/notes.json",
    "format": "json"
  }
}
```

3. **Deploy to Vercel**

```bash
# Push to GitHub
git init
git add .
git commit -m "My dev notes blog"
git remote add origin https://github.com/tu-usuario/dev-notes-blog.git
git push -u origin main

# Deploy with Vercel
npm install -g vercel
vercel
```

4. **Share Your Metadata URL**

Once deployed, share this URL in the event chat:

```
https://tu-blog.vercel.app/api/metadata.json
```

### During the Event

#### Write Notes as You Build

Create notes documenting what you're building:

```bash
# Quick template
cat > notes/$(date +%Y-%m-%d)-sesion-1.md << 'EOF'
---
title: "Sesión 1: Setup del Proyecto"
date: "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
description: "Configurando el ambiente y primeras decisiones"
tags: ["viberacing", "setup"]
---

## Lo que construí hoy

[Tu contenido aquí]

## Desafíos encontrados

[Problemas y soluciones]

## Próximos pasos

- [ ] Tarea 1
- [ ] Tarea 2
EOF
```

#### Minimum 5 Notes Required

You need at least 5 notes by the end of the event. Ideas:

1. **Initial Setup**: What you decided to build and why
2. **Architecture**: How you're structuring the code
3. **Key Feature**: Deep dive into main functionality
4. **Challenges**: Problems you faced and solutions
5. **Final Summary**: What you built, what you learned

#### Note Writing Tips

- **Be technical**: Show code, explain decisions
- **Be honest**: Share failures and pivots
- **Be specific**: Details over generalities
- **Be timely**: Write as you build, not at the end
- **Be concise**: Quality over quantity

### Example Note Structure

```markdown
---
title: "Implementando Autenticación JWT"
date: "2025-11-08T15:30:00Z"
description: "Setup de JWT con refresh tokens"
tags: ["auth", "jwt", "security", "viberacing"]
---

## Decisión: JWT vs Sessions

Elegí JWT porque:
- Stateless
- Funciona bien con APIs
- Fácil de escalar

## Implementación

```typescript
// Token generation
const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  { expiresIn: '15m' }
);
```

## Challenges

El refresh token flow fue complicado. Problema:
- Tokens expiran muy rápido
- Users tienen que re-autenticarse mucho

Solución: Implementé refresh tokens con Redis...

## Next Steps

- [ ] Add token rotation
- [ ] Implement logout blacklist
- [ ] Add rate limiting

## Time: 2 hours
## Status: Working pero necesita refinamiento
```

## For Event Organizers

### Setting Up Community Aggregator

1. **Deploy the Aggregator**

```bash
cd dev-notes-aggregator
npm install
vercel
```

2. **Collect Metadata URLs**

As participants share their metadata URLs, add them to `data/developers.json`:

```json
[
  {
    "name": "Participant 1",
    "metadataUrl": "https://participant1.vercel.app/api/metadata.json",
    "color": "#00ff00"
  },
  {
    "name": "Participant 2",
    "metadataUrl": "https://participant2.vercel.app/api/metadata.json",
    "color": "#00ffff"
  }
]
```

3. **Auto-Deploy Updates**

Every push to main auto-deploys on Vercel. Just commit changes to `developers.json`:

```bash
git add data/developers.json
git commit -m "Add new participant"
git push
```

4. **Share Aggregator URL**

Share with all participants:

```
https://viberacing-devnotes.vercel.app
```

### Color Scheme for Participants

Use these colors to distinguish participants:

```javascript
const colors = [
  "#00ff00", // Green
  "#00ffff", // Cyan
  "#ffff00", // Yellow
  "#ff00ff", // Magenta
  "#00ff88", // Mint
  "#ff8800", // Orange
  "#8800ff", // Purple
  "#ff0088", // Pink
];
```

## During the Event

### Monitoring

Check the aggregator regularly to see:
- Who's publishing notes
- What people are building
- Common challenges
- Interesting solutions

### Encouraging Participation

Remind participants to:
- Write notes throughout (not just at the end)
- Be technical and specific
- Share code snippets
- Document failures, not just successes
- Hit the 5-note minimum

### Showcasing Notes

At the end:
- Display aggregator on big screen
- Let participants present their notes
- Discuss interesting solutions
- Share learnings

## Post-Event

### Archiving

The notes become a permanent record:
- Git history preserved
- Deployments stay live (free on Vercel)
- Can be referenced later

### Sharing

- Tweet the aggregator URL
- Blog about the event
- Share individual interesting notes
- Create "best of" compilation

### Continuing

Encourage participants to:
- Keep writing notes after event
- Continue using their blog
- Join/create ongoing aggregators
- Build a habit of documenting

## Troubleshooting

### Common Issues

**Note not showing up:**
- Check frontmatter syntax
- Verify date format (ISO 8601)
- Ensure file is in `notes/` directory
- Check file ends with `.md`

**Aggregator not fetching:**
- Verify metadata URL is correct
- Check blog is deployed and public
- Look for CORS errors in console
- Wait 60s for cache to clear

**Deployment failed:**
- Check `package.json` is valid
- Verify all dependencies installed
- Look at Vercel deployment logs
- Try `rm -rf .next && npm run build`

**Can't push to GitHub:**
- Check git remote is correct
- Verify GitHub credentials
- Try HTTPS instead of SSH
- Check branch name (main vs master)

## Quick Commands Reference

### Writing

```bash
# Create new note with template
./scripts/new-note.sh slug "Title" "Description"

# Quick commit
git add notes/ && git commit -m "Add new note" && git push
```

### Deployment

```bash
# Deploy blog
cd dev-notes-blog && vercel --prod

# Deploy aggregator
cd dev-notes-aggregator && vercel --prod
```

### Testing

```bash
# Test metadata endpoint
curl https://your-blog.vercel.app/api/metadata.json | jq

# Test notes list
curl https://your-blog.vercel.app/api/notes.json | jq

# Count your notes
curl -s https://your-blog.vercel.app/api/notes.json | jq 'length'
```

## Success Metrics

At the end of the event, participants should have:

- ✅ Deployed personal dev notes blog
- ✅ Published minimum 5 notes
- ✅ Shared metadata URL
- ✅ Appear in community aggregator
- ✅ Documented their journey

## Resources

- **Main README**: [README.md](README.md)
- **Quick Start**: [QUICKSTART.md](QUICKSTART.md)
- **API Spec**: [API-SPEC.md](API-SPEC.md)
- **Project Summary**: [PROJECT-SUMMARY.md](PROJECT-SUMMARY.md)

## Example Event Timeline

### Hour 1: Setup
- Clone repo
- Customize profile
- Deploy to Vercel
- Share metadata URL
- **Write Note #1**: What you're building

### Hour 2-3: Building
- Code your project
- **Write Note #2**: Architecture decisions
- **Write Note #3**: Key feature implementation

### Hour 4-5: Iterating
- Continue building
- **Write Note #4**: Challenges and solutions
- Check aggregator to see others' progress

### Hour 6: Wrapping Up
- **Write Note #5**: Final summary
- Polish notes
- Prepare presentation

### Showcase
- Present via aggregator
- Discuss interesting notes
- Share learnings
- Network

## Tips for Great Notes

### DO:
✅ Show code snippets
✅ Explain why, not just what
✅ Share failures and pivots
✅ Include timestamps/durations
✅ Use tags effectively
✅ Add next steps
✅ Be authentic

### DON'T:
❌ Wait until end to write
❌ Be too generic
❌ Skip technical details
❌ Hide your struggles
❌ Overthink formatting
❌ Forget to deploy

## Remember

The goal is to:
1. Document your development process
2. Share knowledge with the community
3. Practice writing technical content
4. Build a habit of learning in public

**Just like John Carmack did with his .plan files!**

---

## Questions?

Ask in the event chat or check the documentation.

**Happy building! Happy writing!**

---

*Make it work. Make it right. Make it fast. Document everything.*
