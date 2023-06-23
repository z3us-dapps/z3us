import { useSharedStore } from 'packages/ui/src/hooks/use-store'
import { useEffect, useState } from 'react'

import { entropyToMnemonic, secp256k1Service } from '@src/crypto/key_pair'
import type { KeyPair } from '@src/crypto/key_pair'
import type { Data } from '@src/types/vault'
import { DataType } from '@src/types/vault'

import { useMessageClient } from './use-message-client'

function getKeyPair(data: Data): KeyPair | null {
	switch (data.type) {
		case DataType.MNEMONIC:
			return secp256k1Service.fromMnemonic(entropyToMnemonic(data.secret))
		case DataType.PRIVATE_KEY:
			return secp256k1Service.fromExtendedPrivateKey(data.secret)
		default:
			return null
	}
}

export const useKeyPair = () => {
	const client = useMessageClient()
	const { keystoreId } = useSharedStore(state => ({
		keystoreId: state.selectKeystoreId,
	}))

	const [state, setState] = useState<KeyPair | null>(null)

	useEffect(() => {
		const load = async () => {
			try {
				const data = await client.getFromVault()
				if (data) {
					const keyPair = getKeyPair(data)
					setState(keyPair)
				} else {
					setState(null)
				}
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error)
				setState(null)
			}
		}
		load()
	}, [keystoreId])

	return state
}
