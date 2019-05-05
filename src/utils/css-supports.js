export function cssSupports (property, value) {
  if (typeof CSS !== 'undefined') {
    return CSS.supports(property, value)
  }

  if (typeof document === 'undefined') {
    return false;
  }

  return toCamelCase(property) in document.body.style
}

export function toCamelCase (cssProperty) {
  cssProperty = cssProperty
    .split('-')
    .filter(word => !!word)
    .map(word => word[0].toUpperCase() + word.substr(1))
    .join('')

  return cssProperty[0].toLowerCase() + cssProperty.substr(1)
}
