export type FieldStatus = 'pending' | 'filling' | 'filled' | 'skipped'

export type FieldType =
  | 'firstName' | 'lastName' | 'fullName' | 'middleName' | 'preferredName'
  | 'email' | 'phone' | 'phoneType'
  | 'addressLine1' | 'addressLine2' | 'city' | 'state' | 'zip' | 'country' | 'location'
  | 'linkedin' | 'github' | 'portfolio'
  | 'resumeUpload' | 'coverLetter'
  | 'workAuthorization' | 'sponsorship' | 'visaType' | 'citizenship' | 'countryOfBirth'
  | 'salary' | 'salaryMin' | 'salaryMax' | 'hourlyRate' | 'currentSalary'
  | 'noticePeriod' | 'startDate' | 'availableImmediately'
  | 'relocation' | 'workPreference' | 'employmentType' | 'travel' | 'contractToHire'
  | 'gender' | 'pronouns' | 'sexualOrientation' | 'lgbtq' | 'transgender' | 'race' | 'veteran' | 'disability'
  | 'hispanic' | 'over18' | 'age'
  | 'custom'
  | 'unknown'

// Supported job-board site definitions used for CustomQA site filtering.
// The `domains` array is matched against window.location.hostname.
export const SITE_OPTIONS = [
  { label: 'Ashby',           domains: ['ashbyhq.com'] },
  { label: 'Greenhouse',      domains: ['greenhouse.io'] },
  { label: 'Lever',           domains: ['lever.co'] },
  { label: 'LinkedIn',        domains: ['linkedin.com'] },
  { label: 'Workday',         domains: ['workday.com', 'myworkdayjobs.com'] },
  { label: 'iCIMS',           domains: ['icims.com'] },
  { label: 'SmartRecruiters', domains: ['smartrecruiters.com'] },
  { label: 'Jobvite',         domains: ['jobvite.com'] },
  { label: 'BambooHR',        domains: ['bamboohr.com'] },
  { label: 'Taleo',           domains: ['taleo.net'] },
  { label: 'Recruitee',       domains: ['recruitee.com'] },
] as const

export type SiteLabel = (typeof SITE_OPTIONS)[number]['label']

// A user-defined question+answer pair stored in the profile.
// questions: multiple label-text variants that all map to the same answer set
//   (e.g. "Current company", "Most recent company", "Recent employer").
//   All variants are matched via Jaccard token similarity; the best score wins.
// answers: ordered candidates tried during fill (first match wins).
// sites: which job boards to apply this on. Empty array = inactive everywhere.
export interface CustomQA {
  id: string
  questions: string[] // One or more label-text variants to match
  answers: string[]   // Ordered answer candidates (first match wins during fill)
  sites: SiteLabel[]  // Restrict to these sites; empty = not used anywhere
}

export interface DetectedField {
  id: string
  element: HTMLElement
  fieldType: FieldType
  label: string
  expectedValue: string
  status: FieldStatus
}

export interface ExperienceEntry {
  id: string
  company: string
  title: string
  employmentType: string
  location: string
  workSetting: string
  startDate: string
  endDate: string
  currentlyWorking: boolean
  bullets: string[]
  reasonForLeaving: string
}

export interface ProjectEntry {
  id: string
  name: string
  techStack: string
  bullets: string[]
  githubUrl: string
  liveUrl: string
  order: number
}

export interface EducationEntry {
  id: string
  institution: string
  degreeType: string
  fieldOfStudy: string
  minor: string
  gpa: string
  startDate: string
  endDate: string
  currentlyEnrolled: boolean
  honors: string
}

export interface StaticProfile {
  customQA: CustomQA[]
  personal: {
    firstName: string
    lastName: string
    middleName: string
    preferredName: string
    email: string
    phone: string
    phoneType: string
    addressLine1: string
    addressLine2: string
    city: string
    state: string
    zip: string
    country: string
  }
  links: {
    linkedin: string
    github: string
    portfolio: string
  }
  workAuth: {
    authorizedToWork: boolean
    requiresSponsorship: boolean
    visaType: string
    citizenship: string
    countryOfBirth: string
    securityClearance: boolean
  }
  compensation: {
    type: string
    currentSalary: string
    noticePeriod: string
    startImmediately: boolean
  }
  preferences: {
    openToRelocation: boolean
    remote: boolean
    hybrid: boolean
    onsite: boolean
    willingToTravel: boolean
    preferredEmploymentType: string
    openToContractToHire: boolean
  }
  demographics: {
    gender: string[]
    lgbtq: boolean
    sexualOrientation: string[]
    pronouns: string[]
    race: string[]
    veteranStatus: string[]
    disability: string[]
    hispanic: boolean
    over18: boolean
    age: string
  }
  coverLetter: string
}

export interface DynamicProfile {
  experience: ExperienceEntry[]
  projects: ProjectEntry[]
  resumeFileName: string
  resumeUpdatedAt: string
}

export interface UserProfile {
  static: StaticProfile
  education: EducationEntry[]
  dynamic: DynamicProfile
}

export type MessageType =
  | { type: 'TOGGLE_PANEL' }
  | { type: 'PANEL_READY' }
