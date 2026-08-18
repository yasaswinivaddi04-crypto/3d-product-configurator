3D Product Configurator

An interactive 3D product experience built with React, Vite, Three.js, React Three Fiber, and Drei.

What I Built

I built a responsive 3D product configurator that allows users to explore and customize a product directly in the browser.

Features

- Interactive 3D product scene
- Mouse and touch rotation
- Zoom controls
- Product color customization
- Auto-rotate mode
- Wireframe mode
- Reset configuration
- Responsive mobile layout
- Reduced-motion support
- Lazy-loaded 3D viewer with a static fallback
- Staged lighting, environment, and soft shadows

Performance

The 3D canvas is loaded only when the viewer approaches the user's viewport. The renderer uses a limited device pixel ratio ("dpr") to reduce GPU workload, and reduced-motion preferences disable continuous animation and unnecessary shadows.

The scene uses lightweight procedural geometry instead of a large external 3D model, keeping the experience simple and suitable for mobile devices.

FE-10 Performance Lens

The main performance considerations were:

- Keep the 3D geometry lightweight.
- Avoid unnecessarily high rendering resolution.
- Load the 3D canvas only when needed.
- Reduce continuous rendering for users who prefer reduced motion.
- Keep the interface responsive on smaller screens.

What I Would Add With More Time

- A real compressed GLB product model using Draco or Meshopt.
- More customizable product parts and materials.
- Multiple environment and lighting presets.
- Product texture customization.
- More detailed performance measurements for low-end mobile devices.
- Loading progress indicators for larger 3D assets.

Tech Stack

- React
- Vite
- Three.js
- React Three Fiber
- React Three Drei
- CSS
- Vercel

Live Demo

https://3d-product-configurator-qkwtasu6l-yasaswini-projects.vercel.app/

Repository

https://github.com/yasaswinivaddi04-crypto/3d-product-configurator