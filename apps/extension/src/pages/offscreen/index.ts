window.__dirname = '/'
window.global = window

import('@src/helpers/polyfills')
	.then(() => import('@radixdlt/connector-extension/src/chrome/offscreen/offscreen').catch(console.error))
	.catch(console.error)

export {}
