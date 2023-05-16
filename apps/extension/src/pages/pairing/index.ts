// eslint-disable-next-line no-underscore-dangle
window.__dirname = '/'
window.global = window

import('@src/helpers/polyfills')
	.then(() => import('@radixdlt/connector-extension/src/pairing/main').catch(console.error))
	.catch(console.error)

export {}
