# Contributing to Awaaz

Thanks for considering it. Awaaz is MIT-licensed specifically so any school, NGO, or developer can take it and run it for their own corridor — and so anyone can help make the original better. Nobody edits the live site directly; every change goes through review first. Here's the flow:

## 1. Fork and branch

- Fork this repository to your own GitHub account.
- Create a branch off `main` named for what you're doing, e.g. `add-bengali-translations` or `fix-triage-timer-bug`.

## 2. Make your change

- Run it locally first: `npm install`, then `npm run dev` and open `http://localhost:3000`.
- Keep changes focused. A pull request that does one thing is easy to review; a pull request that does five things sits unreviewed.
- If you're adding a language, `src/data/i18n.ts` is the file to extend — see the existing entries for the shape.
- If you're adding a doctor profile, alert, or circle, the pattern lives in `src/data/`. All of it is illustrative demo data, not a live directory — please keep new entries clearly fictional too, and keep any clinical-sounding content generic and safe (see the note in `src/components/awaaz/clinic-view.tsx`).
- Run `npm run lint` before opening the pull request.

## 3. Open a pull request

- Describe what changed and why in a couple of sentences.
- Screenshots or a short screen recording help a lot for anything visual.
- Link any related issue.

## 4. Review

- A maintainer will review before merging — this is the "reviewed contributions" part of the model. Expect questions or requested changes; that's normal, not a rejection.
- Once approved, it's merged and deployed automatically via the GitHub Actions workflow in `.github/workflows/deploy.yml`.

## What's especially welcome

- New language translations in `src/data/i18n.ts` (the interface currently supports Urdu, Hindi, Bengali, and English, with room for more — Nepali, Tagalog, and Sinhala would extend real coverage of the corridor).
- Accessibility fixes — screen reader labels, contrast, keyboard navigation.
- Adapting the mock data and branding for a different worker corridor entirely. That's not a fork you need permission for — it's the whole point.

## What to avoid

- Real personal data of any kind — real names, real phone numbers, real medical information. Everything in this prototype is simulated by design; keep it that way.
- Anything that would make the app depend on a paid service by default. Free-to-run is a feature, not an accident.

## Questions

Open an issue and tag it `question` — no need to have a fix in hand before you ask.
