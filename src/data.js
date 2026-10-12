export const profile = {
  firstName: 'Rijan',
  lastName: 'Pariyar',
  role: 'Quality Assurance Specialist',
  tagline: 'Breaking and building software on purpose — so your users never have to.',
  location: 'Baneshwor, Kathmandu, Nepal',
  phone: '+977 9745310259',
  email: 'rijan.matat@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rijan-pariyar-73641128b/',
  instagram: 'https://www.instagram.com/riizz.on/',
  github: 'https://github.com/rijan0717',
  resume: '/Rijan-Pariyar-QA-Resume.pdf',
  // Background-removed, cropped portrait shown in the hero. Previous portrait kept at /rijan-old.webp.
  photo: '/rijan.webp',
}

export const summary =
  "Quality Assurance Specialist with **3+ years** across **fintech SaaS and e-commerce**, covering the full test cycle from test design to **release sign-off**. I build automated regression suites in **Playwright and Cypress**, test **REST APIs** end to end from their OpenAPI specs, and have wired an **AI assistant** into the Azure Boards workflow to remove repetitive admin."

export const stats = [
  { value: '3+', label: 'Years in quality assurance' },
  { value: '999+', label: 'Defects documented to date' },
  { value: '12+', label: 'Testing types: functional to performance' },
  { value: '2', label: 'Product teams, fintech SaaS & e-commerce' },
]

export const tools = [
  'Playwright', 'Cypress', 'TypeScript', 'Python', 'Postman', 'Swagger / OpenAPI',
  'Scalar', 'Azure Boards', 'Jira', 'BrowserStack', 'ADB', 'JMeter',
  'Chrome DevTools', 'GitHub', 'Shopify', 'WordPress', 'React', 'Next.js', 'Node.js', 'MongoDB', 'MERN', 'Claude (LLM)',
]

export const services = [
  {
    icon: 'code',
    title: 'Test Automation',
    text: 'Maintainable end-to-end and regression suites in Playwright (TypeScript, JavaScript, Python) and Cypress, structured with the Page Object Model, fixtures and separated test data.',
    tags: ['Playwright', 'Cypress', 'POM'],
  },
  {
    icon: 'api',
    title: 'API Testing',
    text: 'REST APIs tested from Swagger/OpenAPI and Scalar specs, with requests run in Postman to check status codes, schemas, payloads, auth flows and error handling.',
    tags: ['Postman', 'OpenAPI', 'Scalar'],
  },
  {
    icon: 'shield',
    title: 'Release Gatekeeping',
    text: 'Functional, regression, smoke and UAT cycles every sprint. I keep traceability in Azure Boards and Jira, review PRs, and sign off releases only when they are ready.',
    tags: ['UAT', 'Smoke', 'Regression'],
  },
  {
    icon: 'spark',
    title: 'AI-assisted QA',
    text: 'LLM-assisted test-case generation, auto-drafted defect tickets with the correct sprint and state fields, and daily QA progress reports built from tracked test activity.',
    tags: ['Claude', 'Azure Boards', 'Reporting'],
  },
  {
    icon: 'layers',
    // Shown full width, as the card that shows the building side.
    wide: true,
    title: 'Full-stack Development',
    text: "I don't just test — I love building new things too. Full-stack MERN apps (MongoDB, Express, React, Node.js) and Next.js sites: REST APIs, JWT auth, role-based dashboards, file uploads and PDF/Excel export, taken from design to deployment. From idea to a live, deployed product — Not QA only; I develop, build and deploy it myself.",
    tags: ['MERN', 'React', 'Node.js', 'Express', 'MongoDB', 'Next.js', 'REST APIs'],
    // Linked under the card, so a reader can see the work, not just the claim.
    projects: ['Smart CV Generator', 'ProjectPassout', 'Ease-meds'],
  },
]

