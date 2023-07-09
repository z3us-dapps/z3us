import { getNoneSharedStore } from 'packages/ui/src/services/state'
import { sharedStore } from 'packages/ui/src/store'
import { type Keystore, KeystoreType, type Keystore as NewKeystore } from 'packages/ui/src/store/types'
import type { Runtime } from 'webextension-polyfill'
import browser from 'webextension-polyfill'

const migrateOlympiaAddresses = async () => {
	const oldSharedStore = await browser.storage.local.get(['z3us-store-shared'])
	const oldSharedState = JSON.parse(oldSharedStore['z3us-store-shared'] || {}).state
	if (oldSharedState) {
		const currentState = sharedStore.getState()

		const newKeystores = await Promise.all(
			oldSharedState.keystores.map(async (keystore: Keystore) => {
				try {
					if (keystore.type !== KeystoreType.LOCAL) return null

					const oldNoneSharedStore = await browser.storage.local.get(`z3us-store-${keystore.id}`)
					const oldNoneSharedState = JSON.parse(oldNoneSharedStore[`z3us-store-${keystore.id}`] || {}).state
					if (!oldNoneSharedState) return null

					const noneSharedStore = await getNoneSharedStore(keystore.id)
					const currentKeystoreState = noneSharedStore.getState()
					currentKeystoreState.olympiaAddresses = oldNoneSharedState?.publicAddresses || undefined
					noneSharedStore.setState(currentKeystoreState)
					await noneSharedStore.persist.rehydrate()

					return {
						...keystore,
					} as NewKeystore
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error(`migrateOlympiaAddresses: ${JSON.stringify(keystore)}: ${error}`)
				}
				return null
			}),
		)

		currentState.keystores = [...currentState.keystores, ...newKeystores.filter(keystore => !!keystore)]
		sharedStore.setState(currentState)
		await sharedStore.persist.rehydrate()

		try {
			await browser.storage.local.remove('z3us-store-shared')
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(`failed to remove old shared store: ${error}`)
		}
		await Promise.all(
			oldSharedState.keystores.map(async keystore => {
				try {
					await browser.storage.local.remove(`z3us-store-${keystore.id}`)
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error(`failed to remove none shared store for: ${JSON.stringify(keystore)}: ${error}`)
				}
			}),
		)
	}
}

export const handleInstall = async (details: Runtime.OnInstalledDetailsType) => {
	if (details.reason === 'update' && details.previousVersion === '1.0.7') {
		const [major] = details.previousVersion.replace(/[^\d.-]+/g, '').split(/[.-]/)
		if (parseInt(major, 10) <= 2) {
			await migrateOlympiaAddresses()
		}
	}

	browser.runtime.setUninstallURL('https://github.com/z3us-dapps/z3us/discussions/150')
}
