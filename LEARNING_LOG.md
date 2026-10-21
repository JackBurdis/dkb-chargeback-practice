# Learning log

A block-by-block record of what I built and learned, written for interview prep and for picking up where I left off.

---

## Day 1

### Block 0: Setup and orientation

**What we built**
A React + TypeScript project scaffolded with Vite, committed with git and pushed to GitHub (`JackBurdis/dkb-chargeback-practice`).

**Concepts covered**
- **Vite**: a translator between my code and the browser. It turns TypeScript and JSX into plain JavaScript. `npm run dev` gives live translation as I save; `npm run build` makes the finished, optimised files in `dist/`.
- **DOM (Document Object Model)**: the browser's live, in-memory version of the page, which JavaScript can change. View Source shows the HTML file as sent; DevTools → Elements shows the DOM.
- **SPA (Single-Page Application)**: one nearly empty HTML page (`<div id="root">`), with JavaScript (React) drawing everything inside it. Picture an empty frame delivered, then a painter paints in it.
- **Accessibility tree**: a simplified version of the DOM that screen readers use. It describes what each thing *is* (button, heading, label), so using the right HTML elements matters more than when the HTML appears.
- **package.json**: the project's ID card and shopping list. `scripts` are shortcuts, `dependencies` ship to the browser (ingredients in the cake), and `devDependencies` are build tools only (the oven and bowls).
- **Lockfile (`package-lock.json`)**: the receipt recording exact versions, so every machine installs the same thing. Committed.
- **node_modules**: the downloaded packages. Never committed; rebuilt with `npm install`.
- **`npm ci`**: a strict install from the lockfile only, used by build servers.
- **TypeScript strict mode**: a fussy type checker that catches bugs before the code runs.
- **.gitignore**: files git ignores because they're big and regenerable (`node_modules`, `dist`), secret (`.env.local` API keys) or junk (`.DS_Store`).
- **Git basics**: working folder → staging area (packing the box, `git add`) → commit (sealed, labelled box, `git commit`). The commit hash is the tracking number; HEAD is "you are here".
- **`git commit --amend`**: fixes the last commit. Only use it before pushing.
- **Remote / origin**: a copy of the repo elsewhere; `origin` is the nickname for the GitHub copy.
- **PR vs deploy**: a PR asks "may my branch join main?" and is reviewed before merging. Deploying (often automatic via CI/CD) sends main to a server.

**Interview soundbite**
> "I set the project up with Vite's React TypeScript template and kept TypeScript in strict mode, because it moves bugs from runtime, when a user hits them, to compile time, when I hit them. I commit the lockfile so every machine and the CI server install exactly the same dependency versions. In a banking context that reproducibility matters."

**Sticky-note shorthand**
`Source ≠ DOM` · `deps = cake, devDeps = oven` · `lockfile = receipt` · `TS: bugs → compile time`

**What I found tricky**
- Safari hides DevTools until "Show features for web developers" is turned on, and React DevTools doesn't support Safari, so I'm using Chrome or Firefox.
- I mixed up `npm install` (gets packages) with `npm run build` (makes `dist/`).
- Git status colours aren't useful for me (colourblind), so I read the headings instead: "Untracked files" vs "Changes to be committed".

**Later**
- (nothing parked yet)
