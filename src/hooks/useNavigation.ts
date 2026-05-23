import { useEffect, useCallback } from 'react';
import { usePortfolioStore, SECTION_ORDER } from '../store/usePortfolioStore';

export function useNavigation() {
  const { currentSection, isTransitioning, navigateTo } = usePortfolioStore();

  const navigateNext = useCallback(() => {
    if (isTransitioning) return;
    const idx = SECTION_ORDER.indexOf(currentSection);
    if (idx < SECTION_ORDER.length - 1) {
      navigateTo(SECTION_ORDER[idx + 1]);
    }
  }, [currentSection, isTransitioning, navigateTo]);

  const navigatePrev = useCallback(() => {
    if (isTransitioning) return;
    const idx = SECTION_ORDER.indexOf(currentSection);
    if (idx > 0) {
      navigateTo(SECTION_ORDER[idx - 1]);
    }
  }, [currentSection, isTransitioning, navigateTo]);

  useEffect(() => {
    let lastTime = 0;
    const DEBOUNCE = 1200;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastTime < DEBOUNCE) return;
      if (Math.abs(e.deltaY) < 10) return;
      lastTime = now;
      if (e.deltaY > 0) navigateNext();
      else navigatePrev();
    };

    let touchY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = touchY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 60) return;
      const now = Date.now();
      if (now - lastTime < DEBOUNCE) return;
      lastTime = now;
      if (diff > 0) navigateNext();
      else navigatePrev();
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); navigateNext(); }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); navigatePrev(); }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKey);
    };
  }, [navigateNext, navigatePrev]);
}
