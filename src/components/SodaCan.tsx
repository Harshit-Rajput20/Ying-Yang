import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

const flavorTextures = {
  lemonLime: "/labels/2.png",
  grape: "/labels/des2.png",
  blackCherry: "/labels/design.png",
  strawberryLemonade: "/labels/1.png",
  watermelon: "/labels/yellow (3).png",
  test: "/labels/des2.png",
  test2:"/labels/Group 22.png"
};


const capTextures = {
 lemonLime: "/labels/2.png",
  grape: "/labels/des2.png",
  blackCherry: "/labels/design.png",
  strawberryLemonade: "/labels/1.png",
  watermelon: "/labels/yellow (3).png",
  test: "/labels/des2.png",
  test2:"/labels/Group 22.png"
};

export type SodaCanProps = {
  flavor?: keyof typeof flavorTextures;
  scale?: number;
};

export function SodaCan({
  flavor = "test",
  scale = 0.05,
  ...props
}: SodaCanProps) {
  const labelTexture = useTexture(flavorTextures[flavor]);
  const capTexture = useTexture(capTextures[flavor]);

  useMemo(() => {
    if (capTexture) {
      capTexture.flipY = false;
      capTexture.wrapS = THREE.RepeatWrapping;
      capTexture.wrapT = THREE.RepeatWrapping;
      capTexture.repeat.set(1, 1);
      capTexture.center.set(0.5, 0.5);
    }
  }, [capTexture]);

  const {
    bodyGeometry,
    capGeometry,
    bottomCapGeometry,
    capHeight,
    height,
    radius,
  } = useMemo(() => {
    if (!labelTexture.image) return {};

    labelTexture.flipY = false;
    labelTexture.wrapS = THREE.RepeatWrapping;
    labelTexture.wrapT = THREE.ClampToEdgeWrapping;
    labelTexture.repeat.set(1, -1); // flip vertically
    labelTexture.center.set(0.5, 0.5);

    const imageWidth = labelTexture.image.width;
    const imageHeight = labelTexture.image.height;

    const radius = imageWidth / (2 * Math.PI);
    const height = imageHeight;

    const bodyGeometry = new THREE.CylinderGeometry(radius, radius, height, 128, 1, true);
    const capHeight = height * 0.07;
    const capRadius = radius * 1.05;
    const capGeometry = new THREE.CylinderGeometry(capRadius, capRadius, capHeight, 64);

    const bottomCapGeometry = new THREE.CircleGeometry(radius, 64);

    return {
      bodyGeometry,
      capGeometry,
      bottomCapGeometry,
      capHeight,
      height,
      radius,
    };
  }, [labelTexture]);


 const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: labelTexture,
        color: "#ffffff",
        side: THREE.DoubleSide,
        roughness: 0.2,
        metalness: 0.3,
      }),
    [labelTexture]
  );

  const capMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: capTexture,
        color: "#ffffff",
        side: THREE.DoubleSide,
        roughness: 0.3,
        metalness: 0.3,
      }),
    [capTexture]
  );


   const whiteMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ffffff", // white base
        roughness: 0.3,
        metalness: 0.3,
      }),
    []
  );
  

  if (!bodyGeometry || !capGeometry || !bottomCapGeometry) return null;

  return (
    <group {...props} scale={[scale, scale, scale]} rotation={[0, Math.PI, 0]}>
      {/* Bottle body with texture */}
      <mesh geometry={bodyGeometry}>
        <meshStandardMaterial
          map={labelTexture}
          color={"#ffffff"}
          side={THREE.DoubleSide}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>

      

      {/* Top cap */}
      <mesh
        geometry={capGeometry}
        material={capMaterial}
        position={[0, height / 2 + capHeight / 2, 0]}
      />

      {/* Bottom cap (flush and visible) */}
      <mesh
        geometry={bottomCapGeometry}
        material={whiteMaterial}
        rotation={[Math.PI / 2, 0, 0]} // flipped upward
        position={[0, -height / 2 + 0.5, 0]} // slight offset to avoid z-fighting
      />
    </group>
  );
}

 