import { useEffect } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';

export function useResponsive() {
  const { setViewport, setReducedMotion } = usePortfolioStore();

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setViewport('mobile');
      } else if (width <= 1024) {
        setViewport('tablet');
      } else {
        setViewport('desktop');
      }
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', updateViewport);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, [setViewport, setReducedMotion]);
}
