# Dynamic interrupts
Example of how to allow the player to take actions in the middle of dialogue and interrupt a character by clicking on a sprite button.

![Video demo of dynamic interrupt](./video-demo.mp4)

## How it works

In `main.css`:

```css
.choice-sprite-appear {
  transform: translateX(-700px);
}
.choice-sprite {
  background-color: rgba(255, 100, 255, 0.7);
  transition: transform 6.5s ease-in-out;
}
```

And in the narrat script:

```narrat
choice_demo:
  var choiceText (create_object 300 200)
  set choiceText.text "Stop!"
  set choiceText.onClick "clicked_object Stop!"
  set choiceText.cssClass "choice-sprite-appear"
  set choiceText.width 200
  set choiceText.height 80
  set choiceText.clickMethod jump
  set choiceText.scriptClickable true
  wait 10
  set choiceText.x 500
  set choiceText.cssClass "choice-sprite"
  talk player idle "Hello, this is dialogue that is meant to be interrupted by the button above. You can interrupt during the long dialogue coming next."
  talk player idle "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl eget aliquam lacinia, nunc nisl aliquet nunc, nec aliquam nisl nunc eget nisl. Nulla facilisi. Sed euismod, nisl eget aliquam lacinia, nunc nisl aliquet nunc, nec aliquam nisl nunc eget nisl. Nulla facilisi. Sed euismod, nisl eget aliquam lacinia, nunc nisl aliquet nunc, nec aliquam nisl nunc eget nisl."
  // wait 500
  delete_sprite $choiceText

clicked_object choice:
  empty_sprites
  clear_dialog
  talk player idle "%{$choice}"
```

1. The text is created and given the `choice-sprite-appear` css class, which moves it far to the left out of the screen
2. The game waits 10ms, and changes the css class to the normal `choice-sprite`
3. This triggers the CSS transition for the `transform` property, so the browser will animate the button moving from left to right
4. At any point, clicking on this sprite will call the `onClick` label specified in the script

## Other details

* The `scriptClickable` property is required here, as sprites aren't allowed to be clicked in the middle of dialogues by default, as users rarely want this behaviour.
* Using a `jump` clickMethod makes sure that it overrides everything that was going on. You could use `run` instead, and it would go back to what it was doing before afterwards.
* A similar trick could be done by animating opacity to make a button slowly appear and disappear, giving the player the opportunity to click it


# Narrat Template

Template app for [Narrat](https://github.com/nialna/narrat).

> ✨ Bootstrapped with Create Snowpack App (CSA).

## Usage

You can clone, fork or download this to get it in a local folder, then:

1. `npm install`
2. `npm start`

## Building for the web

`npm run build`

Builds the app for production to the `build/` folder.
It correctly bundles Vue in production mode and optimizes the build for the best performance.

It should be easy to host the built result as a static website on a service like [Netlify](https://www.netlify.com)

## Building as an app

This template has [electron](https://www.electronjs.org) already setup to create a built app of your game.

To run it:

`npm run electron`

To build it (it will come out in the `out` folder):

`npm run package`

This should work on Windows, Mac and Linux

## Narrat documentation

[See docs](https://docs.narrat.dev)

## Changing game code

You can edit game code and config in the data folder (`data/example.narrat`).

[See docs](https://docs.narrat.dev) for more usage info

## Available Scripts

### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.
