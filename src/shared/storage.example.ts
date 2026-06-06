// Copy this file to storage.ts and fill in your own details.
// storage.ts is gitignored to keep personal data out of version control.

import type { UserProfile, DynamicProfile } from './types'

const STORAGE_KEY = 'applydash_profile'
const DISABLED_KEY = 'applydash_disabled'

export const DEFAULT_PROFILE: UserProfile = {
  static: {
    personal: {
      firstName: 'Jane',
      lastName: 'Doe',
      middleName: '',
      preferredName: 'Jane',
      email: 'jane.doe@example.com',
      phone: '+11234567890',
      phoneType: 'Mobile',
      addressLine1: '123 Main Street',
      addressLine2: 'Apt 1',
      city: 'Austin',
      state: 'Texas',
      zip: '78701',
      country: 'United States',
    },
    links: {
      linkedin: 'https://www.linkedin.com/in/your-profile/',
      github: 'https://github.com/your-username',
      portfolio: 'https://yourwebsite.com',
    },
    workAuth: {
      authorizedToWork: true,
      requiresSponsorship: false,
      visaType: '',
      citizenship: 'United States',
      countryOfBirth: 'United States',
      securityClearance: false,
    },
    compensation: {
      type: 'Salary',
      currentSalary: '',
      noticePeriod: 'Available to start immediately',
      startImmediately: true,
    },
    preferences: {
      openToRelocation: true,
      remote: true,
      hybrid: true,
      onsite: true,
      willingToTravel: true,
      preferredEmploymentType: 'Full-time',
      openToContractToHire: true,
    },
    demographics: {
      gender: ['Woman'],
      lgbtq: false,
      sexualOrientation: ['Heterosexual'],
      pronouns: ['She/Her'],
      race: ['White or European'],
      veteranStatus: ['No, I am not a veteran or active member', 'No'],
      disability: ['No', 'I do not have a disability'],
      hispanic: false,
      over18: true,
      age: '28',
    },
    customQA: [],
    coverLetter: 'Write your cover letter here.',
  },
  education: [
    {
      id: 'edu-1',
      institution: 'University of Texas at Austin',
      degreeType: "Bachelor's / BS",
      fieldOfStudy: 'Computer Science',
      minor: '',
      gpa: '',
      startDate: '2018',
      endDate: '2022',
      currentlyEnrolled: false,
      honors: '',
    },
  ],
  dynamic: {
    experience: [
      {
        id: 'exp-1',
        company: 'Acme Corp',
        title: 'Software Engineer',
        employmentType: 'Full-time',
        location: 'Austin, Texas',
        workSetting: 'Hybrid',
        startDate: 'January 2023',
        endDate: 'Present',
        currentlyWorking: true,
        bullets: [
          'Built and maintained full-stack features using React, Node.js, and PostgreSQL',
        ],
        reasonForLeaving: '',
      },
    ],
    projects: [],
    resumeFileName: 'Jane Doe Resume 2025.pdf',
    resumeUpdatedAt: '',
  },
}

// ── Everything below this line is the same as storage.ts ─────────────────────

function migrateDemographics(raw: any): UserProfile['static']['demographics'] {
  const def = DEFAULT_PROFILE.static.demographics
  const toArr = (v: unknown, fallback: string[]) =>
    Array.isArray(v) ? v : (typeof v === 'string' && v) ? [v] : fallback

  return {
    gender: toArr(raw?.gender, def.gender),
    lgbtq: raw?.lgbtq ?? def.lgbtq,
    sexualOrientation: toArr(raw?.sexualOrientation, def.sexualOrientation),
    pronouns: toArr(raw?.pronouns, def.pronouns),
    race: toArr(raw?.race, def.race),
    veteranStatus: toArr(raw?.veteranStatus, def.veteranStatus),
    disability: toArr(raw?.disability, def.disability),
    hispanic: raw?.hispanic ?? def.hispanic,
    over18: raw?.over18 ?? def.over18,
    age: raw?.age ?? def.age,
  }
}

