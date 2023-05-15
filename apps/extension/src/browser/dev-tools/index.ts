// eslint-disable-next-line no-underscore-dangle
// window.__dirname = '/'
window.global = window

import('@src/helpers/polyfills')
	.then(() => {
		console.log('aaaaaaa1')
		import('@radixdlt/connector-extension/src/chrome/dev-tools/main')
			.then(() => console.log('bbbbbbbb2'))
			.catch(err => console.error(`bbbbbbbb2 ${err}`))
	})
	.catch(console.error)

export {}
