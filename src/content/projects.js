/**
 * Public case-study content. Add only shareable, evidence-backed fields.
 * Optional contribution and lesson fields render only when evidence supports them.
 * Research notes and approval questions belong in INTERNAL_REVIEW.md, never here.
 */
export const projects = [
  {
    id: 'boarding', name: 'BOARDING', type: 'Student experience',
    tech: 'Next.js · React · TypeScript · Radix UI',
    note: 'A more considered path to an internship.',
    description: 'A student-facing application that supports the journey from account creation to internship placement.',
    architecture: 'A typed React interface uses domain-specific API modules. Its Axios client handles authentication, token refresh and API errors.',
    challenge: 'The registration flow brings applicant details together through validated steps and reusable form controls.',
    contribution: 'I contributed to the registration interface and added reusable Radix checkbox and radio components, alongside form validation.',
    link: 'https://github.com/youssefiml/boarding/commit/a09d8638feeff007194e3f6b7095c2f101fe013f', linkText: 'Explore the contribution',
    sourceLink: 'https://github.com/youssefiml/boarding', status: 'Frontend contribution', color: 'blue',
    artwork: ['STUDENT EXPERIENCE', 'Applications / onboarding', 'Form controls · typed API']
  },
  {
    id: 'digi', name: 'DigiAssistant', type: 'Digital maturity diagnostic',
    tech: 'React · FastAPI · MongoDB',
    note: 'Making a complex diagnostic approachable.',
    description: 'An AI-assisted digital maturity diagnostic that the repository describes as a conversational alternative to static questionnaires.',
    architecture: 'A React frontend connects to a FastAPI backend. The repository includes MongoDB persistence, scoring services and AI-provider dependencies.',
    challenge: 'The documented flow turns a multi-dimensional assessment into conversation, scoring and reports.',
    contribution: 'I contributed changes to the scoring service to identify maturity gaps and produce more descriptive explanations.',
    link: 'https://github.com/youssefiml/DigiAssistant/commit/7526b3b88e3836fa5c43ad9e00f042f2bc4ec114', linkText: 'Explore the contribution',
    sourceLink: 'https://github.com/youssefiml/DigiAssistant', status: 'Scoring-service contribution', color: 'clay',
    artwork: ['DIGITAL MATURITY', 'Conversation / insight', 'React · FastAPI · MongoDB']
  },
  {
    id: 'hkids', name: 'HKids', type: 'Reading platform · proof of concept',
    tech: 'React · TypeScript · Express · MongoDB',
    note: 'A focused space for young readers.',
    description: 'A reading and content-management proof of concept with a reader interface and an Express API.',
    architecture: 'The repository describes a React client and a TypeScript / Express API with separate public, admin and parent routes.',
    challenge: 'The proof of concept brings a focused reading interface and content administration into the same platform.',
    contribution: 'I contributed a responsive back-office story layout, including a horizontally scrollable layout for narrower screens.',
    link: 'https://github.com/youssefiml/HKids/commit/80a12d3e33e8f7e926bde678e17f72d3813b6a39', linkText: 'Explore the contribution',
    sourceLink: 'https://github.com/youssefiml/HKids', status: 'Back-office contribution', color: 'sage',
    artwork: ['READING PLATFORM', 'Reader / content', 'React · Express · TypeScript']
  },
  {
    id: 'wallfit', name: 'WALLFIT', type: 'Fitness & wellness',
    tech: 'React · Node.js · Express · MongoDB',
    note: 'A wellness product with community in mind.',
    description: 'A team-built fitness and wellness application with programs, profiles and community features.',
    architecture: 'The project combines a React client, an Express server and MongoDB models for profiles, programs and community features.',
    challenge: 'The application brings program guidance and community interactions together across frontend and backend services.',
    contribution: 'I contributed changes to cross-origin configuration for a separate frontend and backend deployment.',
    link: 'https://github.com/youssefiml/W-allfit/commit/6360f21390986bbe43c0c1634dcc0b9a7343cab8', linkText: 'Explore the contribution',
    sourceLink: 'https://github.com/youssefiml/W-allfit', status: 'Team project · deployment configuration', color: 'lilac',
    artwork: ['WELLNESS PRODUCT', 'Programs / community', 'React · Express · MongoDB']
  },
  {
    id: 'studyguide', name: 'StudyGuide', type: 'Student resources',
    tech: 'React · TypeScript · Supabase',
    note: 'Connecting students with useful resources.',
    description: 'A student resources interface with routes for schools, scholarships, articles and a protected community.',
    architecture: 'A React application uses client-side routing and an authentication context; its manifest includes the Supabase client.',
    challenge: 'The interface brings public resources and protected community and administration routes into one navigation.',
    link: 'https://github.com/youssefiml/StudyGuide', linkText: 'Explore the repository',
    sourceLink: 'https://github.com/youssefiml/StudyGuide', status: 'Student resources application', color: 'blue',
    artwork: ['STUDENT RESOURCES', 'Discover / connect', 'React · TypeScript · Supabase']
  }
];
