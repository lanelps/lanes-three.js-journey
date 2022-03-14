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

    // Scene
    const scene = new THREE.Scene();

    /**
     * Object
     */
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    /**
     * Sizes
     */
    const sizes = {
      width: canvas.getBoundingClientRect().width,
      height: canvas.getBoundingClientRect().height
    };

    // Base camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );

    const renderer = new THREE.WebGLRenderer({
      canvas
    });

    // Resize
    window.addEventListener(`resize`, () => {
      // Update Size
      //   sizes.width = canvas.getBoundingClientRect().width;
      //   sizes.height = canvas.getBoundingClientRect().height;

      //   Update Camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      //   Update Renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    canvas.addEventListener(`dblclick`, () => {
      const fullscreenElement =
        document.fullscreenElement || document.webkitFullscreenElement;
      if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
          canvas.requestFullscreen();
        } else if (canvas.webkitRequestFullscreen) {
          canvas.webkitRequestFullscreen();
        }
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    });

    /**
     * Camera
     */
    camera.position.z = 3;
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    /**
     * Renderer
     */
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /**
     * Animate
     */
    const clock = new THREE.Clock();

    const tick = () => {
      //   const elapsedTime = clock.getElapsedTime();

      // Update controls
      controls.update();

      // Render
      renderer.render(scene, camera);

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
          width: 100%;
          height: 100%;
        `}
      />
    </Layout>
  );
};

export default Lesson7;
