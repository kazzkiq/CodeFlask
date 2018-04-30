export function inject_css(css, styleName) {
  const CSS_ID = styleName || 'codeflask-style';
  
  if (!css) {
    return false;
  }

  if (document.getElementById(CSS_ID)) {
    return true;
  }

  const style = document.createElement('style');

  style.innerHTML = css;
  style.id = CSS_ID;
  document.head.appendChild(style);

  return true;
}
