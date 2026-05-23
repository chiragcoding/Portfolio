import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { PIPELINE_NODES } from '../data/constants';

function DataStream({ yOffset, speed, color }: { yOffset: number; speed: number; color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;
    const children = groupRef.current.children;
    for (let i = 0; i < children.length; i++) {
      const t = ((state.clock.elapsedTime * speed + i * 2) % 10) - 5;
      children[i].position.x = t;
      (children[i] as THREE.Mesh).rotation.x = state.clock.elapsedTime * 3;
      (children[i] as THREE.Mesh).rotation.z = state.clock.elapsedTime * 2;
    }
  });

  return (
    <group ref={groupRef} position={[0, yOffset, 0]}>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[-5 + i * 2, 0, 0]}>
          <boxGeometry args={[0.12, 0.12, 0.12]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
        </mesh>
      ))}
    </group>
  );
}

function PipelineTrack({ y, opacity }: { y: number; opacity: number }) {
  return (
    <mesh rotation={[0, 0, Math.PI / 2]} position={[0, y, -0.5]}>
      <cylinderGeometry args={[0.02, 0.02, 12, 8]} />
      <meshStandardMaterial color="#0088ff" emissive="#0044ff" emissiveIntensity={0.8} transparent opacity={opacity} />
    </mesh>
  );
}

function PipelineNode3D({ node, index }: { node: typeof PIPELINE_NODES[0]; index: number }) {
  const meshRef = useRef<THREE.Group>(null);
  const { activePopup, setActivePopup } = usePortfolioStore();
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const isActive = activePopup === node.id;
  const isSpecial = node.id === 's3-datalake';

  useFrame((state) => {
    if (!meshRef.current || reducedMotion) return;
    meshRef.current.position.y = node.position[1] + Math.sin(state.clock.elapsedTime * 0.8 + index) * 0.1;
    meshRef.current.children[0].rotation.y = state.clock.elapsedTime * 0.5;
  });

  return (
    <group ref={meshRef} position={node.position}>
      {/* 3D node shape */}
      {isSpecial ? (
        <Sphere args={[0.4, 32, 32]}>
          <MeshDistortMaterial
            color="#ff6600"
            emissive="#ff3300"
            emissiveIntensity={1.2}
            distort={0.2}
            speed={3}
            roughness={0.3}
          />
        </Sphere>
      ) : (
        <mesh>
          <octahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial
            color={isActive ? '#00ffcc' : '#0088ff'}
            emissive={isActive ? '#00ffcc' : '#0044ff'}
            emissiveIntensity={isActive ? 2 : 1}
            wireframe
          />
        </mesh>
      )}

      {/* Glow ring around node */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.01, 8, 32]} />
        <meshStandardMaterial
          color={isActive ? '#00ffcc' : '#0066ff'}
          emissive={isActive ? '#00ffcc' : '#0066ff'}
          emissiveIntensity={isActive ? 1.5 : 0.5}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Clickable area + label */}
      <Html center style={{ pointerEvents: 'auto' }}>
        <button
          className={`node-btn ${isActive ? 'active' : ''}`}
          onClick={(e) => { e.stopPropagation(); setActivePopup(isActive ? null : node.id); }}
        >
          {node.label}
        </button>
      </Html>

      {/* Detail popup */}
      {isActive && (
        <Html position={[0, 1.5, 0]} center style={{ pointerEvents: 'auto' }}>
          <div className="node-popup">
            <p>{node.details}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

export function ProcessingPipelineScene() {
  return (
    <group position={[0, -15, 0]}>
      {/* Lighting */}
      <pointLight position={[0, 4, 6]} intensity={2} color="#0088ff" />
      <pointLight position={[-4, -2, 4]} intensity={1} color="#00ffcc" />
      <pointLight position={[4, -2, 4]} intensity={0.8} color="#6600ff" />
      <spotLight position={[0, 6, 5]} intensity={1.5} angle={0.6} penumbra={1} color="#ffffff" />

      {/* Title */}
      <Html position={[0, 3.5, 0]} center style={{ pointerEvents: 'none' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 className="section-title">Data Engineer Intern</h2>
          <p className="section-subtitle">Nielsen • Jan 2025 – Apr 2026</p>
        </div>
      </Html>

      {/* Pipeline tracks */}
      <PipelineTrack y={0.8} opacity={0.4} />
      <PipelineTrack y={0} opacity={0.6} />
      <PipelineTrack y={-0.8} opacity={0.4} />

      {/* Data streams */}
      <DataStream yOffset={0.8} speed={0.7} color="#00ffcc" />
      <DataStream yOffset={0} speed={0.9} color="#0088ff" />
      <DataStream yOffset={-0.8} speed={0.6} color="#6600ff" />

      {/* Interactive nodes */}
      {PIPELINE_NODES.map((node, i) => (
        <PipelineNode3D key={node.id} node={node} index={i} />
      ))}

      {/* Grid floor */}
      <gridHelper args={[20, 20, '#003366', '#001122']} position={[0, -3, -1]} />
    </group>
  );
}
