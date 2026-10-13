# Portfolio — Rijan Pariyar

Personal site for a Quality Assurance Specialist: Playwright and Cypress
automation, API testing, and release sign-off for fintech SaaS and e-commerce.

**Live:** [rijan-pariyar.com.np](https://rijan-pariyar.com.np/)

## Stack

React 18 and Vite 5, and nothing else. No UI library, no CSS framework, no
animation library — the layout, dark mode, reveal-on-scroll, hero parallax and
the project mock-ups are all hand-written. Ships ~66 kB of gzipped JavaScript.

## Running it

```bash
npm install
npm run dev      # vite dev server on :5173
npm run build    # production build to dist/
npm run preview  # serve the built output
```

## Layout

```
index.html              meta, Open Graph, Person JSON-LD, no-flash theme script
src/
  data.js               all site content — profile, projects, skills, experience
  App.jsx               section order
  sections/             one file per page section
  components/           nav, theme toggle, reveal, portrait, résumé modal
  components/mocks/     React recreations of the product UIs shown in Work
  *.css                 base, polish, parallax, mock-up styles
public/                 portrait, project images, résumé PDF, sitemap, manifest
```

The project cards in Work render **hand-built React mock-ups** of each product's
interface rather than screenshots, so they stay sharp at any size and respond to
the active theme.

## Content

Everything shown on the page comes from `src/data.js` — projects, tags,
experience, skills and stats. Adding a project is one object in the `projects`
array; the Work filter builds itself from the tags, surfacing any tag that
appears on more than one project.

## Deployment

Static build, deployable anywhere. `netlify.toml` and `vercel.json` are both
committed, each setting long-lived cache headers for hashed assets and
`X-Content-Type-Options` / `Referrer-Policy` for everything else.

## Contact form

The form posts to a third-party form provider; set the endpoint in
`src/sections/Contact.jsx` before launch. Without one it falls back to its
error state, and the mailto and résumé links continue to work.
