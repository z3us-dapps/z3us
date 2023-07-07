import type { PrivateKey, PublicKey } from '@radixdlt/radix-engine-toolkit'
import { useSharedStore } from 'packages/ui/src/hooks/use-store'
import { useEffect, useState } from 'react'

import { getPrivateKey } from '@src/crypto/key_pair'

import { useMessageClient } from './use-message-client'

export const usePublicKey = (): [PublicKey.PublicKey | null, Error | null] => {
	const client = useMessageClient()
	const { keystoreId } = useSharedStore(state => ({
		keystoreId: state.selectKeystoreId,
	}))

	const [error, setError] = useState<Error | null>(null)
	const [state, setState] = useState<PublicKey.PublicKey | null>(null)

	useEffect(() => {
		const load = async () => {
			try {
				setState(await client.getPublicKey())
				setError(null)
			} catch (err) {
				setState(null)
				setError(err)
			}
		}
		load()
	}, [keystoreId])

	return [state, error]
}

export const usePrivateKey = (password: string): [PrivateKey.IPrivateKey | null, Error | null] => {
	const client = useMessageClient()
	const { keystoreId } = useSharedStore(state => ({
		keystoreId: state.selectKeystoreId,
	}))

	const [error, setError] = useState<Error | null>(null)
	const [state, setState] = useState<PrivateKey.IPrivateKey | null>(null)

	useEffect(() => {
		const load = async () => {
			try {
				setState(getPrivateKey(await client.getFromVault(password)))
				setError(null)
			} catch (err) {
				setState(null)
				setError(err)
			}
		}
		load()
	}, [keystoreId, password])

	return [state, error]
}
