import React, { useEffect } from "react";
import { css } from "@emotion/react";
import * as THREE from "three";
import gsap from "gsap";

import { Layout } from "~components";

const Lesson6 = () => {
  useEffect(() => {
    // Canvas
    const canvas = document.querySelector(`canvas.webgl`);

    // Scene
    const scene = new THREE.Scene();

    // Object
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Sizes
    const sizes = {
      width: 800,
      height: 600
    };

    // Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 3;
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);

    // Clock
    // const clock = new THREE.Clock();

    gsap.to(mesh.position, { x: 2, duration: 1, delay: 1 });
    gsap.to(mesh.position, { x: 0, duration: 1, delay: 2 });

    // Animation
    const draw = () => {
      // Time
      //   const elapsedTime = clock.getElapsedTime();

      // Update Objects
      //   mesh.rotation.y = elapsedTime * Math.PI * 2;
      //   mesh.position.y = Math.sin(elapsedTime);
      //   mesh.position.x = Math.cos(elapsedTime);
      //   camera.lookAt(mesh.position);

      //   Render
      renderer.render(scene, camera);

      requestAnimationFrame(draw);
    };

    draw();
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

export default Lesson6;