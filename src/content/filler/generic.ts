// Generic fill primitives — framework-agnostic helpers used across all sites.

export function dispatch(el: HTMLElement, eventName: string, init?: EventInit) {
  el.dispatchEvent(new Event(eventName, { bubbles: true, cancelable: true, ...init }))
}

export function dispatchInput(el: HTMLElement) {
  el.dispatchEvent(new InputEvent('input', { bubbles: true, cancelable: true }))
}

export function normalizeCandidates(value: string | string[]): string[] {
  return Array.isArray(value) ? value.filter(Boolean) : [value].filter(Boolean)
}

export function setNativeValue(el: HTMLInputElement | HTMLTextAreaElement, value: string) {
  const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype
  const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set
  if (setter) setter.call(el, value)
  else el.value = value
}

export function fillText(el: HTMLInputElement | HTMLTextAreaElement, value: string) {
  el.focus()
  setNativeValue(el, value)
  dispatchInput(el)
  dispatch(el, 'change')
  dispatch(el, 'blur')
}

export function fillSelect(el: HTMLSelectElement, value: string | string[]) {
  const options = Array.from(el.options)
  for (const candidate of normalizeCandidates(value)) {
    const lower = candidate.toLowerCase()
    let matched = options.find((o) => o.value === candidate || o.text === candidate)
    if (!matched) matched = options.find((o) =>
      o.value.toLowerCase() === lower || o.text.toLowerCase() === lower
    )
    if (!matched) matched = options.find((o) =>
      o.text.toLowerCase().includes(lower) || lower.includes(o.text.toLowerCase())
    )
    if (!matched) continue
    el.focus()
    el.value = matched.value
    dispatchInput(el)
    dispatch(el, 'change')
    dispatch(el, 'blur')
    return true
  }
  return false
}

export function fillCheckbox(el: HTMLInputElement, shouldCheck: boolean) {
  if (el.checked !== shouldCheck) {
    el.focus()
    el.checked = shouldCheck
    dispatch(el, 'click')
    dispatch(el, 'change')
    dispatch(el, 'blur')
  }
}

export function fillAriaCheckbox(el: HTMLElement, shouldCheck: boolean) {
  const checked = el.getAttribute('aria-checked') === 'true'
  if (checked === shouldCheck) return true
  el.focus()
  el.click()
  dispatch(el, 'change')
  dispatch(el, 'blur')
  return el.getAttribute('aria-checked') === String(shouldCheck)
}

export function fillRadioByName(representativeRadio: HTMLInputElement, value: string | string[]) {
  const groupName = representativeRadio.getAttribute('name')
  const radios = groupName
    ? Array.from(document.querySelectorAll<HTMLInputElement>(`input[type="radio"][name="${CSS.escape(groupName)}"]`))
    : [representativeRadio]

  for (const candidate of normalizeCandidates(value)) {
    const lower = candidate.toLowerCase().trim()
    for (const radio of radios) {
      let optionLabel = ''
      let labelEl: HTMLElement | null = null
      if (radio.id) {
        const lbl = document.querySelector<HTMLElement>(`label[for="${CSS.escape(radio.id)}"]`)
        if (lbl) { labelEl = lbl; optionLabel = lbl.textContent?.trim() ?? '' }
      }
      if (!optionLabel) {
        const parent = radio.closest('label')
        if (parent) {
          labelEl = parent as HTMLElement
          const clone = parent.cloneNode(true) as HTMLElement
          clone.querySelectorAll('input').forEach(i => i.remove())
          optionLabel = clone.textContent?.trim() ?? ''
        }
      }
      if (!optionLabel) optionLabel = radio.value
      const optLower = optionLabel.toLowerCase().trim()
      if (optLower === lower || optLower.startsWith(lower) || lower.startsWith(optLower)) {
        if (radio.checked) return true
        if (labelEl) labelEl.click()
        else { radio.focus(); radio.checked = true; dispatch(radio, 'click'); dispatch(radio, 'change'); dispatch(radio, 'blur') }
        return true
      }
    }
  }
  return false
}

