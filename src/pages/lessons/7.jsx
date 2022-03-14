import React, { useEffect } from "react";
import { css } from "@emotion/react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { Layout } from "~components";

const Lesson7 = () => {
  useEffect(() => {
    /**
     * Base
     */
    // Canvas
    const canvas = document.querySelector(`canvas.webgl`);

    // Sizes
    const sizes = {
      width: 800,
      height: 600
    };

    // Mouse
    const mouse = {
      x: 0,
      y: 0
    };

    window.addEventListener(`mousemove`, (event) => {
      mouse.x = event.clientX / sizes.width - 0.5;
      mouse.y = -(event.clientY / sizes.height - 0.5);
    });

    // Scene
    const scene = new THREE.Scene();

    // Object
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    scene.add(mesh);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    // camera.position.x = 1;
    // camera.position.y = 1;
    camera.position.z = 3;
    camera.lookAt(mesh.position);
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas
    });
    renderer.setSize(sizes.width, sizes.height);

    // Animate
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update camera
      // camera.position.x = Math.sin(mouse.x * Math.PI * 2) * 3;
      // camera.position.z = Math.cos(mouse.x * Math.PI * 2) * 3;
      // camera.position.y = mouse.y * 3;
      // camera.lookAt(new THREE.Vector3());

      // Render
      renderer.render(scene, camera);

      //   Update Controls
      controls.update();

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }, []);

  return (
    <Layout>
      <canvas
        className="webgl"
        css={css`
          border: 1px solid #fff;
        `}
      />
    </Layout>
  );
};

export default Lesson7;
