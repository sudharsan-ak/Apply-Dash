import { getDisabledPrefs } from '../shared/storage'
import { initPanel } from './panel'

async function main() {
  if (document.getElementById('applydash-root')) return

  const prefs = await getDisabledPrefs()
  if (prefs.allPages) return
  if (prefs.domains.includes(window.location.hostname)) return

  initPanel()
}

main()
