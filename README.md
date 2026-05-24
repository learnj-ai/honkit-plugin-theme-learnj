# honkit-plugin-theme-learnj

LearnJ HonKit theme built with **Tailwind CSS** and **shadcn/ui** design tokens.

## Install

```bash
npm install honkit-plugin-theme-learnj --save-dev
```

## Usage

In your book's `book.json`:

```json
{
  "plugins": [
    "-theme-default",
    "theme-learnj"
  ],
  "pluginsConfig": {
    "theme-learnj": {
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
