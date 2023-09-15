import { useSharedStore } from 'packages/ui/src/hooks/use-store'
import { KeystoreType } from 'packages/ui/src/store/types'
import { useMemo, useState } from 'react'

import { hasConnectionPassword } from '@src/browser/vault/storage'

export const useIsPaired = (): { isPaired: boolean; isLoading: boolean; reload: () => void } => {
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	const [isLoading, setIsLoading] = useState<boolean>(keystore?.type === KeystoreType.RADIX_WALLET)
	const [isPaired, setIsPaired] = useState<boolean>(keystore?.type !== KeystoreType.RADIX_WALLET)
	const [time, setTime] = useState<number>(Date.now())

	useMemo(() => {
		const load = async () => {
			try {
				setIsPaired(keystore?.type !== KeystoreType.RADIX_WALLET || (await hasConnectionPassword()))
			} catch (err) {
				// eslint-disable-next-line no-console
				console.error(err)
				setIsPaired(false)
			} finally {
				if (isLoading) setIsLoading(false)
			}
		}
		load()
	}, [time, keystore])

	return { isPaired, isLoading, reload: () => setTime(Date.now()) }
}
