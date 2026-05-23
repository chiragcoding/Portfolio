import { PROJECTS, SKILLS, PIPELINE_NODES, CONTACT } from '../data/constants';

export function FallbackView() {
  return (
    <div className="fallback-view">
      <div className="fallback-notice">
        <p>Your browser does not support WebGL. Showing 2D version.</p>
      </div>
      <section className="fallback-section fallback-hero">
        <h1>CHIRAG MAHESHWARI</h1>
        <p className="subtitle">Data Engineer • AWS Cloud • Software Engineer</p>
      </section>
      <section className="fallback-section">
        <h2>Work Experience</h2>
        <h3>Data Engineer Intern — Nielsen</h3>
        <p className="period">Jan 2025 – Apr 2026</p>
        <ul>
          {PIPELINE_NODES.map((n) => <li key={n.id}><strong>{n.label}:</strong> {n.details}</li>)}
        </ul>
      </section>
      <section className="fallback-section">
        <h2>Projects</h2>
        {PROJECTS.map((p) => (
          <div key={p.id} className="fallback-card">
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <p className="tech-list">{p.technologies.join(' • ')}</p>
          </div>
        ))}
      </section>
      <section className="fallback-section">
        <h2>Skills</h2>
        <div className="fallback-skills">
          {SKILLS.map((s) => <span key={s} className="skill-tag">{s}</span>)}
        </div>
      </section>
      <section className="fallback-section">
        <h2>Contact</h2>
        <p><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
        <p><a href={`tel:${CONTACT.phone}`}>{CONTACT.phone}</a></p>
        <p><a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
        <p>{CONTACT.availability}</p>
      </section>
    </div>
  );
}
