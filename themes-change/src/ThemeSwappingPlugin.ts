import { NarratPlugin, error, useConfig } from "narrat";
import type { Config } from "narrat";
import { CommandPlugin } from "narrat";
import deepmerge from "deepmerge";

export type Theme = {
  id: string;
  cssPath: string;
  extendedConfig?: Partial<Config>;
};

export interface ThemeSwappingPluginOptions {
  defaultTheme?: string;
  themes: Theme[];
}

export class ThemeSwappingPlugin extends NarratPlugin {
  options: ThemeSwappingPluginOptions;
  activeTheme?: {
    id: string;
    themeTag: HTMLLinkElement;
  };
  customCommands: CommandPlugin<any>[];
  initialConfig!: Config;

  constructor(options: ThemeSwappingPluginOptions) {
    super();
    this.options = options;
    this.customCommands = [this.createChangeThemeCommand()];
  }
  onNarratSetup(): void {
    if (this.options.defaultTheme) {
      const theme = this.options.themes.find(
        (theme) => theme.id === this.options.defaultTheme
      );
      if (!theme) {
        error(`Theme ${this.options.defaultTheme} not found`);
        return;
      }
      this.setTheme(theme);
    }
  }

  createChangeThemeCommand(): CommandPlugin<any> {
    const changeThemePlugin = CommandPlugin.FromOptions<{
      theme: string;
    }>({
      keyword: "change_theme",
      argTypes: [{ name: "theme", type: "string" }],
      runner: async (ctx) => {
        this.changeTheme(ctx.options.theme);
      },
    });
    return changeThemePlugin;
  }

  changeTheme(themeId: string): void {
    if (themeId === "default") {
      this.removeCurrentTheme();
      return;
    }
    const theme = this.findTheme(themeId);
    this.setTheme(theme);
  }

  findTheme(themeId: string): Theme {
    const theme = this.options.themes.find((theme) => theme.id === themeId);
    if (!theme) {
      error(`Theme ${themeId} not found`);
    }
    return theme!;
  }

  setTheme(theme: Theme): void {
    if (this.activeTheme) {
      this.removeCurrentTheme();
    }
    this.activeTheme = {
      themeTag: this.createThemeTag(theme),
      id: theme.id,
    };
    document.head.appendChild(this.activeTheme.themeTag);
    if (theme.extendedConfig) {
      this.initialConfig = deepmerge({}, useConfig().config);
      useConfig().extendConfig(theme.extendedConfig);
    }
  }

  createThemeTag(theme: Theme): HTMLLinkElement {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = theme.cssPath;
    link.id = theme.id;
    return link;
  }

  removeCurrentTheme() {
    if (this.activeTheme) {
      if (this.activeTheme.themeTag) {
        this.activeTheme.themeTag.remove();
      }
      const theme = this.findTheme(this.activeTheme.id);
      if (theme.extendedConfig) {
        useConfig().config = this.initialConfig;
      }
    }
    this.activeTheme = undefined;
  }
}
