# Contributing: Implementing Pages

This file explains how teammates should add/implement one page each.

Prerequisites
- Node.js >= 16 and `npm` installed.

Setup (after pulling the repo)
```bash
git pull origin main
npm install
npm run dev
```

Implement an existing page

We already have (nearly empty) pages in the project. Do NOT create new folders — implement your assigned page in-place. Current page components and paths:

- `src/pages/Home/Home.jsx (Vlad)`
- `src/pages/Acomodation/Acomodation.jsx (Christian)`
- `src/pages/Activities/Activities.jsx (Iarina)`
- `src/pages/Transport/Transport.jsx (Vlad)`
- `src/pages/BarsTinder/Bars.jsx (Jawad)`

What to do (per teammate)
- Open your assigned file (one of the paths above) and replace the placeholder content inside the existing component. Keep the root element using the shared class `page-container` for consistent styling:

```jsx
import React from 'react';

const Acomodation = () => (
  <div className="page-container">
    <h1>Acomodation</h1>
    <p>Implement your page content here (text, components, data fetches, etc.).</p>
  </div>
);

export default Acomodation;
```

- If you need page-specific styles, add `Acomodation.module.css` in the same folder and import it at the top of the component.
- Verify the route and import exist in `src/App.jsx`. The app already includes imports and routes for these pages; if you rename a page file, update `App.jsx` accordingly.




Branch & PR workflow
- Create a branch: `git checkout -b feature/page-YourPage`
- Rebase/pull latest: `git pull --rebase origin main`
- Push and open a PR to `main` with title `feat: add YourPage page`.
- In the PR description include what you added and screenshots if needed.

Checks before PR
- Start the dev server and verify the page route and navbar link work.
- Run linter (if configured): `npm run lint`

Troubleshooting
- Import errors: verify path and file name case (Windows can be case-insensitive locally but other systems are not).

Questions or style changes: open an issue or ask in the project chat.
