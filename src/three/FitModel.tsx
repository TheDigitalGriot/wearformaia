import { useMemo } from "react";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

/**
 * Loads a GLB and normalizes it: clones, centers at origin, and scales so its
 * largest dimension ≈ `target` units. Sketchfab/Hunyuan exports come in with
 * arbitrary scale + origin, so every bay routes its model through this.
 * (meshopt-compressed — drei's useGLTF registers the decoder automatically.)
 */
export default function FitModel({ url, target = 2.6 }: { url: string; target?: number }) {
  const { scene } = useGLTF(url);
  const model = useMemo(() => scene.clone(true), [scene]);
  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return target / maxDim;
  }, [model, target]);

  return (
    <Center scale={scale}>
      <primitive object={model} />
    </Center>
  );
}
