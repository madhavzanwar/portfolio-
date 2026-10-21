import * as THREE from 'three'
import { COLORS } from './utils'

// Rounded-rectangle outline in the XY plane, centred on the origin.
function roundedRect(w: number, h: number, r: number, steps = 10) {
  const pts: THREE.Vector3[] = []
  const hw = w / 2, hh = h / 2
  const corner = (cx: number, cy: number, a0: number) => {
    for (let i = 0; i <= steps; i++) {
      const a = a0 + (i / steps) * (Math.PI / 2)
      pts.push(new THREE.Vector3(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 0))
    }
  }
  corner(hw - r, hh - r, 0)
  corner(-hw + r, hh - r, Math.PI / 2)
  corner(-hw + r, -hh + r, Math.PI)
  corner(hw - r, -hh + r, Math.PI * 1.5)
  return pts
}

export function buildGlasses() {
  const group = new THREE.Group()
  group.name = 'glasses'
  const frameMat = new THREE.MeshStandardMaterial({ color: COLORS.frame, roughness: 0.28, metalness: 0.25 })
  const lensMat = new THREE.MeshPhysicalMaterial({
    color: '#dfeaf2', roughness: 0.02, metalness: 0, transparent: true, opacity: 0.1,
    clearcoat: 1, clearcoatRoughness: 0, envMapIntensity: 1.6, depthWrite: false,
  })

  const W = 0.17, H = 0.112, rad = 0.03, cxLens = 0.103, y = 0.482, z = 0.333
  for (const side of [-1, 1]) {
    const lens = new THREE.Group()
    lens.position.set(side * cxLens, y, z - 0.012 * 0 - Math.abs(side) * 0)
    lens.rotation.y = side * 0.14 // wrap slightly toward the temples
    const outline = roundedRect(W, H, rad)
    const curve = new THREE.CatmullRomCurve3(outline, true, 'catmullrom', 0.5)
    const rim = new THREE.Mesh(new THREE.TubeGeometry(curve, 120, 0.0042, 10, true), frameMat)
    rim.scale.set(1, 1, 1.1)
    rim.castShadow = true
    // a touch thicker on top (browline feel)
    const top = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([
      new THREE.Vector3(-W / 2 + 0.01, H / 2 + 0.002, 0), new THREE.Vector3(0, H / 2 + 0.006, 0), new THREE.Vector3(W / 2 - 0.01, H / 2 + 0.002, 0),
    ]), 24, 0.0042, 8, false), frameMat)
    const shape = new THREE.Shape(outline.map((p) => new THREE.Vector2(p.x, p.y)))
    const lensMesh = new THREE.Mesh(new THREE.ShapeGeometry(shape, 8), lensMat)
    lensMesh.renderOrder = 2
    lens.add(rim, top, lensMesh)
    group.add(lens)

    // temple arm: from the outer hinge back over the ear
    const hinge = new THREE.Vector3(side * (cxLens + W / 2 + 0.004), y + 0.018, z - 0.026)
    const arm = new THREE.CatmullRomCurve3([
      hinge,
      new THREE.Vector3(side * 0.24, y + 0.02, 0.2),
      new THREE.Vector3(side * 0.272, y + 0.012, 0.06),
      new THREE.Vector3(side * 0.272, y - 0.005, -0.03),
      new THREE.Vector3(side * 0.262, y - 0.045, -0.055),
    ])
    const armMesh = new THREE.Mesh(new THREE.TubeGeometry(arm, 40, 0.0042, 8, false), frameMat)
    armMesh.castShadow = true
    group.add(armMesh)
  }

  // bridge + nose pads
  const bridge = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-cxLens + W / 2 - 0.006, y + 0.034, z - 0.005),
    new THREE.Vector3(0, y + 0.044, z + 0.008),
    new THREE.Vector3(cxLens - W / 2 + 0.006, y + 0.034, z - 0.005),
  ])
  group.add(new THREE.Mesh(new THREE.TubeGeometry(bridge, 24, 0.0044, 8, false), frameMat))
  return group
}
