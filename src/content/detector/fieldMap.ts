import type { CustomQA, FieldType } from '../../shared/types'
import { SITE_OPTIONS } from '../../shared/types'

// Maps field types to arrays of label keywords (lowercase).
// ORDER MATTERS — matchFieldType returns the first match, so put more specific
// / longer-keyword types BEFORE broad single-word types (location, city, state).
// Example: "authorized to work in the job location" must hit workAuthorization
// before location. "ethnicity" must not substring-match "city" (word boundary
// regex handles that, but order is a second guard).
export const FIELD_MAP: Record<FieldType, string[]> = {
  // ── Identity ──────────────────────────────────────────────────────────────
  firstName: ['first name', 'fname', 'given name', 'forename', 'legal first'],
  lastName: ['last name', 'lname', 'surname', 'family name', 'legal last'],
  fullName: ['full name', 'your name', 'your full name', 'legal name', 'complete name'],
  middleName: ['middle name', 'middle initial'],
  preferredName: ['preferred name', 'preferred first', 'nickname', 'goes by'],
  email: ['email address', 'work email', 'personal email', 'e-mail', 'email'],
  phone: ['phone number', 'mobile number', 'contact number', 'telephone', 'mobile', 'cell', 'phone'],
  phoneType: ['phone type', 'type of phone', 'number type'],

  // ── Work authorization — BEFORE location/country to avoid "job location" clash ──
  workAuthorization: ['authorized to work', 'work authorization', 'legally authorized', 'eligible to work', 'currently authorized', 'authorization to work', 'require authorization'],
  sponsorship: ['visa sponsorship', 'require sponsorship', 'will you now or in the future require', 'need sponsorship', 'sponsorship required', 'sponsorship'],
  visaType: ['visa type', 'visa status', 'work authorization type', 'immigration status'],
  citizenship: ['country of citizenship', 'citizenship', 'nationality'],
  countryOfBirth: ['country of birth', 'place of birth', 'born in'],

  // ── Address — multi-word patterns before single words ─────────────────────
  addressLine1: ['address line 1', 'address 1', 'street address', 'mailing address', 'street'],
  addressLine2: ['address line 2', 'address 2', 'apartment', 'suite', 'unit', 'apt', 'floor'],
  location: ['current location', 'preferred location', 'where are you located', 'where are you normally based', 'location'],
  city: ['city of residence', 'municipality', 'city', 'town'],
  state: ['state/province', 'state or province', 'province', 'region', 'state'],
  zip: ['postal code', 'zip code', 'postcode', 'pin code', 'zip'],
  country: ['country of residence', 'country/region', 'country', 'nation'],

  // ── Links ─────────────────────────────────────────────────────────────────
  linkedin: ['linkedin profile url', 'linkedin profile', 'linkedin url', 'linkedin link', 'linkedin'],
  github: ['github profile', 'github url', 'git hub', 'github'],
  portfolio: ['personal website', 'portfolio url', 'personal site', 'website url', 'portfolio', 'website'],
  resumeUpload: ['upload resume', 'upload cv', 'attach resume', 'curriculum vitae', 'resume/cv', 'resume', 'cv'],
  coverLetter: ['cover letter', 'motivation letter', 'letter of interest', 'why do you want', 'why are you interested'],

  // ── Compensation ──────────────────────────────────────────────────────────
  currentSalary: ['current salary', 'current compensation', 'present salary'],
  salaryMin: ['salary min', 'minimum salary', 'minimum compensation', 'salary from'],
  salaryMax: ['salary max', 'maximum salary', 'maximum compensation', 'salary to'],
  salary: ['expected salary', 'desired salary', 'annual salary', 'salary expectation', 'expected compensation', 'compensation requirements', 'salary', 'compensation'],
  hourlyRate: ['hourly rate', 'rate per hour', 'contract rate', 'hourly'],
  noticePeriod: ['notice period', 'how soon can you start', 'notice'],
  startDate: ['available to start', 'available from', 'when can you start', 'earliest start date', 'start date', 'pick date'],
  availableImmediately: ['available immediately', 'available to start immediately', 'immediate start'],

  // ── Preferences ───────────────────────────────────────────────────────────
  relocation: ['open to relocation', 'willing to relocate', 'relocation', 'relocate'],
  workPreference: ['work location preference', 'work arrangement', 'work preference', 'on-site', 'remote', 'hybrid'],
  employmentType: ['type of employment', 'employment type', 'job type', 'full-time', 'part-time'],
  travel: ['willing to travel', 'travel requirement', 'travel percentage', 'travel'],
  contractToHire: ['contract to hire', 'contract-to-hire', 'c2h'],

  // ── Demographics — ethnicity BEFORE city so "ethnicity" doesn't substring-hit ─
  race: ['race/ethnicity', 'ethnic background', 'ethnicity', 'racial', 'race'],
  gender: ['gender identity', 'gender', 'sex'],
  pronouns: ['preferred pronouns', 'pronouns'],
  sexualOrientation: ['sexual orientation', 'orientation'],
  lgbtq: ['lgbtqia+', 'lgbtqia', 'lgbtq', 'identify as lgbt', 'queer'],
  transgender: ['identify as transgender', 'do you identify as transgender', 'transgender'],
  hispanic: ['hispanic or latino', 'hispanic', 'latino', 'latinx'],
  veteran: ['protected veteran', 'military status', 'veteran status', 'military', 'veteran'],
  disability: ['disability status', 'have a disability', 'had one in the past', 'accommodation', 'disability', 'disabled'],
  over18: ['age verification', 'at least 18', '18 years', 'over 18'],
  age: ['age range', 'how old are you', 'identify my age as', 'age'],

  // custom and unknown are handled outside FIELD_MAP (via matchCustomQA / fallback)
  custom: [],
  unknown: [],
}