function mergeProfileWithDefaults(profile: UserProfile): UserProfile {
  return {
    ...DEFAULT_PROFILE,
    ...profile,
    static: {
      ...DEFAULT_PROFILE.static,
      ...profile.static,
      personal: { ...DEFAULT_PROFILE.static.personal, ...profile.static?.personal },
      links: { ...DEFAULT_PROFILE.static.links, ...profile.static?.links },
      workAuth: { ...DEFAULT_PROFILE.static.workAuth, ...profile.static?.workAuth },
      compensation: { ...DEFAULT_PROFILE.static.compensation, ...profile.static?.compensation },
      preferences: { ...DEFAULT_PROFILE.static.preferences, ...profile.static?.preferences },
      demographics: migrateDemographics(profile.static?.demographics),
      customQA: (profile.static?.customQA ?? []).map((qa: any) => ({
        ...qa,
        questions: qa.questions ?? (qa.question ? [qa.question] : []),
        sites: qa.sites ?? [],
      })),
    },
    education: profile.education ?? DEFAULT_PROFILE.education,
    dynamic: {
      ...DEFAULT_PROFILE.dynamic,
      ...profile.dynamic,
      experience: profile.dynamic?.experience ?? DEFAULT_PROFILE.dynamic.experience,
      projects: profile.dynamic?.projects ?? DEFAULT_PROFILE.dynamic.projects,
    },
  }
}

export async function getProfile(): Promise<UserProfile> {
  return new Promise((resolve) => {
    chrome.storage.local.get(STORAGE_KEY, (result) => {
      if (result[STORAGE_KEY]) {
        const merged = mergeProfileWithDefaults(result[STORAGE_KEY] as UserProfile)
        chrome.storage.local.set({ [STORAGE_KEY]: merged })
        resolve(merged)
      } else {
        chrome.storage.local.set({ [STORAGE_KEY]: DEFAULT_PROFILE })
        resolve(structuredClone(DEFAULT_PROFILE))
      }
    })
  })
}

export async function saveProfile(profile: UserProfile): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [STORAGE_KEY]: profile }, resolve)
  })
}

export async function updateStaticProfile(updates: Partial<UserProfile['static']>): Promise<void> {
  const profile = await getProfile()
  await saveProfile({ ...profile, static: { ...profile.static, ...updates } })
}

export async function updateBaseDynamic(dynamic: DynamicProfile): Promise<void> {
  const profile = await getProfile()
  await saveProfile({ ...profile, dynamic })
}

export interface DisabledPrefs {
  allPages: boolean
  domains: string[]
}

export async function getDisabledPrefs(): Promise<DisabledPrefs> {
  return new Promise((resolve) => {
    chrome.storage.local.get(DISABLED_KEY, (result) => {
      resolve(result[DISABLED_KEY] ?? { allPages: false, domains: [] })
    })
  })
}

export async function saveDisabledPrefs(prefs: DisabledPrefs): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [DISABLED_KEY]: prefs }, resolve)
  })
}

const RESUME_KEY = 'applydash_default_resume'
const RESUME_NAME_KEY = 'applydash_default_resume_name'

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  const chunkSize = 8192
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...Array.from(bytes.slice(i, i + chunkSize)))
  }
  return btoa(binary)
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes.buffer
}

export async function saveDefaultResume(buffer: ArrayBuffer, fileName: string): Promise<void> {
  const base64 = arrayBufferToBase64(buffer)
  return new Promise((resolve) => {
    chrome.storage.local.set({ [RESUME_KEY]: base64, [RESUME_NAME_KEY]: fileName }, resolve)
  })
}

export async function getDefaultResume(): Promise<{ buffer: ArrayBuffer; fileName: string } | null> {
  return new Promise((resolve) => {
    chrome.storage.local.get([RESUME_KEY, RESUME_NAME_KEY], (result) => {
      if (!result[RESUME_KEY]) return resolve(null)
      resolve({
        buffer: base64ToArrayBuffer(result[RESUME_KEY]),
        fileName: result[RESUME_NAME_KEY] ?? 'resume.pdf',
      })
    })
  })
}
