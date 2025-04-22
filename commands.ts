import type MarkdownToInlineHtmlPlugin from "./main";

import { App, Notice, Plugin, MarkdownView } from "obsidian";
import { convertMarkdownToInlineHtml } from "./converter";

import { copyToClipboard } from "./clipboard";

export function registerExportCommands(plugin: Plugin ) {
  const ourPlugin = plugin as MarkdownToInlineHtmlPlugin;

	const app = ourPlugin.app;

	// ✅ 전체 노트 변환
	ourPlugin.addCommand({
		id: "export-note-as-inline-html",
		name: "Export entire note as inline-style HTML",
		callback: async () => {
			const file = app.workspace.getActiveFile();
			if (!file) {
				new Notice("⚠️ No active file.");
				return;
			}
			const markdown = await app.vault.read(file);
			// ✅ 설정에 따라 frontmatter 제거
			const content = ourPlugin.settings.excludeFrontmatter
				? markdown.replace(/^---\s*[\r\n]+[\s\S]*?^---\s*[\r\n]+/m, "")
				: markdown;

			const html = await convertMarkdownToInlineHtml(
				content,
				app,
				file.path
			);
			await copyToClipboard(html);
			new Notice("✅ Entire note copied as inline HTML!");
		},
	});

	ourPlugin.addCommand({
		id: "export-selection-as-inline-html",
		name: "Export selected block as inline-style HTML",
		callback: async () => {
			const file = ourPlugin.app.workspace.getActiveFile();
			if (!file) {
				new Notice("⚠️ No active file.");
				return;
			}

			// 🔍 현재 뷰가 마크다운 편집기인지 확인
			const view = ourPlugin.app.workspace.getActiveViewOfType(MarkdownView);
			if (!view || !view.editor) {
				new Notice("⚠️ This command works only in editing mode.");
				return;
			}

			const selection = view.editor.getSelection().trim();
			if (!selection) {
				new Notice("⚠️ No text selected.");
				return;
			}

			const html = await convertMarkdownToInlineHtml(
				selection,
				app,
				file.path
			);
			await copyToClipboard(html);
			new Notice("✅ Selected block copied as inline HTML!");
		},
	});
}
