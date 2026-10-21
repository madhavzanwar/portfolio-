import * as THREE from 'three'
import { buildHead } from './head'
import { buildHair } from './hair'
import { buildBrows, buildEars, buildEyes, buildMouth } from './face'
import { buildGlasses } from './glasses'
import { buildBody } from './body'

export type Avatar = {
  /** Pivot at the base of the neck — rotate this to turn the head. */
  head: THREE.Group
}

/**
 * Builds Madhav's avatar and attaches it to the rig's animated `man` node.
 * Everything is authored in that node's local space, so the glb's manAction
 * (breathing / sway) and the focus-* anchors keep working untouched.
 */
export function attachAvatar(rig: THREE.Object3D): Avatar | null {
  const man = rig.getObjectByName('man')
  if (!man) return null
  const eyeNodes: THREE.Object3D[] = []
  rig.traverse((o) => {
    if (/eye/i.test(o.name)) eyeNodes.push(o)
  })

  const body = buildBody()
  man.add(body)

  const PIVOT = new THREE.Vector3(0, 0.0, -0.01)
  const head = new THREE.Group()
  head.name = 'avatar-head'
  head.position.copy(PIVOT)
  const inner = new THREE.Group()
  inner.position.copy(PIVOT).negate()
  head.add(inner)
  man.add(head)

  const h = buildHead()
  inner.add(h.mesh)
  inner.add(buildHair(h))
  inner.add(buildBrows(h))
  inner.add(buildMouth(h))
  inner.add(buildEars())
  inner.add(buildGlasses())
  buildEyes(eyeNodes, inner)
  // the eye nodes keep their glb transforms (and cursor-tracking); move them under the head
  eyeNodes.forEach((e) => inner.add(e))

  return { head }
}
