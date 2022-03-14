import React, { useEffect } from "react";
import { css } from "@emotion/react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import GUI from "lil-gui";

import { Layout } from "~components";

const Lesson10 = () => {
  useEffect(() => {
    const gui = new GUI({ closed: true });

    console.log(gui);
    /**
     * Base
     */
    // Canvas
    const canvas = document.querySelector(`canvas.webgl`);

    // Scene
    const scene = new THREE.Scene();

    const params = {
      color: 0xff0000,
      spin: () => {
        gsap.to(mesh.rotation, {
          y: mesh.rotation.y - Math.PI / 2,
          duration: 0.5
        });
      }
    };

    /**
     * Object
     */
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: params.color });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Debug
    gui.add(mesh.position, `x`).min(-3).max(3).step(0.01);
    gui.add(mesh.position, `y`).min(-3).max(3).step(0.01);
    gui.add(mesh.position, `z`).min(-3).max(3).step(0.01);
    gui.add(mesh, `visible`);

    gui.add(material, `wireframe`);

    gui.addColor(params, `color`).onChange(() => {
      material.color.set(params.color);
    });

    gui.add(params, `spin`);
    /**
     * Sizes
     */
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

    /**
     * Camera
     */
    // Base camera
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
      const elapsedTime = clock.getElapsedTime();

      // Update controls
      controls.update();

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();

    return () => {
      gui.domElement.remove();
    };
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

export default Lesson10;
