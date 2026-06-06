import type { DetectedField, FieldStatus, UserProfile } from '../../shared/types'
import {
  fillAriaCheckbox,
  fillAriaRadio,
  fillCheckbox,
  fillClickDropdown,
  fillContentEditable,
  fillFileInput,
  fillRadio,
  fillRadioByName,
  fillSelect,
  fillText,
} from './generic'
import { fillAriaCombobox, fillButtonGroup, fillDatePicker, triggerReactHandler } from './ashby'
import { fillGreenhouseSelect } from './greenhouse'
import { fillLeverLocation, fillLeverText } from './lever'
import { formatSalary, scanPageForMaxSalary } from './salary'

const isLever = window.location.hostname.includes('lever.co')

type OnFieldUpdate = (fieldId: string, status: FieldStatus) => void

// Delay between filling each field (ms) — feels more natural, avoids race conditions
const FILL_DELAY = 500

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

function getCandidateValuesForField(field: DetectedField, profile: UserProfile): string[] {
  const s = profile.static

  switch (field.fieldType) {
    case 'firstName': return [s.personal.firstName]
    case 'lastName': return [s.personal.lastName]
    case 'fullName': return [`${s.personal.firstName} ${s.personal.lastName}`]
    case 'middleName': return [s.personal.middleName]
    case 'preferredName': return [s.personal.preferredName || s.personal.firstName]
    case 'email': return [s.personal.email]
    case 'phone': return [s.personal.phone]
    case 'phoneType': return [s.personal.phoneType]
    case 'addressLine1': return [s.personal.addressLine1]
    case 'addressLine2': return [s.personal.addressLine2]
    case 'location': return [
      `${s.personal.city}, ${s.personal.state}`,
      `${s.personal.city}, TX, USA`,
      `${s.personal.city}, ${s.personal.state}, ${s.personal.country}`,
      s.personal.city,
    ]
    case 'city': return [s.personal.city]
    case 'state': return [s.personal.state]
    case 'zip': return [s.personal.zip]
    case 'country': return [s.personal.country]
    case 'linkedin': return [s.links.linkedin]
    case 'github': return [s.links.github]
    case 'portfolio': return [s.links.portfolio]
    case 'coverLetter': return [s.coverLetter]
    case 'workAuthorization': return [s.workAuth.authorizedToWork ? 'Yes' : 'No']
    case 'sponsorship': return [s.workAuth.requiresSponsorship ? 'Yes' : 'No']
    case 'visaType': return [s.workAuth.visaType]
    case 'citizenship': return [s.workAuth.citizenship]
    case 'countryOfBirth': return [s.workAuth.countryOfBirth]
    case 'salary': {
      const maxFromPage = scanPageForMaxSalary()
      return maxFromPage ? [formatSalary(maxFromPage)] : []
    }
    case 'salaryMax': {
      const maxFromPage = scanPageForMaxSalary()
      return maxFromPage ? [formatSalary(maxFromPage)] : []
    }
    case 'salaryMin': {
      const maxFromPage = scanPageForMaxSalary()
      return maxFromPage ? [formatSalary(Math.round(maxFromPage * 0.9))] : []
    }
    case 'currentSalary': return [s.compensation.currentSalary]
    case 'noticePeriod': return [s.compensation.noticePeriod, 'Available Immediately', 'Immediately']
    case 'startDate': return ['Immediately', 'Available Immediately']
    case 'availableImmediately': return ['Yes', 'Immediately', 'Available Immediately']
    case 'relocation': return [s.preferences.openToRelocation ? 'Yes' : 'No']
    case 'workPreference': return ['On-site or Hybrid']
    case 'employmentType': return [s.preferences.preferredEmploymentType]
    case 'travel': return [s.preferences.willingToTravel ? 'Yes' : 'No']
    case 'contractToHire': return [s.preferences.openToContractToHire ? 'Yes' : 'No']
    case 'gender': return s.demographics.gender.filter(Boolean)
    case 'pronouns': return s.demographics.pronouns.filter(Boolean)
    case 'sexualOrientation': return s.demographics.sexualOrientation.filter(Boolean)
    case 'lgbtq': return [s.demographics.lgbtq ? 'Yes' : 'No']
    case 'transgender': return ['No', 'I do not identify as transgender', 'I prefer not to answer']
    case 'race': return s.demographics.race.filter(Boolean)
    case 'veteran': return s.demographics.veteranStatus.filter(Boolean)
    case 'disability': return s.demographics.disability.filter(Boolean)
    case 'hispanic': return [s.demographics.hispanic ? 'Yes' : 'No']
    case 'over18': return ['Yes', 'Over 18', '18+', '25-34', '30-34', '30-39']
    case 'age': return [s.demographics.age, '25-34', '30-34', '30-39', 'Over 18', '18+']
    case 'custom': {
      // field.expectedValue holds the custom QA id; look it up in the profile
      const qa = profile.static.customQA.find((q) => q.id === field.expectedValue)
      return qa?.answers ?? []
    }
    default: return []
  }
}

