import type { CustomQA, DetectedField } from '../../shared/types'
import { matchCustomQA, matchFieldType } from './fieldMap'

let _idCounter = 0
function genId() { return `field-${++_idCounter}` }

// Extracts the human-readable label for a given form element
export function getLabelForElement(el: HTMLElement): string {
  // 1. <label for="id">
  if (el.id) {
    const label = document.querySelector(`label[for="${CSS.escape(el.id)}"]`)
    if (label) return label.textContent?.trim() ?? ''
  }

  // 2. aria-label
  const ariaLabel = el.getAttribute('aria-label')
  if (ariaLabel) return ariaLabel.trim()

  // 3. aria-labelledby
  const labelledBy = el.getAttribute('aria-labelledby')
  if (labelledBy) {
    const parts = labelledBy.split(/\s+/)
    const text = parts.map(id => document.getElementById(id)?.textContent?.trim()).filter(Boolean).join(' ')
    if (text) return text
  }

  // 4. Check element's own previous sibling first (e.g. Lever: <label>Full name</label><input>)
  const ownPrev = el.previousElementSibling
  if (ownPrev) {
    const tag = ownPrev.tagName
    if (['LABEL', 'SPAN', 'P', 'DIV', 'H1', 'H2', 'H3', 'H4'].includes(tag)) {
      const text = ownPrev.textContent?.trim()
      if (text && text.length < 120 && !text.includes('\n')) return text
    }
  }

  // 4b. Lever: <div class="application-question"><label>Full name</label><div class="input"><input></div></div>
  //     The input is inside a wrapper div; label is the wrapper's previousElementSibling.
  //     Also covers grandparent-level label siblings (2 levels up).
  for (const ancestor of [el.parentElement, el.parentElement?.parentElement]) {
    const prev = ancestor?.previousElementSibling
    if (!prev) continue
    const tag = prev.tagName
    if (['LABEL', 'SPAN', 'P', 'DIV', 'H1', 'H2', 'H3', 'H4'].includes(tag)) {
      const text = prev.textContent?.trim().replace(/\s+/g, ' ')
      if (text && text.length < 120) return text
    }
  }

  // 5. Walk up DOM to find containing label or legend
  let parent = el.parentElement
  let depth = 0
  while (parent && depth < 6) {
    if (parent.tagName === 'LABEL') {
      const clone = parent.cloneNode(true) as HTMLElement
      clone.querySelectorAll('input, select, textarea').forEach((c) => c.remove())
      const text = clone.textContent?.trim()
      if (text) return text
    }
    if (parent.tagName === 'FIELDSET') {
      const legend = parent.querySelector(':scope > legend')
      if (legend) return legend.textContent?.trim() ?? ''
    }
    // Look for a preceding sibling that looks like a label
    const prevSibling = parent.previousElementSibling
    if (prevSibling) {
      const tag = prevSibling.tagName
      if (['LABEL', 'SPAN', 'P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'LEGEND'].includes(tag)) {
        const text = prevSibling.textContent?.trim()
        if (text && text.length < 120 && !text.includes('\n')) return text
      }
    }
    parent = parent.parentElement
    depth++
  }

  // 5. placeholder
  const placeholder = el.getAttribute('placeholder')
  if (placeholder) return placeholder.trim()

  // 6. name attribute as last resort
  const name = el.getAttribute('name')
  if (name) return name.replace(/[_\-[\]]/g, ' ').trim()

  return ''
}

// Gets the label for a radio GROUP (fieldset legend or nearest question text)
function getRadioGroupLabel(radio: HTMLInputElement): string {
  // 1. Fieldset legend
  const fieldset = radio.closest('fieldset')
  if (fieldset) {
    const legend = fieldset.querySelector('legend')
    if (legend) return legend.textContent?.trim() ?? ''
  }

  // 2. role="radiogroup" aria-label or aria-labelledby
  const group = radio.closest('[role="radiogroup"]')
  if (group) {
    const ariaLabel = group.getAttribute('aria-label')
    if (ariaLabel) return ariaLabel
    const labelledBy = group.getAttribute('aria-labelledby')
    if (labelledBy) {
      const el = document.getElementById(labelledBy)
      if (el) return el.textContent?.trim() ?? ''
    }
  }

  // 3. Walk up and find a heading/paragraph above the radio group container
  let parent = radio.parentElement
  let depth = 0
  while (parent && depth < 8) {
    const prev = parent.previousElementSibling
    if (prev) {
      const text = prev.textContent?.trim()
      if (text && text.length > 4 && text.length < 200) return text
    }
    parent = parent.parentElement
    depth++
  }

  return radio.getAttribute('name') ?? ''
}

function isPdfFileInput(el: HTMLElement): boolean {
  if (el.tagName !== 'INPUT') return false
  const input = el as HTMLInputElement
  if (input.type !== 'file') return false
  const accept = input.getAttribute('accept') ?? ''
  return accept === '' || accept.includes('pdf') || accept.includes('*')
}

function isVisible(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect()
  if (rect.width === 0 && rect.height === 0) return false
  const style = window.getComputedStyle(el)
  return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0'
}

function getAriaRadioGroupLabel(group: HTMLElement): string {
  const ariaLabel = group.getAttribute('aria-label')
  if (ariaLabel) return ariaLabel.trim()

  const labelledBy = group.getAttribute('aria-labelledby')
  if (labelledBy) {
    const parts = labelledBy.split(/\s+/)
    const text = parts
      .map((id) => document.getElementById(id)?.textContent?.trim())
      .filter(Boolean)
      .join(' ')
    if (text) return text
  }

  let parent = group.parentElement
  let depth = 0
  while (parent && depth < 6) {
    const prev = parent.previousElementSibling
    const text = prev?.textContent?.trim()
    if (text && text.length > 4 && text.length < 200) return text
    parent = parent.parentElement
    depth++
  }

  return ''
}

// Returns the clean question label from Ashby's title element
function getAshbyFieldLabel(container: HTMLElement): string {
  return container.querySelector<HTMLElement>('.ashby-application-form-question-title')?.textContent?.trim() ?? ''
}

// Finds the lowest DOM ancestor that contains every checkbox in the group.
// Used to give the filler a container whose querySelectorAll('input[type=checkbox]')
// returns all options — enabling the multi-checkbox fill path in filler/index.ts.
function findGroupContainer(checkboxes: HTMLInputElement[]): HTMLElement {
  if (checkboxes.length === 1) return checkboxes[0]
  let el: HTMLElement = checkboxes[0].parentElement ?? checkboxes[0]
  while (el.parentElement) {
    if (checkboxes.every((cb) => el.contains(cb))) break
    el = el.parentElement
  }
  return el
}

// Ashby's own "Autofill from resume" widget — identified by its root class.
// We must NOT touch this. Attaching a PDF here triggers Ashby's own parser
// which would overwrite our filled fields.
function isAshbyAutofillWidget(el: HTMLElement): boolean {
  return !!(
    el.closest('._autofillPane_oj0x8_445') ||
    el.closest('.ashby-application-form-autofill-uploader') ||
    el.closest('.ashby-application-form-autofill-input-root')
  )
}

export function detectFieldsHeuristic(customQA: CustomQA[] = []): DetectedField[] {
  const fields: DetectedField[] = []
  const seenElements = new Set<HTMLElement>()

  // ── Ashby-specific: process all field containers with exact DOM knowledge ──
  // All Ashby fields live in .ashby-application-form-field-entry (div) or
  // fieldset._fieldEntry_17tft_29. We use the clean .ashby-application-form-question-title
  // label for field matching (Ashby UUID names/ids are useless for matching).
  const ashbyContainers = Array.from(
    document.querySelectorAll<HTMLElement>(
      '.ashby-application-form-field-entry, fieldset._fieldEntry_17tft_29'
    )
  ).filter(isVisible)

  for (const container of ashbyContainers) {
    // Skip Ashby's own autofill uploader widget
    if (isAshbyAutofillWidget(container)) {
      container.querySelectorAll<HTMLElement>('input, button').forEach(el => seenElements.add(el))
      continue
    }

    const label = getAshbyFieldLabel(container)
    if (!label) continue

    const fieldType = matchFieldType(label)

    // ── 1. Actual resume file upload (div._container_1fd3o_71 with clip-path hidden input) ──
    //    This is the real "attach resume" field, NOT the autofill widget above.
    const resumeInput = container.querySelector<HTMLInputElement>(
      'div[class*="_container_1fd3o"] input[type="file"], ._container_1fd3o_71 input[type="file"]'
    )
    if (resumeInput) {
      seenElements.add(resumeInput)
      container.querySelectorAll<HTMLElement>('button').forEach(el => seenElements.add(el))
      fields.push({ id: genId(), element: resumeInput, fieldType: 'resumeUpload', label, expectedValue: '', status: 'pending' })
      continue
    }

    // Helper: push a detected field, falling back to custom Q&A if fieldType is unknown
    const pushField = (element: HTMLElement, ft = fieldType) => {
      if (ft !== 'unknown') {
        fields.push({ id: genId(), element, fieldType: ft, label, expectedValue: '', status: 'pending' })
        return
      }
      const customMatch = matchCustomQA(label, customQA)
      if (customMatch) {
        fields.push({ id: genId(), element, fieldType: 'custom', label, expectedValue: customMatch.id, status: 'pending' })
      }
    }

    // ── 2. Yes/No button group (work auth, sponsorship, custom yes/no questions) ──
    const yesNoContainer = container.querySelector<HTMLElement>('div[class*="_yesno_"]')
    if (yesNoContainer) {
      const buttons = yesNoContainer.querySelectorAll('button')
      yesNoContainer.querySelectorAll<HTMLElement>('button, input').forEach(el => seenElements.add(el))
      seenElements.add(yesNoContainer)
      if (buttons.length >= 2) pushField(yesNoContainer)
      continue
    }

    // ── 3. Checkbox group — "mark all that apply" (e.g. ethnicity) ──
    const checkboxInputs = container.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')
    if (checkboxInputs.length >= 2) {
      checkboxInputs.forEach(cb => seenElements.add(cb))
      pushField(container)
      continue
    }

    // ── 4. Radio group ──
    const radioInputs = container.querySelectorAll<HTMLInputElement>('input[type="radio"]')
    if (radioInputs.length >= 1) {
      radioInputs.forEach(r => seenElements.add(r))
      pushField(radioInputs[0])
      continue
    }

    // ── 5. Location combobox ──
    const combobox = container.querySelector<HTMLElement>(
      'input[role="combobox"], input[aria-autocomplete="list"]'
    )
    if (combobox) {
      seenElements.add(combobox)
      container.querySelectorAll<HTMLElement>('button').forEach(el => seenElements.add(el))
      pushField(combobox)
      continue
    }

    // ── 6. Plain text / email / tel input ──
    const textInput = container.querySelector<HTMLInputElement>(
      'input[type="text"], input[type="email"], input[type="tel"], input[type="url"]'
    )
    if (textInput) {
      seenElements.add(textInput)
      pushField(textInput)
      continue
    }
  }

  // ── Greenhouse-specific: React Select custom dropdowns ───────────────────
  // Greenhouse EEO fields (gender, race, disability, veteran, sexual orientation,
  // transgender) use the React Select library. The trigger is a div with class
  // "select__control" inside a container div. The question label lives in a
  // preceding <label> or in a <div class="field"> ancestor.
  const ghSelectControls = Array.from(
    document.querySelectorAll<HTMLElement>('.select__control')
  ).filter(isVisible)

  for (const control of ghSelectControls) {
    // Skip if already seen (e.g. caught by combobox selector above)
    if (seenElements.has(control)) continue

    // Greenhouse DOM: div.select > div.select__container > label + div.select-shell > ... > div.select__control
    // Walk up to find the nearest ancestor that has a <label> child
    let labelText = ''
    let ancestor = control.parentElement
    for (let d = 0; d < 6 && ancestor; d++) {
      const lbl = ancestor.querySelector<HTMLElement>(':scope > label, :scope > .label')
      if (lbl) { labelText = lbl.textContent?.trim() ?? ''; break }
      ancestor = ancestor.parentElement
    }
    if (!labelText) labelText = getLabelForElement(control)
    if (!labelText) continue

    const fieldType = matchFieldType(labelText)
    if (fieldType === 'unknown') continue

    // Mark inner inputs as seen so the general loop doesn't re-detect them
    control.querySelectorAll<HTMLElement>('input').forEach(el => seenElements.add(el))
    seenElements.add(control)

    fields.push({ id: genId(), element: control, fieldType, label: labelText, expectedValue: '', status: 'pending' })
  }

  // ── Lever-specific: explicit pre-pass for known Lever field structure ─────
  // Lever DOM: <li><label><div class="application-label">Full name<span>✱</span></div>
  //            <div class="application-field"><input></div></label></li>
  // Input lives INSIDE the label so sibling-walk and for= strategies both miss it.
  if (window.location.hostname.includes('lever.co')) {
    const leverLabels = Array.from(document.querySelectorAll<HTMLLabelElement>('label')).filter(isVisible)
    for (const label of leverLabels) {
      // Prefer .application-label text to avoid input placeholder text contaminating label
      const labelDiv = label.querySelector('.application-label') ?? label
      const rawText = labelDiv.textContent ?? ''
      // Strip required markers: ✱ is Lever's heavy asterisk, * is standard
      const labelText = rawText
        .replace(/[*✱✲＊⁎]/g, '')
        .replace(/ /g, ' ')
        .replace(/s+/g, ' ')
        .trim()
      if (!labelText) continue
      const fieldType = matchFieldType(labelText)
      if (fieldType === 'unknown') continue

      // Input is inside the label in Lever's DOM structure
      const input = label.querySelector<HTMLElement>('input:not([type="hidden"]), select, textarea')
      if (!input || seenElements.has(input)) continue
      if (!isVisible(input)) continue

      seenElements.add(input)
      seenElements.add(label)
      fields.push({ id: genId(), element: input, fieldType, label: labelText, expectedValue: '', status: 'pending' })
    }
  }

  // ── Radio groups (non-Ashby) — detect by name grouping ──────────────────
  const seenRadioNames = new Set<string>()
  const allRadios = Array.from(
    document.querySelectorAll<HTMLInputElement>('input[type="radio"]')
  ).filter(isVisible)

  for (const radio of allRadios) {
    if (seenElements.has(radio)) continue
    const groupName = radio.getAttribute('name') ?? radio.id ?? ''
    if (seenRadioNames.has(groupName)) continue
    seenRadioNames.add(groupName)

    const groupLabel = getRadioGroupLabel(radio)
    const combined = `${groupLabel} ${groupName}`
    const fieldType = matchFieldType(combined)

    document.querySelectorAll<HTMLInputElement>(`input[type="radio"][name="${CSS.escape(groupName)}"]`)
      .forEach(r => seenElements.add(r))

    if (fieldType !== 'unknown') {
      fields.push({ id: genId(), element: radio, fieldType, label: groupLabel || groupName, expectedValue: '', status: 'pending' })
    }
  }

  // ── ARIA radio groups ─────────────────────────────────────────────────────
  const ariaRadioGroups = Array.from(
    document.querySelectorAll<HTMLElement>('[role="radiogroup"]')
  ).filter(isVisible)

  for (const group of ariaRadioGroups) {
    const radios = Array.from(group.querySelectorAll<HTMLElement>('[role="radio"]')).filter(isVisible)
    if (radios.length === 0) continue

    radios.forEach((radio) => seenElements.add(radio))
    const label = getAriaRadioGroupLabel(group)
    const fieldType = matchFieldType(label)

    if (fieldType !== 'unknown') {
      fields.push({ id: genId(), element: radios[0], fieldType, label: label || 'Radio group', expectedValue: '', status: 'pending' })
    }
  }

  // ── Checkbox groups (Lever, etc.) — group by shared name attribute ──────────
  // When 2+ checkboxes share a name (e.g. cards[pronoun][]) they form a multi-select
  // group. We detect them as ONE field using the group-level label so individual option
  // labels ("He/Him", "Asian") don't each get matched as separate fields.
  const checkboxGroupMap = new Map<string, HTMLInputElement[]>()
  const allCheckboxInputs = Array.from(
    document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')
  ).filter((el) => isVisible(el) && !seenElements.has(el))

  for (const cb of allCheckboxInputs) {
    const name = cb.getAttribute('name') ?? ''
    if (!name) continue
    if (!checkboxGroupMap.has(name)) checkboxGroupMap.set(name, [])
    checkboxGroupMap.get(name)!.push(cb)
  }

  for (const [, checkboxes] of checkboxGroupMap) {
    if (checkboxes.length < 2) continue // single checkbox — handled individually below

    // Mark all as seen so the general loop skips individual options
    checkboxes.forEach((cb) => seenElements.add(cb))

    const groupLabel = getRadioGroupLabel(checkboxes[0])
    const fieldType = matchFieldType(groupLabel)
    const container = findGroupContainer(checkboxes)

    if (fieldType !== 'unknown') {
      fields.push({ id: genId(), element: container, fieldType, label: groupLabel, expectedValue: '', status: 'pending' })
    } else if (groupLabel) {
      const customMatch = matchCustomQA(groupLabel, customQA)
      if (customMatch) {
        fields.push({ id: genId(), element: container, fieldType: 'custom', label: groupLabel, expectedValue: customMatch.id, status: 'pending' })
      }
    }
  }

  // ── All other inputs (non-Ashby, non-radio) ───────────────────────────────
  const nonRadioSelector = [
    'input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"]):not([type="image"]):not([type="radio"])',
    'select',
    'textarea',
    '[role="combobox"]',
    '[role="checkbox"]',
    '[role="radio"]',
  ].join(', ')

  const elements = Array.from(document.querySelectorAll<HTMLElement>(nonRadioSelector))

  for (const el of elements) {
    if (seenElements.has(el)) continue
    seenElements.add(el)
    if (!isVisible(el) && !isPdfFileInput(el)) continue

    // Skip Ashby autofill widget inputs that snuck through
    if (isAshbyAutofillWidget(el)) continue

    // Skip date/time pickers — we can't reliably fill calendar widgets
    if (el instanceof HTMLInputElement && (el.type === 'date' || el.type === 'time' || el.type === 'datetime-local' || el.type === 'month' || el.type === 'week')) continue

    // Checkboxes — treat each as its own boolean field
    if (el instanceof HTMLInputElement && el.type === 'checkbox') {
      const labelText = getLabelForElement(el)
      const nameAttr = el.getAttribute('name') ?? ''
      const combined = `${labelText} ${nameAttr}`
      const fieldType = matchFieldType(combined)
      if (fieldType !== 'unknown') {
        fields.push({ id: genId(), element: el, fieldType, label: labelText || nameAttr || 'Checkbox', expectedValue: '', status: 'pending' })
      }
      continue
    }

    const labelText = getLabelForElement(el)
    const nameAttr = el.getAttribute('name') ?? ''
    const idAttr = el.id ?? ''
    const combined = `${labelText} ${nameAttr} ${idAttr}`
    const role = el.getAttribute('role')

    if (!combined.trim() && !isPdfFileInput(el)) continue
    if (role === 'radio') continue

    // File upload — skip Ashby autofill widget, detect real resume uploads
    if (isPdfFileInput(el)) {
      if (!isAshbyAutofillWidget(el)) {
        fields.push({ id: genId(), element: el, fieldType: 'resumeUpload', label: labelText || 'Resume', expectedValue: '', status: 'pending' })
      }
      continue
    }

    // Textareas: only autofill cover letter or custom Q&A.
    // "A few more questions" style open-ended fields differ per application and
    // should NOT be auto-filled — their name/id attrs often contain misleading
    // keywords (e.g. "sponsorship_details" matching `sponsorship`).
    if (el.tagName === 'TEXTAREA') {
      if (labelText) {
        const ft = matchFieldType(labelText) // label-only — ignore name/id
        if (ft === 'coverLetter') {
          fields.push({ id: genId(), element: el, fieldType: 'coverLetter', label: labelText, expectedValue: '', status: 'pending' })
        } else {
          const customMatch = matchCustomQA(labelText, customQA)
          if (customMatch) {
            fields.push({ id: genId(), element: el, fieldType: 'custom', label: labelText, expectedValue: customMatch.id, status: 'pending' })
          }
        }
      }
      continue
    }

    const fieldType = matchFieldType(combined)
    if (fieldType !== 'unknown') {
      fields.push({ id: genId(), element: el, fieldType, label: labelText || nameAttr || 'Field', expectedValue: '', status: 'pending' })
      continue
    }

    // Fallback: try user-defined custom Q&A matching on the visible label text
    if (labelText) {
      const customMatch = matchCustomQA(labelText, customQA)
      if (customMatch) {
        fields.push({ id: genId(), element: el, fieldType: 'custom', label: labelText, expectedValue: customMatch.id, status: 'pending' })
      }
    }
  }

  return fields
}
