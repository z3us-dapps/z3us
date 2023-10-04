import { useEffect, useMemo, useState } from 'react'

import { useSharedStore } from 'ui/src/hooks/use-store'

import { useMessageClient } from './use-message-client'

const refreshInterval = 15 * 1000 // 1 minute

export const useIsUnlocked = (): { isUnlocked: boolean; isLoading: boolean; reload: () => void } => {
	const client = useMessageClient()
	const { trigger, keystoreId } = useSharedStore(state => ({
		trigger: state.sharedStoreReloadTrigger,
		keystoreId: state.selectedKeystoreId,
	}))

	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isUnlocked, setIsUnlocked] = useState<boolean>(false)
	const [time, setTime] = useState<number>(Date.now())

	useEffect(() => {
		const interval = setInterval(() => setTime(Date.now()), refreshInterval)

		return () => {
			clearInterval(interval)
		}
	}, [])

	useMemo(() => {
		const load = async () => {
			try {
				setIsUnlocked(await client.isVaultUnlocked())
			} catch (err) {
				// eslint-disable-next-line no-console
				console.error(err)
				setIsUnlocked(false)
			} finally {
				if (isLoading) setIsLoading(false)
			}
		}
		load()
	}, [time, trigger, keystoreId])

	return { isUnlocked, isLoading, reload: () => setTime(Date.now()) }
}