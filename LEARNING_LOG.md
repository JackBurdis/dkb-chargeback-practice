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

---

### Block 1: HTML, CSS, the DOM and how React renders

**What we built**
Removed the Vite demo and built a static page: a "Monopoly Bank" header bar and a hardcoded list of 3 transaction cards (merchant, date and masked card on the left, amount on the right), centred and responsive.

**Concepts covered**
- **Declarative (React's core idea)**: describe what the page should look like for the current data, and React works out the changes. It's like giving a taxi driver the address instead of every turn.
- **JSX**: HTML-like syntax inside JavaScript. `className` not `class`, `{ }` for JS values, and one outer element (or a `<>` fragment).
- **`return ( ... )`**: brackets protect against a bare `return` on its own line returning nothing.
- **Semantic HTML**: use the element that says what the content is (`header`, `main`, `section`, `h1`/`h2`, `ul`/`li`). Screen readers use it to navigate, and headings go in order like chapters.
- **Inheritance**: some styles (font size, weight, colour) flow down to child elements. My list inside the `<h2>` came out big and bold.
- **Heading vs header**: `<h1>`–`<h6>` are titles; `<header>` is the top strip of a page or section.
- **Box model**: content → padding → border → margin, like a framed photo (photo, mount, frame, gap on the wall).
- **Flexbox**: `display: flex` on the parent lines its **direct** children up in a row, like books on a shelf. `justify-content` spaces them along the row; `align-items` lines them up across it. Wrap things in a `<div>` to keep them together.
- **CSS nesting**: valid modern CSS, but a nested selector gets the outer one put in front automatically, so `.transaction { .transaction p {} }` matched nothing.
- **Responsive design**: `max-width` + `margin: 0 auto` for a readable, centred column (like a newspaper). A **media query** (`@media (min-width: 768px)`) applies rules only at certain screen sizes. Mobile-first means phone styles first, then extras for bigger screens.
- **The cascade**: when two rules have the same strength, the one loaded later wins, like the newest note on the fridge. A media query decides *whether* a rule applies, not how strong it is.

**Interview soundbite**
> "I built the layout with semantic HTML first (header, main, a real list for the transactions) because screen readers use that structure to navigate, and accessibility is a legal requirement for banking in the EU. It's mobile-first CSS with flexbox, and I hit a nice cascade bug where my media query was being overridden by a rule loaded later. DevTools showed it crossed out, so I moved it next to the rule it changes."

**Sticky-note shorthand**
`taxi: address not turns` · `photo/mount/frame/wall` · `flex = direct kids only` · `later rule wins`

**What I found tricky**
- I put the `<ul>` inside the `<h2>` by accident, and the whole list inherited heading styles.
- I wrapped only the merchant in the `<div>` at first, so flexbox still saw three children.
- I nested `.transaction p` inside `.transaction`, which silently matched nothing.
- My media query in `index.css` was overridden by `App.css` (the cascade). I also had to learn that the Styles panel only shows the *selected* element and hides media queries that don't currently apply.
- I forgot to save once, so I turned on Auto Save.

**Later**
- Switch amounts to euros properly when we add money formatting (Block 2).
- npm's `fsevents` "install scripts" warning: newer npm blocks packages from running code at install time (supply-chain security). Discuss in Block 7.
- Interview prep: drill deeper into **state and event handlers** (props vs state, why the setter, re-renders, state updates being async/batched, lifting state up). Jack flagged these as core React.
- REST API refresher in Block 6: requests/responses, GET vs POST, status codes, JSON payloads, API specs (OpenAPI). Jack flagged this as essential and a weak spot.

---

### Block 2: Types, data and money

**What we built**
A `Transaction` type (`src/types/transaction.ts`), 6 mock transactions covering every eligibility case (`src/data/transactions.ts`), a `formatMoney` function (`src/utils/formatMoney.ts`) and my first Vitest unit tests. Also switched on TypeScript `strict` mode, which the template had left off.

**Concepts covered**
- **Floating-point**: computers store decimals in binary, which can't hold 0.1 exactly (like ⅓ = 0.333... in decimal), so `0.1 + 0.2 === 0.3` is `false`. JavaScript has only this one number type and no built-in `decimal`.
- **Money as integer cents**: store €19.99 as `1999`. Whole numbers are exact. Do the maths in cents and format only for display: "round once, at the edges".
- **Fixed-point**: a whole number with an agreed number of decimal places, e.g. hundredths of a penny for sub-penny prices.
- **Type**: the blank form describing a piece of data's shape. Each real transaction is a filled-in copy.
- **Union type**: `"booked" | "pending"`, one of these exact values only. A typo like `"bookd"` gets a red squiggle as I type.
- **Optional field (`?`) and `undefined`**: `disputeReference?` is missing when not disputed (don't use `""`). A missing field's value is `undefined`.
- **Strings for digits**: `cardLast4` is a string because `0042` as a number becomes `42`. If you'd never do maths on it, it isn't a number.
- **Dates as `"YYYY-MM-DD"`**: zero-padded, sorts correctly, the standard for APIs. Format for display later.
- **`;` vs `,`**: semicolons separate fields in a **type**, commas in an **object** (real data).
- **`export` / `import type`**: share code between files. `../` means up one folder.
- **Mock data and edge cases**: deliberately cover each rule (booked, pending, disputed, too old, tiny amount).
- **`Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" })`**: built-in formatting by **locale**. German uses dot for thousands and comma for decimals, with € after: `1.234,56 €`, plus a non-breaking space (` `).
- **Unit tests (Vitest)**: check one small piece in isolation, like a factory testing the brake pad before it goes in the car. `describe` / `it` / `expect(actual).toBe(expected)`.
- **What TypeScript can't catch**: unique IDs, date formats, wrong maths. Tests fill that gap.

**Interview soundbite**
> "I store all money as integer cents and only format at display time with `Intl.NumberFormat` for the German locale. I learned that the hard way fixing a floating-point pricing bug for a B2B client that needed sub-penny unit prices. My first unit tests immediately caught that I'd forgotten to divide by 100, and one test passed by coincidence on zero, which is a nice reminder that you need several cases, not one."

**Sticky-note shorthand**
`0.1+0.2 ≠ 0.3` · `€19.99 → 1999` · `round once, at the edges` · `1 green test ≠ proof`

**What I found tricky**
- Wrote `Text` instead of `string` (`Text` is a real DOM type, so no error!), `||` instead of `|` for unions, and forgot the `?` for optional.
- Used `;` instead of `,` inside an object.
- Gave every transaction `id: "1"` and wrote `"2026-3-21"`: things TypeScript can't catch.
- `formatMoney`: missing `:` before the return type, a missing `return`, and forgot `/ 100`. The tests caught the last one.
- Thought 5 cents was `0.5` (it's `0.05`), and mixed up German thousands and decimal separators.

---

### Block 3: Components, props and state

**What we built**
Split the page into `TransactionItem` and `TransactionDetail` components, rendered all 6 mock transactions from data with `.map()`, made each card a clickable `<button>` that selects it, showed a details panel for the selected transaction, and wrote `canDispute(transaction, today)` with 5 tests, including boundary tests. 9 tests pass in total.

**Concepts covered**
- **Component**: a reusable piece of UI written as a function that returns JSX, named with a capital letter. Like a conference name-badge template.
- **Props**: the details you feed into a component, like the name on the badge. Described with a props type.
- **Destructuring**: `{ transaction, onSelect }` unpacks values from the props. Anything not unpacked isn't available (like taking only one item out of the parcel).
- **`.map()`**: turns an array of data into an array of components. A production line.
- **Arrow function / callback**: `(t) => t.id === selectedId` is a short function passed into another function (`.map`, `.find`, `onClick`) to be "called back". `t` is just a name I choose.
- **`key`**: a unique ID on each list item so React can tell them apart when the list changes. Cloakroom tickets. Duplicates give a Console warning and mixed-up items.
- **State (`useState`)**: a component's memory. Changing it redraws the page. A scoreboard. Only change it with the setter.
- **Event handlers**: functions passed to `onClick`. Clickable things must be `<button>`s for keyboard and screen-reader users.
- **Lifting state up**: keep state in the closest shared parent (`App`) and pass a function down so children can update it. The family calendar on the fridge.
- **Derived data**: store only the selected ID and work out the full transaction with `.find()`, so they can't get out of sync. A library ticket, not a photocopy.
- **Conditional rendering**: `{x && <Thing />}` shows something only if `x` exists. A ternary `cond ? <A /> : <B />` picks one of two (a fork in the road).
- **`const` / variable vs prop vs constructor**: `const` makes a named box; a prop is a value passed into a component; constructors belong to classes, which we don't use.
- **Scope**: names only exist where they're defined. `today` and `transaction` only exist inside `canDispute`.
- **Pure function**: the output depends only on the inputs, like a calculator. I pass `today` in so tests stay the same forever.
- **Named constant**: `DISPUTE_WINDOW_DAYS = 120` instead of a bare number.
- **Spread (`...`)**: `{ ...base, status: "pending" }` copies an object and changes one field. Photocopy, then tippex one box.
- **Boundary tests and off-by-one errors**: test exactly at the edge (120 days) and just past it (121). That's where `>` vs `>=` bugs hide.
- **Shared CSS class**: reuse styles through a class named for the shared look (`.card`), not by borrowing a class named for something else.
- **Debugging a white screen**: React crashed while drawing, so check the Console first, and the VS Code Problems panel (Cmd+Shift+M).

**Interview soundbite**
> "I keep the selected transaction's ID in state in the parent component and derive the full object from it, so there's a single source of truth. Eligibility is a pure function, `canDispute(transaction, today)`. Passing the date in makes it deterministic to test, and my boundary tests caught an off-by-one where I'd used `>=` instead of `>` on the 120-day window."

**Sticky-note shorthand**
`props in, state inside` · `key = cloakroom ticket` · `store ID, derive rest` · `pass today in` · `test the edges`

**What I found tricky**
- This is where I moved from following to thinking for myself, and it felt like I hadn't learned anything. In fact I wrote most of `TransactionDetail` myself, just with small mistakes.
- Forgot to destructure `onSelect`, forgot imports twice (`Transaction`, `canDispute`), and mangled an import path.
- Used `+` and quotes inside JSX text, as if it were plain JS.
- Bare `return` on its own line returned nothing (white panel), the exact trap I'd been warned about.
- Put a `<section>` inside a `<p>` (invalid HTML), and gave a `<dt>` the whole panel's class.
- Confused `const` with a C# constructor.
- Rule 2: wrote `& ... = !null`. It should be `&&`, `!==`, and a missing field is `undefined`, not `null`. The simplest fix was `if (transaction.disputeReference)`.
- Rule 3: put `ageInDays` outside the function (scope), then flipped between `>=`, `<=` and `>`. Reading each `if` as "when do we refuse?" helped.
- Named the test file `.text.ts`, forgot `.allowed`, and my 121-day test date was actually 119. A failing test can be a bug in the test, not the code.
- The media query cascade bug came back (I put it above the rule it changes).
