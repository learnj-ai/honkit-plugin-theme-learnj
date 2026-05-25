# Slide decks (remark.js)

You can add **[remark.js](https://remarkjs.com/)** presentations alongside your HonKit book and link them from the sidebar or table of contents.

HonKit does not ship remark built in; you add static slide pages that load remark in the browser.

## How it works

1. Create a folder such as `slides/` in your book root.
2. Add a **Markdown source** file with `---` between slides (remark syntax).
3. Add an **HTML host** page that calls `remark.create({ sourceUrl: "your-deck.md" })`.
4. Link the `.html` file from `SUMMARY.md` or `book.json` → `links.sidebar`.

The [example deck](../slides/overview.html) in this repository demonstrates the pattern.

## Navigation

**Recommended:** add a docs page that links to the deck, plus a sidebar shortcut.

`SUMMARY.md`:

```markdown
* [Slide decks (remark.js)](getting-started/slides.md)
```

On that page, link to the deck: `[Open slides](../slides/overview.html)`.

HonKit copies `slides/overview.html` and `slides/overview.md` as static files when they are **not** listed in `SUMMARY.md`. Do **not** add `.html` files to `SUMMARY` — HonKit tries to parse them and the build fails.

## Sidebar link (without TOC section)

```json
{
  "links": {
    "sidebar": {
      "Slide deck": "slides/overview.html"
    }
  }
}
```

Paths are relative to the book root and resolve correctly in the built site.

## Authoring slides

remark uses Markdown with slide separators:

```markdown
# Title slide

---

## Second slide

- Bullet one
- Bullet two
```

See the [remark Markdown wiki](https://github.com/gnab/remark/wiki/Markdown) for properties (`class:`, `countIncrementalSlides`, etc.), presenter mode (**P**), and clone display (**C**).

## Template

Copy `example/slides/overview.html` from this repo and adjust:

- `sourceUrl` — path to your `.md` deck (same folder)
- Back link — `href` to your book home (`../index.html` or similar)

The LearnJ theme stylesheet is optional on slide pages; the example loads `learnj.css` only for the top toolbar (back link + dark mode).

## Limitations

- **No single Markdown file** becomes slides automatically; you maintain `.md` + `.html` pairs (or generate HTML in a build script).
- The shadcnblocks [code-example6](https://www.shadcnblocks.com/block/code-example6) tabbed UI is React-only; remark decks are separate full-screen pages, not embedded in doc pages.
- PDF export uses the browser print dialog (see [remark wiki](https://github.com/gnab/remark/wiki)).
