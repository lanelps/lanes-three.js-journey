import React, { useEffect } from "react";
import { css } from "@emotion/react";
import * as THREE from "three";

import { Layout } from "~components";

const Lesson4 = () => {
  useEffect(() => {
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
      canvas: document.querySelector(`canvas.webgl`)
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);
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

export default Lesson4;
