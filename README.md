# Quartz German Learning Lab

> “[One] who works with the door open gets all kinds of interruptions, but [they] also occasionally gets clues as to what the world is and what might be important.” — Richard Hamming

This repository is a clean fork/customization of [Quartz](https://github.com/jackyzha0/quartz), originally created by Jacky Zhao. It keeps Quartz as the upstream site generator and adds a small, generic German-learning UI experiment: an optional browser speech reader for German text.

## Scope and content policy

This repository contains source code and configuration only. It does not include course content, textbook page images, extracted text/OCR/geometry bundles, models, generated websites, or other library assets. Do not add commercial-source examples or references unless you have documented redistribution rights.

## Setup

Requirements: Node.js 22 or newer and npm 10.9 or newer.

```bash
npm ci
npm run check
npm test
npm run quartz -- build
```

Place only original or properly licensed Markdown in `content/` before building. The folder is intentionally absent and no local vault is configured. `public/` and Quartz caches are local build artifacts.

Keep upstream Quartz attribution when redistributing this fork. No publisher endorsement is implied.

## Dependencies and models

`npm ci` downloads the exact JavaScript dependencies recorded in `package-lock.json`. Configured Quartz community plugins are fetched from the sources pinned in `quartz.lock.json` during the build/install process. Review both lockfiles before allowing network access.

No model files or model-dependent features are included. Keep package caches, `.quartz/`, `quartz/.quartz-cache/`, `public/`, and other generated output local. CI validates a build but does not upload or publish it.

See [NOTICE.md](NOTICE.md) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for provenance and attribution boundaries. See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution checks.

[Join the Discord Community](https://discord.gg/cRFFHYye7t)

## Sponsors

<p align="center">
  <a href="https://github.com/sponsors/jackyzha0">
    <img src="https://cdn.jsdelivr.net/gh/jackyzha0/jackyzha0/sponsorkit/sponsors.svg" />
  </a>
</p>
