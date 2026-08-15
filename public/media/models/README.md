# formaia · GLB drop zone

Optimized `.glb` files live here and load at runtime as `/wearformaia/media/models/<name>.glb`.

## Pipeline (per model)

1. **Optimize** the raw export before it ever hits the repo:
   - garments (keep material zones) → `gh3-clothing-optimizer`
   - environments / studio → `glb-scene-optimizer`
   - CC5 avatar (hair transparency) → `glb-cc5-optimizer`
2. **Generate the JSX** with gltfjsx (types + Draco/meshopt transform):
   ```bash
   npx gltfjsx@latest media/models/mist-set.glb --transform --types -o src/three/models/MistSet.tsx
   ```
3. **Wire it in** — replace the matching `*Placeholder` in the experience component:
   | Experience | File | Replace |
   |---|---|---|
   | A garment | `experiences/GarmentViewer.tsx` | `<GarmentPlaceholder/>` → `<MistSet/>` |
   | B studio | `experiences/StudioScene.tsx` | `<StudioPlaceholder/>` → `<Studio/>` |
   | C avatar | `experiences/AvatarHero.tsx` | `<AvatarPlaceholder/>` → `<Avatar/>` |
   | D accents | `experiences/FloatingAccents.tsx` | placeholder meshes → prop GLBs |

`useGLTF` (drei) caches and preloads — call `useGLTF.preload("/wearformaia/media/models/mist-set.glb")` at module scope for instant swap-in.

Keep each optimized GLB ideally **1–2 MB** (garments/props) — the studio/avatar can run larger but stay code-split and in-view gated.
