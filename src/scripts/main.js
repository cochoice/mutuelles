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

// Pop-up « Prendre rendez-vous » (absente de la page mentions légales)
const dialog = document.getElementById('demo')
if (dialog) initDemo()

function initDemo() {
  // <dialog> natif : Échap géré par le navigateur
  const form = document.getElementById('demo-form')
  const status = form.querySelector('[data-demo-status]')
  const submit = form.querySelector('[type="submit"]')

  const setStatus = (text, state) => {
    status.textContent = text
    status.dataset.state = state
  }

  document.querySelectorAll('[data-open-demo]').forEach((btn) =>
    btn.addEventListener('click', () => {
      dialog.showModal()
      form.elements[0].focus()
    }),
  )
  dialog.querySelector('[data-close-demo]').addEventListener('click', () => dialog.close())
  // Clic sur le fond : la cible est le <dialog> lui-même (le contenu est dans une div interne)
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close() })

  // Validation côté client, messages en vouvoiement
  const messageFor = (field) => {
    if (field.type === 'checkbox') return 'Merci de cocher la case de consentement pour que nous puissions vous recontacter.'
    if (field.validity.typeMismatch) return 'Cette adresse email ne semble pas valide (exemple : prenom.nom@mutuelle.fr).'
    const label = form.querySelector(`label[for="${field.id}"]`).firstChild.textContent.trim()
    return `Le champ « ${label} » est obligatoire.`
  }

  form.addEventListener('input', (e) => e.target.removeAttribute('aria-invalid'))

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const fields = [...form.elements].filter((el) => el.willValidate)
    fields.forEach((el) => el.toggleAttribute('aria-invalid', !el.checkValidity()))
    const invalid = fields.find((el) => !el.checkValidity())
    if (invalid) {
      setStatus(messageFor(invalid), 'error')
      invalid.focus()
      return
    }

    const { action, fields: entries } = CONFIG.googleForm
    if (!action) {
      setStatus('Le formulaire n’est pas encore relié : rien n’a été envoyé.', 'info')
      return
    }

    // Chaque champ est associé à son identifiant entry.XXXX du Google Form
    const body = new URLSearchParams()
    const data = new FormData(form)
    Object.entries(entries).forEach(([name, entry]) => {
      if (entry && data.get(name)) body.append(entry, data.get(name))
    })

    submit.disabled = true
    try {
      // Réponse opaque en no-cors : on ne peut pas lire le statut, seule une erreur réseau est détectable
      await fetch(action, { method: 'POST', mode: 'no-cors', body })
      form.reset()
      setStatus('Merci, votre demande est bien envoyée. Nous revenons vers vous pour fixer un rendez-vous.', 'ok')
    } catch {
      setStatus('L’envoi n’a pas fonctionné, rien n’a été transmis. Merci de réessayer un peu plus tard.', 'error')
    } finally {
      submit.disabled = false
    }
  })
}