export const experience = [
  {
    company: 'Sterling Wells',
    role: 'Quality Assurance Specialist (Mid-level)',
    period: 'Nov 2025 — Present',
    location: 'Kathmandu, Nepal',
    current: true,
    points: [
      'Test **fintech SaaS products**, including **RentalBux** (MTD software for UK landlords and sole traders), TMS and CRM, across functional, regression, smoke and UAT cycles every sprint.',
      '**Manually test** each sprint’s features against **acceptance criteria**: exploratory, functional and UI checks, with test cases written and maintained in Azure Boards.',
      'Test the **mobile apps** on real Android and iOS devices through **BrowserStack**, and on connected Android devices with **ADB**, checking installs, logs, gestures and behaviour across OS versions and screen sizes.',
      'Build and maintain **Playwright suites** in TypeScript and Python, which **cuts the manual effort** on each regression pass.',
      'Validate **REST APIs** with Postman, Swagger/OpenAPI and Scalar, and log defects with **request and response evidence** that reproduces them.',
      'Integrated **Claude (LLM) into Azure Boards** to auto-draft defect tickets and generate daily QA progress reports.',
      'Act as the **release gate**: PR reviews in GitHub, plus smoke and regression checks on web and mobile before each deployment.',
    ],
    stack: ['Manual testing', 'Mobile app testing', 'BrowserStack', 'ADB', 'Playwright', 'TypeScript', 'Python', 'Postman', 'Azure Boards'],
  },
  {
    company: 'Matat Nepal',
    role: 'Associate QA Engineer',
    period: 'Aug 2023 — Nov 2025',
    location: 'Kathmandu, Nepal',
    points: [
      '**Led QA** on **WordPress and Shopify** e-commerce builds: themes, plugins, checkout, forms and full UI/UX validation.',
      'Built and maintained **Cypress (JavaScript) automation** for login, checkout and regression flows.',
      'Validated **bulk product data and catalogue imports**, catching mapping, pricing and variant errors **before go-live**.',
      'Audited **on-page SEO** metadata, schema markup and tracking pixels against the Figma designs.',
      'Owned **test plans, bug tracking and QA documentation** for every deployment across Chrome, Firefox and Safari, with tasks and bugs tracked in ClickUp and Jira.',
    ],
    stack: ['Cypress', 'JavaScript', 'Shopify', 'WordPress', 'Figma', 'Jira', 'ClickUp'],
  },
]

// Work is split into two groups: products Rijan built, and products he tested.
// Each card's visual is a partial React recreation of the real UI (see
// src/components/mocks). A card without `mock` falls back to a styled cover,
// or to public/projects/<image> when that file exists.
export const projectGroups = [
  {
    key: 'built',
    title: 'Projects I built',
    blurb: 'Full-stack apps I designed, built and tested myself.',
  },
  {
    key: 'qa',
    title: "Products I've tested",
    blurb: 'Fintech SaaS and e-commerce products where I owned QA, from manual test design to Playwright automation.',
  },
]

