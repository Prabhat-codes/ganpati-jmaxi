# JMAXI Ganpati Utsav

## About

The event website for Ganpati Utsav 2026, run by JMAXI, the Jai Maharashtra Association of XLRI. It is for students and the campus community. It shows the schedule and dress codes, an aarti booklet with a PDF copy, a pronunciation guide, photos from earlier celebrations, a guide to well-known mandaps in Mumbai and Pune, and a small Modak catcher game. A countdown runs before the event and a thank-you message appears after it.

**Tech stack:** React, Vite, lucide-react, canvas-confetti and plain CSS. Linting with Oxlint.

**Live site:** https://ganpati-jmaxi.vercel.app (also at https://prabhat-codes.github.io/ganpati-jmaxi/)

## Run

You need Node.js 22.12 or newer.

```
npm install
npm run dev
```

| Command | What it does |
|---|---|
| `npm run dev` | Starts the local site |
| `npm run build` | Builds the site into `dist/` |
| `npm run lint` | Checks the code |

Pushing to `main` deploys the site.

## Change the content

- Schedule, aartis, mandaps, photos and pronunciation: `src/data/`
- Event start and end times: the top of `src/components/Hero.jsx`
- Images and the aarti PDF: `public/`
