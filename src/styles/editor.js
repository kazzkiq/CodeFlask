import { BACKGROUND_COLOR } from './theme-default';

const FONT_FAMILY = `'Cousine', monospace;`;
const COLOR = (CSS.supports('caret-color', '#000')) ? BACKGROUND_COLOR : '#ccc';


export const editor_css = `
  .codeflask {
    position: relative;
    min-width: 500px;
    min-height: 400px;
    border: 1px solid #ccc;
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
    color: ${COLOR};
    z-index: 1;
    resize: none;
    font-family: ${FONT_FAMILY};
    -webkit-appearance: pre;
    caret-color: #111;
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
    height: 100%;
    overflow: auto;
    margin: 0 !important;
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