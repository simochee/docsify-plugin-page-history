<p align="center">
  <img src="docsify.svg" alt="Docsify Logo" height="128">
</p>
<h1 align="center">Docsify Plugins</h1>
<h3 align="center">Page History</h3>
<p align="center">by <a href="https://github.com/simochee">simochee</a></p>

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/docsify-plugin-page-history/badge)](https://www.jsdelivr.com/package/npm/docsify-plugin-page-history)
[![npm version](https://badge.fury.io/js/docsify-plugin-page-history.svg)](https://badge.fury.io/js/docsify-plugin-page-history)
[![License](https://img.shields.io/npm/l/docsify-plugin-page-history)](https://github.com/simochee/docsify-plugin-page-history/blob/main/LICENSE)

Page-by-page history for Docsify.

## 📀 Installation

Insert a script tag to load the plugin script file after loading the Docsify script.

```html
<script>
  window.$docsify = {};
</script>
<script src="//cdn.jsdelivr.net/npm/docsify@v4/lib/docsify.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/docsify-plugin-page-history/lib/docsify-plugin-page-history.min.js"></script>
```

## 🔰 Usage

### Add page history

Add `history` field to page front-matter.

```md
---
history:
  - date: 2023-10-15 <!-- recommended YYYY-MM-DD -->
    message: Add **awesome section**.
  - date: 2023-10-10
    message: Initial release
---

## Page Title

...
```

### Display all page history

Add `@[page-history]` to your markdown file

```md
# History

@[page-history]
```

## 💻 Development

1. Clone this repository
1. Enable Corepack using `corepack enable`
1. Install dependencies using `pnpm install`
1. Run watch mode using `pnpm run watch`
1. Start server using [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
1. Insert a script tag to load the plugin script file after loading the Docsify script.

```html
<script src="http://localhost:5500"></script>
```

## 🛡️ License

MIT
