import { getProfile, saveDisabledPrefs, getDisabledPrefs } from '../shared/storage'
import type { DetectedField, UserProfile } from '../shared/types'
import { detectFields } from './detector'
import { fillFields } from './filler'
import STYLES from './panel.css?inline'

// ── State ────────────────────────────────────────────────────────────────────
let profile: UserProfile | null = null
let detectedFields: DetectedField[] = []
let isAutofilling = false
let stopRequested = false
let panelOpen = false
let fieldsEl: HTMLElement | null = null
let footerStatusEl: HTMLElement | null = null
let autofillBtn: HTMLButtonElement | null = null
let stopBtn: HTMLButtonElement | null = null
let closeMenuEl: HTMLElement | null = null
let detectionTimer = 0

// ── Field value preview (short string shown next to the field label) ─────────
function getPreview(field: DetectedField): string {
  if (!profile) return ''
  const s = profile.static
  switch (field.fieldType) {
    case 'firstName':     return s.personal.firstName
    case 'lastName':      return s.personal.lastName
    case 'fullName':      return `${s.personal.firstName} ${s.personal.lastName}`
    case 'middleName':    return s.personal.middleName || '—'
    case 'preferredName': return s.personal.preferredName || s.personal.firstName
    case 'email':         return s.personal.email
    case 'phone':         return s.personal.phone
    case 'addressLine1':  return s.personal.addressLine1
    case 'addressLine2':  return s.personal.addressLine2
    case 'city':          return s.personal.city
    case 'state':         return s.personal.state
    case 'zip':           return s.personal.zip
    case 'country':       return s.personal.country
    case 'location':      return `${s.personal.city}, ${s.personal.state}`
    case 'linkedin':      return s.links.linkedin
    case 'github':        return s.links.github
    case 'portfolio':     return s.links.portfolio
    case 'workAuthorization': return s.workAuth.authorizedToWork ? 'Yes' : 'No'
    case 'sponsorship':   return s.workAuth.requiresSponsorship ? 'Yes' : 'No'
    case 'visaType':      return s.workAuth.visaType
    case 'citizenship':   return s.workAuth.citizenship
    case 'countryOfBirth': return s.workAuth.countryOfBirth
    case 'resumeUpload':  return 'PDF'
    case 'coverLetter':   return 'Cover letter'
    case 'salary':        return 'Expected salary'
    case 'noticePeriod':  return s.compensation.noticePeriod
    case 'startDate':     return 'Today'
    case 'relocation':    return s.preferences.openToRelocation ? 'Yes' : 'No'
    case 'employmentType': return s.preferences.preferredEmploymentType
    case 'gender':        return s.demographics.gender[0] ?? ''
    case 'pronouns':      return s.demographics.pronouns[0] ?? ''
    case 'race':          return s.demographics.race[0] ?? ''
    case 'veteran':       return s.demographics.veteranStatus[0] ?? ''
    case 'disability':    return s.demographics.disability[0] ?? ''
    case 'sexualOrientation': return s.demographics.sexualOrientation[0] ?? ''
    default:              return ''
  }
}

