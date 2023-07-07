import { useSharedStore } from 'packages/ui/src/hooks/use-store'
import { KeystoreType } from 'packages/ui/src/store/types'
import { useEffect } from 'react'
import browser from 'webextension-polyfill'

import { useMessageClient } from './use-message-client'

const setConnectionPassword = async (password: string) => {
	if (!password) {
		await browser.storage.local.set({ connectionPassword: password })
	} else {
		await browser.storage.local.remove('connectionPassword')
	}
}

export const useKeystoreEffects = () => {
	const client = useMessageClient()
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectKeystoreId) || null,
	}))

	useEffect(() => {
		if (!keystore) return

		const loadAndSet = async () => {
			try {
				const data = await client.getFromVault()
				setConnectionPassword(data.secret)
			} catch (error) {
				setConnectionPassword('')
			}
		}

		switch (keystore.type) {
			case KeystoreType.RADIX_WALLET:
				loadAndSet()
				break
			case KeystoreType.LOCAL:
				setConnectionPassword('')
				break
			case KeystoreType.HARDWARE:
				setConnectionPassword('')
				break
			default:
				setConnectionPassword('')
				// eslint-disable-next-line no-console
				console.error(`Invalid keystore type ${keystore.type}`)
		}
	}, [keystore?.id])
}
