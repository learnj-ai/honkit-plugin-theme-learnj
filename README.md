# honkit-plugin-theme-learnj

LearnJ HonKit theme built with **Tailwind CSS** and **shadcn/ui** design tokens.

## Install

```bash
npm install honkit-plugin-theme-learnj --save-dev
```

## Live demo

The [example book](example/) is published on every push to `main`:

**https://learnj-ai.github.io/honkit-plugin-theme-learnj/**

Run it locally:

```bash
npm run example:install
npm run example:serve
```

See [example/getting-started/using-the-theme.md](example/getting-started/using-the-theme.md) for full setup instructions (also rendered in the demo site).

### GitHub Pages

1. In the repository, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main`; the [pages workflow](.github/workflows/pages.yml) builds `example/` and deploys `example/_book`.

## Usage

In your book's `book.json`:

```json
{
  "plugins": [
    "-theme-default",
    "-search",
    "lunr",
    "highlight",
    "theme-learnj"
  ],
  "pluginsConfig": {
    "theme-learnj": {
      "logo": "https://raw.githubusercontent.com/learnj-ai/learnj/main/image.png",
      "logoText": "LearnJ Workshop",
      "githubUrl": "https://github.com/learnj-ai/workshops",
      "showLevel": false
    }
  }
}
```

Load `theme-learnj` **last** in the plugins array. Disable the default theme with `-theme-default`.

## Configuration

| Option | Type | Description |
|--------|------|-------------|
| `logo` | string | Logo image URL for sidebar |
| `logoText` | string | Sidebar title (default: book title) |
| `githubUrl` | string | GitHub link in sidebar footer |
| `showLevel` | boolean | Show chapter level numbers in TOC |

### Slide decks (reveal.js)

Add [reveal.js](https://revealjs.com/) slide decks (Dracula theme in the example) as static `slides/*.html` pages and link them from `links.sidebar` or from a Markdown page that points to the deck. See [example/getting-started/slides.md](example/getting-started/slides.md).

### Search

Disable the default `search` plugin (`-search`) and enable `lunr`. The theme ships search UI and scripts (from [gitbook-plugin-search](https://github.com/GitbookIO/plugin-search), Apache-2.0) so custom themes avoid template inheritance conflicts.

## Development

```bash
git clone https://github.com/learnj-ai/honkit-plugin-theme-learnj.git
cd honkit-plugin-theme-learnj
npm install
npm run build:css
npm run watch   # optional: rebuild CSS on change
```

To test locally in a HonKit book:

```bash
npm link
cd /path/to/your/book
npm link honkit-plugin-theme-learnj
```

Or run the included example from this repository:

```bash
cd example && npm install && npm run serve
```

## shadcn / Tailwind

HonKit renders static HTML, so this theme uses shadcn's **design tokens and utility patterns** (`learnj-btn`, `learnj-nav-link`, etc.) rather than React components.

Customize colors in `src/learnj.css` (`:root` / `.dark` variables), then run `npm run build:css`.

## Publishing

```bash
npm login
npm run build
npm publish
```

The `prepublishOnly` hook rebuilds CSS before each publish.

## License

MIT
