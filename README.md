# SV OG Rheine – Vereinswebsite

Website des Vereins für Deutsche Schäferhunde (SV) e.V. – Ortsgruppe Rheine.

**Stack:** Next.js 15 (App Router, statischer Export nach `out/`) + [Decap CMS](https://decapcms.org) unter `/admin/`. Keine Datenbank, kein Server: Inhalte liegen als Markdown/YAML im Repo, jede Änderung im CMS erzeugt einen Git-Commit und löst einen neuen Build aus.

## Entwicklung

```bash
npm install
npm run dev      # Entwicklungsserver auf http://localhost:3000
npm run build    # statischer Export nach out/
```

## Inhalte

| Pfad | Inhalt |
| --- | --- |
| `content/berichte/*.md` | News-Berichte (Frontmatter: `title`, `date`, `teaser`, `image`) |
| `content/seiten/*.md` | Statische Seiten: Vorstand, Mitglieder, Prüfungen, Impressum, Datenschutz |
| `content/termine.yml` | Terminkalender (Jahr + Liste) |
| `content/galerie.yml` | Galerie-Bildliste |
| `public/uploads/` | Medienordner des CMS |

Der Content-Layer (`lib/content.ts`) liest diese Dateien beim Build mit gray-matter, js-yaml und marked.

## Design

Dunkelgrün (`#16361f` / `#24532f`) mit Messing-Akzent (`#a8842c`). Schriften: Archivo Variable (Überschriften/UI) und Source Serif 4 Variable (Fließtext), selbst gehostet via @fontsource — kein Google-Fonts-CDN (DSGVO).

## CMS-Login (DecapBridge)

Das CMS unter `/admin/` nutzt [DecapBridge](https://decapbridge.com) für den Redakteurs-Login (kein GitHub-Account nötig):

1. Account auf [decapbridge.com](https://decapbridge.com) anlegen.
2. Dort eine neue Site erstellen und mit dem GitHub-Repo `sergejma/sv-og-rheine` verknüpfen.
3. Die von DecapBridge angezeigte `identity_url` in `public/admin/config.yml` beim Feld `identity_url:` eintragen (ersetzt den Platzhalter `DECAPBRIDGE_IDENTITY_URL`).
4. Redakteure im DecapBridge-Dashboard per E-Mail einladen — sie erhalten einen Einladungslink und setzen sich ein Passwort.

Danach ist das CMS unter `https://<domain>/admin/` erreichbar; Änderungen werden als Commits ins Repo geschrieben und lösen automatisch einen neuen Build aus.

Zum lokalen Testen des CMS ohne Login: in `public/admin/config.yml` die Zeile `# local_backend: true` einkommentieren und `npx decap-server` parallel zu `npm run dev` starten (`http://localhost:3000/admin/`).

## Deployment (Netlify)

- Build command: `npm run build`
- Publish directory: `out`

Jeder Push auf `main` (auch durch CMS-Commits) baut die Seite neu.
