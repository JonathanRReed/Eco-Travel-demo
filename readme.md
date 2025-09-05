# Nomadiq Travel Destinations

A student demo website themed around eco-friendly travel. Built for the University of Texas at Dallas Global Career Accelerator Program as a front-end practice project.

- Program: The UT Dallas Global Career Accelerator (in partnership with Podium Education)
  - Learn more: https://www.podium.utdallas.edu/

This project showcases modern, accessible, and responsive web design without external JS frameworks. It emphasizes sustainability, dark mode, a11y, and clean UX.

## Features

- Dark mode with accessible theme toggle, system preference detection, and persistence
- Responsive layout (mobile-first) with breakpoints at 600px and 1024px
- Semantic HTML5, ARIA attributes, and robust focus-visible styles
- SVG icon system (leaf brand mark, sun/moon toggle, card icons, arrow-up)
- Enhanced navigation UX: animated underline for hover/active and scroll-based active link
- Mobile nav: toggle button, closes on link click, and Escape-to-close
- Contact form with accessible client-side validation and live status messaging
- Back-to-top button with reduced-motion support
- Performance-friendly: no frameworks, minimal dependencies
- Eco-themed color system and typography via CSS variables

## Getting Started

1. Clone or download this repository
2. Open `index.html` in your browser

No build steps required. All assets are local and CDN-hosted images are embedded by URL.

## Project Structure

```
/ (root)
├─ index.html        # Main page markup + inline SVG sprite
├─ styles.css        # CSS variables, layout, theming, and components
├─ script.js         # Nav toggle, theme toggle, smooth scroll, validation, back-to-top
├─ Assets/
│  └─ Favicon.png    # App icon used for favicon and touch icon
└─ readme.md         # This file
```

## Accessibility

- Honors `prefers-reduced-motion`
- Keyboard accessible: focus-visible outlines and Escape-to-close on mobile menu
- Sufficient color contrast in light and dark themes (WCAG-focused)
- Inline SVG icons include `aria-hidden="true"` and accessible labels where needed
- Form includes `aria-live` region for validation feedback and `aria-invalid` updates

## Customization

- Hero overlay image: controlled via the CSS var `--hero-image` in `styles.css`
- Color system: adjust CSS variables in `:root` and `html[data-theme="dark"]`
- Icons: extend the SVG sprite in `index.html` and reference with `<use href="#icon-id">`

## Attributions

- University of Texas at Dallas — Global Career Accelerator (Podium Education)
  - https://www.podium.utdallas.edu/
- Images via Unsplash (for demo purposes)

## License / Use

This is an educational, non-commercial student project created as a demo. Feel free to reuse for learning purposes with attribution. Replace images and text before any public or commercial deployment.

## Notes

- No backend is included. The contact form demonstrates client-side validation only.
- If you deploy, ensure all external image URLs are allowed by your hosting provider and consider local assets for reliability.
