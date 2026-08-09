# Security Policy

## Reporting

Do not disclose exploitable vulnerabilities, credentials, private vault data, or copyrighted content in a public issue. Use GitHub's private vulnerability reporting for this repository when available; otherwise contact the repository maintainer privately through the contact method on their GitHub profile.

Include the affected revision, impact, reproduction steps using synthetic data, and a proposed mitigation. Do not include real account tokens or third-party course content.

## Operational guidance

- Treat Markdown, plugins, themes, models, and downloaded assets as untrusted input until reviewed.
- Review changes to `package-lock.json` and `quartz.lock.json`; installation and builds can execute package/plugin code and make network requests.
- Never commit `.env` files, local vaults, browser data, generated sites, caches, or model files.
- Use least-privilege CI credentials. The repository CI has read-only contents permission and does not deploy artifacts.

Only the current default branch is expected to receive security fixes.
