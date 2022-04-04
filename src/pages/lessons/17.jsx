import React, { useEffect } from "react";
import { css } from "@emotion/react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

import { Layout } from "~components";

const Lesson17 = () => {
  useEffect(() => {
    /**
     * Base
     */
    // Debug
    const gui = new dat.GUI();

    // Canvas
    const canvas = document.querySelector(`canvas.webgl`);

    // Scene
    const scene = new THREE.Scene();

    // Fog
    const fog = new THREE.Fog(`#262837`, 1, 15);
    scene.fog = fog;

    /**
     * Textures
     */

    const textureLoader = new THREE.TextureLoader();

    // Door Textures
    const doorAlphaTexture = textureLoader.load(`/textures/door/alpha.jpg`);
    const doorAmbientTexture = textureLoader.load(
      `/textures/door/ambientOcclusion.jpg`
    );
    const doorColorTexture = textureLoader.load(`/textures/door/color.jpg`);
    const doorHeightTexture = textureLoader.load(`/textures/door/height.jpg`);
    const doorMetalnessTexture = textureLoader.load(
      `/textures/door/metalness.jpg`
    );
    const doorNormalTexture = textureLoader.load(`/textures/door/normal.jpg`);
    const doorRoughnessTexture = textureLoader.load(
      `/textures/door/roughness.jpg`
    );

    // Wall Textures
    const brickAmbientOcclusionTexture = textureLoader.load(
      `/textures/bricks/ambientOcclusion.jpg`
    );
    const brickColorTexture = textureLoader.load(`/textures/bricks/color.jpg`);
    const brickNormalTexture = textureLoader.load(
      `/textures/bricks/normal.jpg`
    );
    const brickRoughnessTexture = textureLoader.load(
      `/textures/bricks/roughness.jpg`
    );

    // Floor Textures
    const floorAmbientOcclusionTexture = textureLoader.load(
      `/textures/grass/ambientOcclusion.jpg`
    );
    const floorColorTexture = textureLoader.load(`/textures/grass/color.jpg`);
    const floorNormalTexture = textureLoader.load(`/textures/grass/normal.jpg`);
    const floorRoughnessTexture = textureLoader.load(
      `/textures/grass/roughness.jpg`
    );

    /**
     * House
     */
    // Group
    const house = new THREE.Group();
    scene.add(house);

    // Walls
    const walls = new THREE.Mesh(
      new THREE.BoxGeometry(4, 2.5, 4),
      new THREE.MeshStandardMaterial({
        map: brickColorTexture,
        aoMap: brickAmbientOcclusionTexture,
        normalMap: brickNormalTexture,
        roughnessMap: brickRoughnessTexture
      })
    );
    walls.geometry.setAttribute(
      `uv2`,
      new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
    );
    walls.position.y = 2.5 / 2;
    walls.castShadow = true;
    house.add(walls);

    // Roof
    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(3.5, 1, 4),
      new THREE.MeshStandardMaterial({ color: `#b35f45` })
    );
    roof.position.y = 3;
    roof.rotation.y = Math.PI / 4;
    house.add(roof);

    // Door
    const door = new THREE.Mesh(
      new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
      new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
      })
    );
    door.geometry.setAttribute(
      `uv2`,
      new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
    );
    door.position.y = 1;
    door.position.z = 2 + 0.01;
    house.add(door);

    // Bushes
    const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
    const bushMaterial = new THREE.MeshStandardMaterial({ color: `#89c854` });

    const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
    bush1.scale.set(0.5, 0.5, 0.5);
    bush1.position.set(0.8, 0.2, 2.2);

    const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
    bush2.scale.set(0.25, 0.25, 0.25);
    bush2.position.set(1.4, 0.1, 2.1);

    const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
    bush3.scale.set(0.4, 0.4, 0.4);
    bush3.position.set(-0.8, 0.1, 2.2);

    const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
    bush4.scale.set(0.15, 0.15, 0.15);
    bush4.position.set(-1, 0.05, 2.6);

    bush1.castShadow = true;
    bush2.castShadow = true;
    bush3.castShadow = true;
    bush4.castShadow = true;

    house.add(bush1, bush2, bush3, bush4);

    // Graves
    const graves = new THREE.Group();
    scene.add(graves);

    const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
    const graveMaterial = new THREE.MeshStandardMaterial({ color: `#b2b6b1` });

    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * (Math.PI * 2);
      const radius = 3 + Math.random() * 6;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      const grave = new THREE.Mesh(graveGeometry, graveMaterial);
      grave.position.set(x, 0.3, z);
      grave.rotation.y = (Math.random() - 0.5) * 0.4;
      grave.rotation.z = (Math.random() - 0.5) * 0.4;
      grave.castShadow = true;

      graves.add(grave);
    }

    // Floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.MeshStandardMaterial({
        map: floorColorTexture,
        aoMap: floorAmbientOcclusionTexture,
        normalMap: floorNormalTexture,
        roughnessMap: floorRoughnessTexture
      })
    );
    floorColorTexture.repeat.set(8, 8);
    floorAmbientOcclusionTexture.repeat.set(8, 8);
    floorNormalTexture.repeat.set(8, 8);
    floorRoughnessTexture.repeat.set(8, 8);

    floorColorTexture.wrapS = THREE.RepeatWrapping;
    floorAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
    floorNormalTexture.wrapS = THREE.RepeatWrapping;
    floorRoughnessTexture.wrapS = THREE.RepeatWrapping;

    floorColorTexture.wrapT = THREE.RepeatWrapping;
    floorAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
    floorNormalTexture.wrapT = THREE.RepeatWrapping;
    floorRoughnessTexture.wrapT = THREE.RepeatWrapping;

    floor.geometry.setAttribute(
      `uv2`,
      new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
    );
    floor.rotation.x = -Math.PI * 0.5;
    floor.position.y = 0;
    floor.receiveShadow = true;
    scene.add(floor);

    /**
     * Lights
     */
    // Ambient light
    const ambientLight = new THREE.AmbientLight(`#b9d5ff`, 0.12);
    gui.add(ambientLight, `intensity`).min(0).max(1).step(0.001);
    scene.add(ambientLight);

    // Directional light
    const moonLight = new THREE.DirectionalLight(`#b9d5ff`, 0.12);
    moonLight.position.set(4, 5, -2);
    gui.add(moonLight, `intensity`).min(0).max(1).step(0.001);
    gui.add(moonLight.position, `x`).min(-5).max(5).step(0.001);
    gui.add(moonLight.position, `y`).min(-5).max(5).step(0.001);
    gui.add(moonLight.position, `z`).min(-5).max(5).step(0.001);

    moonLight.shadow.mapSize.width = 256;
    moonLight.shadow.mapSize.height = 256;
    moonLight.shadow.camera.far = 15;
    scene.add(moonLight);

    // Door Light
    const doorLight = new THREE.PointLight(`#ff7d46`, 1, 7);
    doorLight.position.set(0, 2.2, 2.7);

    doorLight.shadow.mapSize.width = 256;
    doorLight.shadow.mapSize.height = 256;
    doorLight.shadow.camera.far = 7;
    house.add(doorLight);

    /**
     * Ghosts
     */
    const ghost1 = new THREE.PointLight(`#ff00ff`, 2, 3);

    ghost1.shadow.mapSize.width = 256;
    ghost1.shadow.mapSize.height = 256;
    ghost1.shadow.camera.far = 7;
    scene.add(ghost1);

    const ghost2 = new THREE.PointLight(`#00ffff`, 2, 3);

    ghost2.shadow.mapSize.width = 256;
    ghost2.shadow.mapSize.height = 256;
    ghost2.shadow.camera.far = 7;
    scene.add(ghost2);

    const ghost3 = new THREE.PointLight(`#ffff00`, 2, 3);

    ghost3.shadow.mapSize.width = 256;
    ghost3.shadow.mapSize.height = 256;
    ghost3.shadow.camera.far = 7;
    scene.add(ghost3);

    moonLight.castShadow = true;
    doorLight.castShadow = true;
    ghost1.castShadow = true;
    ghost2.castShadow = true;
    ghost3.castShadow = true;

    /**
     * Sizes
     */
    const sizes = {
      width: canvas.getBoundingClientRect().width,
      height: canvas.getBoundingClientRect().height
    };

    window.addEventListener(`resize`, () => {
      // Update sizes
      // sizes.width = window.innerWidth;
      // sizes.height = window.innerHeight;

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
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.x = 4;
    camera.position.y = 2;
    camera.position.z = 5;
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(`#262837`);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    /**
     * Animate
     */
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Ghosts
      const ghost1Angle = elapsedTime * 0.5;
      ghost1.position.x = Math.cos(ghost1Angle) * 4;
      ghost1.position.z = Math.sin(ghost1Angle) * 4;
      ghost1.position.y = Math.sin(elapsedTime * 3);

      const ghost2Angle = -elapsedTime * 0.32;
      ghost2.position.x = Math.cos(ghost2Angle) * 5;
      ghost2.position.z = Math.sin(ghost2Angle) * 5;
      ghost2.position.y =
        Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

      const ghost3Angle = -elapsedTime * 0.18;
      ghost3.position.x =
        Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
      ghost3.position.z =
        Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
      ghost3.position.y =
        Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

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

export default Lesson17;
