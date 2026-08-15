import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";
import SceneCanvas from "../SceneCanvas";
import { useReducedMotion } from "../useReducedMotion";

/**
 * D · FLOATING PROPS — real pilates props lifted from the yoga_room_set
 * (ball · towel · bottle · compact), each floating + the group parallaxing to the cursor.
 * Props were extracted by mesh and packed into props.glb (828 KB).
 */
const URL = import.meta.env.BASE_URL + "media/models/props.glb";
useGLTF.preload(URL);

function Prop({ scene, name, target = 1.4 }: { scene: THREE.Object3D; name: string; target?: number }) {
  const { node, scale } = useMemo(() => {
    const src = scene.getObjectByName(name);
    const node = src ? src.clone(true) : null;
    let scale = 1;
    if (node) {
      const box = new THREE.Box3().setFromObject(node);
      const size = new THREE.Vector3();
      box.getSize(size);
      scale = target / (Math.max(size.x, size.y, size.z) || 1);
    }
    return { node, scale };
  }, [scene, name, target]);
  if (!node) return null;
  return (
    <Center scale={scale}>
      <primitive object={node} />
    </Center>
  );
}

function Accents() {
  const { scene } = useGLTF(URL);
  const group = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  useFrame((state) => {
    if (!group.current || reduced) return;
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.25, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.15, 0.04);
  });

  return (
    <group ref={group}>
      <group position={[-2.1, 0.4, 0]}>
        <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.9}>
          <Prop scene={scene} name="ball" target={1.7} />
        </Float>
      </group>
      <group position={[2.0, -0.3, 0.3]}>
        <Float speed={1.1} rotationIntensity={0.4} floatIntensity={1.1}>
          <Prop scene={scene} name="towel" target={1.4} />
        </Float>
      </group>
      <group position={[0.4, 1.05, -0.5]}>
        <Float speed={1.7} rotationIntensity={0.7} floatIntensity={1.0}>
          <Prop scene={scene} name="bottle" target={1.5} />
        </Float>
      </group>
      <group position={[-0.5, -1.15, 0.6]}>
        <Float speed={1.3} rotationIntensity={0.9} floatIntensity={0.8}>
          <Prop scene={scene} name="compact" target={1.1} />
        </Float>
      </group>
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
