import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { PresentationControls, ContactShadows } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import type { Mesh } from "three";
import SceneCanvas from "../SceneCanvas";
import { useReducedMotion } from "../useReducedMotion";

/**
 * A · 3D GARMENT VIEWER — for the product cards + product pages (replaces the Avel reveals).
 * Drag to orbit (springs back), gentle idle rotation, hover lifts + brightens.
 *
 * DROP-IN: run  npx gltfjsx@latest mist-set.glb --transform --types -o MistSet.tsx
 * then replace <GarmentPlaceholder/> with <MistSet/> (useGLTF loads /media/models/mist-set.glb).
 */
function GarmentPlaceholder() {
  const ref = useRef<Mesh>(null);
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const { scale, emissive } = useSpring({
    scale: hovered ? 1.06 : 1,
    emissive: hovered ? 0.18 : 0.04,
    config: { tension: 260, friction: 22 },
  });

  useFrame((_, delta) => {
    if (ref.current && !reduced) ref.current.rotation.y += delta * 0.25;
  });

  return (
    <animated.mesh
      ref={ref}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* placeholder "draped set" stand-in — a soft capsule torso */}
      <capsuleGeometry args={[0.7, 1.5, 12, 32]} />
      <animated.meshStandardMaterial
        color="#cdbfae"
        roughness={0.75}
        metalness={0.05}
        emissive="#5e4d40"
        emissiveIntensity={emissive}
      />
    </animated.mesh>
  );
}

export default function GarmentViewer() {
  return (
    <SceneCanvas camera={{ position: [0, 0, 5], fov: 32 }}>
      <PresentationControls
        global
        snap
        rotation={[0, 0, 0]}
        polar={[-0.3, 0.3]}
        azimuth={[-0.8, 0.8]}
        config={{ mass: 1, tension: 220, friction: 26 }}
      >
        <GarmentPlaceholder />
      </PresentationControls>
      <ContactShadows position={[0, -1.4, 0]} opacity={0.35} scale={6} blur={2.6} far={3} color="#16110d" />
    </SceneCanvas>
  );
}
