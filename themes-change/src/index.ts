import "narrat/dist/style.css";
import "./css/main.css";
import { NarratPlugin, registerPlugin, startApp } from "narrat";
import scripts from "./scripts";
import { Theme, ThemeSwappingPlugin } from "./ThemeSwappingPlugin";
// Enable this when releasing for steam
const useSteam = false;

// Set this to false if you want debug to always be disabled.
// Note: Debug gets auto disabled on builds via the environment variable "VITE_BUILD", passed by the script that runs the game.

let debug = true;

if (import.meta.env.VITE_BUILD && !import.meta.env.VITE_DEBUG) {
  debug = false;
}

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
      layout: {
        backgrounds: {
          width: 600,
          height: 900,
        },
        portraits: {
          width: 200,
          height: 200,
          offset: {
            landscape: {
              right: -500,
              bottom: 0,
            },
            portrait: {
              right: 10,
              bottom: 0,
            },
          },
        },
      },
    },
  },
  {
    id: "theme-2",
    cssPath: "/css/theme-2.css",
    extendedConfig: {
      dialogPanel: {
        width: 900,
        height: 720,
        rightOffset: 150,
        bottomOffset: 0,
      },
      layout: {
        portraits: {
          offset: {
            landscape: {
              right: -600,
              bottom: -200,
            },
          },
        },
      },
    },
  },
];

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
