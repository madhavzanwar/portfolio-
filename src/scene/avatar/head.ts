import * as THREE from 'three'
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { COLORS, HEAD, bump, noise3 } from './utils'

const S = THREE.MathUtils.smoothstep

export type HeadData = {
  mesh: THREE.Mesh
  geometry: THREE.BufferGeometry
  /** 0..1 per vertex: how much beard covers it */
  beardMask: Float32Array
  /** 0..1 per vertex: how much hair covers it */
  hairMask: Float32Array
  /** Project a point at (x,y) on the front of the face; returns surface position + normal. */
  onFace: (x: number, y: number, offset?: number) => { p: THREE.Vector3; n: THREE.Vector3 }
}

// Beard boundary: height of the upper beard edge as a function of |x| (high at the ear → sideburn, low at the centre).
const beardTop = (ax: number) => 0.29 + 0.17 * Math.pow(Math.min(ax / 0.27, 1), 2.2)

export function buildHead(): HeadData {
  const { cx, cy, cz, rx, ry, rz } = HEAD
  let geo: THREE.BufferGeometry = new THREE.IcosahedronGeometry(1, 56)
  geo.deleteAttribute('normal')
  geo.deleteAttribute('uv')
  geo = mergeVertices(geo, 1e-4)

  const pos = geo.getAttribute('position') as THREE.BufferAttribute
  const n = pos.count
  const d = new THREE.Vector3()
  const p = new THREE.Vector3()
  const q = new THREE.Vector3()
  const colors = new Float32Array(n * 3)
  const beardMask = new Float32Array(n)
  const hairMask = new Float32Array(n)
  const c = new THREE.Color()
  const stubble = new THREE.Color('#5a4034')

  for (let i = 0; i < n; i++) {
    d.fromBufferAttribute(pos, i).normalize()
    // --- base skull: ellipsoid, jaw narrows, chin squares off ---
    const lower = 1 - S(d.y, -0.95, 0.12)
    // jaw: slight taper, but squarer than an ellipsoid (U-shaped, not V-shaped)
    const jaw = d.y < 0 ? 1 + 0.12 * Math.sin(Math.PI * Math.min(1, -d.y)) : 1
    let x = d.x * rx * (1 - 0.08 * lower) * jaw
    let y = d.y * ry
    let z = d.z * rz
    if (d.y < 0) {
      // squarer jaw / chin: pull the underside flatter
      y *= 1 - 0.1 * (1 - Math.abs(d.y))
      if (d.z > 0) z += 0.03 * lower
    }
    // back of the skull is a bit fuller
    if (d.z < 0) z *= 1.06
    p.set(x + cx, y + cy, z + cz)

    // --- facial sculpting (push along the sphere direction) ---
    let push = 0
    // brow ridge
    push += 0.016 * bump(p, 0.11, 0.54, 0.27, 0.09, 0.02, 0.07)
    push += 0.012 * bump(p, 0, 0.52, 0.29, 0.05, 0.03, 0.06)
    // eye sockets
    push -= 0.02 * bump(p, 0.105, 0.485, 0.27, 0.055, 0.035, 0.06) + 0.02 * bump(p, -0.105, 0.485, 0.27, 0.055, 0.035, 0.06)
    // cheeks (lifted by the smile) + cheekbones
    push += 0.024 * (bump(p, 0.15, 0.345, 0.24, 0.065, 0.055, 0.07) + bump(p, -0.15, 0.345, 0.24, 0.065, 0.055, 0.07))
    push += 0.01 * (bump(p, 0.19, 0.41, 0.2, 0.05, 0.05, 0.08) + bump(p, -0.19, 0.41, 0.2, 0.05, 0.05, 0.08))
    // chin
    push += 0.022 * bump(p, 0, 0.12, 0.25, 0.08, 0.05, 0.07)
    // dimple under the lower lip
    push -= 0.01 * bump(p, 0, 0.2, 0.285, 0.05, 0.016, 0.04)
    // temples hollow
    push -= 0.008 * (bump(p, 0.255, 0.55, 0.12, 0.03, 0.06, 0.1) + bump(p, -0.255, 0.55, 0.12, 0.03, 0.06, 0.1))
    q.copy(d).multiplyScalar(push)
    p.add(q)
    // nose pushes straight forward (+Z) with a little lift
    const bridge = bump(p, 0, 0.46, 0.3, 0.024, 0.06, 0.05)
    const tip = bump(p, 0, 0.397, 0.31, 0.033, 0.028, 0.05)
    const alae = bump(p, 0.04, 0.388, 0.28, 0.022, 0.02, 0.04) + bump(p, -0.04, 0.388, 0.28, 0.022, 0.02, 0.04)
    p.z += 0.03 * bridge + 0.088 * tip + 0.032 * alae
    p.y += 0.006 * tip
    // philtrum dimple
    p.z -= 0.006 * bump(p, 0, 0.345, 0.3, 0.012, 0.02, 0.05)

    // --- beard / hair masks ---
    const ax = Math.abs(p.x)
    const bt = beardTop(ax)
    // everything below the beard line (cheek line rises toward the ear → sideburn)
    let beard = 1 - S(p.y, bt - 0.03, bt + 0.035)
    // keep it off the scalp / forehead / eye area
    beard *= 1 - S(p.y, 0.5, 0.62)
    // stop behind the ear
    beard *= 1 - S(-p.z, 0.06, 0.2) * S(ax, 0.2, 0.28)
    // never on the nose tip
    beard *= 1 - 0.95 * bump(p, 0, 0.385, 0.35, 0.05, 0.03, 0.06)
    beardMask[i] = THREE.MathUtils.clamp(beard, 0, 1)

    // hair: top of the skull, hairline high on the forehead, down to behind the ears
    // side-swept fringe: hairline sits lower on his right (-x), with soft scallops for separate locks
    const frontLine = 0.655 - 0.03 * S(-p.x, -0.06, 0.2) - 0.03 * Math.pow(ax / 0.27, 2) + 0.008 * Math.sin(p.x * 58 + 1.3) + 0.01 * noise3(p.x * 20, 3, 0)
    const sideLine = 0.52
    const backLine = 0.34
    const hl = THREE.MathUtils.lerp(backLine, frontLine, S(p.z, -0.2, 0.24))
    let hair = S(p.y, hl - 0.02, hl + 0.025)
    // temples: hair comes down in front of the ears (sideburn) until it meets the beard
    const sideHair = S(ax, 0.2, 0.27) * S(p.y, sideLine - 0.04, sideLine + 0.04) * S(p.z, -0.3, 0.02) * (1 - S(p.z, 0.03, 0.09))
    hair = Math.max(hair, sideHair)
    hairMask[i] = hair

    // --- offsets: beard has real volume, skin gets micro-relief ---
    const bm = beardMask[i]
    p.addScaledVector(d, 0.004 * bm)

    pos.setXYZ(i, p.x, p.y, p.z)

    // --- vertex colours ---
    c.copy(COLORS.skin)
    // warm cheeks / nose, cooler shadow under the brow & jaw
    c.lerp(COLORS.skinWarm, 0.32 * (bump(p, 0.15, 0.34, 0.25, 0.08, 0.06, 0.08) + bump(p, -0.15, 0.34, 0.25, 0.08, 0.06, 0.08)) + 0.4 * tip)
        c.lerp(COLORS.skinShade, 0.22 * (1 - S(p.y, 0.0, 0.2)))
    c.lerp(COLORS.beard, 0.4 * (bump(p, 0.022, 0.372, 0.31, 0.009, 0.008, 0.03) + bump(p, -0.022, 0.372, 0.31, 0.009, 0.008, 0.03)))
    c.lerp(COLORS.skinShade, 0.35 * (bump(p, 0.062, 0.43, 0.27, 0.02, 0.05, 0.04) + bump(p, -0.062, 0.43, 0.27, 0.02, 0.05, 0.04)))
    // stubble fade → dense beard
    const dense = S(bm, 0.2, 0.75)
    const stub = S(bm, 0.0, 0.4)
    // light, trimmed stubble: skin shows through, darker toward the jaw and chin
    const grain = noise3(p.x * 420, p.y * 420, p.z * 420)
    c.lerp(stubble, 0.4 * stub * (0.6 + 0.4 * grain))
    c.lerp(COLORS.beard, 0.42 * dense * (0.65 + 0.35 * grain) * S(0.34 - p.y, -0.02, 0.16))
    c.lerp(COLORS.hair, S(hair, 0.3, 0.7))
    colors[i * 3] = c.r
    colors[i * 3 + 1] = c.g
    colors[i * 3 + 2] = c.b
  }

  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geo.computeVertexNormals()
  geo.computeBoundingSphere()

  const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.58, metalness: 0 })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.castShadow = true
  mesh.receiveShadow = true
  mesh.name = 'head'

  const ray = new THREE.Raycaster()
  const nrm = new THREE.Vector3()
  const onFace = (x: number, y: number, offset = 0) => {
    ray.set(new THREE.Vector3(x, y, 1.5), new THREE.Vector3(0, 0, -1))
    const hit = ray.intersectObject(mesh, false)[0]
    if (!hit) return { p: new THREE.Vector3(x, y, 0.2), n: new THREE.Vector3(0, 0, 1) }
    nrm.copy(hit.face!.normal)
    return { p: hit.point.clone().addScaledVector(nrm, offset), n: nrm.clone() }
  }
  mesh.updateMatrixWorld(true)
  return { mesh, geometry: geo, beardMask, hairMask, onFace }
}
