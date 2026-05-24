# Configuration

All theme options live under `pluginsConfig.theme-learnj` in `book.json`.

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `logo` | string | — | Image URL for the sidebar header |
| `logoText` | string | book `title` | Text next to the logo |
| `githubUrl` | string | — | Adds a **View on GitHub** link in the sidebar footer |
| `showLevel` | boolean | `false` | Show chapter level numbers in the TOC |

## Example

This demo book uses:

```json
{
  "pluginsConfig": {
    "theme-learnj": {
      "logo": "https://raw.githubusercontent.com/learnj-ai/learnj/main/image.png",
      "logoText": "LearnJ Theme",
      "githubUrl": "https://github.com/learnj-ai/honkit-plugin-theme-learnj",
      "showLevel": false
    }
  }
}
```

## Show chapter levels

When `showLevel` is `true`, each TOC entry can display its HonKit level as a small badge:

```json
{
  "pluginsConfig": {
    "theme-learnj": {
      "showLevel": true
    }
  }
}
```

## Customizing colors

The theme uses CSS variables compatible with shadcn/ui. Edit `src/learnj.css` in the theme package (`:root` and `.dark`), then run:

```bash
npm run build:css
```

Published npm releases include pre-built `_assets/website/learnj.css`; consumers do not need Tailwind unless they fork the theme.

## Search

Use `-search` and `lunr` instead of the default `search` plugin. The theme provides search markup and assets; `lunr` builds the index.

```json
{
  "plugins": ["-theme-default", "-search", "lunr", "theme-learnj"]
}
```

## Compatible plugins

| Plugin | Purpose |
| ------ | ------- |
| `lunr` | Search index (pair with `-search`) |
| `highlight` | Syntax highlighting in code fences |
| `fontsettings` | Font size / family controls (optional) |

Load `theme-learnj` **last** in the plugins array.
