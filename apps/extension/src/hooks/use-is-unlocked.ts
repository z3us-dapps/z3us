import { useSharedStore } from 'packages/ui/src/hooks/use-store'
import { useEffect, useMemo, useState } from 'react'

import { useMessageClient } from './use-message-client'
import { usePublicKey } from './use-public-key'

const refreshInterval = 60 * 1000 // 1 minute

export const useIsUnlocked = (): boolean => {
	const pk = usePublicKey(0)
	const client = useMessageClient()
	const { keystoreId } = useSharedStore(state => ({
		keystoreId: state.selectedKeystoreId,
	}))

	const [isUnlocked, setIsUnlocked] = useState<boolean>(!!pk)
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
				setIsUnlocked(!!(await client.getPublicKey(0)))
			} catch (err) {
				console.error(err)
				setIsUnlocked(false)
			}
		}
		load()
	}, [time, keystoreId])

	return isUnlocked
}
