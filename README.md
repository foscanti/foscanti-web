# foscanti-web

Michael Moss's professional website, built with Next.js (App Router) and Tailwind CSS.

## Palette

| Color | Hex |
| --- | --- |
| White | `#FFFFFF` |
| Navy | `#002B7F` |
| Cream | `#FDF6C7` |
| Rose | `#D39F9F` |
| Teal | `#00C2CB` |

Colors are defined as CSS variables/Tailwind theme tokens in `src/app/globals.css` (`navy`, `cream`, `rose`, `teal`, `white`).

## Structure

- `src/app/page.tsx` — Home
- `src/app/about/page.tsx` — About (profile, skills, experience, education, interests)
- `src/app/contact/page.tsx` — Contact
- `src/lib/experience.ts` — CV-sourced content (experience, education, skills)
- `src/components/` — Shared `NavBar` and `Footer`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Build

```bash
npm run build
npm start
```
