document.addEventListener('DOMContentLoaded', () => {
  const p = document.createElement('p')
  const text = document.createTextNode('hi')
  p.appendChild(text)
  document.body.appendChild(p)
})
