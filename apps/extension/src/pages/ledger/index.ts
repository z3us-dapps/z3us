// eslint-disable-next-line no-underscore-dangle
window.__dirname = '/'
window.global = window

import('@src/helpers/polyfills').then(() => import('./main'))

export {}
