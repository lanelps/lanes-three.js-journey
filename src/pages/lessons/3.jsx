import React, { useEffect } from "react";
import { css } from "@emotion/react";
import * as THREE from "three";

import { Layout } from "~components";

const Lesson3 = () => {
  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();

    // Red Cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: `#ff0000` });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    // Sizes
    const sizes = {
      width: 800,
      height: 600
      // width: window.innerWidth,
      // height: window.innerHeight
    };

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      1,
      1000
    );
    camera.position.z = 3;

    scene.add(camera);

    // Renderer
    const canvas = document.querySelector(`#webgl`);
    const renderer = new THREE.WebGLRenderer({
      canvas
    });

    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);
  }, []);

  return (
    <Layout>
      <canvas
        id="webgl"
        css={css`
          border: 1px solid #fff;
        `}
      />
    </Layout>
  );
};

export default Lesson3;
