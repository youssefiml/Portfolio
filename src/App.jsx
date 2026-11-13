import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "./content/projects";
import "./App.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
      
      <div className="evidence-composition">
        <section className="evidence-purpose" data-ui="project-purpose">
          <span>The product</span>
          <p>{project.description}</p>
        </section>
        <section className="evidence-architecture" data-ui="project-architecture">
          <span>How it works</span>
          <p>{project.architecture}</p>
          <div className="system-path" aria-hidden="true">
            {project.system.map((part) => <b key={part}>{part}</b>)}
          </div>
        </section>
        <section className="evidence-decision" data-ui="engineering-decision">
          <span>The challenge</span>
          <p>{project.challenge}</p>
        </section>
        <section className="evidence-contribution" data-ui="verified-contribution">
          <span>{project.contribution ? "My contribution" : "From the repository"}</span>
          <p>{project.contribution || project.repositoryEvidence}</p>
          <a href={project.link} target="_blank" rel="noreferrer">
            {project.linkText} <Arrow up />
          </a>
        </section>
      </div>
    </div>
  );
}


function App() {
  const [selected, setSelected] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const appRef = useRef(null);
  const [layer, setLayer] = useState(0);
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

  useGSAP(() => {
    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".hero-copy > *, .hero-object", { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", clearProps: "all" });
      gsap.utils.toArray("[data-reveal]").forEach((element) => {
        gsap.from(element, { y: 28, opacity: 0, duration: 0.75, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 90%", once: true } });
      });
      gsap.to(".orbit-ring", { rotation: 35, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".about-mark", { rotation: -8, xPercent: 8, ease: "none", scrollTrigger: { trigger: ".about-section", start: "top bottom", end: "bottom top", scrub: true } });
    });
    return () => motion.revert();
  }, { scope: appRef });

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(".project-art > *, .project-title", { y: 16, opacity: 0, duration: 0.45, stagger: 0.06, ease: "power2.out", clearProps: "all" });
  }, { scope: appRef, dependencies: [selected], revertOnUpdate: true });

  const chooseProject = (index, focus = false) => {
    setSelected(index);
    if (focus) document.getElementById(`project-${projects[index].id}`)?.focus();
  };

  return (
    <div ref={appRef}>
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
            <p className="hero-role">Full-stack developer building thoughtful digital products.</p>
            <p className="hero-intro">From the first interaction to the systems behind it, I build software that feels clear and works with purpose.</p>
            <a className="primary-action" href="#work">View selected work <Arrow /></a>
          </div>
          <div className="hero-object">
            <div className="hero-object-top"><span>A little bit of everything</span><span>⌘</span></div>
            <div className="orbit-scene" aria-hidden="true">
              <div className="orbit-ring orbit-ring-one"></div><div className="orbit-ring orbit-ring-two"></div>
              <div className="orbit-core"><span>{["⌘", "{ }", "↗"][layer]}</span></div>
              <span className="orbit-label orbit-label-one">interface</span><span className="orbit-label orbit-label-two">logic</span><span className="orbit-label orbit-label-three">data</span>
            </div>
            <div className="hero-object-bottom"><p>{["The little details matter.", "Good logic, happy pixels.", "From first click to last byte."][layer]}</p><button className="play-button" type="button" onClick={() => setLayer((layer + 1) % 3)} aria-label="Change the illustration">Mix it up <span>↗</span></button></div>
          </div>
        </section>

        <section className="positioning-field">
          <div className="page-frame positioning-layout">
            <h2 data-reveal>Details make products.</h2>
            <p data-reveal>I started with the MERN stack and grew into working across interfaces, services, and data. What interests me most is how those pieces come together to make a product easier to use.</p>
          </div>
        </section>

        <section className="work-section page-frame" id="work">
          <header className="work-heading">
            <h2 data-reveal>Selected work</h2>
            <p data-reveal>A selection of projects spanning student experiences, diagnostics, reading, and wellness.</p>
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
            <article key={project.id} id="project-evidence" className={`project-sheet project-sheet--${project.color}`} role="tabpanel" aria-labelledby={`project-${project.id}`} tabIndex="0">
              <header className="project-title">
                <h3>{project.name}</h3>
                <p>{project.type}. {project.note}</p>
              </header>
              <div className={`project-art project-art--${project.id}`} aria-label={`${project.name}: ${project.type}`}>
                <span className="art-type">{project.type}</span>
                <div className="art-symbol" aria-hidden="true">{["↗", "⌘", "✦", "+", "◎"][selected]}</div>
                <div className="art-caption"><strong>{project.name}</strong><span>{project.note}</span></div>
              </div>
              <EvidenceView project={project} />
              <footer className="project-meta"><p>{project.tech}</p><p>{project.status}</p></footer>
            </article>
          </div>
        </section>

        <section className="expertise-section" id="expertise">
          <div className="page-frame expertise-layout">
            <header data-reveal>
              <h2>From idea to interface</h2>
              <p>I enjoy the details across the stack, especially where engineering meets the experience of using a product.</p>
            </header>
            <div className="expertise-list">
              <article data-reveal><h3>Frontend</h3><p>React and TypeScript interfaces, reusable controls, validation, responsive layout, and keyboard-aware states. Evidence: BOARDING, HKids, and StudyGuide.</p></article>
              <article data-reveal><h3>Backend and data</h3><p>Express and FastAPI service structures with MongoDB persistence and documented Supabase dependencies. Evidence: DigiAssistant, HKids, and WALLFIT.</p></article>
              <article data-reveal><h3>Product and UI/UX</h3><p>Registration flows, diagnostic explanations, content administration, and interfaces designed around real product tasks. Evidence: BOARDING, DigiAssistant, and HKids.</p></article>
              <article data-reveal><h3>Delivery and quality</h3><p>Linting, type-checking, container and deployment configuration are visible across the work. Evidence: this portfolio, BOARDING, and WALLFIT. </p></article>
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-sheet page-frame">
            <div className="about-visual" aria-hidden="true"><div className="about-mark">yi.</div><span>Curious by nature.<br />Developer by choice.</span></div>
            <div className="about-copy" data-reveal>
              <h2>Beyond the stack</h2>
              <p>I began by learning to build complete MERN applications. That foundation taught me how interfaces, APIs, and databases depend on one another, but the work quickly became less about checking off a stack and more about shaping a coherent product.</p>
              <p>Today I work across typed React interfaces, Node.js and FastAPI services, data flows, and deployment boundaries. I care about the small decisions that make software easier to understand: validation that arrives at the right moment, explanations that clarify a score, and back-office layouts that remain useful on a smaller screen.</p>
              <p>I value clear communication and thoughtful collaboration, and I bring the same care to the details behind the screen as the ones people see.</p>
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
    </div>
  );
}

export default App;
