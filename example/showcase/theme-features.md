# Theme features

LearnJ replaces GitBook's default chrome with a modern documentation shell.

## Layout

- **Fixed sidebar** on large screens with scrollable table of contents
- **Collapsible sidebar** on mobile with a backdrop overlay
- **Sticky header** with menu, search, and theme toggle
- **Previous / next** page navigation at the bottom of the content area

## Dark mode

Click the sun/moon control in the header. The choice is stored in `localStorage` under `learnj-theme`.

## Search

LearnJ includes search UI and scripts compatible with the `lunr` indexer. In `book.json`, disable the default search plugin (`-search`) and enable `lunr` — the theme ships the markup and JavaScript so you avoid template conflicts with custom themes.

Use the search field in the sidebar. Results use popover styling aligned with the design system.

## Font settings

When `fontsettings` is enabled, readers can adjust font family and size. The control panel is styled to match shadcn popover surfaces.

## Design tokens

Utility classes used in templates include:

| Class | Use |
| ----- | --- |
| `learnj-nav-link` | Sidebar TOC links |
| `learnj-btn-primary` | Primary actions |
| `learnj-card` | Bordered content cards |
| `learnj-badge-secondary` | Small labels (e.g. level indicators) |

Markdown content uses Tailwind Typography; customize prose colors in `tailwind.config.js` under the theme package.

## Print

Sidebars, header controls, and floating navigation are hidden in print styles so exported pages focus on content.

## Try it

Resize the browser window narrow to open the mobile menu. Navigate between chapters with the arrow buttons or the sidebar. Toggle dark mode and search for **configuration** to see integrated plugins in action.
