# konti — cinematic cat portfolio

A premium, dark, photo-first portfolio for konti the cat. Built with Next.js 14
(App Router) + Tailwind + Framer Motion + GSAP + Lenis.

## Run it

```bash
npm install      # already done if you got here from scaffold
npm run dev      # http://localhost:3000
npm run build    # production build (also re-generates the photo manifest)
```

`predev` and `prebuild` automatically run `scripts/build-manifest.mjs`, which
scans `public/photos/*` and emits the typed `data/photos.generated.ts` used by
the app.

## Adding photos

The site is **folder-driven**. Each section is a folder under `public/photos/`:

```
public/photos/
├── hero/        # 1 image — landing fullscreen
├── featured/    # 4–6 images — horizontal pinned scroll
├── gallery/     # the full archive (any number)
└── closing/     # 1 image — final fullscreen
```

### To add a new photo

1. Drop the file into the relevant folder (`.jpg`, `.jpeg`, `.png`, `.webp`,
   `.avif` — case-insensitive).
2. (Optional) Open that folder's `manifest.json` and add an entry keyed by the
   exact filename.
3. Run `npm run manifest` (or just `npm run dev` / `npm run build` — they call
   it automatically).

If you skip step 2, the photo still appears with sensible defaults
(title derived from filename, no overlay caption).

### `manifest.json` schema

```jsonc
{
  "section": "gallery",
  "items": {
    "IMG_1203.jpg": {
      "title": "Throne Room",
      "caption": "A study in stillness, softness, and complete ownership of the sofa.",
      "category": "Sleep",
      "date": "2026",
      "featured": true,
      "text": {
        "position": { "x": "8%", "y": "82%" },
        "align": "left",
        "color": "#f2f2f2"
      }
    }
  }
}
```

### Position values

`position.x` and `position.y` accept:

- **Percentages**: `"10%"`, `"50%"`, `"85%"` (most common)
- **Pixels**: `"40px"`
- **Keywords**:
  - x: `"left"` (≈6%), `"center"` (50%), `"right"` (≈94%)
  - y: `"top"` (≈8%), `"middle"` (50%), `"bottom"` (≈92%)

The text block's anchor auto-adjusts so it doesn't clip:
- ≤10% on either axis → text grows from that corner
- ~50% → text is centered on that point
- ≥90% → text is anchored to that edge

### Removing a photo

Delete the file from its folder. (You can leave its entry in `manifest.json`
— the build will warn and skip it.)

### Moving a photo between sections

Move the file to the new folder, optionally update both folders'
`manifest.json` entries.

## Project structure

```
web/
├── app/
│   ├── layout.tsx               # SmoothScroll + Header + PageTransition + Footer
│   ├── page.tsx                 # Home
│   ├── globals.css              # Theme tokens, Lenis styles, reduced-motion
│   ├── about/page.tsx
│   ├── gallery/page.tsx
│   └── moments/[slug]/page.tsx  # Static-generated for every photo
│
├── components/
│   ├── animations/              # SmoothScroll (Lenis), Reveal, MagneticLink
│   ├── home/                    # Hero, FeaturedMoments, GalleryPreview, ClosingSection
│   ├── gallery/                 # GalleryList, GalleryGrid, GalleryHoverPreview
│   ├── layout/                  # Header (with mobile menu), Footer, PageTransition
│   └── ui/                      # CustomCursor (desktop only)
│
├── data/
│   └── photos.generated.ts      # AUTO-GENERATED — do not edit
│
├── hooks/                       # useMousePosition, useIsMobile, usePrefersReducedMotion
├── lib/                         # utils.ts (overlayStyleFromText), animations.ts
├── public/photos/<section>/     # source of truth for images + manifests
└── scripts/build-manifest.mjs   # photo scanner — runs on predev/prebuild
```

## Animation system

- **Smooth scrolling**: Lenis (`SmoothScroll.tsx`), respects
  `prefers-reduced-motion`.
- **Hero**: scale-in image, mouse-driven parallax, staggered title reveal.
- **Featured Moments**: GSAP `ScrollTrigger` horizontal pin — the section
  pins, cards translate horizontally as you scroll vertically. Falls back to
  a vertical stack on mobile.
- **Gallery list**: cursor-following hover preview (Framer Motion springs).
- **Reveal**: clip-path/translateY on intersection (`Reveal.tsx`).
- **Page transitions**: Framer `AnimatePresence` opacity crossfade.
- **Custom cursor**: small dot, expands on interactive elements; disabled on
  touch devices.

## Performance

- All images go through `next/image` with AVIF/WebP and explicit `sizes`.
- Lenis disables itself when `prefers-reduced-motion: reduce`.
- Custom cursor + magnetic effects disabled on mobile.
- 53 photos in `gallery/` → 53 statically pre-rendered detail pages.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import into Vercel — no env vars needed.
3. Build command: `npm run build` (default).
4. Output: `.next` (default).

The manifest is regenerated at build time on Vercel just like locally, so
dropping new photos and committing is the entire workflow.
