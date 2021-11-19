import { Plugin } from '@nuxt/types'
import { v1 as uuidv1 } from 'uuid'

let init = false

const preventMultitabsPlugin: Plugin = (): void => {
  if (!init && localStorage) {
    init = true

    const uuid = uuidv1()
    localStorage.open = uuid

    addEventListener('unload', () => {
      if (window.$nuxt.$data.layoutName !== '<%= options.layout %>') {
        localStorage.removeItem('open')
      }
    })

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && !localStorage.open) {
        location.reload()
      }
    })

    addEventListener('storage', (event: StorageEvent) => {
      // Prevent firing the event after the page is open (Safari < 14 fix)
      if (event.key === 'open' && event.newValue !== uuid) {
        if (event.newValue) {
          window.$nuxt.setLayout('<%= options.layout %>')
        } else if (!document.hidden) {
          location.reload()
        }
      }
    })
  }
}

export default preventMultitabsPlugin
