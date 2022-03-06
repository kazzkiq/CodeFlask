I modified [CodeFlask](https://github.com/kazzkiq/CodeFlask) to be able to attach custom event listeners.

```bash
npm i '@acarl005/codeflask'
```

```javascript
const flask = new CodeFlask(editor, {
  language: "html",
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
```
