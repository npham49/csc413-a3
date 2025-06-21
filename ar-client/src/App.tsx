/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from 'react';
import { useLoader } from '@react-three/fiber';
import {
 ZapparCamera, ImageTracker, ZapparCanvas, Loader, BrowserCompatibility,
} from '@zappar/zappar-react-three-fiber';
// import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Model as TShirtModel } from './assets/T-shirt_low_poly';

// Import assets with proper type declarations
const glb = new URL('./assets/low-poly_mannequinperson.glb', import.meta.url).href;
const targetImage = new URL('./assets/example-tracking-image.zpt', import.meta.url).href;

// let action: THREE.AnimationAction;

const Model = () => {
  // const clock = new THREE.Clock();
  const gltf = useLoader(GLTFLoader, glb) as any ;
  // const mixer = new THREE.AnimationMixer(gltf.scene);

  // action = mixer.clipAction(gltf.animations[0]);
  gltf.scene.rotation.x = Math.PI / 2;
  gltf.scene.rotation.y = Math.PI / 2;
  // Scale the model down by 50%
  gltf.scene.scale.set(0.2, 0.2, 0.2);

  // useFrame(() => mixer.update(clock.getDelta()));

  return <primitive object={gltf.scene} />;
};

function App() {
  return (
    <>
      <BrowserCompatibility />
      <ZapparCanvas>
        <ZapparCamera {...({} as any)} />
        <Suspense fallback={null}>
          <ImageTracker targetImage={targetImage} {...({} as any)}>
            <React.Suspense fallback={null}>
              <Model />
              <TShirtModel 
                position={[0.12, -0.04, 0.59]} 
                scale={[0.7, 0.7, 0.7]} 
                rotation={[Math.PI / 2, Math.PI , 0]}
              />
            </React.Suspense>
          </ImageTracker>
        </Suspense>
        <directionalLight position={[5, 8, 5]} intensity={3} />
        <Loader />
      </ZapparCanvas>
      {/* <div
        id="zappar-button"
        role="button"
        tabIndex={0}
        // onClick={() => action?.play() }
      >Play Animation</div> */}
    </>
  );
}

export default App;


