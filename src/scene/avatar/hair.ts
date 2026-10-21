import * as THREE from 'three'
import { COLORS, noise3 } from './utils'
import type { HeadData } from './head'

const S = THREE.MathUtils.smoothstep

export function buildHair(head: HeadData) {
  const group = new THREE.Group()
  group.name = 'hair'
  const geo = head.geometry
  const pos = geo.getAttribute('position') as THREE.BufferAttribute
  const nrm = geo.getAttribute('normal') as THREE.BufferAttribute
  const index = geo.getIndex()!
  const { hairMask } = head
  // Vertex alpha + alphaTest gives a smooth, organic hairline instead of a triangle-staircase edge.
  const mat = new THREE.MeshStandardMaterial({ vertexColors: true, alphaTest: 0.5, roughness: 0.55, metalness: 0.05, side: THREE.DoubleSide })

  const whorl = new THREE.Vector3(0.04, 0.9, -0.08)
  const verts: number[] = [], cols: number[] = [], idx: number[] = []
  const remap = new Map<number, number>()
  const P = new THREE.Vector3(), N = new THREE.Vector3(), c = new THREE.Color()
  const dark = COLORS.hair, sheen = new THREE.Color('#41342d')
  const take = (v: number) => {
    let m = remap.get(v)
    if (m === undefined) {
      m = verts.length / 3
      remap.set(v, m)
      P.fromBufferAttribute(pos, v)
      N.fromBufferAttribute(nrm, v)
      const top = S(P.y, 0.58, 0.9)
      const quiff = S(P.z, 0.0, 0.2) * S(P.y, 0.68, 0.82)
      const thick = 0.016 + 0.052 * top + 0.034 * quiff
      // combed locks: angular ridges about the crown, warped by noise
      const ang = Math.atan2(P.z - whorl.z, P.x - whorl.x)
      const warp = noise3(P.x * 9, P.y * 9, P.z * 9) * 2.2
      const ridge = Math.sin(ang * 17 + warp * 4.5) * 0.5 + 0.5
      const fine = noise3(P.x * 60, P.y * 20, P.z * 60)
      const off = thick + (0.016 * ridge + 0.003 * fine) * (0.35 + 0.65 * top)
      verts.push(P.x + N.x * off, P.y + N.y * off, P.z + N.z * off)
      c.copy(dark).lerp(sheen, ridge * ridge * 0.85 * top)
      cols.push(c.r, c.g, c.b, S(hairMask[v], 0.25, 0.75))
    }
    return m
  }
  for (let i = 0; i < index.count; i += 3) {
    const a = index.getX(i), b = index.getX(i + 1), d = index.getX(i + 2)
    if (hairMask[a] > 0.2 || hairMask[b] > 0.2 || hairMask[d] > 0.2) idx.push(take(a), take(b), take(d))
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
  g.setAttribute('color', new THREE.Float32BufferAttribute(cols, 4))
  g.setIndex(idx)
  g.computeVertexNormals()
  const cap = new THREE.Mesh(g, mat)
  cap.castShadow = cap.receiveShadow = true
  group.add(cap)
  return group
}
