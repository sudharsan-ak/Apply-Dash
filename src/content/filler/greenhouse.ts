// Greenhouse-specific fill logic.
// Greenhouse uses React Select (div.select__control) for all EEO dropdowns.
// Regular inputs are plain HTML — handled by generic.ts.

import { normalizeCandidates } from './generic'

function sendToMainWorld(type: string, detail: Record<string, string>) {
  window.dispatchEvent(new CustomEvent(type, { detail }))
}


// Fills a Greenhouse React Select control using keyboard navigation via the
// MAIN world bridge (main-world.ts). Selects the best-matching option.
export async function fillGreenhouseSelect(el: HTMLElement, value: string | string[]): Promise<boolean> {
  const candidates = normalizeCandidates(value)

  const tmpId = `_ad_gh_${Date.now()}`
  el.setAttribute('data-ad-tmp', tmpId)

  // Open the dropdown with ArrowDown
  sendToMainWorld('__applydash_fill_select', { controlAttr: tmpId })

  // Wait for options to render
  let optionEls: HTMLElement[] = []
  for (let attempt = 0; attempt < 8; attempt++) {
    await new Promise<void>((r) => setTimeout(r, 300))
    optionEls = Array.from(
      document.querySelectorAll<HTMLElement>('.select__option, [class*="select__option"]')
    ).filter((opt) => {
      if (!opt.textContent?.trim()) return false
      const style = window.getComputedStyle(opt)
      return style.display !== 'none' && style.visibility !== 'hidden'
    })
    if (optionEls.length > 0) break
  }

  if (optionEls.length === 0) {
    el.removeAttribute('data-ad-tmp')
    return false
  }

  // Score every (candidate, option) pair — exact=3, prefix=2, substring=1
  let bestIdx = -1
  let bestScore = 0
  for (const candidate of candidates) {
    const lower = candidate.toLowerCase().trim()
    optionEls.forEach((opt, i) => {
      const text = (opt.textContent ?? '').trim().toLowerCase()
      let score = 0
      if (text === lower) score = 3
      else if (text.startsWith(lower) || lower.startsWith(text)) score = 2
      else if (text.includes(lower) || lower.includes(text)) score = 1
      if (score > bestScore) { bestScore = score; bestIdx = i }
    })
    if (bestScore === 3) break
  }

  if (bestIdx === -1) {
    sendToMainWorld('__applydash_close_select', {})
    el.removeAttribute('data-ad-tmp')
    return false
  }

  await new Promise<void>((r) => setTimeout(r, 200))
  sendToMainWorld('__applydash_select_by_index', { controlAttr: tmpId, idx: String(bestIdx) })

  // Wait for all ArrowDown keypresses (80ms each) + Enter + React commit
  await new Promise<void>((r) => setTimeout(r, 400 + bestIdx * 100))

  if (document.querySelector('.select__menu')) {
    sendToMainWorld('__applydash_close_select', {})
    await new Promise<void>((r) => setTimeout(r, 200))
  }

  el.removeAttribute('data-ad-tmp')
  return true
}