// ── Render the fields list inside the panel ──────────────────────────────────
function renderFields() {
  if (!fieldsEl) return
  fieldsEl.innerHTML = ''

  if (detectedFields.length === 0) {
    fieldsEl.innerHTML = `<div class="ad-empty"><strong>No fields detected</strong>Open a job application form and click Autofill.</div>`
    if (autofillBtn) {
      autofillBtn.disabled = true
      autofillBtn.textContent = 'No fields detected'
    }
    if (footerStatusEl) footerStatusEl.textContent = ''
    return
  }

  const filled = detectedFields.filter(f => f.status === 'filled').length

  if (autofillBtn) {
    autofillBtn.disabled = isAutofilling
    autofillBtn.textContent = isAutofilling
      ? 'Filling…'
      : `Autofill All  (${detectedFields.length} fields)`
  }
  if (footerStatusEl) {
    footerStatusEl.textContent = filled > 0
      ? `${filled} / ${detectedFields.length} filled`
      : ''
  }

  for (const field of detectedFields) {
    const row = document.createElement('div')
    row.className = 'ad-field-row'
    row.dataset.fieldId = field.id

    // Click anywhere on row (except the fill button) → scroll page to that field
    row.addEventListener('click', () => {
      field.element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      // Brief highlight flash on the target element
      const prev = field.element.style.outline
      field.element.style.outline = '2px solid #10b981'
      setTimeout(() => { field.element.style.outline = prev }, 1200)
    })

    const dot = document.createElement('div')
    dot.className = `ad-field-dot ${field.status === 'pending' ? '' : field.status}`
    dot.id = `ad-dot-${field.id}`

    const info = document.createElement('div')
    info.className = 'ad-field-info'
    info.innerHTML = `
      <div class="ad-field-label">${escHtml(field.label)}</div>
      <div class="ad-field-type">${escHtml(field.fieldType)}</div>
    `

    const val = document.createElement('div')
    val.className = 'ad-field-value'
    val.textContent = getPreview(field)

    // Per-field fill button
    const fillBtn = document.createElement('button')
    fillBtn.className = 'ad-field-fill-btn'
    fillBtn.title = 'Fill this field'
    fillBtn.innerHTML = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`
    fillBtn.addEventListener('click', async (e) => {
      e.stopPropagation() // don't trigger row scroll
      if (!profile || isAutofilling) return
      isAutofilling = true
      await fillFields([field], profile, null, (id, status) => updateFieldDot(id, status))
      isAutofilling = false
    })

    row.appendChild(dot)
    row.appendChild(info)
    row.appendChild(val)
    row.appendChild(fillBtn)
    fieldsEl.appendChild(row)
  }
}

function updateFieldDot(fieldId: string, status: string) {
  const dot = shadowRoot?.getElementById(`ad-dot-${fieldId}`)
  if (dot) {
    dot.className = `ad-field-dot ${status === 'pending' ? '' : status}`
  }
  const field = detectedFields.find(f => f.id === fieldId)
  if (field) field.status = status as DetectedField['status']

  // Update footer counts
  const filled = detectedFields.filter(f => f.status === 'filled').length
  if (footerStatusEl) {
    footerStatusEl.textContent = filled > 0 ? `${filled} / ${detectedFields.length} filled` : ''
  }
}

// ── Field detection ──────────────────────────────────────────────────────────
function runDetection() {
  if (isAutofilling || !profile) return
  const fields = detectFields(profile.static.customQA)

  // Preserve status of previously seen fields (by label+type key)
  const prevStatus = new Map(detectedFields.map(f => [`${f.fieldType}::${f.label}`, f.status]))
  for (const f of fields) {
    const key = `${f.fieldType}::${f.label}`
    if (prevStatus.has(key)) f.status = prevStatus.get(key)!
  }

  detectedFields = fields
  renderFields()
}

// ── Autofill ─────────────────────────────────────────────────────────────────
async function handleAutofill() {
  if (!profile || isAutofilling || detectedFields.length === 0) return
  isAutofilling = true
  stopRequested = false
  if (autofillBtn) { autofillBtn.disabled = true; autofillBtn.textContent = 'Filling…' }
  if (stopBtn) { stopBtn.style.display = 'inline-flex' }

  await fillFields(
    detectedFields,
    profile,
    null,
    (fieldId, status) => updateFieldDot(fieldId, status),
    () => stopRequested
  )

  isAutofilling = false
  stopRequested = false
  if (autofillBtn) {
    autofillBtn.disabled = false
    autofillBtn.textContent = `Autofill All  (${detectedFields.length} fields)`
  }
  if (stopBtn) { stopBtn.style.display = 'none'; stopBtn.disabled = false; stopBtn.textContent = '■' }

  // Re-detect after fill in case new fields appeared
  setTimeout(runDetection, 400)
}

function handleStop() {
  stopRequested = true
  if (stopBtn) { stopBtn.disabled = true; stopBtn.textContent = 'Stopping…' }
}

// ── Panel open/close ─────────────────────────────────────────────────────────
function openPanel() {
  shadowRoot?.getElementById('applydash-panel')?.classList.add('ad-open')
  panelOpen = true
  runDetection()
}

function closePanel() {
  shadowRoot?.getElementById('applydash-panel')?.classList.remove('ad-open')
  panelOpen = false
  hideCloseMenu()
}

function togglePanel() {
  if (panelOpen) closePanel()
  else openPanel()
}

// ── Close menu ───────────────────────────────────────────────────────────────
function showCloseMenu() {
  if (closeMenuEl) { closeMenuEl.style.display = 'block'; return }

  const header = shadowRoot?.querySelector('.ad-header') as HTMLElement | null
  if (!header) return

  closeMenuEl = document.createElement('div')
  closeMenuEl.className = 'ad-close-menu'

  const items = [
    { label: 'Hide until next visit', action: () => { closePanel(); sessionStorage.setItem('applydash_hidden', '1') } },
    { label: 'Disable on this domain', action: async () => {
      const prefs = await getDisabledPrefs()
      prefs.domains = [...new Set([...prefs.domains, window.location.hostname])]
      await saveDisabledPrefs(prefs)
      document.getElementById('applydash-root')?.remove()
    }},
    { label: 'Disable on all pages', action: async () => {
      await saveDisabledPrefs({ allPages: true, domains: [] })
      document.getElementById('applydash-root')?.remove()
    }},
  ]

  for (const item of items) {
    const btn = document.createElement('button')
    btn.textContent = item.label
    btn.addEventListener('click', (e) => { e.stopPropagation(); item.action() })
    closeMenuEl.appendChild(btn)
  }

  header.style.position = 'relative'
  header.appendChild(closeMenuEl)
}

function hideCloseMenu() {
  if (closeMenuEl) { closeMenuEl.style.display = 'none' }
}

// Shadow root that hosts all ApplyDash UI — isolates our styles from the page
let shadowRoot: ShadowRoot | null = null

// ── Build DOM ────────────────────────────────────────────────────────────────
function buildPanel() {
  // Single host element attached to body — everything else lives in its shadow
  const host = document.createElement('div')
  host.id = 'applydash-root'
  // Force fixed zero-size positioning on the host so children's position:fixed
  // is always viewport-relative, even on pages that use CSS contain or transform.
  host.style.cssText = 'all:initial;position:fixed!important;top:0!important;left:0!important;width:0!important;height:0!important;z-index:2147483647!important;pointer-events:none!important;'
  document.body.appendChild(host)
  shadowRoot = host.attachShadow({ mode: 'open' })

  // Inject styles into the shadow root so page CSS can't override them
  const style = document.createElement('style')
  style.textContent = STYLES
  shadowRoot.appendChild(style)

  // Floating tab button
  const tab = document.createElement('button')
  tab.id = 'applydash-tab'
  tab.title = 'ApplyDash'
  tab.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 3L2 19h20L12 3z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
    <path d="M7.5 14h9" stroke="white" stroke-width="2" stroke-linecap="round"/>
  </svg>`
  tab.addEventListener('click', togglePanel)
  shadowRoot.appendChild(tab)

  // Slide-in panel
  const panel = document.createElement('div')
  panel.id = 'applydash-panel'

  // Header
  const header = document.createElement('div')
  header.className = 'ad-header'

  const headerLeft = document.createElement('div')
  headerLeft.className = 'ad-header-left'
  headerLeft.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L2 19h20L12 3z" stroke="#10b981" stroke-width="2" stroke-linejoin="round"/>
      <path d="M7.5 14h9" stroke="#10b981" stroke-width="2" stroke-linecap="round"/>
    </svg>
    <span class="ad-title">ApplyDash</span>
  `

  const closeBtn = document.createElement('button')
  closeBtn.className = 'ad-close-btn'
  closeBtn.textContent = '×'
  closeBtn.title = 'Close options'
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    if (closeMenuEl && closeMenuEl.style.display !== 'none') hideCloseMenu()
    else showCloseMenu()
  })

  header.appendChild(headerLeft)
  header.appendChild(closeBtn)
  panel.appendChild(header)

  // Scrollable fields list
  fieldsEl = document.createElement('div')
  fieldsEl.className = 'ad-fields'
  panel.appendChild(fieldsEl)

  // Footer — autofill button pinned at bottom
  const autofillWrap = document.createElement('div')
  autofillWrap.className = 'ad-autofill-wrap'

  footerStatusEl = document.createElement('div')
  footerStatusEl.className = 'ad-status-text'

  const btnRow = document.createElement('div')
  btnRow.className = 'ad-btn-row'

  autofillBtn = document.createElement('button')
  autofillBtn.className = 'ad-autofill-btn'
  autofillBtn.textContent = 'Autofill All'
  autofillBtn.disabled = true
  autofillBtn.addEventListener('click', handleAutofill)

  stopBtn = document.createElement('button')
  stopBtn.className = 'ad-stop-btn'
  stopBtn.textContent = '■'
  stopBtn.title = 'Stop autofill'
  stopBtn.style.display = 'none'
  stopBtn.addEventListener('click', handleStop)

  btnRow.appendChild(autofillBtn)
  btnRow.appendChild(stopBtn)

  autofillWrap.appendChild(footerStatusEl)
  autofillWrap.appendChild(btnRow)
  panel.appendChild(autofillWrap)

  shadowRoot.appendChild(panel)

  // Close menu dismissal on outside click (shadow boundary — listen on shadow root)
  shadowRoot.addEventListener('click', (e) => {
    if (closeMenuEl && closeMenuEl.style.display !== 'none') {
      if (!closeMenuEl.contains(e.target as Node)) hideCloseMenu()
    }
  })
}

// ── MutationObserver for SPA navigation ──────────────────────────────────────
function startObserver() {
  // Watch only direct children of <body> changing — catches SPA route swaps
  // without going subtree:true (which caused the infinite loop in the old code).
  // When a new page loads, forms are replaced → re-detect.
  const obs = new MutationObserver(() => {
    clearTimeout(detectionTimer)
    detectionTimer = window.setTimeout(runDetection, 800)
  })
  obs.observe(document.body, { childList: true })

  // Also watch document.documentElement in case SPA replaces <body> itself
  const rootObs = new MutationObserver(() => {
    if (document.body) obs.observe(document.body, { childList: true })
    clearTimeout(detectionTimer)
    detectionTimer = window.setTimeout(runDetection, 800)
  })
  rootObs.observe(document.documentElement, { childList: true })
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function escHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// ── Public init ──────────────────────────────────────────────────────────────
export async function initPanel() {
  buildPanel()
  startObserver()

  profile = await getProfile()

  // Auto-open on known job board URLs
  const jobBoardPatterns = [
    'greenhouse.io', 'lever.co', 'ashbyhq.com', 'linkedin.com/jobs',
    'workday.com', 'myworkdayjobs.com', 'icims.com', 'smartrecruiters.com',
    'jobvite.com', 'bamboohr.com', 'taleo.net', 'recruitee.com',
  ]
  const isJobBoard = jobBoardPatterns.some(p => window.location.href.includes(p))
  const wasHidden = sessionStorage.getItem('applydash_hidden') === '1'

  if (isJobBoard && !wasHidden) openPanel()
  else renderFields() // populate list even if closed

  // Listen for toolbar icon click from background script
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'TOGGLE_PANEL') togglePanel()
  })
}
