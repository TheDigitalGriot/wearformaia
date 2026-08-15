import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import type { ReactNode } from "react";

type CameraProps = { position?: [number, number, number]; fov?: number };

/**
 * Shared canvas for every formaia R3F experience — warm quiet-luxury lighting,
 * transparent background so the page tone shows through, adaptive dpr/events for
 * performance. Swap the light rig for a drei <Environment/> HDRI once we pick one.
 */
export default function SceneCanvas({
  children,
  camera,
  className,
}: {
  children: ReactNode;
  camera?: CameraProps;
  className?: string;
}) {
  return (
    <Canvas
      className={className}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: camera?.position ?? [0, 0, 5], fov: camera?.fov ?? 35 }}
    >
      {/* warm three-point rig — espresso key, sand fill, soft ambient */}
      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#f4efe8", "#3b2f27", 0.7]} />
      <directionalLight position={[4, 6, 5]} intensity={1.15} color="#f6ead9" castShadow />
      <directionalLight position={[-5, 2, -3]} intensity={0.35} color="#cdbfae" />
      {children}
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </Canvas>
  );
}
