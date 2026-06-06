import type { CustomQA, DetectedField } from '../../shared/types'
import { detectFieldsHeuristic } from './heuristic'

// Site-specific adapters can override/supplement heuristic detection
// Currently using heuristic for all sites — site adapters will be layered on top
export function detectFields(customQA: CustomQA[] = []): DetectedField[] {
  const fields = detectFieldsHeuristic(customQA)

  // Deduplicate by element reference
  const seen = new Set<HTMLElement>()
  const deduped = fields.filter((f) => {
    if (seen.has(f.element)) return false
    seen.add(f.element)
    return true
  })

  // Drop unknown fields — we have no profile value for them, no point showing them
  const known = deduped.filter((f) => f.fieldType !== 'unknown')

  // Sort by DOM order so the list matches the visual top-to-bottom page order
  known.sort((a, b) => {
    const pos = a.element.compareDocumentPosition(b.element)
    if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1
    if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1
    return 0
  })

  return known
}
