# md-to-inline-html

Export your Obsidian notes to clean, inline-style HTML – perfect for pasting into **Outlook** or other rich-text environments that discard external CSS.

---

## ✨ Features

- 📄 **Converts Markdown to inline-styled HTML**
- 📨 **Optimized for email clients like Outlook**
- 🧼 Optional removal of YAML frontmatter
- ⚙️ Simple command palette integration

---

## 🔧 Usage

1. Open a note in Obsidian.
2. Press `Ctrl+P` to open the Command Palette.
3. Run the command: `Export entire note as inline-style HTML`
4. The rendered HTML will be copied to your clipboard.
5. Paste directly into Outlook or any other WYSIWYG editor.

---

## ⚙️ Settings

- **Exclude YAML Frontmatter**
  - Enable or disable the removal of `---` frontmatter block.
  - Go to `Settings → Plugin Options → md-to-inline-html`

---

## 🚫 Limitations

- Partial exports (e.g. selected blocks) are not supported in the current version.

---

## 🧪 Development

```bash
npm install
npm run dev
```

This plugin uses `esbuild` and supports automatic copying to your Obsidian plugin folder.

---

## 📄 License

[MIT License](./LICENSE)

