import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
} from "@react-three/drei";

function Product({ color, wireframe }) {
  return (
    <mesh castShadow rotation={[0.2, 0.4, 0]}>
      <boxGeometry args={[2.4, 1.8, 1.2]} />
      <meshStandardMaterial
        color={color}
        metalness={0.35}
        roughness={0.25}
        wireframe={wireframe}
      />
    </mesh>
  );
}

export default function ProductViewer({
  color,
  wireframe,
  autoRotate,
  reducedMotion,
}) {
  return (
    <Canvas
      shadows={!reducedMotion}
      camera={{
        position: [4, 3, 5],
        fov: 45,
      }}
      dpr={[1, 1.25]}
      frameloop={reducedMotion ? "demand" : "always"}
    >

      <ambientLight intensity={0.8} />

      <directionalLight
        position={[5, 6, 5]}
        intensity={2}
        castShadow={!reducedMotion}
      />
      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.25}
        scale={5}
        blur={2}
      />

      <Product color={color} wireframe={wireframe} />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.2, 0]}
        receiveShadow
      >
        <circleGeometry args={[3, 48]} />
        <meshStandardMaterial color="#202027" />
      </mesh>

      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.35}
        scale={5}
        blur={2}
      />

      <OrbitControls
        enableZoom
        enablePan={false}
        autoRotate={autoRotate && !reducedMotion}
        autoRotateSpeed={2}
      />
    </Canvas>
  );
}