import type { DynamicProfile, ExperienceEntry, ProjectEntry } from '../../shared/types'
// Vite bundles the worker and gives us its extension URL automatically
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

// Lazy-load pdf.js only when needed
async function getPdfLib() {
  const pdfjsLib = await import('pdfjs-dist')
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl
  return pdfjsLib
}

async function extractTextFromPdf(buffer: ArrayBuffer): Promise<string[]> {
  const pdfjsLib = await getPdfLib()
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise
  const lines: string[] = []

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()

    // Group text items by approximate Y position to reconstruct lines
    const itemsByY = new Map<number, string[]>()
    for (const item of content.items) {
      if (!('str' in item)) continue
      const y = Math.round((item as any).transform[5])
      if (!itemsByY.has(y)) itemsByY.set(y, [])
      itemsByY.get(y)!.push((item as any).str)
    }

    // Sort Y descending (top to bottom on page)
    const sortedYs = [...itemsByY.keys()].sort((a, b) => b - a)
    for (const y of sortedYs) {
      const line = itemsByY.get(y)!.join(' ').trim()
      if (line) lines.push(line)
    }
  }

  return lines
}

// Section header detection
const SECTION_HEADERS = {
  experience: /^(experience|work experience|employment history|professional experience)$/i,
  projects: /^(projects|personal projects|side projects|key projects)$/i,
  education: /^(education|academic background|qualifications)$/i,
  skills: /^(skills|technical skills|core competencies|technologies)$/i,
  summary: /^(summary|profile|objective|about)$/i,
}

type SectionName = keyof typeof SECTION_HEADERS

function detectSection(line: string): SectionName | null {
  const trimmed = line.trim()
  for (const [name, pattern] of Object.entries(SECTION_HEADERS) as [SectionName, RegExp][]) {
    if (pattern.test(trimmed)) return name
  }
  return null
}

function isBullet(line: string): boolean {
  return /^[•\-–—*▪►✓✔◆◇→]\s/.test(line.trim()) ||
    /^\d+\.\s/.test(line.trim())
}

function cleanBullet(line: string): string {
  return line.replace(/^[•\-–—*▪►✓✔◆◇→]\s+/, '').replace(/^\d+\.\s+/, '').trim()
}

// Detects lines that look like company/role headers
// e.g. "Fortress Information Security | Software Engineer | Jun 2023 - Apr 2026"
const DATE_PATTERN = /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|june|july|august|september|october|november|december)\b.{0,30}\d{4}/i

function isExperienceHeader(line: string): boolean {
  return DATE_PATTERN.test(line) && line.length < 150
}

// Detects project header lines (name | tech stack — no dates)
function isProjectHeader(line: string): boolean {
  return (
    !DATE_PATTERN.test(line) &&
    line.length < 120 &&
    line.length > 5 &&
    !isBullet(line) &&
    /[A-Z]/.test(line[0])
  )
}

function parseExperienceEntries(lines: string[]): ExperienceEntry[] {
  const entries: ExperienceEntry[] = []
  let current: ExperienceEntry | null = null

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    if (isExperienceHeader(trimmed)) {
      if (current) entries.push(current)
      // Try to extract company and title from the line
      const parts = trimmed.split(/\s*[|\-–]\s*/)
      current = {
        id: `exp-parsed-${entries.length + 1}`,
        company: parts[0]?.trim() ?? trimmed,
        title: parts[1]?.trim() ?? '',
        employmentType: 'Full-time',
        location: '',
        workSetting: 'Hybrid',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
        bullets: [],
        reasonForLeaving: '',
      }
    } else if (isBullet(trimmed) && current) {
      current.bullets.push(cleanBullet(trimmed))
    }
  }

  if (current) entries.push(current)
  return entries
}

function parseProjectEntries(lines: string[]): ProjectEntry[] {
  const entries: ProjectEntry[] = []
  let current: ProjectEntry | null = null
  let order = 0

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    if (isProjectHeader(trimmed) && !isBullet(trimmed)) {
      if (current) entries.push(current)
      const parts = trimmed.split(/\s*[|\-–]\s*/)
      current = {
        id: `proj-parsed-${entries.length + 1}`,
        name: parts[0]?.trim() ?? trimmed,
        techStack: parts[1]?.trim() ?? '',
        bullets: [],
        githubUrl: '',
        liveUrl: '',
        order: order++,
      }
    } else if (isBullet(trimmed) && current) {
      current.bullets.push(cleanBullet(trimmed))
    }
  }

  if (current) entries.push(current)
  return entries
}

export async function parsePdf(buffer: ArrayBuffer): Promise<DynamicProfile> {
  const allLines = await extractTextFromPdf(buffer)

  // Split lines into sections
  const sections: Record<string, string[]> = {
    experience: [],
    projects: [],
    education: [],
  }

  let currentSection: SectionName | null = null

  for (const line of allLines) {
    const detected = detectSection(line)
    if (detected) {
      currentSection = detected
      continue
    }
    if (currentSection && currentSection in sections) {
      sections[currentSection].push(line)
    }
  }

  const experience = parseExperienceEntries(sections.experience)
  const projects = parseProjectEntries(sections.projects)

  return {
    experience,
    projects,
    resumeFileName: '',
    resumeUpdatedAt: new Date().toISOString(),
  }
}
