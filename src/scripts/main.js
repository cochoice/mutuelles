import '../styles/main.css'
import { CONFIG } from './config.js'

// Année dynamique dans le footer
document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()))

// Parallaxe légère des formes floues du hero (désactivée si l'utilisateur réduit les animations)
const blobs = [...document.querySelectorAll('[data-parallax]')]
if (blobs.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let ticking = false
  const update = () => {
    const y = window.scrollY
    blobs.forEach((el) => (el.style.transform = `translate3d(0, ${y * Number(el.dataset.parallax)}px, 0)`))
    ticking = false
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update) }
  }, { passive: true })
}

// Pop-up « Prendre rendez-vous » : le formulaire Tally n'est chargé qu'au premier clic (sobriété, aucun tiers au chargement de la page)
const dialog = document.getElementById('demo')
if (dialog) initDemo()

function initDemo() {
  const { formId, source } = CONFIG.tally
  const frame = dialog.querySelector('[data-tally-frame]')
  const link = dialog.querySelector('[data-tally-link]')
  link.href = `https://tally.so/r/${formId}?source=${source}`

  document.querySelectorAll('[data-open-demo]').forEach((btn) =>
    btn.addEventListener('click', () => {
      if (!frame.src) frame.src = `https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&source=${source}`
      dialog.showModal()
    }),
  )
  dialog.querySelector('[data-close-demo]').addEventListener('click', () => dialog.close())
  // Clic sur le fond : la cible est le <dialog> lui-même (le contenu est dans une div interne)
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close() })
}
