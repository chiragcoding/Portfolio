import { create } from 'zustand';
import { SectionName } from '../types';

interface PortfolioStore {
  currentSection: SectionName;
  isTransitioning: boolean;
  qualityLevel: 'high' | 'medium' | 'low';
  fps: number;
  activePopup: string | null;
  expandedCard: string | null;
  hoveredSkill: string | null;
  viewport: 'mobile' | 'tablet' | 'desktop';
  reducedMotion: boolean;

  navigateTo: (section: SectionName) => void;
  setTransitioning: (value: boolean) => void;
  setQualityLevel: (level: 'high' | 'medium' | 'low') => void;
  setFps: (fps: number) => void;
  setActivePopup: (id: string | null) => void;
  setExpandedCard: (id: string | null) => void;
  setHoveredSkill: (skill: string | null) => void;
  setViewport: (vp: 'mobile' | 'tablet' | 'desktop') => void;
  setReducedMotion: (value: boolean) => void;
}

const SECTION_ORDER: SectionName[] = ['landing', 'pipeline', 'serverRoom', 'education'];

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  currentSection: 'landing',
  isTransitioning: false,
  qualityLevel: 'high',
  fps: 60,
  activePopup: null,
  expandedCard: null,
  hoveredSkill: null,
  viewport: 'desktop',
  reducedMotion: false,

  navigateTo: (section: SectionName) => {
    set((state) => {
      if (state.isTransitioning || state.currentSection === section) return state;
      return { currentSection: section, isTransitioning: true, activePopup: null, expandedCard: null };
    });
  },
  setTransitioning: (value) => set({ isTransitioning: value }),
  setQualityLevel: (level) => set({ qualityLevel: level }),
  setFps: (fps) => set({ fps }),
  setActivePopup: (id) => set({ activePopup: id }),
  setExpandedCard: (id) => set((state) => ({
    expandedCard: state.expandedCard === id ? null : id,
  })),
  setHoveredSkill: (skill) => set({ hoveredSkill: skill }),
  setViewport: (vp) => set({ viewport: vp }),
  setReducedMotion: (value) => set({ reducedMotion: value }),
}));

export { SECTION_ORDER };
