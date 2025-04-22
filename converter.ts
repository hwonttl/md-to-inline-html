import { App, MarkdownRenderer, Component } from "obsidian";
import juice from "juice";

export async function convertMarkdownToInlineHtml(
	markdown: string,
	app: App,
	sourcePath: string
): Promise<string> {
	const container = document.createElement("div");

	await MarkdownRenderer.render(
		app,
		markdown,
		container,
		sourcePath,
		new Component()
	);

	const fullHtml = `
	<html>
	<head>
		<meta charset="utf-8">
		<style>
			body { font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; }
			table { border-collapse: collapse; width: 100%; }
			th, td { border: 1px solid #ccc; padding: 8px; }
			th { background-color: #f2f2f2; }
		</style>
	</head>
	<body>${container.innerHTML}</body>
	</html>`;

	return juice(fullHtml);
}
