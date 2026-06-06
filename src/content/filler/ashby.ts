// Ashby-specific fill logic.
// Ashby uses React controlled components with Radix UI primitives.
// Key patterns: Yes/No button groups, checkbox groups, date pickers, combobox location.

import { dispatch, dispatchInput, normalizeCandidates, setNativeValue } from './generic'

// Walks the React fiber tree to call onClick/onChange directly.
// Needed because Ashby's buttons check event.isTrusted — fiber bypass sidesteps that.
export function triggerReactHandler(
  el: HTMLElement,
  eventType: 'click' | 'change' | 'mousedown' = 'click',
  checkedValue?: boolean
): boolean {
  const fiberKey = Object.keys(el).find(
    k => k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance')
  )
  if (!fiberKey) return false

  const handlerProp = eventType === 'click' ? 'onClick' : eventType === 'mousedown' ? 'onMouseDown' : 'onChange'
  const alternatePropNames = handlerProp === 'onChange'
    ? ['onChange', 'onCheckedChange', 'onValueChange']
    : [handlerProp]

  const syntheticEvent = {
    target: el, currentTarget: el, type: eventType,
    bubbles: true, cancelable: true,
    preventDefault: () => {}, stopPropagation: () => {},
    nativeEvent: new MouseEvent(eventType, { bubbles: true }),
    persist: () => {},
  }

  let fiber = (el as any)[fiberKey]
  while (fiber) {
    const props = fiber.memoizedProps
    if (props) {
      for (const prop of alternatePropNames) {
        const handler = props[prop]
        if (typeof handler === 'function') {
          if (prop === 'onCheckedChange' && checkedValue !== undefined) handler(checkedValue)
          else handler(syntheticEvent)
          return true
        }
      }
    }
    fiber = fiber.return
  }
  return false
}

function isButtonAlreadyActive(button: HTMLButtonElement): boolean {
  const cls = button.getAttribute('class') ?? ''
  if (/\b(_active_|_selected_|_checked_|active|selected|checked)\b/i.test(cls)) return true
  if (button.getAttribute('aria-pressed') === 'true') return true
  if (button.getAttribute('aria-selected') === 'true') return true
  if (button.getAttribute('data-state') === 'on' || button.getAttribute('data-state') === 'active') return true
  return false
}

// Fills Ashby Yes/No button groups. Tries React fiber handler first (bypasses isTrusted),
// falls back to native MouseEvent.
export function fillButtonGroup(container: HTMLElement, value: string | string[]): boolean {
  const buttons = Array.from(container.querySelectorAll<HTMLButtonElement>('button'))
  for (const candidate of normalizeCandidates(value)) {
    const lower = candidate.toLowerCase().trim()
    for (const button of buttons) {
      const text = button.textContent?.trim().toLowerCase() ?? ''
      if (!text) continue
      if (text === lower || text.includes(lower) || lower.includes(text)) {
        if (isButtonAlreadyActive(button)) return true
        button.focus()
        const handledByReact = triggerReactHandler(button, 'click')
        if (!handledByReact) {
          button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, composed: true, view: window }))
        }
        return true
      }
    }
  }
  return false
}

// Fills Ashby's combobox autocomplete fields (location, "how did you hear", etc.).
// Types the value using the native setter, fires InputEvent, then clicks the suggestion.
export async function fillAriaCombobox(el: HTMLElement, value: string | string[]): Promise<boolean> {
  el.focus()
  el.click()
  for (const candidate of normalizeCandidates(value)) {
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      setNativeValue(el, candidate)
    } else if (el.getAttribute('contenteditable') === 'true') {
      el.textContent = candidate
    }
    el.dispatchEvent(new InputEvent('input', { bubbles: true, cancelable: true, data: candidate }))
    dispatch(el, 'change')

    const lower = candidate.toLowerCase().trim()
    for (let attempt = 0; attempt < 6; attempt++) {
      await new Promise<void>((r) => setTimeout(r, 400))
      const options = Array.from(
        document.querySelectorAll<HTMLElement>('[role="option"], [role="listbox"] li, [role="listbox"] button, ul li, datalist option')
      ).filter((o) => {
        const t = o.textContent?.trim()
        if (!t) return false
        const s = window.getComputedStyle(o)
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
      await new Promise<void>((r) => setTimeout(r, 150))
      dispatch(el, 'change')
      dispatch(el, 'blur')
      return true
    }
  }
  return false
}

// Fills Ashby's date picker calendar widget by clicking today's date cell.
export async function fillDatePicker(el: HTMLElement): Promise<boolean> {
  const today = new Date()
  const todayDay = today.getDate()
  const todayMonth = today.getMonth()
  const todayYear = today.getFullYear()

  el.focus()
  el.click()
  await new Promise<void>(r => setTimeout(r, 400))

  for (const selector of ['[role="gridcell"]', '[role="option"]', 'td', 'button']) {
    for (const cell of Array.from(document.querySelectorAll<HTMLElement>(selector))) {
      if (cell.textContent?.trim() !== String(todayDay)) continue
      const style = window.getComputedStyle(cell)
      if (style.display === 'none' || style.visibility === 'hidden') continue
      if (parseFloat(style.opacity) < 0.5) continue
      cell.click()
      await new Promise<void>(r => setTimeout(r, 200))
      const val = (el as HTMLInputElement).value ?? el.textContent ?? ''
      if (val) return true
    }
  }

  // Fallback: type MM/DD/YYYY directly
  const mm = String(todayMonth + 1).padStart(2, '0')
  const dd = String(todayDay).padStart(2, '0')
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
    setNativeValue(el, `${mm}/${dd}/${todayYear}`)
  }
  dispatchInput(el)
  dispatch(el, 'input')
  dispatch(el, 'change')
  dispatch(el, 'blur')
  return true
}