export const projects = [
  // ---------- Built ----------
  {
    group: 'built',
    featured: true,
    title: 'Smart CV Generator',
    repo: 'cv-generator-MERN',
    kind: 'Full-stack · MERN',
    text: 'A full-stack MERN app: a CV builder with a job board built in. Job seekers get an AI score out of 100 and an AI match % for every job; employers post jobs and review applicants.',
    features: [
      'AI CV score and AI job-match percentage',
      'Job-tailored AI rewrite, showing the match before and after',
      'Drop an existing CV and have AI refine or rewrite it',
      'Three logins: job seeker, employer and admin',
      'Multiple professional CV templates, PDF/Word import, export to PDF, Word or Excel',
    ],
    tags: ['MERN', 'MongoDB', 'Express', 'React', 'Node.js', 'Tailwind', 'AI'],
    language: 'JavaScript',
    link: 'https://github.com/rijan0717/cv-generator-MERN',
    mock: 'cvgen',
    url: 'smart-cv-generator',
  },
  {
    group: 'built',
    featured: true,
    title: 'ProjectPassout',
    repo: 'projectpassout-next',
    kind: 'Next.js · Marketplace',
    text: "Nepal's college project marketplace, where students buy, sell and submit projects online. I built it in React, then migrated it to Next.js with Framer Motion for better SEO and routing.",
    features: [
      'Project catalogue with course tags (BCA, BIM, BIT) and tech stack',
      'Pricing plans for custom builds: Basic, Standard and Premium',
      'Contact form for custom project requests',
      'Deployed on Vercel',
    ],
    tags: ['Next.js', 'React', 'Framer Motion', 'SEO'],
    language: 'JavaScript',
    link: 'https://github.com/rijan0717/projectpassout-next',
    mock: 'passout',
    url: 'projectpassout.vercel.app',
  },
  {
    group: 'built',
    featured: true,
    title: 'Ease-meds',
    repo: 'Ease-meds',
    kind: 'Full-stack · PHP',
    text: 'An online medicine delivery system built from scratch in core PHP and MySQL, with no backend framework.',
    features: [
      'Medicine catalogue, cart and orders',
      'Order tracking system for customers',
      'Prescription upload',
      'Doctor appointment booking',
      'Admin CMS for orders, users, coupons and stock',
    ],
    tags: ['PHP', 'MySQL', 'XAMPP'],
    language: 'PHP',
    link: 'https://github.com/rijan0717/Ease-meds',
    mock: 'easemeds',
    url: 'localhost/Ease-meds',
  },

  // ---------- Tested ----------
  {
    group: 'qa',
    featured: true,
    title: 'RentalBux',
    org: 'Sterling Wells',
    kind: 'Fintech SaaS · QA',
    text: 'Making Tax Digital (MTD) software for UK landlords and sole traders. I run every sprint’s functional, regression and UAT cycles and act as the release gate.',
    features: [
      'Auth flows: email login, Google, Microsoft and Apple sign-in',
      'Core modules: accounting, MTD submissions and banking',
      'REST API checks from Swagger/OpenAPI and Scalar in Postman',
      'Playwright regression suites in TypeScript and Python',
      'Real-device testing with BrowserStack and ADB',
      'Database testing to verify data integrity behind each feature',
      'Bug hunting through browser DevTools: console, network and layout issues',
    ],
    tags: ['Playwright', 'Postman', 'Azure Boards', 'BrowserStack', 'DevTools'],
    language: 'Functional · API · UAT',
    live: 'https://rentalbux.com/',
    // Official product banner, shown whole (not cropped) on its own navy background
    image: 'rentalbux.webp',
    imageFit: 'contain',
    imageBg: '#0a1a52',
  },
  {
    group: 'qa',
    featured: true,
    title: 'FigsFlow (CRM & TMS)',
    org: 'Sterling Wells',
    kind: 'Practice management · CRM & TMS',
    text: 'Practice management software for accounting firms: the CRM runs one client record from enquiry to billing, and the TMS runs the work itself. I test both every sprint.',
    features: [
      'CRM: lead → proposal → engagement letter → billing, with AML at onboarding',
      'TMS: My Day view of overdue, today and upcoming tasks',
      'Internal targets against statutory deadlines, up to manager review',
      'Time tracking, tickets, and Google and Microsoft SSO',
      'RBAC: role-based access control tested across every permission and form',
      'HRMS: employee records, leave and holiday management',
    ],
    tags: ['Functional', 'Regression', 'UAT', 'API', 'Azure Boards', 'Jira'],
    language: 'Functional · Regression · UAT',
    live: 'https://figsflow.com/',
    // One frame, two modules: real CRM screenshot + rebuilt TMS dashboard
    mock: 'figsflowSuite',
    url: 'figsflow.com',
  },
  {
    group: 'qa',
    title: 'Manual QA Bug Reports',
    org: 'Matat Nepal',
    kind: 'E-commerce · Manual QA',
    text: '59 bug reports in Azure Boards format, with steps, expected and actual results, severity, priority and annotated screenshots, across four Shopify and WooCommerce builds.',
    tags: ['Shopify', 'WooCommerce', 'Azure Boards'],
    language: '59 defects · 4 projects',
    mock: 'bugsheet',
    url: 'Manual-QA-Bug-Reports-Ecommerce.xlsx',
  },
  {
    group: 'qa',
    title: 'Amazon Playwright Automation',
    repo: 'amazon-playwright-automation',
    kind: 'Automation',
    text: 'An automated test suite for Amazon e-commerce flows in Playwright and TypeScript, using the Page Object Model with separated locators, page objects, fixtures and test data.',
    tags: ['Playwright', 'TypeScript', 'POM'],
    language: 'TypeScript',
    link: 'https://github.com/rijan0717/amazon-playwright-automation',
    mock: 'playwright',
    url: 'localhost:9323 · playwright report',
  },
]

