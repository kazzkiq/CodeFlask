export function injectCss (css, styleName, parent) {
  const CSS_ID = styleName || 'codeflask-style'
  const PARENT = parent || document.head

  if (!css) {
    return false
  }

  if (document.getElementById(CSS_ID)) {
    return true
  }

  const style = document.createElement('style')

  style.innerHTML = css
  style.id = CSS_ID
  PARENT.appendChild(style)

  return true
}
