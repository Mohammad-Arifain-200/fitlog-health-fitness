# 🏋️ FitLog — Workout Library

FitLog is a dark, responsive workout-library application built with **Next.js App Router** and **Tailwind CSS**. Users can browse 12 exercises from the provided FitLog API, open a workout details page, build a five-lift plan for today, save workouts for later, mark planned workouts as done, and remove items from either list.

## 🌐 API

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

## 🛠 Technologies Used

- Next.js (App Router)
- React
- Tailwind CSS
- Lucide React icons
- React Hot Toast
- Browser `localStorage`

## ✨ Key Features

1. Responsive workout library with all 12 API exercises in a desktop 3×4 grid.
2. Dynamic workout detail pages with specs, instructions, and workout imagery.
3. Today's Plan with live Exercise, Minutes, and Calories metrics.
4. Saved workouts with navbar Plan/Saved counters that update immediately.
5. Toast notifications for add, save, mark-as-done, and remove actions.
6. Sort My Plan entries by Duration, Calories, or Rating.
7. Persistent Plan/Saved data using `localStorage`.
8. Five-workout cap for Today's Plan.
9. Loading states for API requests and a custom 404 page.
10. Responsive layout for mobile, tablet, and desktop.

## 🚀 Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

For a production check:

```bash
npm run build
npm start
```

## 📁 Main Routes

- `/` — Workout library and hero section
- `/workout/[id]` — Workout details
- `/my-plan` — Today's Plan and Saved tabs
- Any invalid route — Custom 404 page

## 💾 Persistence

Today's Plan and Saved workout IDs are stored in browser `localStorage`, so they remain after reloading the page.

## ☁️ Deployment

The project is compatible with Vercel. Import the GitHub repository into Vercel and deploy with the default Next.js settings. Dynamic workout routes are handled by Next.js, so refreshing a deployed details page does not require SPA redirect rules.

## 🎨 Design

The interface follows the supplied FitLog Figma/Penpot reference: dark `#0c0d10` background, `#15171d` panels, neon `#c2f800` accent, Oswald display headings, compact cards, highlighted active navigation, and the provided FitLog logo and hero illustration.
