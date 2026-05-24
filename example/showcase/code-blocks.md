# Code blocks

Code fences are rendered as **shadcn-style panels** (inspired by [shadcnblocks code-example6](https://www.shadcnblocks.com/block/code-example6)): a card shell with a language label, **Copy** button, and a dark syntax-highlighted editor area.

The **highlight** plugin provides syntax highlighting for fenced code blocks.

## JavaScript

```javascript
const book = {
  title: "My Docs",
  plugins: ["-theme-default", "theme-learnj"],
};

function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("HonKit"));
```

## TypeScript

```typescript
interface ThemeConfig {
  logoText?: string;
  githubUrl?: string;
  showLevel?: boolean;
}

const config: ThemeConfig = {
  logoText: "LearnJ",
  showLevel: false,
};
```

## Shell

```bash
npm install honkit-plugin-theme-learnj --save-dev
npx honkit build
npx honkit serve
```

## JSON (`book.json`)

```json
{
  "plugins": ["-theme-default", "theme-learnj"],
  "pluginsConfig": {
    "theme-learnj": {
      "logoText": "LearnJ Workshop"
    }
  }
}
```

## Inline code

Use `npm run build:css` at the theme root to rebuild Tailwind output after editing `src/learnj.css`.

## Line numbers

HonKit highlight supports line numbers when configured in `pluginsConfig.highlight` (see HonKit highlight plugin docs).