function matchesCandidate(label: string, candidates: string[]) {
  const lowerLabel = label.toLowerCase().trim()
  return candidates.some((candidate) => {
    const lowerCandidate = candidate.toLowerCase().trim()
    return lowerLabel === lowerCandidate || lowerLabel.includes(lowerCandidate) || lowerCandidate.includes(lowerLabel)
  })
}

async function fillSingleField(
  field: DetectedField,
  profile: UserProfile,
  resumeBuffer: ArrayBuffer | null,
  onUpdate: OnFieldUpdate
): Promise<void> {
  const el = field.element

  // Skip if element is no longer in DOM
  if (!document.contains(el)) {
    onUpdate(field.id, 'skipped')
    return
  }

  onUpdate(field.id, 'filling')
  await sleep(FILL_DELAY)

  try {
    // File upload — requires PDF to be uploaded in Profile tab first
    if (field.fieldType === 'resumeUpload') {
      if (resumeBuffer && el instanceof HTMLInputElement && el.type === 'file') {
        const fileName = profile.dynamic.resumeFileName || 'resume.pdf'
        await fillFileInput(el, resumeBuffer, fileName)
        onUpdate(field.id, 'filled')
      } else {
        // No buffer — skip gracefully (user needs to upload PDF in Profile tab)
        onUpdate(field.id, 'skipped')
      }
      return
    }

    const candidates = getCandidateValuesForField(field, profile)
    const value = candidates[0] ?? ''

    // Date picker fields — click today's date in the calendar widget
    if (field.fieldType === 'startDate') {
      const filled = await fillDatePicker(el)
      onUpdate(field.id, filled ? 'filled' : 'skipped')
      return
    }

    // Skip if we have no value to fill
    if (candidates.length === 0 || !value) {
      onUpdate(field.id, 'skipped')
      return
    }

    // Multi-checkbox container (e.g. Ashby ethnicity "mark all that apply").
    // The element is the fieldset/container; we iterate ALL checkboxes inside,
    // clicking the label for each one whose option text exactly matches a stored value.
    const containerCheckboxes = el.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')
    if (containerCheckboxes.length >= 2) {
      let anyFilled = false
      for (const cb of Array.from(containerCheckboxes)) {
        // Resolve the visible option text for this checkbox via multiple strategies:
        // 1. <label for="id"> linked label
        // 2. Wrapping <label> element (Lever-style: <label><input>He/Him</label>)
        // 3. value attribute (some ATSes: value="He/Him")
        // 4. name attribute as last resort
        // labelEl is set as a side effect so we can click it in Strategy 1 below.
        let labelEl: HTMLElement | null = null
        const optionText = (() => {
          if (cb.id) {
            const forLabel = document.querySelector<HTMLElement>(`label[for="${CSS.escape(cb.id)}"]`)
            if (forLabel) { labelEl = forLabel; return forLabel.textContent?.trim() ?? '' }
          }
          const wrapLabel = cb.closest<HTMLElement>('label')
          if (wrapLabel) {
            labelEl = wrapLabel
            const clone = wrapLabel.cloneNode(true) as HTMLElement
            clone.querySelectorAll('input').forEach((i) => i.remove())
            const text = clone.textContent?.trim()
            if (text) return text
          }
          const val = cb.getAttribute('value') ?? ''
          if (val) return val
          return cb.getAttribute('name') ?? ''
        })().toLowerCase().trim()
        if (!optionText) continue
        // Exact match only — "asian" must NOT match "east asian" or "southeast asian"
        const isMatch = candidates.some(c => c.toLowerCase().trim() === optionText)
        if (isMatch && !cb.checked) {
          let checked = false

          // Strategy 1: native label click (trusted-equivalent)
          if (labelEl) labelEl.click()
          else cb.click()
          checked = cb.checked

          if (!checked) {
            // Strategy 2: React fiber onChange / onCheckedChange (Radix UI)
            // Set native checked first so target.checked is correct
            const nativeSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'checked')?.set
            if (nativeSetter) nativeSetter.call(cb, true)
            else cb.checked = true
            checked = triggerReactHandler(cb, 'change', true)
          }

          if (!checked && !cb.checked) {
            // Strategy 3: walk fiber tree on the label itself
            if (labelEl) triggerReactHandler(labelEl, 'click')
          }

          anyFilled = true
        }
      }
      onUpdate(field.id, anyFilled ? 'filled' : 'skipped')
      return
    }

    // Single checkbox (boolean fields)
    if (el instanceof HTMLInputElement && el.type === 'checkbox') {
      const shouldCheck = candidates.some((candidate) => {
        const lower = candidate.toLowerCase()
        return lower === 'yes' || lower === 'true'
      })
      fillCheckbox(el, shouldCheck)
      onUpdate(field.id, 'filled')
      return
    }

    // Button group (Ashby Yes/No buttons and similar)
    if (el.querySelectorAll('button').length >= 2) {
      const filled = fillButtonGroup(el, candidates)
      onUpdate(field.id, filled ? 'filled' : 'skipped')
      return
    }

    if (el.getAttribute('role') === 'checkbox') {
      const shouldCheck = candidates.some((candidate) => {
        const lower = candidate.toLowerCase()
        return lower === 'yes' || lower === 'true'
      })
      const filled = fillAriaCheckbox(el, shouldCheck)
      onUpdate(field.id, filled ? 'filled' : 'skipped')
      return
    }

    // Greenhouse React Select control (div.select__control)
    // Also catch if detector gave us the inner input — walk up to the control
    const ghControl = el.classList.contains('select__control')
      ? el
      : el.closest<HTMLElement>('.select__control')
      ?? (el.querySelector('.select__value-container') ? el : null)
    if (ghControl) {
      const filled = await fillGreenhouseSelect(ghControl, candidates)
      onUpdate(field.id, filled ? 'filled' : 'skipped')
      return
    }

    // Select dropdown (native)
    if (el instanceof HTMLSelectElement) {
      const filled = fillSelect(el, candidates)
      onUpdate(field.id, filled ? 'filled' : 'skipped')
      return
    }

    // Demographic fields (gender, race, veteran, disability, pronouns, sexualOrientation)
    // are pure-selection dropdowns on Greenhouse/Lever — clicking them opens a listbox
    // but they don't accept typed text. Use click-open strategy, not text-type strategy.
    const DEMOGRAPHIC_TYPES = new Set<string>([
      'gender', 'race', 'veteran', 'disability', 'pronouns', 'sexualOrientation',
      'lgbtq', 'transgender', 'hispanic', 'over18', 'age', 'workAuthorization', 'sponsorship',
      'relocation', 'employmentType', 'visaType',
    ])
    if (DEMOGRAPHIC_TYPES.has(field.fieldType) && el.getAttribute('role') === 'combobox') {
      const filled = await fillClickDropdown(el, candidates)
      onUpdate(field.id, filled ? 'filled' : 'skipped')
      return
    }

    // Lever location autocomplete — plain <input> that shows a <ul> suggestion list
    if (isLever && field.fieldType === 'location') {
      const filled = await fillLeverLocation(el, candidates)
      onUpdate(field.id, filled ? 'filled' : 'skipped')
      return
    }

    // combobox with autocomplete (location, etc.) — type to filter then pick
    if (
      el.getAttribute('role') === 'combobox' ||
      el.getAttribute('aria-autocomplete') === 'list' ||
      (field.fieldType === 'location' && el instanceof HTMLInputElement)
    ) {
      const filled = await fillAriaCombobox(el, candidates)
      onUpdate(field.id, filled ? 'filled' : 'skipped')
      return
    }

    // Radio group — use name attribute to find all sibling radios and pick the right one
    if (el instanceof HTMLInputElement && el.type === 'radio') {
      const filled = fillRadioByName(el, candidates)
      onUpdate(field.id, filled ? 'filled' : 'skipped')
      return
    }

    if (el.querySelector('input[type="radio"]')) {
      const filled = fillRadio(el, candidates)
      onUpdate(field.id, filled ? 'filled' : 'skipped')
      return
    }

    if (el.getAttribute('role') === 'radio') {
      const filled = fillAriaRadio(el, candidates)
      onUpdate(field.id, filled ? 'filled' : 'skipped')
      return
    }

    // Contenteditable
    if (el.getAttribute('contenteditable') === 'true') {
      fillContentEditable(el, value)
      onUpdate(field.id, 'filled')
      return
    }

    // Regular text/email/tel/textarea
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      if (field.fieldType === 'custom' && el instanceof HTMLInputElement) {
        const filled = await fillAriaCombobox(el, candidates)
        if (!filled) fillText(el, value)
        onUpdate(field.id, 'filled')
        return
      }
      // Lever: use InputEvent with data payload so React's synthetic event system
      // registers the value change correctly
      if (isLever && el instanceof HTMLInputElement) {
        await fillLeverText(el, value)
      } else {
        fillText(el, value)
      }
      onUpdate(field.id, 'filled')
      return
    }

    onUpdate(field.id, 'skipped')
  } catch (err) {
    console.warn('[ApplyDash] Failed to fill field:', field.label, err)
    onUpdate(field.id, 'skipped')
  }
}

export async function fillFields(
  fields: DetectedField[],
  profile: UserProfile,
  resumeBuffer: ArrayBuffer | null,
  onUpdate: OnFieldUpdate,
  isCancelled: () => boolean = () => false
): Promise<void> {
  for (const field of fields) {
    if (isCancelled()) break
    if (field.status === 'filled') continue
    await fillSingleField(field, profile, resumeBuffer, onUpdate)
  }
}
