# Clojure One

A dark Visual Studio Code theme built for Clojure, inspired by [One Monokai](https://marketplace.visualstudio.com/items?itemName=azemoh.one-monokai).

Clojure One maps a familiar palette onto Clojure syntax, with dedicated colors for core forms, keywords, functions, namespaces, and symbols. It includes TextMate rules and semantic token colors designed for use with Calva and clojure-lsp.

[Source code](https://github.com/craigdanj/Clojure-One) · [Report an issue](https://github.com/craigdanj/Clojure-One/issues)

## Features

- **Clojure-focused highlighting** for forms, keyword literals, function definitions, namespaces, variables, strings, and comments.
- **Semantic highlighting** with Clojure and ClojureScript overrides for variables, parameters, and types.
- **A complete dark workbench** covering the editor, sidebar, tabs, status bar, panels, suggestions, and terminal.
- **Six bracket colors** for use with VS Code's bracket pair colorization.
- **REPL prompt styling** through Clojure TextMate scopes.
- **Automatic theme-switching code** for Clojure, ClojureScript, and EDN language IDs. See the current limitation below before using it.

## Requirements

- Visual Studio Code **1.75.0 or later**.
- A language extension that provides the relevant Clojure grammar and semantic tokens. Calva with clojure-lsp is the intended setup for richer highlighting.

The theme supplies colors; language tooling supplies token classifications, completion, evaluation, and other Clojure development features.

## Install locally

Clone the repository into a folder named `clojure-one` inside your VS Code extensions directory:

| Platform | Default extensions directory |
| --- | --- |
| macOS / Linux | `~/.vscode/extensions` |
| Windows | `%USERPROFILE%\.vscode\extensions` |

For example, on macOS or Linux:

```sh
git clone https://github.com/craigdanj/Clojure-One.git ~/.vscode/extensions/clojure-one
```

Restart VS Code, open the Command Palette, run **Preferences: Color Theme**, and select **Clojure One**.

You can also select it in `settings.json`:

```json
{
  "workbench.colorTheme": "Clojure One",
  "editor.semanticHighlighting.enabled": true,
  "editor.bracketPairColorization.enabled": true
}
```

### Current automatic-switching limitation

The current `extension.js` uses `Clojure One Monokai` as its target theme name, while `package.json` registers the theme as `Clojure One`. This mismatch can prevent automatic switching from selecting the intended theme.

For a local installation, align the constant in `extension.js` with the registered label:

```js
const THEME = "Clojure One";
```

Then reload VS Code. This is a local workaround; the repository currently contains the mismatched name.

Once aligned, the extension is designed to select the theme when the active editor has a `clojure`, `clojurescript`, or `edn` language ID, and restore the remembered theme when you switch to another language. It uses **Default Dark Modern** when no previous theme is saved. Switching updates the global `workbench.colorTheme` setting, so the entire workbench changes, not just the active file. Workspace-level theme settings may override that setting.

## Palette

| Element | Color |
| --- | --- |
| Editor background | `#282C34` |
| Default foreground | `#ABB2BF` |
| Core forms and macros | `#E06C75` |
| Functions | `#98C379` |
| Strings and regular expressions | `#E5C07B` |
| Clojure keyword literals | `#C678DD` |
| Namespaces | `#61AFEF` |
| Numbers, Clojure variables, and parameters | `#D19A66` |
| General types and string escapes | `#56B6C2` |
| Comments | `#5C6370` |
| Interface accents | `#528BFF` |

Exact highlighting depends on the scopes and semantic tokens emitted by your language tooling. For example, Clojure and ClojureScript semantic type tokens use blue instead of the general cyan type color.

## Preview

Open [`clojure-one-preview.html`](./clojure-one-preview.html) locally in a browser for the bundled preview. Check the installed theme in VS Code to see the actual results with your language extensions and settings.

## Customize

Use VS Code's theme-specific customization settings to adjust colors without editing the extension:

```json
{
  "workbench.colorCustomizations": {
    "[Clojure One]": {
      "editor.background": "#242830"
    }
  },
  "editor.tokenColorCustomizations": {
    "[Clojure One]": {
      "comments": "#7F8796"
    }
  }
}
```

Semantic token colors can override TextMate colors. Use **Developer: Inspect Editor Tokens and Scopes** to identify the rule behind a token's appearance.

## Development

The main project files are:

| File | Purpose |
| --- | --- |
| `package.json` | Extension metadata and theme registration |
| `themes/clojure-one.json` | Theme loaded by VS Code: workbench colors, TextMate rules, and semantic token colors |
| `extension.js` | Automatic theme switching and previous-theme persistence |
| `clojure-one-preview.html` | Browser preview |
| `clojure-one.json` | Additional theme JSON at the repository root; not the path registered in the manifest |

Make theme changes in `themes/clojure-one.json`. Reload the local extension after changes and inspect representative Clojure, ClojureScript, and EDN files. Test both syntax highlighting and semantic highlighting, and check theme switching between Clojure and other language modes.

## Contributing

Issues and pull requests are welcome. For a highlighting issue, include:

- A small code sample and screenshot.
- Your VS Code version and relevant language extensions.
- Whether semantic highlighting is enabled.
- Token details from **Developer: Inspect Editor Tokens and Scopes**, if available.

For palette changes, include before-and-after screenshots and explain the readability improvement.

## Credits

Inspired by [One Monokai](https://marketplace.visualstudio.com/items?itemName=azemoh.one-monokai) by azemoh, with highlighting tailored to Clojure.

## License

[MIT](./LICENSE).