// Patterns that, when found in a label, indicate it is NOT a fillable question field.
// These are consent banners, legal notices, and other non-interactive text blocks.
const EXCLUDE_PATTERNS = [
  'privacy notice',
  'terms and conditions',
  'by submitting',
  'consent to the following',
  'acknowledge that you have read',
  'equal opportunity',
  'eeo statement',
  'data will be used',
  'personal data',
]

// Tokenize a string into lowercase words, stripping punctuation.
// Matching is done at the TOKEN level — "city" and "ethnicity" are different
// tokens so there is no substring false-positive possible.
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[*?!.,;:()\[\]\/\-]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 0)
}

// Pre-tokenized keyword entries, one per keyword phrase.
// We store the token array (for sliding-window matching) and word count
// (for scoring — see matchFieldType).
const KEYWORD_ENTRIES: Array<{ fieldType: FieldType; tokens: string[]; wordCount: number }> = (
  Object.entries(FIELD_MAP) as [FieldType, string[]][]
)
  .filter(([ft]) => ft !== 'unknown')
  .flatMap(([ft, keywords]) =>
    keywords.map((kw) => {
      const tokens = tokenize(kw)
      return { fieldType: ft as FieldType, tokens, wordCount: tokens.length }
    })
  )

// Returns true if `phrase` tokens appear as a contiguous subsequence in `label` tokens.
function phraseInTokens(phrase: string[], label: string[]): boolean {
  const n = phrase.length
  outer: for (let i = 0; i <= label.length - n; i++) {
    for (let j = 0; j < n; j++) {
      if (label[i + j] !== phrase[j]) continue outer
    }
    return true
  }
  return false
}

// Single-token fast-path table — handles bare labels like "Name", "Email *", "City".
// These can't be matched by any multi-word phrase in KEYWORD_ENTRIES.
const SINGLE_TOKEN_MAP: Record<string, FieldType> = {
  name: 'fullName', email: 'email', phone: 'phone',
  city: 'city', state: 'state', country: 'country',
  location: 'location', zip: 'zip', resume: 'resumeUpload', cv: 'resumeUpload',
  linkedin: 'linkedin', github: 'github', portfolio: 'portfolio', website: 'portfolio',
  gender: 'gender', pronouns: 'pronouns', race: 'race', ethnicity: 'race',
  age: 'age', salary: 'salary', sponsorship: 'sponsorship',
}

