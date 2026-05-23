import { usePortfolioStore } from '../store/usePortfolioStore';
import { SECTIONS } from '../data/constants';
import { SectionName } from '../types';

export function NavigationOverlay() {
  const { currentSection, navigateTo, isTransitioning } = usePortfolioStore();

  const handleClick = (sectionId: SectionName) => {
    if (!isTransitioning) {
      navigateTo(sectionId);
    }
  };

  return (
    <nav
      className="navigation-overlay"
      role="navigation"
      aria-label="Section navigation"
    >
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          className={`nav-dot ${currentSection === section.id ? 'active' : ''}`}
          onClick={() => handleClick(section.id)}
          aria-label={`Navigate to ${section.label}`}
          aria-current={currentSection === section.id ? 'true' : undefined}
          title={section.label}
        >
          <span className="nav-dot-label">{section.label}</span>
        </button>
      ))}
    </nav>
  );
}
