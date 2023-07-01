# Narrat Theme Swapping

This example game shows how to create a theme swapping system in a narrat game, allowing different layouts and UI styles in different parts of the game.

## How it works

This system relies on the `ThemeSwappingPlugin`, which you can find in the `src/ThemeSwappingPlugin.ts` file. This plugin uses themes that can do two things:

- Add a new `css` stylesheet to the page (allowing you to dynamically load/unload custom styles for each theme)
- Add an extended `config` to narrat. The extended config is an object following the narrat config format, where you can specify any config values. They then get deep merged with the existing config. **This allows themes to change anything in the config**

## Adding this to an existing game

The plugin is used this way:

1. Copy the `ThemeSwappingPlugin` file to your game, in the same folder (`src/ThemeSwappingPlugin.ts`)
2. In `public/css`, create a new css file for each theme you want to use. For example, `theme1.css` and `theme2.css`. Put whatever you want in those css files for each theme. See the files in `public/css` for examples.
3. At the top of `src/index.ts`, add a line to import the `ThemeSwappingPlugin`:

```
import { Theme, ThemeSwappingPlugin } from "./ThemeSwappingPlugin";
```

4. In `src/index.ts`, create theme objects to define each theme. For example:

```ts
// See the full theme in `src/index.ts` for a more complete example
const themes: Theme[] = [
  {
    id: "theme-1",
    cssPath: "/css/theme-1.css",
    extendedConfig: {
      dialogPanel: {
        width: 500,
        height: 230,
        rightOffset: 50,
        bottomOffset: 50,
      },
    },
  },
  {
    id: "theme-2",
    cssPath: "/css/theme-2.css",
  },
];
```

5. In `src/index.ts`, just before `startApp` is called near the end of the file, add a line registering your plugin, passing it the themes you've created

```ts
window.addEventListener("load", () => {
  registerPlugin(
    new ThemeSwappingPlugin({
      themes,
    })
  );
  startApp({
    configPath: "data/config.yaml",
    debug,
    logging: false,
    scripts,
  });
});
```

6. In your `narrat` scripts, simply use the `change_theme` command to change theme:

```narrat
main:
  talk helper idle "Hello world"
  talk helper idle "This is the default theme. Let's change theme:"
  jump change_theme_menu

change_theme_menu:
  choice:
    talk helper idle "Change theme"
    "Theme 1":
      change_theme theme-1
    "Theme 2":
      change_theme theme-2
    "default theme":
      change_theme default
  talk helper idle "wow the theme has changed"
  jump change_theme_menu
```
