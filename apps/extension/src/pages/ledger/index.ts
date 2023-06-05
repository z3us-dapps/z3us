window.__dirname = '/'
window.global = window

import('@src/helpers/polyfills').then(() => import('./main').catch(console.error)).catch(console.error)

export {}
