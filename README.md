# `draft-js-code-editor-plugin`

Add IDE-like behaviours to code blocks in your DraftJS editor. Meant to be used with [`draft-js-plugins`](https://github.com/draft-js-plugins/draft-js-plugins).

> Note: If you're not using `draft-js-plugins` you can also use the lower-level [`draft-js-code`](https://github.com/SamyPesse/draft-js-code) library. 

## Functionality

- Insert indentation on <kbd>tab</kbd>
- Preserve indentation of current line when pressing <kbd>enter</kbd>
- Remove indentation correctly with <kbd>backspace</kbd>
- More to come!

## Usage

First, install the plugin:

```sh
npm install --save draft-js-code-editor-plugin
```

Then pass it to the `plugins` prop of the `draft-js-plugins` editor:

```JS
import React, { Component  } from 'react';
import Editor from 'draft-js-plugins-editor';
import createCodeEditorPlugin from 'draft-js-code-editor-plugin';
import { EditorState  } from 'draft-js';

export default class DemoEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    plugins: [createCodeEditorPlugin()]      
  };

  onChange = (editorState) => {
    this.setState({
      editorState,          
    });
  };

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
        plugins={this.state.plugins}
      />
    );  
  }
}
```

### Add code block syntax highlighting

Using the [`draft-js-prism-plugin`](https://github.com/withspectrum/draft-js-prism-plugin) you can easily add syntax highlighting support to your code blocks!

```JS
// Install prismjs and draft-js-prism-plugin
import Prism from 'prismjs';
import createPrismPlugin from 'draft-js-prism-plugin';

class Editor extends Component {
  state = {
    plugins: [
    // Add the Prism plugin to the plugins array 
      createPrismPlugin({
        prism: Prism
      }),
      createCodeEditorPlugin()
    ]
  };
}
```

## License

Licensed under the MIT License, Copyright ©️ 2017 Space Program Inc. See [LICENSE.md](LICENSE.md) for more information.
