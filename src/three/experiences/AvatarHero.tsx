import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import SceneCanvas from "../SceneCanvas";
import { useReducedMotion } from "../useReducedMotion";

/**
 * C · AVATAR IN THE SET — the hero as living 3D: a model in the Mist/Noir set,
 * idle-breathing, turning to face the cursor.
 *
 * DROP-IN: export a CC5 avatar via cc5-avatar-pipeline-v2 (+ glb-cc5-optimizer for hair),
 * gltfjsx: npx gltfjsx@latest avatar.glb --transform --types -o Avatar.tsx
 * Replace <AvatarPlaceholder/> with <Avatar/>; drive breathing/turn with the same refs.
 */
function AvatarPlaceholder() {
  const group = useRef<THREE.Group>(null);
  const torso = useRef<THREE.Mesh>(null);
  const reduced = useReducedMotion();

  useFrame((state) => {
    if (!group.current) return;
    if (!reduced) {
      // turn to face the cursor
      const targetY = state.pointer.x * 0.5;
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.06);
      // idle breathing
      const breathe = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.02;
      if (torso.current) torso.current.scale.y = breathe;
    }
  });

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      {/* head */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#cdbfae" roughness={0.7} />
      </mesh>
      {/* torso (breathes) */}
      <mesh ref={torso} position={[0, 0.55, 0]} castShadow>
        <capsuleGeometry args={[0.45, 1.1, 12, 32]} />
        <meshStandardMaterial color="#b9ab99" roughness={0.75} />
      </mesh>
      {/* legs */}
      <mesh position={[-0.22, -0.9, 0]} castShadow>
        <capsuleGeometry args={[0.2, 1.1, 8, 20]} />
        <meshStandardMaterial color="#a7998790" roughness={0.8} />
      </mesh>
      <mesh position={[0.22, -0.9, 0]} castShadow>
        <capsuleGeometry args={[0.2, 1.1, 8, 20]} />
        <meshStandardMaterial color="#a79987" roughness={0.8} />
      </mesh>
    </group>
  );
}

export default function AvatarHero() {
  return (
    <SceneCanvas camera={{ position: [0, 0.4, 5.5], fov: 34 }}>
      <AvatarPlaceholder />
      <ContactShadows position={[0, -1.9, 0]} opacity={0.4} scale={7} blur={2.8} far={4} color="#16110d" />
    </SceneCanvas>
  );
}
