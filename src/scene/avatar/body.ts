import * as THREE from 'three'
import { COLORS, noise3 } from './utils'

export function buildBody() {
  const group = new THREE.Group()
  group.name = 'body'

  const skin = new THREE.MeshStandardMaterial({ color: '#b87a57', roughness: 0.58 })
  const shirt = new THREE.MeshStandardMaterial({ color: COLORS.shirt, roughness: 0.82, metalness: 0 })
  const shirtDark = new THREE.MeshStandardMaterial({ color: COLORS.shirt.clone().multiplyScalar(0.86), roughness: 0.85 })
  const button = new THREE.MeshStandardMaterial({ color: '#f4e9e4', roughness: 0.3 })
  const jeans = new THREE.MeshStandardMaterial({ color: COLORS.jeans, roughness: 0.9 })
  const silver = new THREE.MeshStandardMaterial({ color: '#d9dde2', roughness: 0.2, metalness: 1 })

  // neck
  const neckGeo = new THREE.CylinderGeometry(0.108, 0.128, 0.42, 40, 6)
  {
    const p = neckGeo.getAttribute('position') as THREE.BufferAttribute
    const cols: number[] = []
    const c = new THREE.Color()
    for (let i = 0; i < p.count; i++) {
      const y = p.getY(i)
      c.set('#b87a57').lerp(new THREE.Color('#7e5039'), THREE.MathUtils.smoothstep(y, -0.02, 0.2))
      cols.push(c.r, c.g, c.b)
    }
    neckGeo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3))
  }
  const neck = new THREE.Mesh(neckGeo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.6 }))
  neck.position.set(0, -0.04, -0.012)
  neck.scale.set(1, 1, 0.96)
  group.add(neck)

  // torso: a lathe profile, flattened front-to-back, with soft fabric noise
  const prof = [
    [0.15, -0.105], [0.19, -0.15], [0.26, -0.19], [0.36, -0.225], [0.45, -0.265], [0.49, -0.34],
    [0.49, -0.55], [0.47, -0.8], [0.45, -1.05], [0.44, -1.2],
  ].map(([r, y]) => new THREE.Vector2(r, y))
  const torsoGeo = new THREE.LatheGeometry(prof, 56)
  {
    const p = torsoGeo.getAttribute('position') as THREE.BufferAttribute
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i), z = p.getZ(i)
      const n = (noise3(x * 6, y * 6, z * 6) - 0.5) * 0.02 + (noise3(x * 18, y * 4, z * 18) - 0.5) * 0.008
      const l = Math.hypot(x, z) || 1
      p.setXYZ(i, (x + (x / l) * n) * 1.05, y, (z + (z / l) * n) * 0.56)
    }
    torsoGeo.computeVertexNormals()
  }
  const torso = new THREE.Mesh(torsoGeo, shirt)
  torso.castShadow = torso.receiveShadow = true
  group.add(torso)

  // jeans below the hem so the lower frame never shows a void
  const legs = new THREE.Mesh(new THREE.CylinderGeometry(0.44 * 1.05, 0.4 * 1.05, 0.9, 40, 1, true), jeans)
  legs.scale.set(1, 1, 0.56)
  legs.position.y = -1.6
  group.add(legs)

  // mandarin collar: a short stand-up band that is open at the front
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.142, 0.158, 0.062, 48, 1, true, 0.12, Math.PI * 2 - 0.24), shirtDark)
  collar.material = new THREE.MeshStandardMaterial({ color: COLORS.shirt, roughness: 0.8, side: THREE.DoubleSide })
  collar.position.set(0, -0.098, -0.008)
  collar.scale.set(1, 1, 0.96)
  collar.rotation.y = Math.PI // opening faces +Z
  group.add(collar)
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.007, 8, 48, Math.PI * 2 - 0.24), shirtDark)
  rim.rotation.x = Math.PI / 2
  rim.rotation.z = Math.PI / 2 + 0.12 + Math.PI
  rim.position.set(0, -0.066, -0.008)
  group.add(rim)

  // placket + buttons + chest pocket (his left = +x)
  const FRONT_Z = 0.49 * 0.56 // torso half-depth at chest height
  const placket = new THREE.Mesh(new THREE.BoxGeometry(0.052, 0.95, 0.012), shirtDark)
  placket.position.set(0, -0.68, FRONT_Z + 0.003)
  group.add(placket)
  for (let i = 0; i < 4; i++) {
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.0125, 0.0125, 0.008, 14), button)
    b.rotation.x = Math.PI / 2
    b.position.set(0, -0.3 - i * 0.2, FRONT_Z + 0.012)
    group.add(b)
  }
  const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.15, 0.008), shirtDark)
  pocket.position.set(0.22, -0.46, 0.268)
  pocket.rotation.y = 0.35
  group.add(pocket)

  // arms: shirt sleeve, rolled cuff, bare forearm; silver bracelet on his right wrist (-x)
  for (const side of [-1, 1]) {
    const arm = new THREE.Group()
    arm.position.set(side * 0.52, -0.3, 0.0)
    arm.rotation.z = side * 0.05
    const upper = new THREE.Mesh(new THREE.CapsuleGeometry(0.105, 0.34, 8, 20), shirt)
    upper.position.y = -0.2
    const cuff = new THREE.Mesh(new THREE.TorusGeometry(0.103, 0.034, 12, 28), shirtDark)
    cuff.rotation.x = Math.PI / 2
    cuff.position.y = -0.47
    const fore = new THREE.Mesh(new THREE.CapsuleGeometry(0.078, 0.34, 8, 20), skin)
    fore.position.y = -0.7
    arm.add(upper, cuff, fore)
    if (side === -1) {
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.081, 0.009, 10, 28), silver)
      band.rotation.x = Math.PI / 2
      band.position.y = -0.84
      arm.add(band)
    }
    arm.traverse((o: any) => { if (o.isMesh) o.castShadow = true })
    group.add(arm)
  }
  return group
}
