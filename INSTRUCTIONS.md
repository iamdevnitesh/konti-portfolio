I want you to help me build a premium, cinematic, interactive photo portfolio website for my cat, inspired by the visual/interaction style of https://camillemormal.com/.

Important:
- Do NOT copy the website exactly.
- Use it only as inspiration for mood, interaction style, minimal typography, large photo-first layout, smooth transitions, and high-end portfolio feel.
- The final website should feel like an editorial / luxury photography portfolio, but for my cat.

## Goal

Create a complete modern web project for a cat photo portfolio.

The site should showcase photos of my cat in a dramatic, minimal, cinematic way with:
- Fullscreen imagery
- Dark theme
- Large typography
- Smooth scrolling
- Image hover distortion / parallax
- Gallery sections
- Animated page transitions
- Minimal navigation
- Mobile responsive layout
- High-performance image handling

## Tech Stack

Use:

- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS
- Framer Motion for page/element animations
- GSAP for scroll-based animations
- Lenis for smooth scrolling
- Three.js or React Three Fiber only if needed for subtle image distortion
- next/image for optimized images
- CSS modules or Tailwind utilities for styling
- Optional: Zustand only if global state is required

Avoid:
- Overengineering
- Heavy unnecessary dependencies
- Copying Camille Mormal’s exact layout/code
- Too many flashy effects that hurt performance

## Desired Visual Style

Mood:
- Premium
- Dark
- Minimal
- Cinematic
- Editorial
- Elegant
- Slightly mysterious
- Photo-first

Color palette:
- Background: near black `#050505`
- Text: off white `#f2f2f2`
- Muted text: `#8a8a8a`
- Accent: warm beige/brown, inspired by cat fur, e.g. `#b9946c`

Typography:
Use a combination like:
- Headings: elegant serif or editorial font
- Body: clean sans-serif

Suggested fonts:
- `Playfair Display` or `Cormorant Garamond` for display headings
- `Inter` or `Neue Haas Grotesk`-style sans-serif for body

## Website Sections

Build these pages/sections:

### 1. Landing / Hero

Fullscreen hero section.

Content:
- Big cat photo background or large centered image
- Cat name as huge typography
- Small subtitle like:
  `A cinematic archive of quiet chaos, soft paws, and royal attitude.`
- Minimal navigation:
  - Home
  - Gallery
  - Moments
  - About
- Scroll indicator

Interactions:
- Hero image slowly scales on load
- Text fades/slides in
- Mouse movement creates subtle image parallax
- Smooth transition into next section

### 2. Featured Moments

A horizontal or staggered editorial layout showing 4–6 featured images.

Each item should have:
- Image
- Title
- Short caption
- Category tag

Example categories:
- Lazy Royalty
- Window Watcher
- Midnight Zoomies
- Tiny Hunter
- Nap Architecture
- Judgement Mode

Interactions:
- Images reveal on scroll
- Hover zoom
- Caption appears on hover
- Optional cursor-follow label

### 3. Gallery Index

A grid/list hybrid inspired by high-end portfolio sites.

Features:
- Large photo thumbnails
- Each image has number, title, year/date, category
- Hovering over title previews the image
- Clicking opens detail page or modal

Example gallery data:

```ts
const galleryItems = [
  {
    id: "nap-queen",
    title: "Nap Queen",
    category: "Sleep",
    date: "2026",
    image: "/images/cat-01.jpg",
    description: "A study in stillness, softness, and complete ownership of the sofa."
  },
  {
    id: "window-watch",
    title: "Window Watch",
    category: "Portrait",
    date: "2026",
    image: "/images/cat-02.jpg",
    description: "Watching the world move while refusing to participate."
  }
]
```

### 4. Moment Detail Page

Route:
`/moments/[slug]`

Each detail page should include:

* Fullscreen image
* Title
* Category
* Caption/story
* Previous/next navigation
* Smooth page transition

### 5. About Page / Section

A minimal about section for the cat.

Content structure:

* Cat name
* Nicknames
* Personality
* Favorite spots
* Favorite activities
* Funny traits

Example copy:
`Part-time philosopher, full-time nap strategist. Known for silent judgement, dramatic stretching, and claiming every soft surface as personal territory.`

### 6. Closing Section

A final fullscreen section with:

* One strong image
* Text like:
  `Every ordinary day, archived beautifully.`
* Back to top link

## Interactions Required

Implement the following:

1. Smooth scroll using Lenis
2. Scroll-triggered animations using GSAP ScrollTrigger
3. Page transitions using Framer Motion
4. Image reveal animations
5. Hover image preview on gallery list items
6. Subtle custom cursor on desktop
7. Responsive mobile layout
8. Lazy-loaded optimized images
9. Dark theme throughout
10. Keyboard accessible navigation

## Project Structure

Use this structure:

