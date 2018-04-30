import { BACKGROUND_COLOR, LINE_HEIGHT } from './theme-default';

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
    z-index: 3;
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
    z-index: 2;
  }

  .codeflask__code {
    display: block;
    font-family: ${FONT_FAMILY};
  }

  .codeflask__flatten {
    padding: 10px;
    font-size: 12px;
    line-height: ${LINE_HEIGHT};
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

  .codeflask__line-highlight {
    position: absolute;
    top: 10px;
    left: 0;
    width: 100%;
    height: ${LINE_HEIGHT};
    background: rgba(0,0,0,0.1);
    z-index: 1;
  }

  .codeflask__lines {
    background: #eee;
    border-right: 1px solid #ccc;
    padding: 10px 4px;
    font-size: 12px;
    line-height: ${LINE_HEIGHT};
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