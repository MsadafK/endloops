# Endloops

A responsive, single-page marketing site for Endloops, an accounting and audit workflow automation company based in Dubai. The site introduces its audience, solutions, and tools, and lets visitors explore a sample bank reconciliation before requesting a demo.

## Features

- Interactive sample reconciliation: review the two flagged items and sign off with reviewer initials.
- Light and dark themes, with the selected theme saved in the browser.
- Responsive navigation and page sections for audiences, capabilities, solutions, tools, and process.
- Client-side demo-request form with field validation and an example success state.
- Custom SVG illustrations and reduced-motion support.

## Requirements

- Node.js 18 or later
- npm

## Getting started

From the project directory, install dependencies and start the development server:

```bash
npm install
npm run dev
```

Vite prints the local URL in the terminal (typically <http://localhost:5173>). The server supports hot reloading while you edit the app.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local Vite development server. |
| `npm run build` | Create the production site in `dist/`. |
| `npm run preview` | Serve the production build locally for a final check. Run `npm run build` first. |

## Project structure

```text
public/
  logo.png                 Site logo
src/
  App.jsx                  Page composition
  Header.jsx               Navigation and theme toggle
  Hero.jsx                 Introduction and interactive reconciliation
  Sections.jsx             Audience, capabilities, solutions, and process
  Contact.jsx              Demo-request form
  Footer.jsx               Footer and Dubai skyline
  data.js                  Shared copy and sample reconciliation data
  ui.jsx                   Shared UI components and interaction hooks
  index.css                Theme tokens, styles, and animations
  main.jsx                 React entry point
  art/                     Hand-built SVG illustrations
index.html                 HTML shell, metadata, and font loading
```

## Editing the site

- Update copy, audience descriptions, solution/tool lists, and reconciliation rows in `src/data.js`.
- Adjust the page layout and content in the corresponding section components under `src/`.
- Change theme colors, typography, and motion styles in `src/index.css` and `tailwind.config.js`.
- Replace the logo at `public/logo.png` and illustrations in `src/art/` as needed.

The page uses Newsreader, Hanken Grotesk, and IBM Plex Mono from Google Fonts, with local system-font fallbacks. Loading the hosted fonts requires an internet connection.

## Contact form and sample content

The demo-request form validates its fields in the browser and displays a simulated success message; it does **not** send or store submissions. Connect it to an approved form provider or backend before using the site to collect real requests. The reconciliation is sample data for demonstration only. Confirm all product descriptions and claims before publishing.

## Production build and deployment

Build the static site with:

```bash
npm run build
```

The generated files are written to `dist/`. Deploy that directory with a static hosting provider such as Vercel, Netlify, or GitHub Pages. For Vercel or Netlify, use `npm run build` as the build command and `dist` as the output directory.

### GitHub Pages

The repository includes a GitHub Actions workflow that builds and deploys `dist/` whenever code is pushed to `main`. In the repository's **Settings → Pages**, set the build and deployment source to **GitHub Actions**. The Vite base path is configured for the `https://<user>.github.io/endloops/` project site.
