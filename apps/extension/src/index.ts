// eslint-disable-next-line no-underscore-dangle
window.__dirname = '/'
// @ts-ignore
window.global = window

import('./polyfills').then(() => import('./main'))

export {}
