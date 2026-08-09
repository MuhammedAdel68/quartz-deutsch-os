# Contributing

This repository is a customization of [Quartz](https://github.com/jackyzha0/quartz). Preserve the original copyright notices, attribution, repository metadata, and `LICENSE.txt` when modifying or redistributing it. Clearly distinguish upstream Quartz work from Deutsch OS changes.

## Content and provenance

- Submit source code, configuration, documentation, and small original test fixtures only.
- Do not commit a local vault or `content/`, even if individual notes appear harmless.
- Do not commit commercial course material, textbook pages, audio, video, OCR, extracted text, answer keys, geometry/annotation data, or derived datasets without documented redistribution permission.
- Do not commit `public/`, `.quartz/`, `quartz/.quartz-cache/`, dependency caches, downloaded models, or other generated/local files.
- Record the source and license of every new dependency, plugin, font, model, or downloaded asset in the pull request. Do not assume that access implies redistribution rights.

## Checks

Use Node.js and npm versions compatible with `package.json`, then run:

```bash
npm ci
npm run check
npm test
npm run quartz -- build -d docs
```

The build may download dependencies, configured plugins, fonts, or models depending on the enabled features. Review those network dependencies before running in a sensitive environment. Inspect the change set before submitting it and confirm that no private notes, credentials, caches, or generated output are included.
