# konti — a cinematic cat portfolio

A premium, dark, photo-first portfolio for konti the cat — built as an
editorial archive with smooth animations, horizontal scroll, and a
folder-driven photo system.

```
konti-portfolio/
├── INSTRUCTIONS.md       # original brief
├── photos/               # raw originals (source of truth, untouched by build)
└── web/                  # Next.js 14 app
    ├── app/
    ├── components/
    ├── public/photos/    # optimized + organized for serving
    │   ├── hero/
    │   ├── featured/
    │   ├── gallery/
    │   └── closing/
    └── scripts/
        ├── build-manifest.mjs    # scans public/photos/, emits typed data
        └── optimize-images.mjs   # resizes to ≤2000px, JPEG q82 (idempotent)
```

## Run locally

```bash
cd web
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

`predev` and `prebuild` automatically run the image optimizer and the
manifest generator, so dropping a photo into `web/public/photos/<section>/`
is the entire workflow for adding new images.

See [`web/README.md`](./web/README.md) for the full photo workflow,
manifest schema, and animation system.

## Stack

Next.js 14 · TypeScript · Tailwind · Framer Motion · GSAP (ScrollTrigger) ·
Lenis (smooth scroll) · Sharp (image optimization).
