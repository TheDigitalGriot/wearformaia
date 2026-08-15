import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import SceneCanvas from "../SceneCanvas";
import { useReducedMotion } from "../useReducedMotion";

/**
 * D · FLOATING OBJECT ACCENTS — small tasteful props that parallax as you scroll/move.
 * Lowest-risk, quiet-luxury layer. The group drifts with the cursor; each prop floats.
 *
 * DROP-IN: swap each placeholder mesh for a small GLB prop (folded set, a ring, a bottle),
 * gltfjsx: npx gltfjsx@latest folded-set.glb --transform --types -o FoldedSet.tsx
 */
function Accents() {
  const group = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  useFrame((state) => {
    if (!group.current || reduced) return;
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.3, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.2, 0.04);
  });

  const floatProps = { speed: 1.4, rotationIntensity: 0.5, floatIntensity: 0.9 } as const;

  return (
    <group ref={group}>
      <Float {...floatProps}>
        {/* folded-set placeholder */}
        <mesh position={[-1.8, 0.4, 0]} castShadow>
          <boxGeometry args={[1.1, 0.35, 0.8]} />
          <meshStandardMaterial color="#cdbfae" roughness={0.8} />
        </mesh>
      </Float>
      <Float {...floatProps} speed={1.1} floatIntensity={1.2}>
        {/* ring / band placeholder */}
        <mesh position={[1.7, -0.2, 0.4]} rotation={[Math.PI / 2.5, 0, 0]} castShadow>
          <torusGeometry args={[0.5, 0.14, 20, 48]} />
          <meshStandardMaterial color="#8a7c6d" roughness={0.5} metalness={0.2} />
        </mesh>
      </Float>
      <Float {...floatProps} speed={1.7} rotationIntensity={0.8}>
        {/* small bottle / prop placeholder */}
        <mesh position={[0.2, 0.9, -0.6]} castShadow>
          <capsuleGeometry args={[0.22, 0.6, 8, 20]} />
          <meshStandardMaterial color="#3b2f27" roughness={0.4} metalness={0.1} />
        </mesh>
      </Float>
    </group>
  );
}

export default function FloatingAccents() {
  return (
    <SceneCanvas camera={{ position: [0, 0, 6], fov: 38 }}>
      <Accents />
    </SceneCanvas>
  );
}
