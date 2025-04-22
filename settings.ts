import { App, PluginSettingTab, Setting } from "obsidian";

/** 플러그인 설정 인터페이스 */
export interface PluginSettings {
	excludeFrontmatter: boolean;
}

/** 기본 설정값 */
export const DEFAULT_SETTINGS: PluginSettings = {
	excludeFrontmatter: true,
};

/** main.ts에서 사용할 최소 인터페이스 (순환 참조 방지용) */
export interface SettingsContext {
	settings: PluginSettings;
	saveSettings: () => Promise<void>;
}

/** 설정 UI 클래스 */
export class MdToInlineHtmlSettingTab extends PluginSettingTab {
	plugin: SettingsContext;

	constructor(app: App, plugin: SettingsContext) {
		super(app, plugin as any);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl("h2", { text: "md-to-inline-html Settings" });

		new Setting(containerEl)
			.setName("Exclude YAML frontmatter")
			.setDesc("Whether to exclude the YAML block (---) at the top of the note.")
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.excludeFrontmatter)
				.onChange(async (value) => {
					this.plugin.settings.excludeFrontmatter = value;
					await this.plugin.saveSettings();
				}));
	}
}
