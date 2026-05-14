import { Plugin } from '@nuxt/types'
import { v1 as uuidv1 } from 'uuid'

const safeStorage = {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  },
  set(key: string, value: string): boolean {
    try {
      localStorage.setItem(key, value)
      return true
    } catch {
      return false
    }
  },
  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch {
      /* storage unavailable (private mode, quota, unload race) */
    }
  },
}

let init = false

const preventMultitabsPlugin: Plugin = (): void => {
  if (init || typeof localStorage === 'undefined') return

  const uuid = uuidv1()
  if (!safeStorage.set('open', uuid)) return

  init = true

  addEventListener('pagehide', (event) => {
    if (event.persisted) return
    if (window.$nuxt && window.$nuxt.$data.layoutName !== '<%= options.layout %>') {
      safeStorage.remove('open')
    }
  })

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && !safeStorage.get('open')) {
      location.reload()
    }
  })

  addEventListener('storage', (event: StorageEvent) => {
    if (event.key === 'open' && event.newValue !== uuid) {
      if (window.$nuxt && event.newValue) {
        window.$nuxt.setLayout('<%= options.layout %>')
      } else if (document.visibilityState === 'visible') {
        location.reload()
      }
    }
  })
}

export default preventMultitabsPlugin
