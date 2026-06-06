// Scans the page DOM for salary information and returns the maximum value found

const SALARY_PATTERNS = [
  // $120,000 - $180,000 or $120,000 – $180,000
  /\$\s*([\d,]+)\s*(?:–|-|to)\s*\$\s*([\d,]+)/gi,
  // $120K - $180K
  /\$\s*([\d.]+)\s*[Kk]\s*(?:–|-|to)\s*\$\s*([\d.]+)\s*[Kk]/gi,
  // Up to $180,000
  /up\s+to\s+\$\s*([\d,]+)/gi,
  // $180,000/yr or $180K/year
  /\$\s*([\d,]+)\s*(?:\/\s*(?:yr|year|annually))/gi,
  // $180K
  /\$\s*([\d.]+)\s*[Kk]/gi,
]

function parseAmount(raw: string): number {
  const cleaned = raw.replace(/,/g, '').trim()
  const num = parseFloat(cleaned)
  // If > 1000 already it's a full number, else it's K
  return num < 1000 ? num * 1000 : num
}

export function scanPageForMaxSalary(): number | null {
  const bodyText = document.body.innerText

  let maxSalary = 0
  let found = false

  for (const pattern of SALARY_PATTERNS) {
    pattern.lastIndex = 0
    let match: RegExpExecArray | null
    while ((match = pattern.exec(bodyText)) !== null) {
      // match[1] = first number, match[2] = second number (if range)
      const val1 = match[1] ? parseAmount(match[1]) : 0
      const val2 = match[2] ? parseAmount(match[2]) : 0
      const max = Math.max(val1, val2)
      if (max > maxSalary) {
        maxSalary = max
        found = true
      }
    }
  }

  return found ? maxSalary : null
}

export function formatSalary(amount: number): string {
  return Math.round(amount).toLocaleString('en-US')
}
