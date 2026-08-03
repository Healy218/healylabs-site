# Healy Labs — Landing Page

A responsive static site for [healylabs.lol](https://www.healylabs.lol/), designed around the neon-green Healy Labs matrix logo.

## Local preview

Serve the repository with any static file server, then open `index.html` through that server.

## Structure

```text
healylabs-site/
├── index.html
├── assets/
│   ├── healy-labs-logo.png
│   ├── healy-labs-logo-white.png
│   ├── og.png
│   └── og-white.png
├── css/
│   └── styles.css
└── js/
    └── main.js
```

## Design system

- Syne for display typography and DM Mono for interface text
- Near-black surfaces with acid-green identity accents
- Four-screen tab navigation: Home, Lab, Social, and Merch
- Accessible dark/light theme control with saved preference
- Responsive layouts at desktop, tablet, and mobile widths
- Motion respects `prefers-reduced-motion`

## Deployment

The site has no build step or runtime dependencies. Deploy the repository root to any static host, including Netlify, Vercel, or GitHub Pages.
