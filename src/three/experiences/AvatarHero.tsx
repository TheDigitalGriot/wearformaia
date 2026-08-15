import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import SceneCanvas from "../SceneCanvas";
import FitModel from "../FitModel";
import { useReducedMotion } from "../useReducedMotion";

/**
 * C · AVATAR IN THE SET — mid-stride grey activewear figure as living 3D.
 * Turns to face the cursor + a subtle breathing pulse. Swap URL for a rigged
 * CC5 avatar (cc5-avatar-pipeline-v2) when you want real animation.
 */
const URL = import.meta.env.BASE_URL + "media/models/avatar.glb";
useGLTF.preload(URL);

function Avatar() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  useFrame((state) => {
    if (!group.current) return;
    if (reduced) return;
    // turn to face the cursor
    const targetY = state.pointer.x * 0.45;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.06);
    // subtle breathing
    if (inner.current) {
      const breathe = 1 + Math.sin(state.clock.elapsedTime * 1.3) * 0.012;
      inner.current.scale.y = breathe;
    }
  });

  return (
    <group ref={group}>
      <group ref={inner}>
        <FitModel url={URL} target={3} />
      </group>
    </group>
  );
}

export default function AvatarHero() {
  return (
    <SceneCanvas camera={{ position: [0, 0.2, 5.2], fov: 34 }}>
      <Avatar />
      <ContactShadows position={[0, -1.6, 0]} opacity={0.42} scale={7} blur={2.8} far={4} color="#16110d" />
    </SceneCanvas>
  );
}
