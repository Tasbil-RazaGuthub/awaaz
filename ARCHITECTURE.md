# Architecture

A map of how Awaaz is put together, for anyone contributing to this repo or forking it for a different corridor.

## The shape of it

Awaaz is a static, client-only app: no backend, no database, no server-side logic. Everything a user sees comes from data files bundled at build time, held in memory via a small state store, and rendered by React. That's a deliberate choice, not a limitation — see [Why no backend](#why-no-backend-right-now) below.

Four screens carry the whole product, plus a shell that wraps them:

| Pillar | Screen | File |
|---|---|---|
| Prevent | Home | `src/components/awaaz/home-view.tsx` |
| Access | Clinic | `src/components/awaaz/clinic-view.tsx` |
| Support | Circles | `src/components/awaaz/circles-view.tsx` |
| Prevent (education) | Academy | `src/components/awaaz/academy-view.tsx` |
| Cross-cutting | Data | `src/components/awaaz/data-view.tsx` |
| — | Shell / nav | `src/components/awaaz/app-shell.tsx` |
| — | Voice visual | `src/components/awaaz/waveform.tsx` |

`app-shell.tsx` renders the header, language switcher, bottom/top navigation, and the honesty-layer footer, then shows whichever of the five views is active. There's only one real route (`/`) — switching screens is a state change, not a page navigation, which is why there's no routing library in the stack.

## State

`src/lib/awaaz-store.ts` is a small Zustand store holding two things: the active tab (which of the five views is showing) and the selected language. Any component can read or set either. There's nothing more stateful than that — no auth session, no server cache, no query client wired to real endpoints.

## Data layer — and the contract a real backend would need to meet

Everything under `src/data/` is static, hand-written TypeScript, imported directly into components like any other module. Each file exports its own interfaces:

| File | Exports |
|---|---|
| `doctors.ts` | `Doctor`, `ConsultTurn` |
| `triage.ts` | `TriageOption`, `TriageRoute` (`"self-care" \| "tele-consult" \| "in-person"`), `TriageResult` |
| `circles.ts` | `CircleRoom`, `CircleMessage` |
| `academy.ts` | `Lesson`, `LessonStep`, `Quiz`, `BadgeData` |
| `persona-alerts.ts` | `Persona`, `HealthAlert`, `Severity` (`"high" \| "medium" \| "low"`) |
| `stats.ts` | dashboard numbers, typed inline |
| `i18n.ts` | `LangStrings` and the per-language string tables |

This matters beyond just "where's the data": these interfaces are the closest thing this project has to an API spec. If a fork ever adds a real backend — real doctor availability, a real triage service, a real message store — the fastest path is making that backend return data shaped like these interfaces, so the components above them don't need to change at all. Treat `src/data/*.ts` as the contract; swap what's behind it, not what's above it.

## Localization

`src/data/i18n.ts` defines `LangStrings` and one entry per supported language (currently nine, including right-to-left languages, resolved via the store's language field and applied through `dir` attributes in `app-shell.tsx`). Today that mechanism covers navigation, headings, and chrome — not the alert text, consult dialogue, or circle messages inside the other data files, which are written per-language by hand where they exist at all. Worth knowing before assuming "add a language" is a one-file change.

## Why no backend, right now

Three reasons, on purpose:

1. **Cost.** Static hosting on GitHub Pages is free and has no server to maintain. A backend would mean somebody paying for it.
2. **Honesty.** The app is explicit on-screen that doctor profiles, triage routing, and conversations are simulated. A real backend implies real doctors, real licensing, and real clinical validation — none of which exists yet, and pretending otherwise would be worse than a clearly-labeled prototype.
3. **Portability.** Anyone forking this for their own corridor should be able to run it by cloning and pushing, not by standing up infrastructure first.

See [SECURITY.md](./SECURITY.md) for how that changes once a fork does add a real backend or real user data.

## Build and deploy

Next.js in static-export mode (`output: "export"` in `next.config.ts`), which produces plain HTML/CSS/JS in `out/`. `next.config.ts` reads `GITHUB_REPOSITORY` at build time so the site works under `you.github.io/repo-name` without hardcoding a path. The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and deploys on every push to `main`. Full setup steps are in [README.md](./README.md).