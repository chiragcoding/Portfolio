import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { EDUCATION, CERTIFICATIONS, LEETCODE } from '../data/constants';

function GraduationCap() {
  const ref = useRef<THREE.Group>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  useFrame((state) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <Float speed={reducedMotion ? 0 : 1.5} floatIntensity={reducedMotion ? 0 : 0.3}>
      <group ref={ref} position={[7, 4, -7]}>
        {/* Cap base */}
        <mesh rotation={[0.1, 0, 0]}>
          <boxGeometry args={[1.2, 0.08, 1.2]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.6} />
        </mesh>
        {/* Cap top */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.4, 0.5, 0.5, 6]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.6} />
        </mesh>
        {/* Tassel */}
        <mesh position={[0.5, 0.1, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
          <meshStandardMaterial color="#ffcc00" emissive="#ffcc00" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0.5, -0.2, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#ffcc00" emissive="#ffcc00" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </Float>
  );
}

function CertBadge({ position, delay }: { position: [number, number, number]; delay: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  useFrame((state) => {
    if (!ref.current || reducedMotion) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + delay) * 0.12;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3 + delay;
  });

  return (
    <mesh ref={ref} position={position}>
      <dodecahedronGeometry args={[0.25, 0]} />
      <meshStandardMaterial
        color="#00d4ff"
        emissive="#0088ff"
        emissiveIntensity={1}
        wireframe
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  const positions = useMemo(() => {
    const arr = new Float32Array(80 * 3);
    for (let i = 0; i < 80; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.005;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={80} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#6644cc" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export function EducationScene() {
  return (
    <group position={[0, -45, 0]}>
      {/* Lighting */}
      <pointLight position={[0, 5, 6]} intensity={2} color="#6644cc" />
      <pointLight position={[-4, -2, 4]} intensity={1} color="#00d4ff" />
      <pointLight position={[4, -2, 4]} intensity={0.8} color="#ffcc00" />
      <spotLight position={[0, 8, 5]} intensity={1.5} angle={0.6} penumbra={1} color="#ffffff" />

      {/* Title removed from separate Html - now inside the content block */}

      {/* Graduation cap - far top-right corner */}
      <GraduationCap />

      {/* All content in one block - no overlap possible */}
      <Html position={[0, 0.8, 0]} center style={{ pointerEvents: 'auto', width: '90vw', maxWidth: '480px' }}>
        <div className="edu-text">
          <h2 className="edu-main-title">Education</h2>
          <div className="edu-row">
            <span className="edu-label">University</span>
            <span className="edu-value">{EDUCATION.institution}</span>
          </div>
          <div className="edu-row">
            <span className="edu-label">Degree</span>
            <span className="edu-value">{EDUCATION.degree} ({EDUCATION.yearRange})</span>
          </div>
          <div className="edu-row">
            <span className="edu-label">CGPA</span>
            <span className="edu-value edu-highlight">{EDUCATION.cgpa}</span>
          </div>
          <div className="edu-row">
            <span className="edu-label">10th</span>
            <span className="edu-value">{EDUCATION.tenth}</span>
          </div>
          <div className="edu-row">
            <span className="edu-label">12th</span>
            <span className="edu-value">{EDUCATION.twelfth}</span>
          </div>

          <h3 className="certs-heading">Certifications</h3>
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.name} className="edu-row">
              {cert.link ? (
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="edu-value cert-link">
                  {cert.name} ↗
                </a>
              ) : (
                <span className="edu-value">{cert.name}</span>
              )}
              <span className="edu-label">{cert.owner}</span>
            </div>
          ))}
          <div className="edu-row leetcode-row">
            <span>🏆 {LEETCODE}</span>
          </div>
          <div className="edu-row cert-showcase-row">
            <a href="https://aws-cloud-practioner.vercel.app/" target="_blank" rel="noopener noreferrer" className="cert-showcase-link">
              🌐 View My AWS Cloud Showcase →
            </a>
          </div>
        </div>
      </Html>

      {/* Floating cert badges - far corners only */}
      <CertBadge position={[8, 3, -8]} delay={0} />
      <CertBadge position={[-8, -3, -8]} delay={1.5} />
      <CertBadge position={[7, -4, -9]} delay={3} />

      {/* Particles */}
      <ParticleField />

      {/* Grid */}
      <gridHelper args={[20, 20, '#332266', '#1a1133']} position={[0, -5, -1]} />
    </group>
  );
}
