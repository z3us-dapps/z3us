import { useMemo, useState } from 'react'

import { useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'

import { useMessageClient } from './use-message-client'

const redirectMap = {
	[KeystoreType.RADIX_WALLET]: '/keystore/new/radix',
	[KeystoreType.HARDWARE]: '/keystore/new/hardware-wallet',
}

export const useIsSetUpComplete = (): {
	isComplete: boolean
	isLoading: boolean
	redirect?: string
	reload: () => void
} => {
	const client = useMessageClient()
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	const [isLoading, setIsLoading] = useState<boolean>(keystore?.type === KeystoreType.RADIX_WALLET)
	const [isComplete, setIsComplete] = useState<boolean>(keystore?.type !== KeystoreType.RADIX_WALLET)
	const [time, setTime] = useState<number>(Date.now())

	useMemo(() => {
		const load = async () => {
			try {
				switch (keystore?.type) {
					case KeystoreType.RADIX_WALLET:
					case KeystoreType.HARDWARE:
						setIsComplete(!(await client.isSecretEmpty()))
						break
					default:
						setIsComplete(true)
						break
				}
			} catch (err) {
				// eslint-disable-next-line no-console
				console.error(err)
				setIsComplete(false)
			} finally {
				if (isLoading) setIsLoading(false)
			}
		}
		load()
	}, [time, keystore])

	return { isComplete, isLoading, reload: () => setTime(Date.now()), redirect: redirectMap[keystore?.type] }
}
