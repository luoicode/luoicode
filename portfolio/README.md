# Huy’s portfolio

A bilingual, statically generated portfolio for Nguyễn Hữu Huy. No install step or runtime dependencies; use Node.js 22 or newer.

```sh
cd portfolio
npm run dev
```

The local preview listens on port 4173. After editing source, run `npm run build` and refresh. `npm run preview` serves the last build; `npm test` checks content, routing, escaping and generated pages. `npm run build` creates `dist/` with both homepages, eight case studies, a 404 page, fonts and images.

## Editing

- `src/content/vi.json` and `en.json`: published information imported from the old site’s public `/api/site` endpoint, captured November 26, 2026.
- `src/render.mjs`: page layouts and interface translations.
- `public/style.css`: responsive light/dark design.
- `public/media/`: original published project images and Huy’s portrait.
- `public/fonts/`: self-hosted Manrope, licensed under the SIL Open Font License (see `OFL.txt`).

This is a new standalone frontend, not the missing source of the old site. It does not recreate its admin/CMS or write to its storage. Information is a checked-in snapshot, so subsequent old-site edits do not sync automatically. No campaign results or metrics have been invented. The GitHub profile README is unchanged.

## Cloudflare

Serve `dist/` as static assets with clean directory URLs. The included `wrangler.jsonc` deliberately uses a **new** Worker name, `huy-portfolio-redesign`, so deployment cannot silently overwrite the existing portfolio. From this directory, build, then deploy using an authenticated, supported Wrangler installation. No deployment has been performed by this change. Review the design before changing production routes or the existing Worker.

Vietnamese is at `/`, English at `/en/`, with localized case pages at `/work/:slug/` and `/en/work/:slug/`. Navigation and project stories work without JavaScript. JavaScript adds filtering, theme persistence and mobile navigation. There are no trackers, third-party scripts, remote fonts or contact-form backends; contact links use Huy’s published email and phone.
