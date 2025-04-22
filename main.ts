import { Plugin } from "obsidian";
import { registerExportCommands } from "./commands";
import {
	PluginSettings,
	DEFAULT_SETTINGS,
	MdToInlineHtmlSettingTab
} from "./settings";

export default class MarkdownToInlineHtmlPlugin extends Plugin {
	settings: PluginSettings;

	async onload() {
		console.log("🟢 md-to-inline-html loaded");

		await this.loadSettings();
		this.addSettingTab(new MdToInlineHtmlSettingTab(this.app, this));

		registerExportCommands(this);
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