export const process = [
  { step: 'Clarify', text: 'Agree acceptance criteria with developers and the business requirements team before writing any test.' },
  { step: 'Design', text: 'Write test cases with traceability back to every requirement in Azure Boards or Jira.' },
  { step: 'Execute', text: 'Run functional, API, cross-browser and real-device testing.' },
  { step: 'Report', text: 'File reproducible defects with severity, priority and evidence, drafted with AI help.' },
  { step: 'Automate', text: 'Add stable flows to the Playwright and Cypress regression suites.' },
  { step: 'Sign off', text: 'Run smoke and regression checks before every deployment, then give the go or no-go.' },
]

export const skills = [
  { group: 'Automation', items: ['Playwright (TS, JS, Python)', 'Cypress (JS)', 'Page Object Model'] },
  { group: 'API testing', items: ['Postman', 'Swagger / OpenAPI', 'Scalar', 'REST'] },
  { group: 'Testing types', items: ['Manual & exploratory', 'Mobile app (Android & iOS)', 'Functional', 'Non-functional', 'Regression', 'Smoke', 'Sanity', 'UAT', 'UI/UX', 'Cross-browser & device', 'Performance (JMeter)'] },
  { group: 'Test management', items: ['Azure Boards', 'Jira', 'ClickUp', 'Asana', 'Git', 'GitHub'] },
  { group: 'Full-stack (MERN)', items: ['MERN stack', 'MongoDB', 'Express.js', 'React.js', 'Node.js', 'Next.js', 'REST API development'] },
  { group: 'Tools & platforms', items: ['WordPress', 'Shopify', 'WSL (Ubuntu)', 'BrowserStack', 'ADB', 'Chrome DevTools', 'XAMPP'] },
  { group: 'Programming', items: ['JavaScript', 'TypeScript', 'Python', 'HTML', 'CSS', 'PHP'] },
  { group: 'AI in QA', items: ['LLM test-case generation', 'Automated defect reporting', 'QA report generation'] },
]

export const education = {
  degree: 'Bachelor of Computer Applications (BCA)',
  school: 'G. P. Koirala Memorial College, Tribhuvan University',
  languages: ['English (professional working proficiency)', 'Nepali (native)'],
}

export const terminalLines = [
  { t: 'cmd', text: '$ npx playwright test --project=chromium' },
  { t: 'dim', text: 'Running 12 tests using 4 workers' },
  { t: 'ok', text: 'auth/login.spec.ts › user signs in with valid credentials', ms: '1.4s' },
  { t: 'ok', text: 'auth/login.spec.ts › shows error for invalid password', ms: '0.9s' },
  { t: 'ok', text: 'cart/checkout.spec.ts › guest completes checkout', ms: '4.2s' },
  { t: 'ok', text: 'cart/checkout.spec.ts › applies discount code', ms: '2.1s' },
  { t: 'ok', text: 'api/tenants.spec.ts › GET /tenants returns 200 + schema', ms: '0.3s' },
  { t: 'ok', text: 'api/tenants.spec.ts › POST /tenants rejects missing auth (401)', ms: '0.2s' },
  { t: 'ok', text: 'search/products.spec.ts › results match search keyword', ms: '2.8s' },
  { t: 'ok', text: 'reports/mtd.spec.ts › quarterly summary totals are correct', ms: '3.1s' },
  { t: 'pass', text: '12 passed (11.6s)' },
  { t: 'dim', text: 'To open last HTML report run: npx playwright show-report' },
]
