(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.codeflask = factory());
}(this, (function () { 'use strict';

  const FONT_FAMILY = `'Cousine', monospace;`;


  const editor_css = `
  .codeflask {
    position: relative;
    min-width: 500px;
    min-height: 400px;
    border: 1px solid #ccc;
    overflow: auto;
    margin: 20px;
  }

  .codeflask, .codeflask * {
    box-sizing: border-box;
  }

  .codeflask__pre {
    pointer-events: none;
    z-index: 2;
  }

  .codeflask__textarea {
    background: none;
    border: none;
    color: #ccc;
    z-index: 1;
    resize: none;
    font-family: ${FONT_FAMILY};
  }

  .codeflask__code {
    display: block;
    font-family: ${FONT_FAMILY};
  }

  .codeflask__flatten {
    padding: 10px;
    font-size: 12px;
    line-height: 20px;
    white-space: pre;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    overflow: auto;
    margin: 0 !important;
    padding-left: 50px;
    outline: none;
  }

  .codeflask__lines {
    background: #eee;
    border-right: 1px solid #ccc;
    padding: 10px 4px;
    font-size: 12px;
    line-height: 20px;
    font-family: 'Cousine', monospace;
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    height: 100%;
    text-align: right;
    color: #999;
  }
`;

  function inject_css(css) {
    const CSS_ID = 'codeflask-style';
    
    if (!css) {
      return false;
    }

    if (document.getElementById(CSS_ID)) {
      return true;
    }

    const style = document.createElement('style');

    style.innerText = css;
    style.id = CSS_ID;
    document.head.appendChild(style);

    return true;
  }

  class CodeFlask {
    constructor(selectorOrElement) {
      if (!selectorOrElement) {
        // If no selector or element is passed to CodeFlask,
        // stop execution and throw error.
        throw Error('CodeFlask expects a parameter which is Element or a String selector');
        return;
      }

      if (selectorOrElement.nodeType) {
        // If it is an element, assign it directly
        this.editorRoot = selectorOrElement;
      } else {
        // If it is a selector, tries to find element
        const editorRoot = document.querySelector(selectorOrElement);

        // If an element is found using this selector,
        // assign this element as the root element
        if (editorRoot) {
          this.editorRoot = editorRoot;
        }
      }

      this.startEditor();
    }

    startEditor() {
      inject_css(editor_css);
      alert(1);
    }
  }

  return CodeFlask;

})));
//# sourceMappingURL=codeflask.bundle.js.map
