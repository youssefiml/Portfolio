# Portfolio audit

Audit date: 3 November 2026. Scope: the tracked Portfolio source and configuration, the existing working-tree state, and selected public GitHub repositories under `youssefiml`. Findings are a static review, not a live-site, browser, accessibility, performance, dependency-vulnerability, or production deployment test. No packages were installed or application code changed. GitHub repository evidence describes code or documentation present; it does not automatically establish personal authorship, seniority, production use, or outcomes. The existing `.gitignore` change predates this audit and was left untouched.

## Executive assessment

The current site identifies Youssef and supplies contact paths, but contains no work or project case studies. It cannot yet substantiate its full-stack positioning. The strongest current personal evidence is a public BOARDING commit adding form controls and substantial registration UI. Several other repositories demonstrate relevant product and full-stack code, but personal scope needs confirmation. See [PROJECT_INVENTORY.md](PROJECT_INVENTORY.md) for links and limitations and [CONTENT_STRATEGY.md](CONTENT_STRATEGY.md) for the proposed structure.

Recommended positioning: **Youssef Imlilss — Full-Stack Software Engineer**, focused on frontend engineering, product development and user experience. This is the requested positioning; the degree of expertise and exact project responsibilities still require confirmation.

## Architecture and content

- `src/main.jsx` mounts a single React application under Strict Mode. `src/App.jsx` combines navigation, scrolling, PDF export, all page content and contact links in one component. `src/App.css` contains global animation and scroll styling; Tailwind utilities and inline styles do most presentation work. There is no router, content model, CMS, API integration or project data in this repository.
- The page offers hero, about, skills, philosophy and contact. There is no selected work, case study, employment timeline, project evidence, outcome, screenshots or project links. Age 23, “2 years,” “MERN Stack Specialist,” and detailed skill claims are self-reported in `src/App.jsx`, not independently verified; age and experience duration also become stale.
- The title says “Full-Stack Web Developer”; the hero repeats similar variants. Replace the message only during a later implementation, after review of positioning and evidence.
- The grey/lime palette, blurred floating shapes, large centered type, shadows and repeated cards establish a consistent style, but give little project-specific context. Responsive utility classes exist; actual device layouts and behavior have not been visually tested.
- PDF export dynamically imports `html2pdf.js`. `pdf-content` does not exist, so the code falls back to the entire `document.body`; output quality, print layout and failure flow have not been tested. A page snapshot is not necessarily a useful résumé.

## Dependencies, build and deployment

- `package.json` declares React 19, React DOM, Express, html2pdf.js, Vite 7, Tailwind 3, PostCSS and ESLint; `package-lock.json` is present. Build, lint, preview and start scripts exist, but no test script or checked-in test suite was found. No dependency install, build, lint, test, `npm audit`, or runtime validation was performed.
- **High priority:** `nixpacks.toml` requests Node 18 and npm 9; the locked Vite 7.2.0 package declares Node `^20.19.0 || >=22.12.0`. This is an engine mismatch and may break installation or build on that deployment path. Verify the actual Railway environment and update the runtime in a future implementation; configuration alone does not prove what is deployed.
- `railway.json` builds with Nixpacks and starts Express. `server.js` serves `dist` and returns its index for all unmatched GET requests; missing assets/routes may therefore return HTML with a successful status. It reads the index synchronously on each fallback request. No production URL or live deployment status was established. The README's automatic deployment statements are instructions/claims, not proof of a connected service.
- `html2pdf.js` is lazy loaded, which helps defer its cost; actual bundle size and Core Web Vitals are unmeasured. Scroll events repeatedly update state, read layout and transform the hero; possible jank needs measurement. Broad CSS transitions and perpetual background animation also merit profiling.

## SEO and discoverability

- `index.html` provides language, viewport and title but no meta description, canonical URL, Open Graph/Twitter metadata, structured data or branded favicon; it references the Vite default icon. No `robots.txt` or sitemap appears in the tracked files.
- Main content is rendered client-side into an initially empty root, which can affect previews and indexing depending on crawler execution; actual indexing has not been checked. Establish the canonical domain before choosing metadata, sitemap or rendering strategy.

## Accessibility: static findings, not a conformance audit

- There is a semantic `nav`, heading hierarchy and labeled menu toggle. The mobile toggle has no `aria-expanded`/`aria-controls`, removes its focus outline (`src/App.jsx:149–152`), and closes on every scroll. Verify keyboard focus, state announcement and behavior on mobile.
- No `<main>` landmark or skip link appears in the app. Active navigation is represented visually, with no `aria-current`. The mobile PDF control relies on a `title` for its name; verify its accessible name with assistive technology and provide an explicit name if needed.
- `src/App.css` enables smooth scrolling and infinite motion without a `prefers-reduced-motion` override. Add an accessible motion strategy during implementation. Validate keyboard operation, focus contrast, color contrast, screen-reader behavior, zoom and touch targets with real tools; static review alone cannot establish compliance.
- Hover handlers change `e.target` styles, which may target nested SVG elements rather than the anchor or button; check pointer behavior. Content has no project images, so meaningful image alternative text remains an implementation requirement.

## Assets and information gaps

Tracked local visual assets are only the Vite and React starter SVGs; no project screenshots, portrait, brand assets, résumé or social preview are included. Source has external GitHub, LinkedIn and email links; their current suitability is unverified. DigiAssistant's public repository includes `DigiAss.PNG`; review its content, quality, rights and suitability before reuse. Gather approved desktop/mobile captures, accessibility-safe redactions, original design assets and usage permission for each selected case study.

## Priority before implementation

1. Agree on positioning, intended audience and 2–3 projects; confirm ownership, project status, and permission to publish.
2. Capture project-specific evidence and visuals; verify personal contributions and any measurable outcomes. Do not present README feature claims as independently tested results.
3. Resolve the documented runtime mismatch and choose a deployment target/domain in the implementation phase.
4. Plan accessible landmarks, navigation, reduced motion, keyboard and mobile checks; define metadata and share previews.
5. Choose a maintainable content structure and test build, lint, PDF if retained, links and deployed behavior after changes.
