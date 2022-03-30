import React, { useEffect } from "react";
import { css } from "@emotion/react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

import { Layout } from "~components";

const Lesson15 = () => {
  useEffect(() => {
    const gui = new dat.GUI();

    // Canvas
    const canvas = document.querySelector(`canvas.webgl`);

    // Scene
    const scene = new THREE.Scene();

    /**
     * Lights
     */

    //
    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const ambientFolder = gui.addFolder(`Ambient`);

    ambientFolder.add(ambientLight, `intensity`).min(0).max(1).step(0.001);
    ambientFolder.add(ambientLight, `visible`);

    //
    // Directional Light
    const directionalParams = {
      color: 0x00fffc
    };

    const directionalLight = new THREE.DirectionalLight(
      directionalParams.color,
      0.3
    );
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    const directionalFolder = gui.addFolder(`Directional`);
    directionalFolder
      .add(directionalLight, `intensity`)
      .min(0)
      .max(1)
      .step(0.001);
    directionalFolder
      .add(directionalLight.position, `x`)
      .min(-1)
      .max(1)
      .step(0.001);
    directionalFolder
      .add(directionalLight.position, `z`)
      .min(-1)
      .max(1)
      .step(0.001);

    directionalFolder.addColor(directionalParams, `color`).onChange(() => {
      directionalLight.color.set(directionalParams.color);
    });
    directionalFolder.add(directionalLight, `visible`);

    const directionalLightHelper = new THREE.DirectionalLightHelper(
      directionalLight,
      0.2
    );
    directionalLightHelper.visible = false;
    scene.add(directionalLightHelper);
    directionalFolder.add(directionalLightHelper, `visible`).name(`helper`);

    //
    // Hemisphere Light
    const hemissphereParams = {
      sky: 0xff0000,
      ground: 0x0000ff
    };

    const hemissphereLight = new THREE.HemisphereLight(
      hemissphereParams.sky,
      hemissphereParams.ground,
      0.3
    );
    hemissphereLight.visible = false;
    scene.add(hemissphereLight);

    const hemisphereFolder = gui.addFolder(`Hemisphere`);
    hemisphereFolder
      .add(hemissphereLight, `intensity`)
      .min(0)
      .max(1)
      .step(0.001);
    hemisphereFolder.addColor(hemissphereParams, `sky`).onChange(() => {
      hemissphereLight.color.set(hemissphereParams.color);
    });
    hemisphereFolder.addColor(hemissphereParams, `ground`).onChange(() => {
      hemissphereLight.color.set(hemissphereParams.color);
    });
    hemisphereFolder.add(hemissphereLight, `visible`);

    const hemisphereLightHelper = new THREE.HemisphereLightHelper(
      hemissphereLight,
      0.2
    );
    hemisphereLightHelper.visible = false;
    scene.add(hemisphereLightHelper);
    hemisphereFolder.add(hemisphereLightHelper, `visible`).name(`helper`);

    //
    // Point Light
    const pointParams = {
      color: 0xff9000
    };
    const pointLight = new THREE.PointLight(pointParams.color, 0.5, 10, 2);
    pointLight.position.set(1, -0.5, 1);
    scene.add(pointLight);

    const pointFolder = gui.addFolder(`Point`);
    pointFolder.add(pointLight, `intensity`).min(0).max(10).step(0.001);
    pointFolder.add(pointLight.position, `x`).min(-1).max(1).step(0.001);
    pointFolder.add(pointLight.position, `y`).min(-0.5).max(1.5).step(0.001);
    pointFolder.add(pointLight.position, `z`).min(-1).max(1).step(0.001);
    pointFolder.addColor(pointParams, `color`).onChange(() => {
      pointLight.color.set(pointParams.color);
    });
    pointFolder.add(pointLight, `visible`);

    const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
    pointLightHelper.visible = false;
    scene.add(pointLightHelper);
    pointFolder.add(pointLightHelper, `visible`).name(`helper`);

    //
    // Area Light
    const areaParams = {
      color: 0x4e00ff
    };
    const areaLight = new THREE.RectAreaLight(areaParams.color, 2, 1, 1);
    areaLight.position.set(-1.5, 0, 1.5);
    areaLight.lookAt(new THREE.Vector3());
    areaLight.visible = false;
    scene.add(areaLight);

    const areaFolder = gui.addFolder(`Area`);
    areaFolder.add(areaLight, `intensity`).min(0).max(10).step(0.001);
    areaFolder.add(areaLight.position, `x`).min(-1).max(1).step(0.001);
    areaFolder.add(areaLight.position, `y`).min(-0.5).max(1.5).step(0.001);
    areaFolder.add(areaLight.position, `z`).min(-1).max(1).step(0.001);
    areaFolder
      .add(areaLight.rotation, `y`)
      .min(0)
      .max(Math.PI * 2)
      .step(0.001)
      .name(`rotation`);
    areaFolder.addColor(areaParams, `color`).onChange(() => {
      areaLight.color.set(areaParams.color);
    });
    areaFolder.add(areaLight, `visible`);

    const rectAreaLightHelper = new RectAreaLightHelper(areaLight);
    rectAreaLightHelper.visible = false;
    scene.add(rectAreaLightHelper);
    areaFolder.add(rectAreaLightHelper, `visible`).name(`helper`);

    //
    // Spot Light
    const spotParams = {
      color: 0x78ff00
    };
    const spotLight = new THREE.SpotLight(
      spotParams.color,
      0.5,
      6,
      Math.PI * 0.1,
      0.25,
      1
    );
    spotLight.position.set(0, 2, 3);
    spotLight.visible = false;
    spotLight.target.position.x = -0.75;
    scene.add(spotLight);
    scene.add(spotLight.target);

    const spotFolder = gui.addFolder(`Spot`);
    spotFolder.add(spotLight, `intensity`).min(0).max(10).step(0.001);
    spotFolder.addColor(spotParams, `color`).onChange(() => {
      spotLight.color.set(spotParams.color);
    });
    spotFolder.add(spotLight.target.position, `x`).min(-1).max(1).step(0.001);
    spotFolder.add(spotLight, `visible`);

    const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    spotLightHelper.visible = false;
    scene.add(spotLightHelper);

    window.requestAnimationFrame(() => {
      spotLightHelper.update();
    });
    spotFolder.add(spotLightHelper, `visible`).name(`helper`);

    //
    // const pointLight = new THREE.PointLight(0xffffff, 0.5);
    // pointLight.position.x = 2;
    // pointLight.position.y = 3;
    // pointLight.position.z = 4;
    // scene.add(pointLight);

    /**
     * Objects
     */
    // Material
    const material = new THREE.MeshStandardMaterial();
    material.roughness = 0.4;

    // Objects
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 32),
      material
    );
    sphere.position.x = -1.5;

    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(0.75, 0.75, 0.75),
      material
    );

    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(0.3, 0.2, 32, 64),
      material
    );
    torus.position.x = 1.5;

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
    plane.rotation.x = -Math.PI * 0.5;
    plane.position.y = -0.65;

    scene.add(sphere, cube, torus, plane);

    /**
     * Sizes
     */
    const sizes = {
      width: canvas.getBoundingClientRect().width,
      height: canvas.getBoundingClientRect().height
    };

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
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.x = 1;
    camera.position.y = 1;
    camera.position.z = 2;
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

    /**
     * Animate
     */
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update objects
      sphere.rotation.y = 0.1 * elapsedTime;
      cube.rotation.y = 0.1 * elapsedTime;
      torus.rotation.y = 0.1 * elapsedTime;

      sphere.rotation.x = 0.15 * elapsedTime;
      cube.rotation.x = 0.15 * elapsedTime;
      torus.rotation.x = 0.15 * elapsedTime;

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

export default Lesson15;
