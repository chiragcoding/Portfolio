import { Suspense, useState, useEffect, Component, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { LandingBayScene } from './scenes/LandingBayScene';
import { ProcessingPipelineScene } from './scenes/ProcessingPipelineScene';
import { ServerRoomScene } from './scenes/ServerRoomScene';
import { EducationScene } from './scenes/EducationScene';
import { CameraController } from './components/CameraController';
import { NavigationOverlay } from './components/NavigationOverlay';
import { ContactFooter } from './components/ContactFooter';
import { LoadingScreen } from './components/LoadingScreen';
import { FallbackView } from './components/FallbackView';
import { useNavigation } from './hooks/useNavigation';
import { useResponsive } from './hooks/useResponsive';
import { usePortfolioStore } from './store/usePortfolioStore';

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      // Verify it actually works
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

class ErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

function Scene() {
  const qualityLevel = usePortfolioStore((s) => s.qualityLevel);

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 55, near: 0.1, far: 120 }}
      dpr={[1, qualityLevel === 'high' ? 2 : 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: 'default' }}
      style={{ position: 'fixed', inset: 0 }}
      onCreated={({ gl }) => { gl.setClearColor('#050510', 1); }}
    >
      <CameraController />
      <ambientLight intensity={0.3} />

      <Suspense fallback={null}>
        <LandingBayScene />
      </Suspense>
      <Suspense fallback={null}>
        <ProcessingPipelineScene />
      </Suspense>
      <Suspense fallback={null}>
        <ServerRoomScene />
      </Suspense>
      <Suspense fallback={null}>
        <EducationScene />
      </Suspense>
    </Canvas>
  );
}

function PortfolioApp() {
  useNavigation();
  useResponsive();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <>
      <ErrorBoundary fallback={<FallbackView />}>
        <Scene />
      </ErrorBoundary>
      <NavigationOverlay />
      <ContactFooter />
    </>
  );
}

export default function App() {
  // Skip WebGL detection entirely - let the Canvas try to render
  // If it fails, the ErrorBoundary catches it
  const [mode, setMode] = useState<'loading' | '3d' | 'fallback'>('loading');

  useEffect(() => {
    // Check WebGL support
    const supported = detectWebGL();
    if (!supported) {
      setMode('fallback');
    } else {
      setMode('3d');
    }
  }, []);

  if (mode === 'loading') return <LoadingScreen />;
  if (mode === 'fallback') return <FallbackView />;
  return <PortfolioApp />;
}
