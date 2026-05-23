import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { PROJECTS, SKILLS } from '../data/constants';

function ProjectCard3D({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const { expandedCard, setExpandedCard, reducedMotion } = usePortfolioStore();
  const isExpanded = expandedCard === project.id;
  const xPos = (index - 1) * 5;

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4 + index * 1.5) * 0.03;
  });

  return (
    <group ref={groupRef} position={[xPos, 3.5, 0]}>
      {/* Top line */}
      <mesh position={[0, 0.5, 0.05]}>
        <boxGeometry args={[2.5, 0.02, 0.01]} />
        <meshStandardMaterial color="#0088ff" emissive="#0088ff" emissiveIntensity={1} transparent opacity={0.7} />
      </mesh>
      {/* Bottom line */}
      <mesh position={[0, -0.5, 0.05]}>
        <boxGeometry args={[2.5, 0.02, 0.01]} />
        <meshStandardMaterial color="#0088ff" emissive="#0088ff" emissiveIntensity={1} transparent opacity={0.7} />
      </mesh>

      {/* LED dot */}
      <mesh position={[1.1, 0.5, 0.05]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshStandardMaterial
          color={isExpanded ? '#00ff88' : '#0088ff'}
          emissive={isExpanded ? '#00ff88' : '#0088ff'}
          emissiveIntensity={3}
        />
      </mesh>

      {/* Card HTML content */}
      <Html center style={{ pointerEvents: 'auto' }}>
        <div
          className={`project-card ${isExpanded ? 'expanded' : ''}`}
          onClick={(e) => { e.stopPropagation(); setExpandedCard(project.id); }}
        >
          <h3 className="pc-title">{project.title}</h3>
          {isExpanded && (
            <div className="pc-body">
              <p className="pc-desc">{project.description}</p>
              <div className="pc-techs">
                {project.technologies.map((t) => (
                  <span key={t} className="pc-tech">{t}</span>
                ))}
              </div>
              <div className="pc-achievement">⚡ {project.achievement}</div>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

function SkillsCloud() {
  const groupRef = useRef<THREE.Group>(null);
  const { hoveredSkill, setHoveredSkill, reducedMotion } = usePortfolioStore();

  // Globe shape - 4 rings with proper sphere proportions and good spacing
  const skillPositions = useMemo(() => {
    const positions: { skill: string; pos: [number, number, number] }[] = [];
    
    // Ring 1 (top) - 4 skills, y=3, radius 3
    const ring1 = SKILLS.slice(0, 4);
    ring1.forEach((skill, i) => {
      const angle = (i / 4) * Math.PI * 2;
      positions.push({ skill, pos: [Math.cos(angle) * 3, 3, Math.sin(angle) * 3] });
    });

    // Ring 2 (upper-mid) - 6 skills, y=1, radius 5
    const ring2 = SKILLS.slice(4, 10);
    ring2.forEach((skill, i) => {
      const angle = (i / 6) * Math.PI * 2 + 0.3;
      positions.push({ skill, pos: [Math.cos(angle) * 5, 1, Math.sin(angle) * 5] });
    });

    // Ring 3 (lower-mid) - 6 skills, y=-1, radius 5
    const ring3 = SKILLS.slice(10, 16);
    ring3.forEach((skill, i) => {
      const angle = (i / 6) * Math.PI * 2 + 0.6;
      positions.push({ skill, pos: [Math.cos(angle) * 5, -1, Math.sin(angle) * 5] });
    });

    // Ring 4 (bottom) - 3 skills, y=-3, radius 3
    const ring4 = SKILLS.slice(16, 19);
    ring4.forEach((skill, i) => {
      const angle = (i / 3) * Math.PI * 2 + 0.5;
      positions.push({ skill, pos: [Math.cos(angle) * 3, -3, Math.sin(angle) * 3] });
    });

    return positions;
  }, []);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion || hoveredSkill) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
  });

  return (
    <group ref={groupRef}>
      {skillPositions.map(({ skill, pos }) => (
        <group key={skill} position={pos}>
          <mesh>
            <sphereGeometry args={[hoveredSkill === skill ? 0.1 : 0.05, 12, 12]} />
            <meshStandardMaterial
              color={hoveredSkill === skill ? '#00ffcc' : '#0088ff'}
              emissive={hoveredSkill === skill ? '#00ffcc' : '#0088ff'}
              emissiveIntensity={hoveredSkill === skill ? 3 : 1.5}
            />
          </mesh>
          <Html center style={{ pointerEvents: 'auto' }}>
            <span
              className={`skill-3d ${hoveredSkill === skill ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {skill}
            </span>
          </Html>
        </group>
      ))}
    </group>
  );
}

function FloatingServer({ position, delay }: { position: [number, number, number]; delay: number }) {
  const ref = useRef<THREE.Group>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  useFrame((state) => {
    if (!ref.current || reducedMotion) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + delay) * 0.12;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15 + delay) * 0.08;
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <boxGeometry args={[0.5, 1, 0.25]} />
        <meshStandardMaterial color="#080f1a" emissive="#001133" emissiveIntensity={0.3} metalness={0.5} roughness={0.5} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0.18, -0.3 + i * 0.3, 0.13]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#00ff88' : '#0088ff'} emissive={i % 2 === 0 ? '#00ff88' : '#0088ff'} emissiveIntensity={3} />
        </mesh>
      ))}
    </group>
  );
}

export function ServerRoomScene() {
  const expandedCard = usePortfolioStore((s) => s.expandedCard);
  const isAnyExpanded = expandedCard !== null;

  return (
    <group position={[0, -30, 0]}>
      {/* Lighting */}
      <pointLight position={[0, 5, 6]} intensity={2} color="#0088ff" />
      <pointLight position={[-4, -2, 4]} intensity={1} color="#00ffcc" />
      <pointLight position={[4, -2, 4]} intensity={1} color="#6600ff" />
      <spotLight position={[0, 8, 5]} intensity={1.5} angle={0.6} penumbra={1} color="#ffffff" />

      {/* Title - high up, moves higher when expanded */}
      <group position={[0, isAnyExpanded ? 7 : 6, 0]}>
        <Html center style={{ pointerEvents: 'none' }}>
          <h2 className="section-title">Projects & Skills</h2>
        </Html>
      </group>

      {/* Project Cards - at y=3.5, expand to y=4 */}
      {PROJECTS.map((project, i) => (
        <ProjectCard3D key={project.id} project={project} index={i} />
      ))}

      {/* Skills Cloud - well below cards, moves down more when expanded */}
      <group position={[0, isAnyExpanded ? -3.5 : -2, 0]}>
        <SkillsCloud />
      </group>

      {/* Background servers */}
      <FloatingServer position={[-6, 2, -4]} delay={0} />
      <FloatingServer position={[6, 1, -4]} delay={1.5} />
      <FloatingServer position={[-5, -5, -5]} delay={3} />
      <FloatingServer position={[5, -4.5, -5]} delay={4.5} />

      {/* Grid */}
      <gridHelper args={[24, 24, '#002244', '#000d1a']} position={[0, -7, -1]} />
    </group>
  );
}