```txt
cat-portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── about/
│   │   └── page.tsx
│   ├── gallery/
│   │   └── page.tsx
│   └── moments/
│       └── [slug]/
│           └── page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── PageTransition.tsx
│   │
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── FeaturedMoments.tsx
│   │   ├── GalleryPreview.tsx
│   │   └── ClosingSection.tsx
│   │
│   ├── gallery/
│   │   ├── GalleryGrid.tsx
│   │   ├── GalleryList.tsx
│   │   ├── GalleryHoverPreview.tsx
│   │   └── MomentCard.tsx
│   │
│   ├── animations/
│   │   ├── SmoothScroll.tsx
│   │   ├── Reveal.tsx
│   │   └── MagneticLink.tsx
│   │
│   └── ui/
│       ├── CustomCursor.tsx
│       └── Button.tsx
│
├── data/
│   └── gallery.ts
│
├── hooks/
│   ├── useMousePosition.ts
│   └── useIsMobile.ts
│
├── lib/
│   ├── animations.ts
│   └── utils.ts
│
├── public/
│   └── images/
│       ├── cat-01.jpg
│       ├── cat-02.jpg
│       ├── cat-03.jpg
│       └── ...
│
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Required Components

Please generate all major components.

### Header

* Fixed top nav
* Transparent over hero
* Minimal white text
* Cat name/logo on left
* Menu links on right
* Mobile menu

### Hero

* Fullscreen
* Animated title
* Background image or centered image
* Scroll indicator
* Parallax mouse effect

### SmoothScroll

Use Lenis.

Implementation requirements:

* Client component
* Initialize Lenis in `useEffect`
* Use `requestAnimationFrame`
* Clean up properly

### Reveal Component

Reusable wrapper for fade/slide reveal animations.

Props:

* children
* delay
* direction
* className

Use Framer Motion.

### Gallery

Two display modes:

* Grid on mobile/tablet
* Editorial list with hover preview on desktop

### GalleryHoverPreview

When hovering a gallery row:

* Show image near cursor
* Smooth follow animation
* Fade in/out
* Use Framer Motion

### Moment Detail

* Use dynamic route `/moments/[slug]`
* Get item from `gallery.ts`
* Use `notFound()` if slug not found
* Show previous/next links

## Data File

Create `data/gallery.ts`.

Use placeholder image paths, but structure it clearly so I can replace them later.

Example:

```ts
export type GalleryItem = {
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  featured?: boolean;
  description: string;
};

export const galleryItems: GalleryItem[] = [
  {
    slug: "nap-queen",
    title: "Nap Queen",
    category: "Sleep",
    date: "2026",
    image: "/images/cat-01.jpg",
    featured: true,
    description: "A study in stillness, softness, and complete ownership of the sofa."
  }
];
```

## Animation Details

Use subtle animations.

On page load:

* Hero image scale from 1.08 to 1
* Title moves up and fades in
* Subtitle fades in after title

On scroll:

* Images reveal with clip-path or opacity/translate
* Text fades in
* Section labels slide in

On hover:

* Images scale 1.05
* Links slightly move
* Cursor changes text where useful

Do not make animations too slow. Keep them premium and responsive.

## CSS / Tailwind Requirements

Set global styles:

```css
html {
  background: #050505;
  color: #f2f2f2;
}

body {
  background: #050505;
  overflow-x: hidden;
}

::selection {
  background: #b9946c;
  color: #050505;
}
```

Use Tailwind classes heavily.

Create utility classes if needed:

* `.section-padding`
* `.container-wide`
* `.text-muted`
* `.link-hover`

## Performance Requirements

* Use `next/image`
* Use proper image sizes
* Avoid animating layout-heavy properties
* Prefer transform and opacity
* Disable custom cursor and heavy hover effects on mobile
* Keep Three.js optional and only for one subtle effect
* Respect `prefers-reduced-motion`

## Accessibility Requirements

* All images must have useful alt text
* Navigation must be keyboard accessible
* Links/buttons must have visible focus states
* Do not rely only on hover
* Mobile should work without hover previews

## Deliverables

Please output:

1. Full setup commands
2. Package installation commands
3. Complete project structure
4. Full code for each file
5. Explanation of how to replace placeholder cat photos
6. Explanation of how to add new gallery items
7. Notes on deployment to Vercel

## Setup Commands

Use something like:

```bash
npx create-next-app@latest cat-portfolio \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"

cd cat-portfolio

npm install framer-motion gsap lenis clsx
```

If using extra libraries, explain why.

## Important Design Direction

The website should feel less like a normal pet gallery and more like a serious photography archive where the subject happens to be a cat.

Think:

* luxury portfolio
* art direction
* fullscreen photography
* dramatic spacing
* minimal labels
* quiet animations
* editorial captions
* black background
* premium typography

Please generate the project step-by-step and include complete code.
