// Runs in MAIN world — has isTrusted=true for dispatched events.
// Listens for CustomEvents from the ISOLATED world content script and
// uses keyboard navigation to interact with React Select (keyboard events
// are not subject to isTrusted checks in React Select).

function key(el: HTMLElement, k: string, code: string, keyCode: number) {
  el.dispatchEvent(new KeyboardEvent('keydown',  { key: k, code, keyCode, bubbles: true, cancelable: true }))
  el.dispatchEvent(new KeyboardEvent('keypress', { key: k, code, keyCode, bubbles: true, cancelable: true }))
  el.dispatchEvent(new KeyboardEvent('keyup',    { key: k, code, keyCode, bubbles: true, cancelable: true }))
}

window.addEventListener('__applydash_fill_select', (e: Event) => {
  const { controlAttr } = (e as CustomEvent).detail as { controlAttr: string }

  const ctrl = document.querySelector<HTMLElement>(`[data-ad-tmp="${controlAttr}"]`)
  if (!ctrl) return

  const input = ctrl.querySelector<HTMLInputElement>('input') ?? ctrl
  input.focus()
  // ArrowDown opens the menu and highlights index 0
  key(input, 'ArrowDown', 'ArrowDown', 40)
})

// Receives the exact 0-based index to navigate to. Presses ArrowDown idx times
// with a delay between each, then Enter. Uses setTimeout chain so React processes
// each keypress before the next one fires.
window.addEventListener('__applydash_select_by_index', (e: Event) => {
  const { controlAttr, idx: idxRaw } = (e as CustomEvent).detail as { controlAttr: string; idx: string }
  const idx = parseInt(idxRaw, 10)

  const ctrl = document.querySelector<HTMLElement>(`[data-ad-tmp="${controlAttr}"]`)
  if (!ctrl) return

  const input = ctrl.querySelector<HTMLInputElement>('input') ?? ctrl
  if (document.activeElement !== input) input.focus()

  // Fire each ArrowDown with 80ms gap so React processes state between presses
  let step = 0
  function pressNext() {
    if (step < idx) {
      key(input, 'ArrowDown', 'ArrowDown', 40)
      step++
      setTimeout(pressNext, 80)
    } else {
      // All ArrowDowns done — press Enter to select
      setTimeout(() => key(input, 'Enter', 'Enter', 13), 80)
    }
  }
  pressNext()
})

window.addEventListener('__applydash_close_select', () => {
  const active = document.activeElement as HTMLElement | null
  if (active) key(active, 'Escape', 'Escape', 27)
})

// Types a full string into the focused input using trusted InputEvent so React
// registers the value change and shows autocomplete suggestions.
window.addEventListener('__applydash_type_value', (e: Event) => {
  const { selector, value } = (e as CustomEvent).detail as { selector: string; value: string }
  const el = document.querySelector<HTMLInputElement>(selector)
  if (!el) return

  el.focus()
  el.click()

  // Set value via native setter so React's controlled-input invariant is satisfied
  const nativeSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
  if (nativeSetter) nativeSetter.call(el, value)
  else el.value = value

  // Fire a trusted InputEvent — this is the key: isTrusted=true triggers Lever's onChange
  el.dispatchEvent(new InputEvent('input', {
    bubbles: true,
    cancelable: true,
    composed: true,
    data: value,
    inputType: 'insertText',
  }))
  el.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))
})
