// eslint-disable-next-line no-underscore-dangle
window.__dirname = '/'
window.global = window

import('./helpers/polyfills').then(() => import('./main'))

export {}
