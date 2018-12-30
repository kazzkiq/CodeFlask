const entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
}

export function escapeHtml (string) {
  return String(string).replace(/[&<>"'`=/]/g, function (s) {
    return entityMap[s]
  })
}
