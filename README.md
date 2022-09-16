# CodeFlask Mod

```bash
npm i '@acarl005/codeflask'
```

I modified [CodeFlask](https://github.com/kazzkiq/CodeFlask) to be able to...

1. Make PrismJS a peer dependency
1. Attach (and remove) custom event listeners to the editor
1. Support the [Line Highlight](https://prismjs.com/plugins/line-highlight/) plugin in PrismJS
1. Fix this issue: kazzkiq/CodeFlask#69
1. Fix bugs with tab hotkey for indentation
1. Make the self-closing characters configurable

```javascript
import CodeFlask from "codeflask"
import Prism from "prismjs"

const flask = new CodeFlask(editor, Prism, {
  language: "js",
  selfClosingCharacters: ['(', '[', '{', "'", '"'],
  customEventListeners: {
    "keydown": e => {
      if (e.key == "Enter") {
        e.preventDefault()
        e.stopImmediatePropagation()
        // do custom stuff
      }
    }
  }
})

flask.highlightLines("4-7")
```

PrismJS is highly customizable.
It actually offers custom builds with more plugins that you can opt into.
This is an awesome and rare feature b/c you can minimize the bundle by omitting unneeded functionality.
Therefore, it should be a peer dependency, b/c CodeFlask can't know which build with which plugins you'll need.
