import { lazy, Suspense, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import "./App.css";

function App() {
  const [color, setColor] = useState("#6366f1");
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const ProductViewer = lazy(() => import("./ProductViewer"));
  const { ref: viewerRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "0px",
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
            <Suspense
              fallback={
                <div className="fallback">
                  <div className="fallback-product">3D</div>
                  <p>Loading 3D viewer...</p>
                </div>
              }
            >
              <ProductViewer
                color={color}
                wireframe={wireframe}
                autoRotate={autoRotate}
                reducedMotion={reducedMotion}
              />
            </Suspense>
          ) : (
            <div className="fallback">
              <div className="fallback-product">3D</div>
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
              onClick={() => setAutoRotate(!autoRotate)}
              aria-pressed={autoRotate}
            >
              {autoRotate ? "Stop Rotation" : "Auto Rotate"}
            </button>

            <button
              onClick={() => setWireframe(!wireframe)}
              aria-pressed={wireframe}
            >
              {wireframe ? "Solid Mode" : "Wireframe"}
            </button>

            <button onClick={reset}>Reset</button>
          </div>

          <div className="hint">
            <strong>Controls</strong>
            <span>Drag to rotate • Scroll to zoom</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;