# formaia — landing (Vite + React + TS)

Rebuild of the formae site as **formaia activewear**, mirroring the captured routes,
wired for the **scroll story** (scroll-world scrub) and the **Avel** interactive
feature reveals. Warm quiet-luxury tokens (rich black · deep brown · warm neutral),
Cormorant + Jost, the vectorized wordmark.

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

## Routes (from the capture)
`/` home · `/shop` the sets · `/product/:slug` (mist-set, wrapped-noir-set) · `/in-form` about · `/account` · `/bag`

## The two integrations

### 1 · Scroll story (scroll-world)
`src/components/ScrollFilmHero.tsx` + `src/hooks/useScrollScrub.ts`
A pinned 16:9 hero, **center-safe**, `object-fit: cover` (full-bleed desktop, clean vertical crop on mobile — your framing call). Scroll progress scrubs the film.
- **DROP-IN:** the stitched, frame-locked 7-beat film → `public/media/scroll-film.mp4` (+ `scroll-film-poster.jpg`).
- The hook is a lightweight stand-in for scroll-world's `scrub-engine.js`; swap in the vendored engine + its scene config when you want the full dive-in/connector machinery.

### 2 · Avel feature reveals
`src/components/AvalPlayer.tsx` + `ProductFeatureReveals.tsx`
Hover a feature hotspot → Avel routes to that state → the frame-accurate zoom reveal plays (packed-alpha, so she floats on the warm ground).
- **INSTALL when ready:** `npm i @pixel-point/aval-element`
- **DROP-IN:** compiled `.avl` per feature → `public/media/avl/*.avl` (paths already mapped in `src/data/products.ts`).
- Falls back to poster stills until the element + assets land — so it runs today.

## Media you'll generate (drop-in paths)
```
public/media/scroll-film.mp4            # the 7-beat film (chained beats)
public/media/scroll-film-poster.jpg
public/media/products/mist-hero.jpg     # + mist-1..3.jpg
public/media/products/noir-hero.jpg     # + noir-1..3.jpg
public/media/avl/mist-waistband.avl     # mist-back, mist-fabric
public/media/avl/noir-tie.avl           # noir-openback, noir-cuff
```
Product/feature → asset mapping lives in `src/data/products.ts`.

## Later passes
Commerce (Shopify/Strapi), the real scroll-world engine vendor, the Remotion social-template track (same beats + feature clips).
