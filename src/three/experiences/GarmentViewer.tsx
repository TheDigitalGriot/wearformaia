import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { PresentationControls, ContactShadows, useGLTF } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import type { Group } from "three";
import SceneCanvas from "../SceneCanvas";
import FitModel from "../FitModel";
import { useReducedMotion } from "../useReducedMotion";

/**
 * A · 3D GARMENT VIEWER — grey cross-arm activewear figure (Mist palette).
 * Drag to orbit (springs back), gentle idle rotation, hover lifts/scales.
 * Swap URL to the Noir set GLB on the product page.
 */
const URL = import.meta.env.BASE_URL + "media/models/garment.glb";
useGLTF.preload(URL);

function GarmentModel() {
  const ref = useRef<Group>(null);
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const { scale } = useSpring({ scale: hovered ? 1.06 : 1, config: { tension: 260, friction: 22 } });

  useFrame((_, delta) => {
    if (ref.current && !reduced) ref.current.rotation.y += delta * 0.22;
  });

  return (
    <animated.group
      ref={ref}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <FitModel url={URL} target={2.8} />
    </animated.group>
  );
}

export default function GarmentViewer() {
  return (
    <SceneCanvas camera={{ position: [0, 0, 5], fov: 34 }}>
      <PresentationControls
        global
        snap
        rotation={[0, 0, 0]}
        polar={[-0.25, 0.25]}
        azimuth={[-0.9, 0.9]}
        config={{ mass: 1, tension: 220, friction: 26 }}
      >
        <GarmentModel />
      </PresentationControls>
      <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={7} blur={2.6} far={3} color="#16110d" />
    </SceneCanvas>
  );
}
