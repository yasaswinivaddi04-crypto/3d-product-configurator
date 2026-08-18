import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { useInView } from "react-intersection-observer";
import "./App.css";

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

function App() {
  const [color, setColor] = useState("#6366f1");
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const { ref: viewerRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px",
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updateMotionPreference = () => {
      setReducedMotion(mediaQuery.matches);

      if (mediaQuery.matches) {
        setAutoRotate(false);
      }
    };

    updateMotionPreference();

    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateMotionPreference
      );
    };
  }, []);

  const reset = () => {
    setColor("#6366f1");
    setWireframe(false);
    setAutoRotate(false);
  };

  return (
    <div className="app">
      <header>
        <span className="badge">INTERACTIVE 3D</span>

        <h1>Product Configurator</h1>

        <p>
          Explore the product in 3D and customize its appearance.
        </p>
      </header>

      <main>
        <div className="viewer" ref={viewerRef}>
          {inView ? (
            <Canvas
              shadows={!reducedMotion}
              camera={{
                position: [4, 3, 5],
                fov: 45,
              }}
              dpr={[1, 1.5]}
              frameloop={
                reducedMotion ? "demand" : "always"
              }
            >
              <ambientLight intensity={0.8} />

              <directionalLight
                position={[5, 6, 5]}
                intensity={2}
                castShadow={!reducedMotion}
              />

              <Product
                color={color}
                wireframe={wireframe}
              />

              <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -1.2, 0]}
                receiveShadow
              >
                <circleGeometry args={[3, 64]} />
                <meshStandardMaterial color="#202027" />
              </mesh>

              <ContactShadows
                position={[0, -1.2, 0]}
                opacity={0.35}
                scale={5}
                blur={2}
              />

              <Environment preset="city" />

              <OrbitControls
                enableZoom
                enablePan={false}
                autoRotate={
                  autoRotate && !reducedMotion
                }
                autoRotateSpeed={2}
              />
            </Canvas>
          ) : (
            <div className="fallback">
              <div className="fallback-product">
                3D
              </div>

              <p>3D viewer loading...</p>
            </div>
          )}
        </div>

        <section className="panel">
          <h2>Customize</h2>

          <p className="label">Product Color</p>

          <div className="colors">
            <button
              className="color purple"
              onClick={() => setColor("#6366f1")}
              aria-label="Purple"
            />

            <button
              className="color red"
              onClick={() => setColor("#ef4444")}
              aria-label="Red"
            />

            <button
              className="color green"
              onClick={() => setColor("#22c55e")}
              aria-label="Green"
            />

            <button
              className="color orange"
              onClick={() => setColor("#f59e0b")}
              aria-label="Orange"
            />

            <button
              className="color white"
              onClick={() => setColor("#f8fafc")}
              aria-label="White"
            />
          </div>

          <div className="actions">
            <button
              onClick={() =>
                setAutoRotate(!autoRotate)
              }
            >
              {autoRotate
                ? "Stop Rotation"
                : "Auto Rotate"}
            </button>

            <button
              onClick={() =>
                setWireframe(!wireframe)
              }
            >
              {wireframe
                ? "Solid Mode"
                : "Wireframe"}
            </button>

            <button onClick={reset}>
              Reset
            </button>
          </div>

          <div className="hint">
            <strong>Controls</strong>
            <span>
              Drag to rotate • Scroll to zoom
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;