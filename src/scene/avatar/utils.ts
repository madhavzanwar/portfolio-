import * as THREE from 'three'

// Seeded RNG so the avatar is identical on every load.
export function rng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const hash = (x: number, y: number, z: number) => {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(z | 0, 2147483647)
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296
}

// Smooth 3D value noise in [0,1].
export function noise3(x: number, y: number, z: number) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z)
  const xf = x - xi, yf = y - yi, zf = z - zi
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf)
  const l = THREE.MathUtils.lerp
  return l(
    l(l(hash(xi, yi, zi), hash(xi + 1, yi, zi), u), l(hash(xi, yi + 1, zi), hash(xi + 1, yi + 1, zi), u), v),
    l(l(hash(xi, yi, zi + 1), hash(xi + 1, yi, zi + 1), u), l(hash(xi, yi + 1, zi + 1), hash(xi + 1, yi + 1, zi + 1), u), v),
    w
  )
}

// Anisotropic gaussian bump used to sculpt the face.
export const bump = (
  p: THREE.Vector3,
  cx: number, cy: number, cz: number,
  sx: number, sy: number, sz: number
) => Math.exp(-(((p.x - cx) / sx) ** 2 + ((p.y - cy) / sy) ** 2 + ((p.z - cz) / sz) ** 2))

// Everything is authored in the `man` node's local space (+Y up, +Z toward the camera).
export const HEAD = { cx: 0, cy: 0.465, cz: 0.0, rx: 0.268, ry: 0.38, rz: 0.3 }

export const COLORS = {
  skin: new THREE.Color('#c28660'),
  skinWarm: new THREE.Color('#c66a50'),
  skinShade: new THREE.Color('#946043'),
  beard: new THREE.Color('#2b201a'),
  hair: new THREE.Color('#14100e'),
  lip: new THREE.Color('#8f4a42'),
  teeth: new THREE.Color('#f2ece2'),
  shirt: new THREE.Color('#e8a3a7'),
  jeans: new THREE.Color('#1c2f52'),
  frame: new THREE.Color('#0a0a0b'),
  iris: new THREE.Color('#3a2418'),
}
