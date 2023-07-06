# For loops (or array iteration)
This example project demonstrates how to create and use a typical for loop to iterate arrays in narrat.

The `for` function takes a starting index, an array, and the name of a label to run on every element. Once called, it takes care of looping through the array and calling the callback function every time.

In the example, we create a `print_array_element` function, and pass it to a for loop so that it will be called on every element of the array. The function is called with the current index and the current element as arguments.

Example script:

```narrat
main:
  "Hello world"
  set_screen game 0 slide-top 1000
  set data.test_array (new Array "a" "b" "c" "d" "e" "f" "g" "h" "i" "j")
  jump test_for_loop

test_for_loop:
  run for 0 $data.test_array print_array_element
  "The loop has ended!"

print_array_element index element:
  "We're at index %{$index} and the content is %{$element}"
  if (== $index 4):
    // Exit the for loop early
    return "break"

// Utility for loop function
// @param {number} index: The index to start the loop at
// @param {array} array: The array to loop through
// @param {function} callback: The name of a label to run on every element. It will be called with the current index and array elements as arguments
for index array callback:
  if (< $index $array.length):
    var result (run $callback $index $array[$index])
    if (== $result "break"):
      return "break"
    run for (+ $index 1) $array $callback
  else:
    return true
```

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