// Returns the best matching FieldType for a given label string.
//
// Algorithm: token-level sliding-window phrase matching + specificity scoring.
// 1. Tokenize into words — no substring false-positives possible ("city" ≠ "ethnicity").
// 2. Single-token labels → fast-path table (can't match any multi-word phrase).
// 3. For each keyword phrase, check if its tokens appear contiguously in the label tokens.
// 4. Score = wordCount² — "authorized to work" (3²=9) always beats "location" (1²=1).
// 5. Return highest-scoring fieldType; ties go to first FIELD_MAP entry.
export function matchFieldType(labelText: string): FieldType {
  const lower = labelText.toLowerCase().trim()

  // Very long labels are usually body/legal text — skip.
  // Exception: Greenhouse wraps EEO questions as full sentences (e.g. disability),
  // so we allow up to 300 chars but only match against demographic keywords.
  if (lower.length > 300) return 'unknown'

  // Excluded patterns (consent blocks, legal notices, etc.)
  if (EXCLUDE_PATTERNS.some((p) => lower.includes(p))) return 'unknown'

  const labelTokens = tokenize(lower)
  if (labelTokens.length === 0) return 'unknown'

  // Single-token fast path — fully token-based, no regex
  if (labelTokens.length === 1) return SINGLE_TOKEN_MAP[labelTokens[0]] ?? 'unknown'

  let bestType: FieldType = 'unknown'
  let bestScore = 0

  for (const { fieldType, tokens, wordCount } of KEYWORD_ENTRIES) {
    if (!phraseInTokens(tokens, labelTokens)) continue
    const score = wordCount * wordCount
    if (score > bestScore) {
      bestType = fieldType
      bestScore = score
    }
  }

  return bestType
}

// Returns true if the given hostname matches any of the site's domains.
function hostnameMatchesSite(hostname: string, siteLabel: string): boolean {
  const site = SITE_OPTIONS.find((s) => s.label === siteLabel)
  return site?.domains.some((d) => hostname.includes(d)) ?? false
}

// Matches a label against user-defined custom Q&A entries using token similarity.
// Score = |intersection| / |union| (Jaccard similarity). Threshold: 0.5.
// hostname: current page hostname used to filter site-specific entries.
// Returns the best-matching CustomQA, or null if none meet the threshold.
export function matchCustomQA(
  labelText: string,
  customQA: CustomQA[],
  hostname: string = window.location.hostname
): CustomQA | null {
  if (customQA.length === 0) return null

  const labelTokens = tokenize(labelText.toLowerCase())
  if (labelTokens.length === 0) return null

  const labelSet = new Set(labelTokens)

  let bestMatch: CustomQA | null = null
  let bestScore = 0

  for (const qa of customQA) {
    // Skip entries with no sites configured, or restricted to other sites
    if (qa.sites.length === 0 || !qa.sites.some((s) => hostnameMatchesSite(hostname, s))) continue

    // Try every question variant — take the best Jaccard score across all of them
    let bestVariantScore = 0
    for (const question of qa.questions) {
      const qTokens = tokenize(question.toLowerCase())
      if (qTokens.length === 0) continue

      const qSet = new Set(qTokens)
      let intersection = 0
      for (const t of qSet) {
        if (labelSet.has(t)) intersection++
      }
      const union = new Set([...labelSet, ...qSet]).size
      const score = intersection / union  // Jaccard similarity
      if (score > bestVariantScore) bestVariantScore = score
    }

    if (bestVariantScore >= 0.5 && bestVariantScore > bestScore) {
      bestMatch = qa
      bestScore = bestVariantScore
    }
  }

  return bestMatch
}
