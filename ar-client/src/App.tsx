/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense, useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import {
  ZapparCamera,
  ImageTracker,
  ZapparCanvas,
  Loader,
  BrowserCompatibility,
} from "@zappar/zappar-react-three-fiber";
// import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Model as TShirtModel } from "./assets/T-shirt_low_poly";
import { supabase } from "./lib/supabase";


// Import assets with proper type declarations
const glb = new URL("./assets/low-poly_mannequinperson.glb", import.meta.url)
  .href;
const targetImage = new URL(
  "./assets/CardplusCompasslogo.zpt",
  import.meta.url
).href;

// let action: THREE.AnimationAction;

const Model = () => {
  // const clock = new THREE.Clock();
  const gltf = useLoader(GLTFLoader, glb) as any;
  // const mixer = new THREE.AnimationMixer(gltf.scene);

  // action = mixer.clipAction(gltf.animations[0]);
  gltf.scene.rotation.x = Math.PI / 2;
  gltf.scene.rotation.y = Math.PI / 2;
  // Scale the model down by 50%
  gltf.scene.scale.set(0.2, 0.2, 0.2);

  // useFrame(() => mixer.update(clock.getDelta()));

  return <primitive object={gltf.scene} />;
};

type Outfit = {
  id: string;
  lower: "PANTS" | "BLOUSE";
  upper: "SHIRT" | "TSHIRT";
  lowerColor: string;
  upperColor: string;
  currentlyScanned: boolean;
};

function App() {
  const [outfit, setOutfit] = useState<Outfit | null>(null);

  useEffect(() => {
    const channelA = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
        },
        (payload) => {
          setOutfit(payload.new as Outfit);
        }
      )
      .subscribe((status, err) => {
        if (err) console.error("SUBSCRIPTION ERROR:", err);
        else console.log("SUBSCRIPTION STATUS CHANGED:", status);
      });
    return () => {
      channelA.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (outfit) {
      console.log(outfit);
    }
  }, [outfit]);

  return (
    <>
      <BrowserCompatibility />
      <ZapparCanvas>
        <ZapparCamera {...({} as any)} />
        <Suspense fallback={null}>
          <ImageTracker targetImage={targetImage} {...({} as any)}>
            <React.Suspense fallback={null}>
              <Model />
              {outfit?.upper === "TSHIRT" && (
                <TShirtModel
                  position={[0.12, -0.04, 0.59]}
                  scale={[0.7, 0.7, 0.7]}
                  rotation={[Math.PI / 2, Math.PI, 0]}
                  color={outfit?.upperColor}
                />
              )}
            </React.Suspense>
          </ImageTracker>
        </Suspense>
        <directionalLight position={[-5, -8, 5]} intensity={3} />
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
