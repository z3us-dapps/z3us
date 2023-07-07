import type { Runtime } from 'webextension-polyfill'
import browser from 'webextension-polyfill'

export const handleInstall = async (details: Runtime.OnInstalledDetailsType) => {
	if (details.reason === 'update' && details.previousVersion === '1.0.7') {
		const [major] = details.previousVersion.replace(/[^\d.-]+/g, '').split(/[.-]/)
		if (parseInt(major, 10) <= 2) {
			browser.storage.local.clear() // clear state that is no longer compatible
		}
	}
	browser.runtime.setUninstallURL('https://github.com/z3us-dapps/z3us/discussions/150')
}
