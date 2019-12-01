![](https://badgen.net/badge/Editor.js/v2.0/blue)

# Collapse Tool for Editor.js

Collapse Tool for the [Editor.js](https://editorjs.io).

![collapse-demo](https://user-images.githubusercontent.com/6184465/69914380-c7476080-147e-11ea-8096-309eb5237038.gif)


## Installation

### Install via NPM

Get the package

```shell
npm i --save-dev @groupher/editor-collapse
```

Include module at your application

```javascript
const Collapse = require('@groupher/editor-collapse');
```

### Download to your project's source dir

1. Upload folder `dist` from repository
2. Add `dist/bundle.js` file to your page.


## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
var editor = EditorJS({
  ...
  
  tools: {
    ...
    collapse: Collapse,
  }
  
  ...
});
```

## Config Params

This Tool has no config params

## Output data

This Tool returns data object.

```json
{
    "type" : "collapse",
    "data" : {
      title: "",
      content: "",
    }
}
```

