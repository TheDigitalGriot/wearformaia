import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import SceneCanvas from "../SceneCanvas";
import FitModel from "../FitModel";
import { useReducedMotion } from "../useReducedMotion";

/**
 * B · 3D STUDIO SCENE — the yoga/pilates room (beat-5 "into her own world").
 * Mouse parallax now; wire to scroll (drei ScrollControls) or bake a Theatre.js fly-through.
 */
const URL = import.meta.env.BASE_URL + "media/models/studio.glb";
useGLTF.preload(URL);

function Studio() {
  const group = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  useFrame((state) => {
    if (!group.current || reduced) return;
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.22, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.06, 0.05);
  });

  return (
    <group ref={group}>
      <FitModel url={URL} target={7} />
    </group>
  );
}

export default function StudioScene() {
  return (
    <SceneCanvas camera={{ position: [0, 0.6, 8], fov: 45 }}>
      <Studio />
      <ContactShadows position={[0, -3.4, 0]} opacity={0.35} scale={18} blur={3} far={6} color="#16110d" />
    </SceneCanvas>
  );
}
