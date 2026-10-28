import { useRef } from "react";
import { PresentationControls } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import MacBookModel16 from "../models/Macbook-16.jsx";
import MacBookModel14 from "../models/Macbook-14.jsx";

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group, opacity) => {
  if (!group) return;

  group.traverse((child) => {
    if (!child.isMesh || !child.material) return;

    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];

    materials.forEach((material) => {
      material.transparent = true;

      gsap.to(material, {
        opacity,
        duration: ANIMATION_DURATION,
        overwrite: "auto",
      });
    });
  });
};

const moveGroup = (group, x) => {
  if (!group) return;

  gsap.to(group.position, {
    x,
    duration: ANIMATION_DURATION,
    overwrite: "auto",
  });
};

function ModelSwitcher({ scale, isMobile = false }) {
  const smallMacbookRef = useRef(null);
  const largeMacbookRef = useRef(null);

  // Determine the selected model using the original store scale.
  const showLargeMacbook = scale === 0.08;

  const controlConfigs = {
    snap: true,
    speed: 1,
    zoom: 1,
    azimuth: [-Infinity, Infinity],
    config: { mass: 1, tension: 0, friction: 22 },
  };

  useGSAP(() => {
    const small = smallMacbookRef.current;
    const large = largeMacbookRef.current;

    if (showLargeMacbook) {
      moveGroup(small, -OFFSET_DISTANCE);
      moveGroup(large, 0);

      fadeMeshes(small, 0);
      fadeMeshes(large, 1);
    } else {
      moveGroup(small, 0);
      moveGroup(large, OFFSET_DISTANCE);

      fadeMeshes(small, 1);
      fadeMeshes(large, 0);
    }
  }, [showLargeMacbook]);

  return (
    <>
      <PresentationControls {...controlConfigs}>
        <group ref={largeMacbookRef}>
          <MacBookModel16 scale={isMobile ? 0.05 : 0.08} />
        </group>
      </PresentationControls>

      <PresentationControls {...controlConfigs}>
        <group ref={smallMacbookRef}>
          <MacBookModel14 scale={isMobile ? 0.03 : 0.06} />
        </group>
      </PresentationControls>
    </>
  );
}

export default ModelSwitcher;
