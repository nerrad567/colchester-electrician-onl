# Colchester Electrician Landing Page - AI Coding Instructions

## Project Overview
Static landing page for Gray Logic Electrical, a Colchester-based electrician business. Single-page HTML with retro terminal aesthetic, dual theme support, and no analytics/tracking.

## Architecture & Structure

**Single-page static site**
- [index.html](../index.html): Complete semantic HTML5 structure with sections for hero, services, approach, area, contact
- [assets/css/style.css](../assets/css/style.css): Single stylesheet with CSS custom properties for theming
- [assets/js/main.js](../assets/js/main.js): Vanilla JS for theme toggle, smooth scroll, year update
- [CNAME](../CNAME): GitHub Pages custom domain configuration (`colchester.electrician.onl`)

## Design System

**Theme implementation**
- Dual theme controlled via `data-theme="dark|light"` attribute on `<html>`
- CSS custom properties defined in `:root` and `:root[data-theme="light"]` (see [style.css](../assets/css/style.css#L1-L18))
- Theme persists to `localStorage` with namespaced key `colchester-theme` to avoid conflicts
- Toggle button updates icon (🌙/☀️) and label text ("Dark mode"/"Light mode")

**Visual language**
- Retro terminal aesthetic with monospace fonts (`var(--font-mono)`)
- Scanline overlay effect via `.shell-overlay` with 2px repeating gradient (opacity: 0.2 dark, 0.08 light)
- Radial gradients for depth: dark themes use `#15151f → #050506 → #000`, light uses `#ffffff → #e5e7eb → #d1d5db`
- Status dots (`.dot--red`, `.dot--amber`) use radial gradients to simulate LED appearance
- Accent color: `--accent: #e11d48` (deep red) with semi-transparent variants for backgrounds

**Layout patterns**
- Maximum width: `--max-width: 960px` (or `75vw` on screens ≥960px)
- Main shell container: `.shell` with border, shadow, and background gradient
- Responsive grid: `.grid-3` collapses to 2 columns at 820px, 1 column at 640px
- Border colors: `--border` for prominent, `--border-soft` for subtle (see [area tags](../assets/css/style.css#L505-L515))

## Component Patterns

**Cards** ([style.css](../assets/css/style.css#L389-L425))
- Standard: `.card` with gradient background and border
- Step cards: `.card-step` with `.step-number` positioned absolutely in top-right

**Buttons** ([style.css](../assets/css/style.css#L264-L312))
- `.btn-primary`: Gradient background (#f97373 → var(--accent)) with red glow shadow in dark theme
- `.btn-ghost`: Transparent with border, minimal hover state
- `.btn-full`: Full-width variant for contact CTAs
- Light theme `.btn-primary` is inverted: solid black (#111827) background

**Terminal strip** ([style.css](../assets/css/style.css#L448-L470))
- Code-style presentation with header comment and `<pre><code>` block
- Used in "approach" section to display contact information

**Typography**
- Section titles: 0.95rem, uppercase, letter-spacing 0.16em
- Card titles: 0.85rem, uppercase, letter-spacing 0.14em
- Body text: 0.82-0.87rem with `--muted` color
- Hero title: 1.95rem main + 1rem uppercase accent line

## JavaScript Functionality

**Theme toggle** ([main.js](../assets/js/main.js#L23-L62))
- `applyTheme(theme)`: Sets `data-theme` attribute, updates localStorage, changes button text/icon
- `initTheme()`: On load, checks localStorage → current attribute → defaults to "dark"
- Key namespace: `colchester-theme` prevents conflicts with other electrician.onl sites

**Smooth scroll** ([main.js](../assets/js/main.js#L11-L22))
- Intercepts clicks on `a[href^="#"]` links
- Uses `scrollIntoView({ behavior: "smooth", block: "start" })`

**Year update** ([main.js](../assets/js/main.js#L5-L8))
- Dynamically sets current year in footer `<span id="year">`

## Content Structure

**Services section** ([index.html](../index.html#L123-L171))
- 3-column grid of service cards: Testing/consumer units, Faults/repairs, EV/lighting/CCTV
- Each card has title, body paragraph, and bulleted list

**Contact section** ([index.html](../index.html#L253-L288))
- `.section-accent` styling with red-tinted gradient background
- 2-column grid: description + contact actions
- Phone: `tel:01206699789`, Email: `mailto:info@graylogic.uk`, External form link

**Related sites** ([index.html](../index.html#L103-L121))
- graylogic.uk (main business), electrician.onl (portfolio), terminal.electrician.onl (interactive CV)
- All external links use `target="_blank" rel="noreferrer"`

## Deployment

**GitHub Pages**
- Hosted at `colchester.electrician.onl` via [CNAME](../CNAME) file
- No build step required - plain HTML/CSS/JS served directly
- No tracking, analytics, or external dependencies

## Editing Guidelines

**When adding/editing content:**
- Maintain semantic HTML5 structure with proper ARIA labels
- Keep text concise and practical (reflects electrician's straightforward communication style)
- Use uppercase + letter-spacing for titles/badges to maintain terminal aesthetic
- Include both dark and light theme overrides when adding new styled components

**When modifying CSS:**
- Use CSS custom properties for colors - never hardcode colors outside `:root` blocks
- Test both themes - light theme overrides start at [style.css](../assets/css/style.css#L592)
- Maintain consistent spacing units (0.35rem, 0.4rem, 0.5rem increments)
- Preserve monospace font family for all text

**When updating JavaScript:**
- Avoid external libraries - keep vanilla JS for simplicity
- Wrap in IIFE to prevent global pollution
- Use `localStorage.setItem/getItem` with `colchester-theme` namespace for persistence

## Testing Checklist
- Both dark/light themes render correctly
- Smooth scroll works for all section anchors (#services, #approach, #area, #contact)
- Theme preference persists across page reloads
- Phone/email links function on mobile devices
- Responsive breakpoints (820px, 640px) collapse grids appropriately
