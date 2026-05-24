# Using this theme

Add **honkit-plugin-theme-learnj** to your HonKit book and load the theme **last** in the plugins list. Disable HonKit's default theme with `-theme-default`.

## Install from npm

In your book directory (where `book.json` lives):

```bash
npm install honkit honkit-plugin-theme-learnj --save-dev
```

## `book.json`

```json
{
  "title": "My Documentation",
  "plugins": [
    "-theme-default",
    "-search",
    "lunr",
    "highlight",
    "fontsettings",
    "theme-learnj"
  ],
  "pluginsConfig": {
    "theme-learnj": {
      "logoText": "My Project",
      "githubUrl": "https://github.com/your-org/your-repo",
      "showLevel": false
    }
  }
}
```

### Important details

1. **`-theme-default`** — removes the built-in theme so LearnJ can take over.
2. **`-search`** — disable the default search plugin; LearnJ bundles compatible search UI and scripts (avoids a template conflict with custom themes).
3. **`lunr`** — keep the indexer enabled for full-text search.
4. **`theme-learnj`** — load **last** in the plugins list.
5. **`pluginsConfig.theme-learnj`** — optional branding and sidebar settings (see [Configuration](configuration.md)).

## Optional sidebar links

HonKit's `links.sidebar` adds extra entries above the table of contents:

```json
{
  "links": {
    "sidebar": {
      "API reference": "https://example.com/api",
      "Changelog": "https://example.com/changelog"
    }
  }
}
```

## Custom logo

Set `logo` to an image URL (absolute or relative to your book root):

```json
{
  "pluginsConfig": {
    "theme-learnj": {
      "logo": "assets/logo.png",
      "logoText": "My Docs"
    }
  }
}
```

Without a logo, the sidebar shows an **LJ** badge using the primary color.
