# reverjs

reverjs is a reverse engineering tool for analysis of a website's client-side JavaScript code.
It can be used to display a list of custom JavaScript functions and how they can be accessed from the global scope.

The functionality is similar to the "DOM" view of the developer tools in Firefox. In contrast, reverjs focuses only on functions which includes also classes in JavaScript. Additionally, the function's source code can be directly displayed.

## Build

```
npm ci && npm run build
```

## Run

Copy the content of the resulting script at `dist/reverjs.js` into the web browser's JavaScript console. It can then be executed to run the analysis on the currently opened website.

## Configuration

The variable `recursionLevel` can be customized before build. It defines how many levels of subobjects of the `window` object are accessed. Default value is 10.
