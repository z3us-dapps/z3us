import browser from 'webextension-polyfill'

export const askForHostPermissions = async (networks: URL[]): Promise<string[]> => {
	const origins: string[] = []

	await Promise.all(
		networks.map(async network => {
			try {
				let url: URL
				if (network instanceof URL) {
					url = network
				} else {
					url = new URL(network)
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
				console.error(`askForHostPermissions: ${error}`)
			}
		}),
	)

	return origins
}
