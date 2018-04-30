import { editor_css } from './styles/editor';
import { inject_css } from './styles/injector';
import { default_css_theme, FONT_SIZE } from './styles/theme-default';
import { escape_html } from './utils/html-escape';
import Prism from 'prismjs';

export default class CodeFlask {
  constructor(selectorOrElement, opts) {
    if (!selectorOrElement) {
      // If no selector or element is passed to CodeFlask,
      // stop execution and throw error.
      throw Error('CodeFlask expects a parameter which is Element or a String selector');
      return;
    }

    if (!opts) {
      // If no selector or element is passed to CodeFlask,
      // stop execution and throw error.
      throw Error('CodeFlask expects an object containing options as second parameter');
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

    this.opts = opts;
    this.startEditor();
  }

  startEditor() {
    const isCSSInjected = inject_css(editor_css);
    const isThemeCSSInjected = inject_css(default_css_theme, 'theme-default');
    
    if (!isCSSInjected || !isThemeCSSInjected) {
      throw Error('Failed to inject CodeFlask CSS.');
      return;
    }

    // The order matters (pre > code). Don't change it
    // or things are going to break.
    this.createWrapper();
    this.createTextarea();
    this.createPre();
    this.createCode();

    this.runOptions();
    this.listenTextarea();
    this.populateDefault();
    this.updateCode(this.code);
  }

  createWrapper() {
    this.code = this.editorRoot.innerHTML;
    this.editorRoot.innerHTML = '';
    this.elWrapper = this.createElement('div', this.editorRoot);
    this.elWrapper.classList.add('codeflask');
  }

  createTextarea() {
    this.elTextarea = this.createElement('textarea', this.elWrapper);
    this.elTextarea.classList.add('codeflask__textarea', 'codeflask__flatten');
  }

  createPre() {
    this.elPre = this.createElement('pre', this.elWrapper);
    this.elPre.classList.add('codeflask__pre', 'codeflask__flatten');
  }

  createCode() {
    this.elCode = this.createElement('code', this.elPre);
    this.elCode.classList.add('codeflask__code', `language-${this.opts.language || 'html'}`);
  }

  createElement(elementTag, whereToAppend) {
    const element = document.createElement(elementTag);
    whereToAppend.appendChild(element);

    return element;
  }

  runOptions() {
    this.opts.rtl = this.opts.rtl || false;
    this.opts.tabSize = this.opts.tabSize || 2;
    this.opts.enableAutocorrect = this.opts.enableAutocorrect || false;

    if (this.opts.rtl === true) {
      this.elTextarea.setAttribute('dir', 'rtl');
      this.elPre.setAttribute('dir', 'rtl');
    }

    if (this.opts.enableAutocorrect === false) {
      this.elTextarea.setAttribute('spellcheck', 'false');
      this.elTextarea.setAttribute('autocapitalize', 'off');
      this.elTextarea.setAttribute('autocomplete', 'off');
      this.elTextarea.setAttribute('autocorrect', 'off');
    }
  }

  listenTextarea() {
    this.elTextarea.addEventListener('input', (e) => {
      this.code = e.target.value;
      this.elCode.innerHTML = escape_html(e.target.value);
      this.highlight();
      setTimeout(this.runUpdate, 1);
    });

    this.elTextarea.addEventListener('keydown', (e) => {
      this.handleTabs(e);
      this.handleSelfClosingCharacters(e);
      this.handleNewLineIndentation(e);
    });

    this.elTextarea.addEventListener('scroll', (e) => {
      this.elPre.style.transform = `translate3d(-${e.target.scrollLeft}px, -${e.target.scrollTop}px, 0)`;
    });
  }

  handleTabs(e) {
    if (e.keyCode !== 9) {
      return;
    }
    e.preventDefault();

    const tabCode = 9;
    const pressedCode = e.keyCode;
    const selectionStart = this.elTextarea.selectionStart;
    const selectionEnd = this.elTextarea.selectionEnd;
    const newCode = `${this.code.substring(0, selectionStart)}${' '.repeat(this.opts.tabSize)}${this.code.substring(selectionEnd)}`;

    this.updateCode(newCode);
    this.elTextarea.selectionEnd = selectionEnd + this.opts.tabSize;
  }

  handleSelfClosingCharacters(e) {
    const openChars = ['(', '[', '{', '<'];
    const key = e.key;

    if (!openChars.includes(key)) {
      return;
    }

    switch(key) {
      case '(':
      this.closeCharacter(')');
      break;

      case '[':
      this.closeCharacter(']');
      break;

      case '{':
      this.closeCharacter('}');
      break;

      case '<':
      this.closeCharacter('>');
      break;
    }
  }

  handleNewLineIndentation(e) {
    if (e.keyCode !== 13) {
      return;
    };

    this.elCode.style.paddingBottom = +FONT_SIZE.replace('px', '') * 2 + 'px';
  }

  closeCharacter(closeChar) {
    const selectionStart = this.elTextarea.selectionStart;
    const selectionEnd = this.elTextarea.selectionEnd;
    const newCode = `${this.code.substring(0, selectionStart)}${closeChar}${this.code.substring(selectionEnd)}`;

    this.updateCode(newCode);
    this.elTextarea.selectionEnd = selectionEnd;
  }

  updateCode(newCode) {
    this.code = newCode;
    this.elTextarea.value = newCode;
    this.elCode.innerHTML = escape_html(newCode);
    this.highlight();
    setTimeout(this.runUpdate, 1);
  }

  updateLanguage(newLanguage) {
    const oldLanguage = this.opts.language;
    this.elCode.classList.remove(`language-${oldLanguage}`);
    this.elCode.classList.add(`language-${newLanguage}`);
    this.opts.language = newLanguage;
    this.highlight();
  }

  addLanguage(name, options) {
    Prism.languages[name] = options;
  }

  populateDefault() {
    this.updateCode(this.code);
  }

  highlight() {
    Prism.highlightElement(this.elCode, false);
  }

  onUpdate(callback) {
    if (functionToCheck && {}.toString.call(functionToCheck) !== '[object Function]') {
      throw Error('CodeFlask expects callback of type Function');
      return;
    }

    this.updateCallBack = callback;
  }

  runUpdate() {
    if (this.updateCallBack) {
      this.updateCallBack(this.code);
    }
  }
}