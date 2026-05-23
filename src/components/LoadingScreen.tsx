import { useState, useEffect } from 'react';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
      <div className="loading-content">
        <div className="loading-cube">
          <div className="cube-face front" />
          <div className="cube-face back" />
          <div className="cube-face left" />
          <div className="cube-face right" />
          <div className="cube-face top" />
          <div className="cube-face bottom" />
        </div>
        <h2 className="loading-title">Initializing Data Infrastructure</h2>
        <div className="loading-bar">
          <div className="loading-bar-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
        </div>
        <p className="loading-percent">{Math.min(Math.round(progress), 100)}%</p>
      </div>
    </div>
  );
}
