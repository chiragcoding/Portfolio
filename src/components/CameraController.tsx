import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { SectionName } from '../types';

const CAMERA_CONFIGS: Record<SectionName, { pos: [number, number, number]; lookAt: [number, number, number] }> = {
  landing: { pos: [0, 0, 12], lookAt: [0, 0, 0] },
  pipeline: { pos: [0, -15, 10], lookAt: [0, -15, 0] },
  serverRoom: { pos: [0, -29, 16], lookAt: [0, -30, 0] },
  education: { pos: [0, -45, 14], lookAt: [0, -45, 0] },
};

export function CameraController() {
  const { camera } = useThree();
  const { currentSection, setTransitioning, viewport } = usePortfolioStore();

  const targetPos = useRef(new THREE.Vector3(0, 0, 10));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));
  const currentLook = useRef(new THREE.Vector3(0, 0, 0));
  const progress = useRef(1);

  useEffect(() => {
    const config = CAMERA_CONFIGS[currentSection];
    const zMult = viewport === 'mobile' ? 1.4 : viewport === 'tablet' ? 1.2 : 1;
    targetPos.current.set(config.pos[0], config.pos[1], config.pos[2] * zMult);
    targetLook.current.set(config.lookAt[0], config.lookAt[1], config.lookAt[2]);
    progress.current = 0;
  }, [currentSection, viewport]);

  useFrame((_, delta) => {
    if (progress.current >= 1) return;

    progress.current = Math.min(progress.current + delta * 0.9, 1);
    const t = progress.current;
    // Smooth ease-in-out
    const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    camera.position.lerp(targetPos.current, ease * 0.12 + 0.01);
    currentLook.current.lerp(targetLook.current, ease * 0.12 + 0.01);
    camera.lookAt(currentLook.current);

    if (t >= 1) {
      setTransitioning(false);
    }
  });

  return null;
}
