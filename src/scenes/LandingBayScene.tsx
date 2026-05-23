import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, MeshDistortMaterial, Sphere, Float, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '../store/usePortfolioStore';

/**
 * Glowing holographic data core — abstract, futuristic, impressive.
 * Much better looking than a primitive-based character.
 */
function HolographicCore() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.15;
      outerRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.3;
    }
    if (ring1.current) ring1.current.rotation.z = t * 0.4;
    if (ring2.current) ring2.current.rotation.x = t * 0.3;
    if (ring3.current) ring3.current.rotation.y = -t * 0.25;
  });

  return (
    <Float speed={reducedMotion ? 0 : 1.5} floatIntensity={reducedMotion ? 0 : 0.4} rotationIntensity={0}>
      <group>
        {/* Main distorted sphere - glowing blue */}
        <Sphere args={[1.4, 64, 64]}>
          <MeshDistortMaterial
            color="#0055ff"
            emissive="#0033aa"
            emissiveIntensity={1.2}
            roughness={0.1}
            metalness={0.9}
            distort={0.25}
            speed={2.5}
          />
        </Sphere>

        {/* Inner energy core */}
        <Sphere ref={innerRef} args={[0.8, 32, 32]}>
          <MeshWobbleMaterial
            color="#00ffcc"
            emissive="#00ffcc"
            emissiveIntensity={2}
            factor={0.3}
            speed={3}
            transparent
            opacity={0.6}
          />
        </Sphere>

        {/* Wireframe shell */}
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[1.9, 1]} />
          <meshStandardMaterial
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={0.4}
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Orbital rings */}
        <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.3, 0.02, 16, 100]} />
          <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={1.5} transparent opacity={0.8} />
        </mesh>
        <mesh ref={ring2} rotation={[Math.PI / 3, Math.PI / 5, 0]}>
          <torusGeometry args={[2.6, 0.015, 16, 100]} />
          <meshStandardMaterial color="#6600ff" emissive="#6600ff" emissiveIntensity={1} transparent opacity={0.6} />
        </mesh>
        <mesh ref={ring3} rotation={[Math.PI / 5, -Math.PI / 3, Math.PI / 6]}>
          <torusGeometry args={[2.9, 0.012, 16, 100]} />
          <meshStandardMaterial color="#0088ff" emissive="#0088ff" emissiveIntensity={0.8} transparent opacity={0.5} />
        </mesh>

        {/* Orbiting data nodes */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <DataNode key={i} index={i} />
        ))}
      </group>
    </Float>
  );
}

function DataNode({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const radius = 2.2 + (index % 3) * 0.3;
  const speed = 0.3 + index * 0.08;
  const colors = ['#00ffcc', '#0088ff', '#ff6600', '#6600ff', '#00d4ff', '#ff3366', '#ffcc00', '#00ff88'];

  useFrame((state) => {
    if (!ref.current || reducedMotion) return;
    const t = state.clock.elapsedTime * speed + index * (Math.PI / 4);
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 2 + index) * 0.8;
    ref.current.rotation.x = t * 2;
    ref.current.rotation.y = t * 3;
  });

  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.08, 0]} />
      <meshStandardMaterial
        color={colors[index]}
        emissive={colors[index]}
        emissiveIntensity={2}
      />
    </mesh>
  );
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  const positions = useMemo(() => {
    const arr = new Float32Array(250 * 3);
    for (let i = 0; i < 250; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.008;
    ref.current.rotation.x = state.clock.elapsedTime * 0.003;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={250} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#00aaff" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export function LandingBayScene() {
  return (
    <group position={[0, 0, 0]}>
      {/* Lighting */}
      <pointLight position={[5, 5, 5]} intensity={2} color="#00d4ff" />
      <pointLight position={[-5, -3, 5]} intensity={1.2} color="#6600ff" />
      <pointLight position={[0, -5, 3]} intensity={0.8} color="#00ffcc" />
      <spotLight position={[0, 8, 4]} intensity={1.5} angle={0.5} penumbra={1} color="#ffffff" />

      {/* Main 3D element - centered */}
      <group position={[0, -0.8, 0]}>
        <HolographicCore />
      </group>

      {/* Particles */}
      <ParticleField />

      {/* Name - top area, fits in viewport */}
      <Html position={[0, 3.8, 0]} center style={{ pointerEvents: 'none', width: '90vw', maxWidth: '600px' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 className="hero-name">CHIRAG MAHESHWARI</h1>
          <p className="hero-subtitle">Data Engineer • AWS Cloud • Software Engineer</p>
          <p className="hero-tagline">
            From Raw Data to Real Impact — At Scale
          </p>
        </div>
      </Html>

      {/* Left paragraph */}
      <Html position={[-4.2, -0.5, 0]} center style={{ pointerEvents: 'none', width: '200px' }}>
        <div className="side-para left">
          <p>Passionate about building scalable data infrastructure at production scale. Specialized in ETL pipelines, real-time streaming, and cloud-native platforms on AWS.</p>
        </div>
      </Html>

      {/* Right paragraph */}
      <Html position={[4.2, -0.5, 0]} center style={{ pointerEvents: 'none', width: '200px' }}>
        <div className="side-para right">
          <p>Fluent in the modern data stack — from writing Spark jobs in Scala to designing Iceberg-based data lakes on S3, with deep expertise in Airflow orchestration and real-time Kafka pipelines.</p>
        </div>
      </Html>
    </group>
  );
}
