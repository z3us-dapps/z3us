export async function copyTextToClipboard(str: string) {
	try {
		await navigator.clipboard.writeText(str)
	} catch (err) {
		// eslint-disable-next-line
		console.error('Failed to copy: ', err)
	}
}
