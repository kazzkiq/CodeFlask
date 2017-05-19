const codeFlaskOwnerDoc = document.currentScript.ownerDocument

class CodeflaskEditor extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        style.appendChild(document.createTextNode(`
            :host {
                position:relative;
                overflow:hidden;
                display:block;
                contain:content;
                min-height:4em;
                font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
                --color-comment: slategray;
                --color-punctuation: #999;
                --color-property: #905;
                --color-selector: #690;
                --color-operator: #a67f59;
                --color-keyword: #07a;
                --color-function: #DD4A68;
                --color-variable: #e90;
            }

            :host > div {
                position:absolute;
                overflow:hidden;
                top:0;
                right:0;
                bottom:0;
                left:0;
            }

            .CodeFlask__textarea,
            .CodeFlask__pre {
                box-sizing:border-box;
                position:absolute;
                top:0;
                left:0;
                right:0;
                width:100%;
                padding:1rem !important;
                border:none;
                font-family:inherit;
                font-size:inherit;
                background:transparent;
                white-space:pre-wrap !important;
                line-height:1.5em;
                word-wrap: break-word;
            }

            .CodeFlask__textarea{
                border:none;
                background:transparent;
                outline:none;
                resize:none;
                opacity:0.4;
                color:#000;
                margin:0;
                z-index:1;
                height:100%;
                -webkit-overflow-scrolling: touch;
                -webkit-text-fill-color: transparent;
                tab-size: 4;
            }

            .CodeFlask__pre{
                z-index:2;
                pointer-events:none;
                overflow-y:auto;
                margin:0;
                min-height:100%;
                margin:0 !important;
                background:transparent !important;
            }

            .CodeFlask__code{
                font-size:inherit;
                font-family:inherit;
                color:inherit;
                display:block;
            }

            .CodeFlask__is-code {
                white-space: pre;
            }

            .token.comment { color: var(--color-comment); }
            .token.prolog  { color: var(--color-prolog, var(--color-comment)); }
            .token.doctype { color: var(--color-doctype, var(--color-comment)); }
            .token.cdata   { color: var(--color-cdata, var(--color-comment)); }

            .token.punctuation { color: var(--color-punctuation); }

            .namespace { opacity: .7; }

            .token.property { color: var(--color-property); }
            .token.tag      { color: var(--color-tag, var(--color-property)); }
            .token.boolean  { color: var(--color-boolean, var(--color-property)); }
            .token.number   { color: var(--color-number, var(--color-property)); }
            .token.constant { color: var(--color-constant, var(--color-property)); }
            .token.symbol   { color: var(--color-symbol, var(--color-property)); }
            .token.deleted  { color: var(--color-deleted, var(--color-property)); }

            .token.selector  { color: var(--color-selector); }
            .token.attr-name { color: var(--color-attr-name, var(--color-selector)); }
            .token.string    { color: var(--color-string, var(--color-selector)); }
            .token.char      { color: var(--color-char, var(--color-selector)); }
            .token.builtin   { color: var(--color-builtin, var(--color-selector)); }
            .token.inserted  { color: var(--color-inserted, var(--color-selector)); }

            .token.operator { color: var(--color-selector); }
            .token.entity   { color: var(--color-entity, var(--color-selector)); }
            .token.url      { color: var(--color-url, var(--color-selector)); }
            .language-css .token.string { color: var(--color-css-string, var(--color-selector)); }
            .style .token.string        { color: var(--color-css-string, var(--color-selector)); }

            .token.keyword    { color: var(--color-keyword); }
            .token.atrule     { color: var(--color-atrule, var(--color-keyword)); }
            .token.attr-value { color: var(--color-attr-value, var(--color-keyword)); }

            .token.function { color: var(--color-function); }

            .token.variable  { color: var(--color-variable); }
            .token.regex     { color: var(--color-regex, var(--color-variable)); }
            .token.important { color: var(--color-important, var(--color-variable)); }

            .token.important, .token.bold { font-weight: bold; }
            .token.italic { font-style: italic; }
            .token.entity { cursor: help; }
        `))
        this.shadowRoot.appendChild(style);
        this.editorElement = document.createElement('div');
        this.shadowRoot.appendChild(this.editorElement);
        this.flask = new CodeFlask;
        this.flask.docroot = this.shadowRoot;
        this.flask.run(this.editorElement, {
            language: this.getAttribute('language') || 'markup',
            rtl: this.dir === 'rtl',
        });
        this.flask.onUpdate(code => {
            this.dispatchEvent(new CustomEvent('value-changed'));
        })
        this.value = this.getAttribute('value');
        if (!this.value) {
            this.initElement = document.createElement('div');
            this.shadowRoot.appendChild(this.initElement);
            this.initSlot = document.createElement('slot');
            this.initElement.appendChild(this.initSlot);
        }
    }

    connectedCallback() {
        if (this.initSlot) {
            let value = '';
            for (const node of this.initSlot.assignedNodes()) {
                value += node.outerHTML || node.textContent;
            }
            this.initElement.removeChild(this.initSlot);
            this.shadowRoot.removeChild(this.initElement);
            if (value.length > 0) {
                this.value = value
            }
        }
    }

    get value() {
        return this.flask.textarea && this.flask.textarea.value;
    }

    set value(val) {
        this.removeAttribute('value');
        return this.flask.update(val);
    }

    get language() {
        return this.flask.defaultLanguage;
    }

    set language(val) {
        if (!val) {
            return;
        }
        this.flask.defaultLanguage = this.flask.handleLanguage(val);
        for (const klass of this.flask.highlightCode.classList) {
            if (klass.startsWith('language-')) {
                this.flask.highlightCode.classList.remove(klass);
            }
        }
        this.flask.highlightCode.classList.add('language-' + this.flask.defaultLanguage);
        this.flask.highlight(this.flask.highlightCode);
        this.dispatchEvent(new CustomEvent('language-changed'));
    }

    get dir() {
        return this.getAttribute('dir') || 'ltr';
    }

    static get observedAttributes() {
        return ['language', 'value'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
    }
}

customElements.define('codeflask-editor', CodeflaskEditor);
