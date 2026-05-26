# Slide decks (reveal.js)

You can add **[reveal.js](https://revealjs.com/)** presentations alongside your HonKit book and link them from the sidebar or table of contents.

HonKit does not ship reveal built in; you add static slide pages that load reveal in the browser.

## How it works

1. Create a folder such as `slides/` in your book root.
2. Add a **Markdown source** file with `---` between slides (reveal markdown syntax).
3. Add an **HTML host** page that loads reveal.js with the **Dracula** theme and points at your `.md` file.
4. Link the `.html` file from `links.sidebar` or from a Markdown page in `SUMMARY.md`.

The [example deck](../slides/overview.html) in this repository demonstrates the pattern.

## Navigation

**Recommended:** add a docs page that links to the deck, plus a sidebar shortcut.

`SUMMARY.md`:

```markdown
* [Slide decks (reveal.js)](getting-started/slides.md)
```

On that page, link to the deck: `[Open slides](../slides/overview.html)`.

HonKit copies `slides/overview.html` and `slides/overview.md` as static files when they are **not** listed in `SUMMARY.md`. Do **not** add `.html` files to `SUMMARY` — HonKit tries to parse them and the build fails.

## Sidebar link

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

reveal uses Markdown with horizontal slide separators (`---` on its own line):

```markdown
# Title slide

---

## Second slide

- Bullet one
- Bullet two
```

Optional slide attributes use HTML comments, for example centered title slides:

```markdown
<!-- .slide: class="title-slide" -->

# My title
```

See the [reveal.js docs](https://revealjs.com/markdown/) for vertical slides (`--`), speaker notes (`Note:`), and plugins.

## Theme (Dracula)

The example deck loads:

- `reveal.js/dist/theme/dracula.css` — presentation theme
- highlight.js **base16/dracula** — code blocks inside slides

Copy `example/slides/overview.html` and adjust `sourceUrl` / `data-markdown` paths and the back link as needed.

## Keyboard shortcuts

| Key | Action |
| --- | --- |
| ← → | Previous / next slide |
| S | Speaker notes |
| F | Fullscreen |
| ? | Help overlay |

## Limitations

- Slide decks are **separate full-screen pages**, not embedded inside doc pages.
- Do not list `.html` slide hosts in `SUMMARY.md`.
- PDF export: use the browser print dialog or [decktape](https://github.com/astefanutti/decktape).