export function fillRadio(container: HTMLElement, value: string | string[]) {
  const radios = Array.from(container.querySelectorAll<HTMLInputElement>('input[type="radio"]'))
  for (const candidate of normalizeCandidates(value)) {
    const lower = candidate.toLowerCase()
    for (const radio of radios) {
      const label = document.querySelector(`label[for="${CSS.escape(radio.id)}"]`)
      const labelText = label?.textContent?.trim().toLowerCase() ?? radio.value.toLowerCase()
      if (labelText.includes(lower) || lower.includes(labelText)) {
        if (label instanceof HTMLElement) label.click()
        else { radio.focus(); radio.checked = true; dispatch(radio, 'click') }
        dispatch(radio, 'change')
        dispatch(radio, 'blur')
        return true
      }
    }
  }
  return false
}

export function fillAriaRadio(representativeRadio: HTMLElement, value: string | string[]) {
  const group = representativeRadio.closest('[role="radiogroup"]') ?? representativeRadio.parentElement
  if (!group) return false
  const options = Array.from(group.querySelectorAll<HTMLElement>('[role="radio"]'))
  for (const candidate of normalizeCandidates(value)) {
    const lower = candidate.toLowerCase().trim()
    for (const option of options) {
      const text = (option.getAttribute('aria-label') ?? option.textContent ?? '').toLowerCase().trim()
      if (!text) continue
      if (text === lower || text.includes(lower) || lower.includes(text)) {
        option.focus()
        option.click()
        dispatch(option, 'change')
        dispatch(option, 'blur')
        return true
      }
    }
  }
  return false
}

export function fillContentEditable(el: HTMLElement, value: string) {
  el.focus()
  el.textContent = value
  dispatchInput(el)
  dispatch(el, 'input')
  dispatch(el, 'change')
  dispatch(el, 'blur')
}

export async function fillFileInput(el: HTMLInputElement, buffer: ArrayBuffer, fileName: string) {
  const file = new File([buffer], fileName, { type: 'application/pdf' })
  const dt = new DataTransfer()
  dt.items.add(file)
  el.files = dt.files
  dispatch(el, 'change')
  dispatch(el, 'input')
}

// Clicks to open a pure-selection dropdown (no typing), then clicks the matching option.
// Used for non-React dropdowns that open a listbox on click (Lever EEO, etc.).
export async function fillClickDropdown(el: HTMLElement, value: string | string[]): Promise<boolean> {
  el.focus()
  el.click()

  for (let attempt = 0; attempt < 4; attempt++) {
    await new Promise<void>((r) => setTimeout(r, 350))
    const listbox = document.querySelector<HTMLElement>(
      '[role="listbox"], [aria-expanded="true"] + *, [data-radix-popper-content-wrapper]'
    )
    const pool = listbox
      ? Array.from(listbox.querySelectorAll<HTMLElement>('[role="option"], li, button, div'))
      : Array.from(document.querySelectorAll<HTMLElement>('[role="option"]'))
    const options = pool.filter((o) => {
      if (!o.textContent?.trim()) return false
      const s = window.getComputedStyle(o)
      return s.display !== 'none' && s.visibility !== 'hidden' && s.opacity !== '0'
    })
    if (options.length === 0) continue

    for (const candidate of normalizeCandidates(value)) {
      const lower = candidate.toLowerCase().trim()
      const match = options.find((o) => {
        const t = (o.textContent ?? '').trim().toLowerCase()
        return t === lower || t.includes(lower) || lower.includes(t)
      })
      if (!match) continue
      match.click()
      await new Promise<void>((r) => setTimeout(r, 150))
      dispatch(el, 'change')
      dispatch(el, 'blur')
      return true
    }
  }
  return false
}
