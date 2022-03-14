import React, { useEffect } from "react";
import { css } from "@emotion/react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { Layout } from "~components";

const Lesson9 = () => {
  useEffect(() => {
    /**
     * Base
     */
    // Canvas
    const canvas = document.querySelector(`canvas.webgl`);

    // Scene
    const scene = new THREE.Scene();

    // Object
    // const geometry = new THREE.BoxGeometry(1, 1, 1)

    // const positionsArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
    // const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);

    const count = 50;
    const positionsArray = new Float32Array(count * 3 * 3);

    for (let i = 0; i < count * 3 * 3; i++) {
      positionsArray[i] = Math.random() - 0.5;
    }

    const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(`position`, positionsAttribute);

    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Sizes
    const sizes = {
      width: canvas.getBoundingClientRect().width,
      height: canvas.getBoundingClientRect().height
    };

    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );

    const renderer = new THREE.WebGLRenderer({
      canvas
    });

    window.addEventListener(`resize`, () => {
      // Update sizes
      //   sizes.width = window.innerWidth;
      //   sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // Camera
    camera.position.z = 3;
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    // Renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Animate
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

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

export default Lesson9;
