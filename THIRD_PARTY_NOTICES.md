# Third-Party Notices

## Quartz upstream

Quartz is the upstream project from Jacky Zhao and contributors: <https://github.com/jackyzha0/quartz>. Its license and attribution are retained in `LICENSE.txt`. This fork does not claim ownership of upstream Quartz code, documentation, or trademarks.

## Dependencies and community plugins

Runtime and development dependencies are listed in `package.json` and locked in `package-lock.json`. Quartz community plugins are configured in `quartz.config.yaml` and pinned in `quartz.lock.json`; each plugin remains subject to its own repository license and attribution requirements.

The upstream `content-index` candidate was removed from this fork's config and lock because its pinned checkout was incomplete and lacked the required `src/emitter.js` entry point during build. It is not replaced by custom code.

## Custom code boundary

Custom source is limited to generic learning UI experiments. No commercial-source learning examples, textbook content, media, models, vault data, or generated build output is distributed by this repository.
