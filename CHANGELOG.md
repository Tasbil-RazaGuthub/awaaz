# Changelog

All notable changes to this project are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); this project doesn't yet follow strict semantic versioning (see [ARCHITECTURE.md](./ARCHITECTURE.md) for why formal releases are premature at this stage) — version numbers here just mark meaningful milestones.

## [Unreleased]

## [0.2.0] - 2026-09-15

### Added
- Full content localization: all 384 user-facing strings — alerts, triage prompts, consult dialogue, circle messages, academy lessons, dashboard labels — now run through a proper keyed translation system (`src/i18n/`), replacing the old navigation-only localization
- `scripts/merge-translation.ts`: a CLI (via a new lightweight `tsx` dev dependency) for validating, merging, and checking translation coverage, so a new language can be added by translating a template file rather than editing code
- `TRANSLATIONS.md`, documenting the translation workflow for contributors and translators

### Changed
- Footer disclosure updated from "partially localized" to accurately reflect full localization, across all 9 languages
- Repository is now public

## [0.1.0] - 2026-09-08

### Added
- Initial Awaaz prototype: Home, Clinic, Circles, Academy, and Data screens
- Nine-language interface (English, Urdu, Hindi, Bengali, Arabic, Nepali, Punjabi, Sindhi, Pashto) with right-to-left layout support
- Voice-first triage and consult flow, culture- and language-matched doctor directory, moderated peer circles with crisis escalation, and an open anonymized data dashboard
- Static export build, configured for free hosting on GitHub Pages with automatic base-path detection
- GitHub Actions workflow for automatic build and deploy on every push to `main`
- Project documentation: README, CONTRIBUTING, CODE_OF_CONDUCT, LICENSE (MIT), ARCHITECTURE, SECURITY
