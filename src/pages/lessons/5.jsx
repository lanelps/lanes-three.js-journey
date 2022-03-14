import React, { useEffect } from "react";
import { css } from "@emotion/react";
import * as THREE from "three";

import { Layout } from "~components";

const Lesson5 = () => {
  useEffect(() => {
    // Canvas
    const canvas = document.querySelector(`canvas.webgl`);

    // Scene
    const scene = new THREE.Scene();

    /**
     * Objects
     */
    const group = new THREE.Group();
    group.scale.y = 2;
    group.rotation.y = 0.2;
    scene.add(group);

    const cube1 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    cube1.position.x = -1.5;
    group.add(cube1);

    const cube2 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    cube2.position.x = 0;
    group.add(cube2);

    const cube3 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    cube3.position.x = 1.5;
    group.add(cube3);

    // Axes Helper
    const axesHelper = new THREE.AxesHelper(2);
    scene.add(axesHelper);

    /**
     * Sizes
     */
    const sizes = {
      width: 800,
      height: 600
    };

    /**
     * Camera
     */
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 3;
    // camera.lookAt(mesh.position);
    scene.add(camera);

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas
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

export default Lesson5;
