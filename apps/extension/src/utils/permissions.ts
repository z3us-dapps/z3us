import browser from 'webextension-polyfill'
import { Network } from '@src/store/types'

export const askForHostPermissions = async (networks: Network[]) => {
	const origins = []

	await Promise.all(
		networks.map(async network => {
			try {
				let url: URL
				if (network.url instanceof URL) {
					url = network.url
				} else {
					url = new URL(network.url)
				}
				const origin = `${url.origin}/*`
				const hasPermissions = await browser.permissions.contains({
					origins: [origin],
				})
				if (!hasPermissions) {
					origins.push(origin)
				}
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error)
			}
		}),
	)

	if (origins.length > 0) {
		const granted = await browser.permissions.request({ origins })
		if (!granted) {
			throw new Error(`Permissions declined for: ${origins.join(', ')}`)
		}
	}
}
