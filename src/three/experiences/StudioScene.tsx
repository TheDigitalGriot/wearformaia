import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import SceneCanvas from "../SceneCanvas";
import { useReducedMotion } from "../useReducedMotion";

/**
 * B · 3D STUDIO SCENE — the beat-5 "into her own world" payoff as real geometry.
 * A warm plaster/oak room the camera drifts through (mouse parallax here; wire to
 * scroll with drei <ScrollControls> + useScroll, or bake a fly-through in Theatre.js).
 *
 * DROP-IN: replace <StudioPlaceholder/> with your environment GLB (glb-scene-optimizer'd),
 * gltfjsx: npx gltfjsx@latest studio.glb --transform --types -o Studio.tsx
 */
function StudioPlaceholder() {
  const group = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  useFrame((state) => {
    if (!group.current || reduced) return;
    const { x, y } = state.pointer; // -1..1
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.18, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.08, 0.05);
  });

  return (
    <group ref={group}>
      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#8a7c6d" roughness={0.9} />
      </mesh>
      {/* back plaster wall */}
      <mesh position={[0, 1, -4]} receiveShadow>
        <boxGeometry args={[16, 8, 0.4]} />
        <meshStandardMaterial color="#cdbfae" roughness={1} />
      </mesh>
      {/* side wall */}
      <mesh position={[-6, 1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 8, 0.4]} />
        <meshStandardMaterial color="#ded2c1" roughness={1} />
      </mesh>
      {/* oak plinth */}
      <mesh position={[1.6, -0.7, 0.5]} castShadow>
        <boxGeometry args={[1.4, 1, 1.4]} />
        <meshStandardMaterial color="#5e4d40" roughness={0.6} />
      </mesh>
      {/* the single mat */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.6, -1.18, 1.2]}>
        <planeGeometry args={[2, 4]} />
        <meshStandardMaterial color="#3b2f27" roughness={0.85} />
      </mesh>
    </group>
  );
}

export default function StudioScene() {
  return (
    <SceneCanvas camera={{ position: [0, 0.6, 7], fov: 42 }}>
      <StudioPlaceholder />
      <ContactShadows position={[0, -1.19, 0]} opacity={0.4} scale={16} blur={3} far={4} color="#16110d" />
    </SceneCanvas>
  );
}
