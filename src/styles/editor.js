import {
  BACKGROUND_COLOR,
  LINE_HEIGHT,
  FONT_SIZE
} from './theme-default';
import {
  cssSupports
} from '../utils/css-supports';

const FONT_FAMILY = `"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace`;
const COLOR = (cssSupports('caret-color', '#000')) ? BACKGROUND_COLOR : '#ccc';
const LINE_NUMBER_WIDTH = '40px'


export const editor_css = `

  textarea.codeflask__textarea.codeflask__flatten::selection {
      background: #3332;
  }

  .codeflask {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .codeflask, .codeflask * {
    box-sizing: border-box;
  }

  .codeflask__pre {
    pointer-events: none;
    z-index: 3;
    overflow: hidden;
  }

  .codeflask__textarea {
    background: none;
    border: none;
    color: ${COLOR};
    resize: none;
    font-family: ${FONT_FAMILY};
    -webkit-appearance: pre;
    caret-color: #111;
    z-index: 2;
    width: 100%;
    height: 100%;
  }

  .codeflask--has-line-numbers .codeflask__textarea {
    width: calc(100% - ${LINE_NUMBER_WIDTH});
  }

  .codeflask__code {
    display: block;
    font-family: ${FONT_FAMILY};
    overflow: hidden;
  }

  .codeflask__flatten {
    padding: 0;
    font-size: ${FONT_SIZE};
    line-height: ${LINE_HEIGHT};
    white-space: pre;
    position: absolute;
    top: 0;
    left: 0;
    overflow: auto;
    margin: 0 !important;
    outline: none;
    text-align: left;
  }

  .codeflask--has-line-numbers .codeflask__flatten {
    left: ${LINE_NUMBER_WIDTH};
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
    padding: 0 4px;
    font-size: 12px;
    line-height: ${LINE_HEIGHT};
    font-family: 'Cousine', monospace;
    position: absolute;
    left: 0;
    top: 0;
    width: ${LINE_NUMBER_WIDTH};
    height: 100%;
    text-align: right;
    color: #999;
    z-index: 9;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
  }

  .codeflask__lines__line {
    display: block;
  }
  
  .codeflask_active_line{
    z-index: 2;
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100%;
    height: ${LINE_HEIGHT};
    background-color: rgba(153, 153, 170, 0.2);
  }

  .codeflask.codeflask--has-line-numbers {
    padding-left: ${LINE_NUMBER_WIDTH};
  }

  .codeflask.codeflask--has-line-numbers:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: ${LINE_NUMBER_WIDTH};
    height: 100%;
    background: #eee;
    z-index: 9;
  }
`;