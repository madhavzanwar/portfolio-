import * as THREE from 'three'
import { COLORS, rng } from './utils'
import type { HeadData } from './head'

const dark = new THREE.MeshStandardMaterial({ color: '#17110e', roughness: 0.5, metalness: 0.1 })
const skinMat = () => new THREE.MeshStandardMaterial({ color: COLORS.skin.clone().multiplyScalar(0.92), roughness: 0.62, side: THREE.DoubleSide })

// Tiny helper: instanced ellipsoid strokes along a path (eyebrows / moustache).
function strokes(
  path: { p: THREE.Vector3; dir: THREE.Vector3; len: number; w: number }[],
  material: THREE.Material,
  seed: number
) {
  const geo = new THREE.SphereGeometry(0.5, 8, 6)
  const mesh = new THREE.InstancedMesh(geo, material, path.length)
  const r = rng(seed)
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), x = new THREE.Vector3(1, 0, 0)
  path.forEach((s, i) => {
    q.setFromUnitVectors(x, s.dir.clone().normalize())
    m4.compose(s.p, q, new THREE.Vector3(s.len * (0.85 + 0.3 * r()), s.w * (0.85 + 0.3 * r()), s.w * 0.9))
    mesh.setMatrixAt(i, m4)
  })
  mesh.castShadow = true
  return mesh
}

export function buildEyes(eyeNodes: THREE.Object3D[], parent: THREE.Object3D) {
  const R = 0.043
  const white = new THREE.MeshStandardMaterial({ color: '#efe9e0', roughness: 0.25 })
  const iris = new THREE.MeshStandardMaterial({ color: COLORS.iris, roughness: 0.2 })
  const pupil = new THREE.MeshBasicMaterial({ color: '#050303' })
  const glint = new THREE.MeshBasicMaterial({ color: '#ffffff' })
  const lid = skinMat()

  // neutral forward-facing base so the irises sit centred before the cursor-tracking offsets apply
  eyeNodes.forEach((n) => n.quaternion.set(Math.SQRT1_2, 0, 0, Math.SQRT1_2))
  const eyes = [...eyeNodes].sort((a, b) => a.position.x - b.position.x)
  eyes.forEach((node, i) => {
    const side = i === 0 ? -1 : 1
    node.position.set(side * 0.104, 0.483, 0.237)
    node.add(new THREE.Mesh(new THREE.SphereGeometry(R, 32, 20), white))
    // the node is authored with +Y pointing forward, so caps are built around the +Y pole
    node.add(new THREE.Mesh(new THREE.SphereGeometry(R * 1.004, 28, 8, 0, Math.PI * 2, 0, 0.5), iris))
    node.add(new THREE.Mesh(new THREE.SphereGeometry(R * 1.008, 20, 6, 0, Math.PI * 2, 0, 0.22), pupil))
    const g = new THREE.Mesh(new THREE.SphereGeometry(R * 0.12, 10, 8), glint)
    g.position.set(-0.009, R * 0.985, 0.012)
    node.add(g)

    // eyelids live on the head (they don't rotate with the eyeball); smiling = lower lid pushed up
    const lidsAt = new THREE.Group()
    lidsAt.position.copy(node.position)
    const front = Math.PI / 2
    const upper = new THREE.Mesh(new THREE.SphereGeometry(R * 1.1, 28, 12, front - 0.95, 1.9, 0, 1.2), lid)
    const lower = new THREE.Mesh(new THREE.SphereGeometry(R * 1.1, 28, 12, front - 0.95, 1.9, 1.95, 0.45), lid)
    lidsAt.add(upper, lower)
    lidsAt.rotation.z = side * 0.05
    parent.add(lidsAt)
  })
}

export function buildBrows(head: HeadData) {
  const group = new THREE.Group()
  for (const side of [-1, 1]) {
    const path: Parameters<typeof strokes>[0] = []
    const n = 30
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1)
      const x = side * (0.04 + 0.145 * t)
      const y = 0.585 + 0.022 * Math.sin(Math.PI * Math.min(1, t * 1.15) * 0.85) - 0.022 * t * t
      const { p } = head.onFace(x, y, 0.004)
      const slant = new THREE.Vector3(side * 1, 0.28 * (1 - t) - 0.1 * t, 0.0)
      const w = 0.0135 * (1 - 0.45 * t) * (0.9 + 0.1 * Math.sin(i * 2.1))
      path.push({ p, dir: slant, len: 0.035, w })
    }
    group.add(strokes(path, dark, side === -1 ? 11 : 12))
  }
  return group
}

