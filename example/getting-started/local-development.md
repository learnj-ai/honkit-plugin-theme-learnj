# Local development

## Run this example book

From the repository root:

```bash
cd example
npm install
npm run serve
```

Open the URL HonKit prints (usually `http://localhost:4000`). Edit any `.md` file under `example/` and the preview reloads.

Build static HTML:

```bash
npm run build
```

Output is written to `example/_book/`.

## Use the theme from this repo (without publishing)

While developing the theme itself, point your book at the local package with npm's `file:` protocol — exactly as this example does:

```json
{
  "devDependencies": {
    "honkit": "^6.2.0",
    "honkit-plugin-theme-learnj": "file:../honkit-plugin-theme-learnj"
  }
}
```

Adjust the path to match where the theme repo sits relative to your book.

After changing theme CSS in `src/learnj.css`, rebuild assets at the theme root:

```bash
cd ..   # theme repository root
npm run build:css
```

Then restart `honkit serve` in the example folder.

## Link the theme globally (alternative)

```bash
# In the theme repository
npm link

# In your book directory
npm link honkit-plugin-theme-learnj
```

Your `book.json` still lists `"theme-learnj"` in `plugins`; npm link only affects which files HonKit loads.

## Develop your own book

```bash
mkdir my-docs && cd my-docs
npm init -y
npm install honkit honkit-plugin-theme-learnj --save-dev
npx honkit init
```

Edit `book.json` as described in [Using this theme](using-the-theme.md), then:

```bash
npx honkit serve
```
