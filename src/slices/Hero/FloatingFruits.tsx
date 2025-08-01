 
"use client";

import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useEffect } from "react";
import { TextureLoader, Object3D, PlaneGeometry, MeshBasicMaterial } from "three";

const o = new Object3D();

const fruitPaths = [
   "/textures/pngwing.com (1).png",
  "/textures/pngwing.com (1).png",
  "/textures/pngwing.com (2).png",
  "/textures/pngwing.com (3).png",
];

export function FloatingFruits({ count = 60 }) {
  const meshRefs = useRef<THREE.InstancedMesh[]>([]);
  const speed = useRef<Float32Array[]>([]);
  const textures = useLoader(TextureLoader, fruitPaths);

  const geometry = new PlaneGeometry(0.4, 0.4);

  // Setup once
  useEffect(() => {
    meshRefs.current = [];
    speed.current = [];

    for (let i = 0; i < textures.length; i++) {
      speed.current[i] = new Float32Array(count);
      for (let j = 0; j < count; j++) {
        speed.current[i][j] = THREE.MathUtils.randFloat(0.001, 0.004);
      }
    }
  }, [textures.length, count]);

  // Animate
  useFrame(() => {
    meshRefs.current.forEach((mesh, meshIndex) => {
      const speeds = speed.current[meshIndex];
      if (!mesh) return;

      for (let i = 0; i < count; i++) {
        mesh.getMatrixAt(i, o.matrix);
        o.position.setFromMatrixPosition(o.matrix);

        o.position.y += speeds[i];
        if (o.position.y > 4) {
          o.position.y = -2;
          o.position.x = THREE.MathUtils.randFloatSpread(6);
          o.position.z = THREE.MathUtils.randFloat(0, 6);
        }

        o.updateMatrix();
        mesh.setMatrixAt(i, o.matrix);
      }

      mesh.instanceMatrix.needsUpdate = true;
    });
  });

  return (
    <>
      {textures.map((texture, index) => {
        const material = new MeshBasicMaterial({
          map: texture,
          transparent: true,
          alphaTest: 0.5,
          depthWrite: false,
        });

        return (
          <instancedMesh
            key={index}
            ref={(ref) => {
              if (ref) {
                meshRefs.current[index] = ref;

                for (let i = 0; i < count; i++) {
                  o.position.set(
                    THREE.MathUtils.randFloatSpread(6),
                    THREE.MathUtils.randFloat(-2, 2),
                    THREE.MathUtils.randFloat(0, 6)
                  );
                  o.updateMatrix();
                  ref.setMatrixAt(i, o.matrix);
                }
                ref.instanceMatrix.needsUpdate = true;
              }
            }}
            args={[geometry, material, count]}
          />
        );
      })}
    </>
  );
}