// Mouth: an open, wide smile that shows the upper teeth; all pieces are draped onto the face surface.
export function buildMouth(head: HeadData) {
  const group = new THREE.Group()
  const W = 0.088
  const U = (x: number) => 0.283 + 0.02 * Math.pow(Math.abs(x) / W, 2)
  const H = (x: number) => 0.022 * Math.pow(Math.max(0, 1 - Math.pow(x / W, 2)), 0.6)

  const strip = (rows: number, cols: number, yOf: (x: number, v: number) => number, offset: number, colorOf: (x: number, v: number) => THREE.Color, mat: THREE.Material) => {
    const verts: number[] = [], colors: number[] = [], idx: number[] = []
    for (let r = 0; r <= rows; r++) for (let c = 0; c <= cols; c++) {
      const x = -W + (2 * W * c) / cols
      const v = r / rows
      const { p } = head.onFace(x, yOf(x, v), offset)
      verts.push(p.x, p.y, p.z)
      const k = colorOf(x, v)
      colors.push(k.r, k.g, k.b)
    }
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const a = r * (cols + 1) + c, b = a + 1, d = a + cols + 1, e = d + 1
      idx.push(a, d, b, b, d, e)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
    g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    g.setIndex(idx)
    g.computeVertexNormals()
    return new THREE.Mesh(g, mat)
  }

  const cavity = new THREE.Color('#2a0c0e')
  const tongue = new THREE.Color('#7a3036')
  // mouth interior
  group.add(strip(4, 40, (x, v) => U(x) - H(x) * v, 0.003,
    (_x, v) => cavity.clone().lerp(tongue, Math.max(0, v - 0.55) * 1.4),
    new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.6 })))
  // upper teeth: top ~68% of the opening, with soft gaps between teeth and shading toward the lip
  const toothBase = COLORS.teeth, gap = new THREE.Color('#cfc6b8')
  group.add(strip(5, 64, (x, v) => U(x) - 0.0015 - H(x) * 0.72 * v, 0.0048,
    (x, v) => {
      const k = toothBase.clone()
      const gx = Math.abs(((x + W) / 0.0175) % 1 - 0.5) * 2
      k.lerp(gap, Math.pow(gx, 8) * 0.9)
      k.multiplyScalar(0.82 + 0.18 * v)
      return k
    },
    new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.28 })))
  // lower teeth (smaller, in shade)
  group.add(strip(3, 44, (x, v) => U(x) - H(x) + 0.0015 + H(x) * 0.22 * (1 - v), 0.0042,
    (_x, v) => toothBase.clone().multiplyScalar(0.62 + 0.2 * v),
    new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.3 })))

  // lips as tubes
  const lipMat = new THREE.MeshStandardMaterial({ color: COLORS.lip, roughness: 0.5 })
  const tube = (yOf: (x: number) => number, r: number, off: number) => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= 28; i++) {
      const x = -W - 0.004 + ((2 * W + 0.008) * i) / 28
      pts.push(head.onFace(x, yOf(x), off).p)
    }
    const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 56, r, 10, false), lipMat)
    m.castShadow = true
    return m
  }
  group.add(tube((x) => U(x) + 0.004, 0.0075, 0.0035))
  group.add(tube((x) => U(x) - H(x) - 0.0045, 0.0088, 0.0035))

  // moustache: dense dark strokes above the upper lip, sweeping out and down to the corners
  const path: Parameters<typeof strokes>[0] = []
  const r = rng(21)
  for (let i = 0; i < 70; i++) {
    const t = (i / 69) * 2 - 1
    const x = t * (W + 0.012)
    const w = 0.0105 * (1 - 0.5 * Math.abs(t))
    const y = U(x) + 0.014 + 0.004 * (1 - Math.abs(t)) + (r() - 0.5) * 0.008
    const { p } = head.onFace(x + (r() - 0.5) * 0.006, y, 0.009)
    path.push({ p, dir: new THREE.Vector3(Math.sign(t) || 1, -0.25 - 0.4 * Math.abs(t), 0.05), len: 0.034, w })
  }
  group.add(strokes(path, dark, 33))
  return group
}

export function buildEars() {
  const group = new THREE.Group()
  const outer = new THREE.MeshStandardMaterial({ color: '#b87a57', roughness: 0.6 })
  const inner = new THREE.MeshStandardMaterial({ color: '#8f583e', roughness: 0.7 })
  for (const side of [-1, 1]) {
    const e = new THREE.Group()
    e.position.set(side * 0.256, 0.455, -0.035)
    e.rotation.set(0, side * 0.42, side * -0.1)
    const body = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 16), outer)
    body.scale.set(0.014, 0.062, 0.04)
    body.position.x = side * 0.012
    const cup = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), inner)
    cup.scale.set(0.01, 0.036, 0.022)
    cup.position.set(side * 0.003, -0.003, 0.003)
    e.add(body, cup)
    group.add(e)
  }
  return group
}
