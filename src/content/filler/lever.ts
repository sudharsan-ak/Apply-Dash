// Lever-specific fill logic.
// Lever checks isTrusted on input events, so typing must go through the MAIN world bridge.

import { dispatch, setNativeValue } from './generic'

function sendToMainWorld(type: string, detail: Record<string, unknown>) {
  window.dispatchEvent(new CustomEvent(type, { detail }))
}

// Fills a Lever location autocomplete field.
// Uses the MAIN world bridge to fire a trusted InputEvent so Lever's React onChange
// fires and shows the suggestion dropdown.
export async function fillLeverLocation(el: HTMLElement, candidates: string[]): Promise<boolean> {
  const input = el instanceof HTMLInputElement ? el : el.querySelector<HTMLInputElement>('input')
  if (!input) return false

  // Build a stable CSS selector to pass to main-world
  const tmpId = `_ad_lv_${Date.now()}`
  input.setAttribute('data-ad-tmp', tmpId)
  const selector = `[data-ad-tmp="${tmpId}"]`

  input.focus()
  input.click()

  for (const candidate of candidates) {
    // Fire the InputEvent from MAIN world so isTrusted=true → Lever shows suggestions
    sendToMainWorld('__applydash_type_value', { selector, value: candidate })

    const lower = candidate.toLowerCase().trim()
    for (let attempt = 0; attempt < 8; attempt++) {
      await new Promise<void>((r) => setTimeout(r, 400))

      // Lever renders suggestions as <ul> > <li> — no role="option"
      const options = Array.from(
        document.querySelectorAll<HTMLElement>(
          '[role="option"], [role="listbox"] li, ul li'
        )
      ).filter((opt) => {
        const text = opt.textContent?.trim()
        if (!text || text.length > 100) return false
        const s = window.getComputedStyle(opt)
        return s.display !== 'none' && s.visibility !== 'hidden' && s.opacity !== '0'
      })

      if (options.length === 0) continue

      const exactMatch = options.find((o) => o.textContent!.trim().toLowerCase() === lower)
      const partialMatch = options.find((o) => {
        const t = o.textContent!.trim().toLowerCase()
        return t.includes(lower) || lower.includes(t)
      })
      const match = exactMatch ?? partialMatch
      if (!match) continue

      match.click()
      await new Promise<void>((r) => setTimeout(r, 200))
      dispatch(input, 'change')
      dispatch(input, 'blur')
      input.removeAttribute('data-ad-tmp')
      return true
    }
  }

  input.removeAttribute('data-ad-tmp')
  return false
}

// Fills a plain Lever text/email/tel input using the MAIN world bridge so
// the InputEvent is trusted and Lever's React state updates correctly.
export async function fillLeverText(el: HTMLInputElement | HTMLTextAreaElement, value: string): Promise<void> {
  if (el instanceof HTMLInputElement) {
    const tmpId = `_ad_lv_${Date.now()}`
    el.setAttribute('data-ad-tmp', tmpId)
    sendToMainWorld('__applydash_type_value', { selector: `[data-ad-tmp="${tmpId}"]`, value })
    await new Promise<void>((r) => setTimeout(r, 100))
    el.removeAttribute('data-ad-tmp')
  } else {
    // Textarea — native setter + InputEvent is fine for textareas
    el.focus()
    setNativeValue(el, value)
    el.dispatchEvent(new InputEvent('input', { bubbles: true, cancelable: true }))
    dispatch(el, 'change')
    dispatch(el, 'blur')
  }
}
