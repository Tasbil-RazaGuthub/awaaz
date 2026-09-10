# Security Policy

## Current risk profile

Awaaz, as it stands in this repository, is a static prototype: no backend, no database, no authentication, and no real user data of any kind (see [ARCHITECTURE.md](./ARCHITECTURE.md)). Doctor profiles, triage routing, and conversations are all simulated demo content, hardcoded at build time. That naturally puts a low ceiling on what a "vulnerability" in this codebase could actually affect today — there's no account to take over and no real personal data to expose. This section will be rewritten the day that changes, i.e. the day a fork adds a real backend, real accounts, or real health data.

## What's still in scope

Even a static site can have real issues worth reporting responsibly:

- Cross-site scripting or injection through any user-facing input
- A dependency with a known vulnerability (`npm audit` is run on this repo's dependencies periodically, but a fresh pair of eyes is always welcome)
- Anything that could make the "this is simulated" labeling misleading or easy to strip out — given the subject matter, content that could be mistaken for real medical guidance is treated as a security-adjacent issue, not just a bug
- Anything in the GitHub Actions deployment workflow that could be abused (e.g. a pull request that tries to exfiltrate secrets through the build)

## Reporting a vulnerability

Please don't open a public GitHub issue for anything above. Use GitHub's private reporting instead: go to the **Security** tab on this repository, then **Report a vulnerability**. That opens a private draft advisory visible only to maintainers until there's a fix, rather than broadcasting an unpatched issue.

If private reporting isn't enabled when you look (repo setting, not something a reporter controls), open a regular issue titled vaguely (e.g. "security question") with no technical detail, and a maintainer will follow up privately to get specifics.

## What to expect

This is a solo-maintained student project, not a company with an SLA. Reports will get a real response, but "within 24 hours" isn't a promise I can make honestly. Confirmed issues will be fixed and credited (unless you'd rather stay anonymous) once addressed.

## Supported versions

Only the current `main` branch is maintained. There's no older release line to patch yet — see [CHANGELOG.md](./CHANGELOG.md) for what's shipped so far.