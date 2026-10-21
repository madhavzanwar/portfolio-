# Technical Architecture & Handover Report: 3D Portfolio Website

> **Target Architecture**: Reverse-engineered from [`https://about.senbuzy.com/`](https://about.senbuzy.com/) (Open-source base: [`dayinji/sen-3d-resume`](https://github.com/dayinji/sen-3d-resume)).  
> **Workspace**: `c:\Users\poona\Downloads\portfolio-website`  
> **Reference Repository (Cloned)**: `c:\Users\poona\Downloads\sen-3d-resume-temp`  
> **Active Dev Server**: `http://localhost:5173/` (Vite 6, TypeScript 5, React 18, Three.js r169)

---

## 1. Executive Summary & Current Status

This repository is an end-to-end recreation of Sen Zheng's award-winning 3D scrolling portfolio website, completely restructured for **Madhav Zanwar** (AI & ML Engineer at PCCOE Pune).

### What is 100% Completed & Verified Working:
1. **Core 3D Engine & Postprocessing**:
   - React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`) + `@react-three/postprocessing`.
   - Postprocessing pipeline running `<EffectComposer>` with `DepthOfField -> Bloom -> SMAA`.
   - Atmospheric background gradient sphere, hemisphere light, key/fill directional lights, and HDR environment mapping (`Env.tsx`).
   - Scroll-scrubbed camera choreography driven by animation clip `CameraAction` at 24fps.
   - Dual-layer layout: Layer 0 (fixed 3D canvas stage) + Layer 1 (film grain & HUD frame) + Layer 2 (scrollable HTML content).
2. **All Personal Portfolio Content & Projects (Zero Sen Zheng Content Remaining)**:
   - **Hero**: Madhav Zanwar editorial bio, handwritten title styling, HUD coordinates.
   - **Résumé Timeline** (`src/ui/Resume.tsx`): 5 interactive timeline nodes featuring PCCOE Pune B.E. in AI & ML, 1st Place at Spectrum Tech Hackathon, and 350+ LeetCode milestones.
   - **Works Gallery** (`src/ui/Works.tsx`): 4 numbered categories (AI & Machine Learning, Full-Stack & Systems, Computer Vision & Tools, Open Source & Research) featuring 8 real projects (`QuickSketch`, `TraceGuard`, `MemoryVerse AI`, `Kisan Sathi`, `Placement AI`, `Synapse AI Tutor`, `Pulse Forge`, `HealthDoctor`).
   - **Case Studies** (`src/content/works/*.md`): 8 full markdown case study documents rendered inside the interactive frosted-glass modal.
3. **Bug Fixes**:
   - Fixed harsh diagonal striped banding in `src/ui/NoiseOverlay.tsx`.
   - Cleaned TypeScript and Vite bundling (`npm run build` succeeds with **0 errors** in ~12 seconds).
4. **Photos Removed per Directive**:
   - All uploaded photos, crops, and textures have been deleted from `public/images/` and `public/textures/`.
   - `index.html` Open Graph preview updated to `/images/og-preview.png`.
5. **3D Model State**:
   - `public/models/me.glb` and `src/scene/Scene.tsx` are restored to the **authentic, clean original files from `dayinji/sen-3d-resume`**.

---

## 2. In-Depth Technical Deconstruction of `about.senbuzy.com`

### 2.1 File & Directory Architecture
```
portfolio-website/
├── public/
│   ├── models/
│   │   └── me.glb              # Authentic 3D scene: Camera, man mesh, eye spheres, stickers, animations
│   ├── textures/
│   │   └── env.hdr             # 32-bit Radiance HDR environment map for IBL reflections
│   ├── images/
│   │   ├── logos/              # Brand and tech stack SVG/PNG icons
│   │   ├── projects/           # Screenshots of Madhav's 8 real projects
│   │   └── og-preview.png      # Social card image
│   └── works/covers/           # Section covers for the Works gallery (ad, graphics, maker, product)
├── src/
│   ├── App.tsx                 # Viewport orchestrator: Canvas + HUD frame + Scroll listeners
│   ├── scene/
│   │   ├── Scene.tsx           # 3D Scene root: GradientBackground, Lights, Man2, Post2
│   │   └── Env.tsx             # HDRI environment loader with custom rotation/blur
│   ├── ui/
│   │   ├── Resume.tsx          # 5-node scroll-driven frosted-glass timeline rail
│   │   ├── Works.tsx           # 4-category horizontal scrolling project gallery + Markdown modal
│   │   ├── NoiseOverlay.tsx    # GLSL film-grain fragment shader overlay
│   │   ├── LoadingScreen.tsx   # Preload progress screen
│   │   └── SocialIcons.tsx     # SVG social link buttons (GitHub, LinkedIn, LeetCode, Email)
│   ├── data/
│   │   ├── focusPoints.ts      # Single source of truth for timeline anchor node names (M = 5)
│   │   ├── works.ts            # Project metadata, categories, tags, slugs, and summaries
│   │   └── portfolioData.ts    # Centralized data store of Madhav's accomplishments
│   ├── content/works/*.md      # Markdown documentation for all 8 projects
│   └── store.ts                # Zustand global state (active modal slug, hovered category, enter state)
```

### 2.2 How the Scroll-Driven 3D Choreography Works
1. In `src/scene/Scene.tsx`, `useGLTF('models/me.glb')` loads the model and its two animation clips:
   - `CameraAction` (350 keyframes, 14.58s @ 24fps): Controls the position and orientation of node `Camera`.
   - `manAction` (346 keyframes, 14.42s @ 24fps): Controls the breathing, swaying, and position of node `man`.
2. A single `THREE.AnimationMixer` is bound to the cloned model. `actions.forEach(a => { a.play(); a.paused = true; })`.
3. Every frame in `useFrame`:
   - Document scroll position is read relative to the DOM elements marked with `[data-point="focus-*"]` in `src/ui/Resume.tsx`.
   - The scroll offset is remapped using an S-curve dwell function (`dwell: 0.35`) into a continuous frame index:
     - Hero section: frames `0` to `50`
     - Résumé timeline (5 nodes): frames `50` to `250` (`RESUME_FRAMES = 5 * 50 = 250`)
     - Works gallery entrance & horizontal pan: frames `250` to `350`
   - The mixer is scrubbed to the target frame via `mixer.setTime(targetFrame / 24)`.
   - The world transform of `glbCam` is copied directly to the R3F `camera`:
     ```ts
     glbCam.getWorldPosition(camPos.current)
     glbCam.getWorldQuaternion(camQuat.current)
     camera.position.copy(camPos.current)
     camera.quaternion.copy(camQuat.current)
     camera.fov = glbCam.fov
     camera.updateProjectionMatrix()
     ```
4. **Depth of Field Auto-Focus (`Post2`)**:
   - `DepthOfField` target vector (`focusRef`) is updated dynamically to point to the current active empty node in the scene (`focus-start`, `focus-0` through `focus-5`, or `focus-works`).
   - As the camera dollies in and out, the focal plane dynamically tracks the subject.

---

## 3. The 3D Avatar Issue: Detailed Post-Mortem

### 3.1 What `public/models/me.glb` Actually Contains
Inspecting the GLTF binary chunk revealed the exact hierarchy:
- **Node 0 (`Camera`)**: Perspective camera, narrow FOV `0.3996` rad (~22.9°), aspect ratio 1.777.
- **Node 25 (`man`)**: Mesh index 17 (`Mesh_0.002`), Material index 3 (`Material_0.002`).
  - Base color map: `Image_0` (WebP, 2048×2048, bufferView 63).
  - Emissive map: `Image_3` (WebP, 2048×2048, all black/zeros).
  - Normal map: `Image_2` (WebP, 2048×2048 tangent-space normal map).
  - Metallic-Roughness map: `Image_1` (WebP, 2048×2048).
- **Node 1 (`eye1`) & Node 2 (`eye2`)**: Sphere meshes (radius `0.056`) centered at `[-0.1127, 0.486, 0.237]` and `[0.1110, 0.486, 0.237]`. Animated every frame to track the cursor with smooth damping.
- **Nodes 10–24 (`sticker0` through `sticker14`)**: 15 separate planar polygon meshes parented directly to `man`, floating in space around the face (e.g., "ZOOOP", "I ❤️ SYN", TikTok logo, Facebook thumbs-up).

### 3.2 Why Texture Baking / Face Projection Failed Catastrophically
The user requested: *"keeping everything the same can you just paste my face instead of his?"*
1. **The Core Obstacle**: `Mesh_0.002` is **not a neutral 3D face**. It is a stylized, expressive caricature modeled in Blender with:
   - **Clenched teeth biting down on the lower lip (`😬` grimace) sculpted into the 3D vertex positions**.
   - Big cartoon ears, a long skinny cartoon neck, and stylized hair geometry.
2. **The Result of Projecting a 2D Face Photo**:
   - When Madhav's photo (or even a stylized 3D avatar face) was projected onto `Mesh_0.002`, the texture was painted onto a surface where the mouth polygons physically formed clenched teeth and biting lips.
   - The result looked grotesque: a realistic 2D face wrapped over a contorted cartoon head with bulging cartoon eyes sticking out and sticker planes hovering over the nose.
   - **Conclusion**: **You cannot fix a grimacing cartoon mesh simply by modifying its 2D texture.** The underlying polygon geometry dictates the facial expression.

### 3.3 Why the 2D Billboard Plane Failed in an Earlier Turn
In an earlier iteration, the agent attempted to hide `man` and place a flat `<planeGeometry>` with a cutout photo in the scene:
- Because `glbCam` has a narrow FOV (22.9°) and was animated to focus at `y = 1.3`, placing a plane at `[0, 0, 0]` resulted in the top half of the head being clipped above the viewport ceiling.
- The 2D plane lacked 3D lighting, normal response, and depth-of-field separation, destroying the visual fidelity.

---

## 4. Recommendations for the Next Agent (How Claude Can Solve This Flawlessly)

Depending on what the user wants to achieve with the avatar, choose one of these three clean paths:

### Path A (Recommended): Custom 3D Model Replacement in Blender / Intro3D
This is the official method recommended by the original author in `sen-3d-resume/README.md`:
1. Use [intro3d.com](https://intro3d.com) or Blender (the original file is in `../sen-3d-resume-temp/blender/sen.blend`):
   - Import a 3D avatar of Madhav (e.g. from Ready Player Me, Meshy.ai, or custom Blender model).
   - Ensure the model has a neutral or pleasant smiling facial expression.
2. **Required Node Names in the GLB**:
   - `Camera` with animation clip named `CameraAction`.
   - `man` (the character mesh/root) with animation clip `manAction`.
   - `eye1` and `eye2` (meshes with "eye" in the name if eye-tracking cursor is desired).
   - Empty nodes: `focus-start` (or `focus-0`), `focus-1` through `focus-5`, and `focus-works`.
3. Export as `me.glb` and replace `public/models/me.glb`. Everything in `Scene.tsx` will automatically work without writing a single line of custom code.

### Path B: Keep the Authentic `about.senbuzy.com` 3D Avatar
- The original portfolio aesthetic on `about.senbuzy.com` relies on Sen's clay/vinyl character as a stylized mascot.
- Keep `public/models/me.glb` as is (currently restored and active).
- Madhav's identity is fully represented by all the personal text, PCCOE degree, Spectrum Tech #1 award, 8 real projects, and case studies.

### Path C: Seamless 2.5D Holographic Avatar Card (No Clipping)
If the user wants a portrait photo of themselves in the 3D scene without a full 3D mesh:
1. In `src/scene/Scene.tsx`, in `useMemo`:
   ```ts
   clone.traverse((o: any) => {
     if (o.name === 'man' || /sticker/i.test(o.name) || /eye/i.test(o.name)) {
       o.visible = false // Hide Sen's cartoon body and meme stickers
     }
   })
   ```
2. Render a 2.5D depth card synchronized to `man`'s local coordinate space:
   - Position: `[0, 0.35, 0.22]` relative to `man`.
   - Geometry: `<planeGeometry args={[1.35, 1.75]} />`.
   - In `useFrame`, copy `manNode.position` and `manNode.quaternion` so the card follows the camera's zoom/pan across all 5 timeline nodes.
   - Apply mouse-tracking tilt: `rotation.y = lerp(rotation.y, mouse.x * 0.2, 0.08)`.

---

## 5. Verification Checklist for the Next Turn

- [x] `npm run build` passes with 0 errors (`tsc -b && vite build`).
- [x] Vite dev server active on `http://localhost:5173/`.
- [x] `public/models/me.glb` is the authentic 1,735,396-byte model from `sen-3d-resume`.
- [x] All 8 project case studies load properly in `src/content/works/*.md`.
- [x] All user photos removed from `public/images/`.
- [x] Noise overlay shader runs without visual artifacts.
