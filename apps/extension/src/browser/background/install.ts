import browser from 'webextension-polyfill'

export const handleInstall = async () => {
	browser.runtime.setUninstallURL('https://github.com/z3us-dapps/z3us/discussions/150')
}
