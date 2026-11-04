import { useEffect, useRef, useState } from "react";
import TechText from "./TechText";
import { projects } from "./content/projects";
import "./App.css";

function Arrow({ up = false }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d={up ? "M5 19 19 5M7 5h12v12" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function EvidenceView({ project }) {
  return (
    <div className="evidence-view" aria-label={`${project.name} evidence view`}>
      <div className="evidence-note">Evidence view, not a product screenshot. Project imagery will be added only after approval.</div>
      <div className="evidence-composition">
        <section className="evidence-purpose" data-ui="project-purpose">
          <span>Product purpose</span>
          <p>{project.description}</p>
        </section>
        <section className="evidence-architecture" data-ui="project-architecture">
          <span>System shape</span>
          <p>{project.architecture}</p>
          <div className="system-path" aria-hidden="true">
            {project.system.map((part) => <b key={part}>{part}</b>)}
          </div>
        </section>
        <section className="evidence-decision" data-ui="engineering-decision">
          <span>Engineering focus</span>
          <p>{project.challenge}</p>
        </section>
        <section className="evidence-contribution" data-ui="verified-contribution">
          <span>{project.contribution ? "Verified contribution" : "Repository evidence"}</span>
          <p>{project.contribution || project.repositoryEvidence}</p>
          <a href={project.link} target="_blank" rel="noreferrer">
            {project.linkText} <Arrow up />
          </a>
        </section>
      </div>
    </div>
  );
}

const techTitleProps = {
  fontSize: 132,
  fontWeight: 600,
  reveal: "letter",
  dashLength: 4,
  dashGap: 2,
  specks: 12,
  intro: "none",
  clickKick: true,
  guides: false,
  sweep: false,
  labels: false,
  draggable: false,
  align: "left",
};

function App() {
  const [selected, setSelected] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const project = projects[selected];

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches || !("IntersectionObserver" in window)) return undefined;
    document.documentElement.classList.add("motion-ready");
    const items = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    items.forEach((item) => observer.observe(item));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  const chooseProject = (index, focus = false) => {
    setSelected(index);
    if (focus) document.getElementById(`project-${projects[index].id}`)?.focus();
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header page-frame">
        <a className="identity" href="#top" aria-label="Youssef Imlilss, home">
          <span className="identity-mark">yi.</span>
          <span>Youssef Imlilss</span>
        </a>
        <nav id="site-navigation" className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label="Main navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#expertise" onClick={() => setMenuOpen(false)}>Expertise</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="mailto:youssefimlilss10@gmail.com">Contact</a>
        </nav>
        <button ref={menuButtonRef} className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? "Close" : "Menu"}
        </button>
      </header>

      <main id="main">
        <section className="hero page-frame" id="top">
          <div className="hero-copy">
            <h1 className="hero-name">
              <span className="line-mask"><span>Youssef</span></span>
              <span className="line-mask"><span>Imlilss</span></span>
            </h1>
            <p className="hero-role">Full-stack developer working from interface to system.</p>
            <p className="hero-intro">I build typed interfaces, APIs, and data-backed product flows, with attention to the decisions people feel on the surface.</p>
            <a className="primary-action" href="#work">Inspect the work <Arrow /></a>
          </div>
          <div className="hero-object" aria-label="Interface to system engineering trace">
            <div className="trace-title" aria-hidden="true"><TechText {...techTitleProps} text="Interface to system" /></div>
            <div className="change-stack">
              <div><span>Interface</span><b>Interaction and validation</b></div>
              <div><span>Service</span><b>Typed requests and API behavior</b></div>
              <div><span>Data</span><b>Persistence and product state</b></div>
            </div>
            <p>One product path, considered end to end.</p>
          </div>
        </section>

        <section className="positioning-field">
          <div className="page-frame positioning-layout">
            <h2 data-reveal>From MERN to product work</h2>
            <p data-reveal>My foundation was MongoDB, Express, React, and Node.js. The work expanded into TypeScript interfaces, FastAPI services, deployment boundaries, and the product decisions that connect them.</p>
          </div>
        </section>

        <section className="work-section page-frame" id="work">
          <header className="work-heading">
            <h2 data-reveal>Selected work</h2>
            <p data-reveal>Choose a project to inspect its purpose, architecture, engineering focus, and the contribution supported by public evidence.</p>
          </header>
          <div className="project-browser">
            <div className="project-index" role="tablist" aria-label="Selected projects" data-reveal>
              {projects.map((item, index) => (
                <button key={item.id} id={`project-${item.id}`} className={selected === index ? "project-choice is-active" : "project-choice"} type="button" role="tab" aria-selected={selected === index} aria-controls="project-evidence" tabIndex={selected === index ? 0 : -1} onClick={() => chooseProject(index)} onKeyDown={(event) => {
                  let next;
                  if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % projects.length;
                  if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index + projects.length - 1) % projects.length;
                  if (event.key === "Home") next = 0;
                  if (event.key === "End") next = projects.length - 1;
                  if (next !== undefined) { event.preventDefault(); chooseProject(next, true); }
                }}>
                  <span>{item.name}</span>
                  <small>{item.type}</small>
                </button>
              ))}
            </div>
            <article key={project.id} id="project-evidence" className={`project-sheet project-sheet--${project.color}`} role="tabpanel" aria-labelledby={`project-${project.id}`} tabIndex="0" data-reveal>
              <header className="project-title">
                <h3>{project.name}</h3>
                <p>{project.type}. {project.note}</p>
              </header>
              <EvidenceView project={project} />
              <footer className="project-meta"><p>{project.tech}</p><p>{project.status}</p></footer>
            </article>
          </div>
        </section>

        <section className="expertise-section" id="expertise">
          <div className="page-frame expertise-layout">
            <header data-reveal>
              <h2>What the work demonstrates</h2>
              <p>Capabilities are tied to named repository evidence, not a list of tools presented without context.</p>
            </header>
            <div className="expertise-list">
              <article data-reveal><h3>Frontend</h3><p>React and TypeScript interfaces, reusable controls, validation, responsive layout, and keyboard-aware states. Evidence: BOARDING, HKids, and StudyGuide.</p></article>
              <article data-reveal><h3>Backend and data</h3><p>Express and FastAPI service structures with MongoDB persistence and documented Supabase dependencies. Evidence: DigiAssistant, HKids, and WALLFIT.</p></article>
              <article data-reveal><h3>Product and UI/UX</h3><p>Registration flows, diagnostic explanations, content administration, and interfaces designed around real product tasks. Evidence: BOARDING, DigiAssistant, and HKids.</p></article>
              <article data-reveal><h3>Delivery and quality</h3><p>Linting, type-checking, container and deployment configuration are visible across the work. Evidence: this portfolio, BOARDING, and WALLFIT. Deeper testing claims remain out of the public copy.</p></article>
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-sheet page-frame">
            <div className="about-mark" aria-hidden="true" data-reveal>yi.</div>
            <div className="about-copy" data-reveal>
              <h2>Beyond the stack</h2>
              <p>I began by learning to build complete MERN applications. That foundation taught me how interfaces, APIs, and databases depend on one another, but the work quickly became less about checking off a stack and more about shaping a coherent product.</p>
              <p>Today I work across typed React interfaces, Node.js and FastAPI services, data flows, and deployment boundaries. I care about the small decisions that make software easier to understand: validation that arrives at the right moment, explanations that clarify a score, and back-office layouts that remain useful on a smaller screen.</p>
              <p>The projects above separate repository-wide context from my verified contributions. That distinction matters to me: good engineering should be clear about both the system and the work a person actually did inside it.</p>
              <a href="https://github.com/youssefiml" target="_blank" rel="noreferrer">Explore GitHub <Arrow up /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="page-frame footer-layout">
          <div><h2 data-reveal>Build something useful</h2><p data-reveal>For product work, full-stack development, or a thoughtful technical conversation.</p></div>
          <a className="contact-action" href="mailto:youssefimlilss10@gmail.com" data-reveal>Start a conversation <Arrow up /></a>
        </div>
        <div className="page-frame footer-meta"><span>Youssef Imlilss · Full-stack developer</span><a href="#top">Back to top</a></div>
      </footer>
    </>
  );
}

export default App;
