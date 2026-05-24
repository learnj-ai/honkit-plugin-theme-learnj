# Diagrams

Mermaid blocks render as **centered architecture diagrams**, not code panels. Use **View full size** (or click the diagram) to open a scrollable lightbox.

```mermaid
flowchart TB
    subgraph client["Browser"]
        A[HonKit book]
    end
    subgraph theme["LearnJ theme"]
        B[Sidebar TOC]
        C[Markdown content]
        D[Mermaid renderer]
    end
    A --> B
    A --> C
    C --> D
    D --> E[(SVG diagram)]
```

```mermaid
sequenceDiagram
    participant U as User
    participant H as HonKit
    participant M as Mermaid
    U->>H: Open page
    H->>M: Render ```mermaid blocks
    M-->>U: Centered diagram + full-size view
```

Install a Mermaid plugin in `book.json` (for example `mermaid-md-adoc`) to enable fenced `mermaid` code blocks.
