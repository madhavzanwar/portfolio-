# Design Specification & Architecture (`design.md`)

This document governs the visual tokens, typography hierarchies, layout geometry, and 3D camera choreography for the Madhav Zanwar portfolio, reverse-engineered and re-architected from `about.senbuzy.com` (`dayinji/sen-3d-resume`).

---

## 1. Color Tokens

| Token | Value | Semantic Role |
| :--- | :--- | :--- |
| `--bg-sage-top` | `#6f906f` | Upper hemisphere sky & hero canvas background |
| `--bg-sage-mid` | `#4e694e` | Mid-scroll timeline transition tone |
| `--bg-sage-deep` | `#263526` | Deep scroll backdrop & Works gallery base |
| `--surface-frosted-rail` | `rgba(22, 32, 22, 0.42)` | Right-hand timeline rail (`backdrop-filter: blur(20px)`) |
| `--surface-card` | `rgba(244, 241, 234, 0.07)` | Timeline & Project cards (hover: `rgba(244, 241, 234, 0.14)`) |
| `--surface-modal` | `rgba(26, 36, 26, 0.88)` | Case-study markdown modal (`backdrop-filter: blur(28px)`) |
| `--text-primary` | `#f4f1ea` | Warm editorial cream primary typography |
| `--text-secondary` | `rgba(244, 241, 234, 0.70)` | Secondary metadata, subtitles, descriptions |
| `--text-muted` | `rgba(244, 241, 234, 0.45)` | Muted timestamps, subtle indices, dividers |
| `--border-subtle` | `1px solid rgba(244, 241, 234, 0.20)` | Hairline frame borders & separator rules |
| `--accent-badge` | `rgba(244, 241, 234, 0.14)` | Pill badges, technology tags, and status chips |

---

## 2. Typography & Sizing Scale

Google Fonts loaded in `index.html`:
- **Mansalva** (400) — Expressive handwritten brush accent
- **Cormorant Upright** (400, 600, 700) — Editorial high-contrast serif
- **Inter** (300, 400, 500, 600) — Modern technical UI sans

### Typographic Hierarchy
1. **Hero Handwritten Headline (`Mansalva`):**
   - `font-size: clamp(2.8rem, 5.5vw, 4.5rem)`
   - `line-height: 1.05`, rotated `-2deg` with subtle drop shadow
2. **Hero Editorial Bio (`Cormorant Upright`):**
   - `font-size: clamp(1.15rem, 1.45vw, 1.4rem)`
   - `line-height: 1.65`, `max-width: 540px`
3. **HUD Frame Metadata (`Inter`):**
   - `font-size: 12px` (`0.75rem`), `letter-spacing: 0.14em`, `text-transform: uppercase`, `font-weight: 500`
4. **Résumé Timeline Year (`Cormorant Upright`):**
   - `font-size: clamp(1.8rem, 3vw, 2.6rem)`, `font-weight: 600`, color `var(--text-primary)`
5. **Résumé Organization Heading (`Cormorant Upright`):**
   - `font-size: clamp(1.5rem, 2.2vw, 2.1rem)`, `font-weight: 700`
6. **Works Section Index (`01`–`04`, `Cormorant Upright`):**
   - `font-size: clamp(3.5rem, 6.5vw, 5.5rem)`, `font-weight: 400`, `line-height: 0.9`, `opacity: 0.85`
7. **Works Category Title (`Cormorant Upright`):**
   - `font-size: clamp(1.85rem, 3vw, 2.75rem)`, `font-weight: 600`
8. **Project Row Title (`Inter`):**
   - `font-size: 1.05rem` (`16.8px`), `font-weight: 500`, paired with pill tags (`font-size: 11px`, `padding: 3px 10px`, `border-radius: 999px`)

---

## 3. Viewport & Layer Geometry

### Layer 0 — Fixed Background Stage (`position: fixed; inset: 0; z-index: 0`)
- R3F Canvas rendering the fixed 3D world with `env.hdr` ambient reflection, three-point directional lighting, soft Bloom, and postprocessing Depth-of-Field (`DepthOfField → Bloom → SMAA`).
- **Interactive Avatar Mechanics:**
  - **Hero (`scroll = 0` / `focus-0`):** Avatar centered (`x: 0, y: 0`), sharp focal plane (`focusDistance: 0.02`), reactive cursor parallax tilt (`damping: 0.1`, max angle 15°).
  - **Timeline Scroll (`focus-1` through `focus-5`):** Camera pans and zooms through the 5 chronological nodes; avatar shifts smoothly to the left (`x: -18vw` on desktop) so the right-hand frosted timeline rail (`width: 46vw`, `max-width: 540px`) remains perfectly legible and uncluttered.
  - **Works Scroll (`focus-works`):** Background gradient transitions to deep forest olive (`#263526`), canvas vignette darkens, depth-of-field bokeh increases so the interactive Works gallery cards take full visual priority.

### Layer 1 — Atmosphere & HUD Overlays (`pointer-events: none; position: fixed; inset: 0; z-index: 5`)
- **`NoiseOverlay.tsx`:** Animated film-grain canvas overlay (`opacity: 0.045`, `mix-blend-mode: overlay`).
- **`HeroFrame`:** Viewport border inset `28px`, registration marks (`+ + + +`) at four corners, top-left name (`Madhav Zanwar`) & role badge, top-right quick links (`pointer-events: auto`), side rail coordinate labels, and bottom-center pulsing `SCROLL` cue.

### Layer 2 — Scrollable Foreground (`position: relative; z-index: 10`)
- Smooth scroll flow:
  1. **Hero Section (`App.tsx`):** Title, bio, interactive contact & social pill links.
  2. **Résumé Timeline (`Resume.tsx`):** 5 synchronized timeline cards anchored to `focus-1` through `focus-5`.
  3. **Works Gallery & Modals (`Works.tsx`):** 4 numbered categories (`01`–`04`) with interactive project rows that trigger frosted-glass Markdown case study modals.
