"use strict";

const vscode = require("vscode");

const THEME = "Clojure One Monokai";
const CLOJURE_LANGUAGES = new Set(["clojure", "clojurescript", "edn"]);
const PREVIOUS_THEME_KEY = "previousColorTheme";
const FALLBACK_THEME = "Default Dark Modern";

function workbenchConfig() {
  return vscode.workspace.getConfiguration("workbench");
}

function activeLanguageId() {
  const editor = vscode.window.activeTextEditor;
  return editor ? editor.document.languageId : undefined;
}

async function rememberedTheme(context) {
  const saved = context.globalState.get(PREVIOUS_THEME_KEY);
  if (typeof saved === "string" && saved.length > 0 && saved !== THEME) {
    return saved;
  }
  return FALLBACK_THEME;
}

async function rememberTheme(context, theme) {
  if (typeof theme === "string" && theme.length > 0 && theme !== THEME) {
    await context.globalState.update(PREVIOUS_THEME_KEY, theme);
  }
}

async function useTheme(theme) {
  const config = workbenchConfig();
  if (config.get("colorTheme") === theme) {
    return;
  }
  await config.update("colorTheme", theme, vscode.ConfigurationTarget.Global);
}

async function syncTheme(context) {
  const languageId = activeLanguageId();
  const currentTheme = workbenchConfig().get("colorTheme");

  if (CLOJURE_LANGUAGES.has(languageId)) {
    if (currentTheme !== THEME) {
      await rememberTheme(context, currentTheme);
      await useTheme(THEME);
    }
    return;
  }

  if (!languageId) {
    return;
  }

  if (currentTheme === THEME) {
    await useTheme(await rememberedTheme(context));
    return;
  }

  await rememberTheme(context, currentTheme);
}

function activate(context) {
  let applying = false;

  const run = () => {
    if (applying) {
      return;
    }
    applying = true;
    syncTheme(context)
      .catch((error) => {
        console.error("Clojure One Monokai could not update the color theme");
        console.error(error instanceof Error ? error.message : "theme update failed");
      })
      .finally(() => {
        applying = false;
      });
  };

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(run),
    vscode.workspace.onDidCloseTextDocument(run)
  );
  run();
}

function deactivate() {}

module.exports = { activate, deactivate };
