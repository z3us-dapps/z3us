import { RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import { useCallback } from 'react'

import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { CURVE, SCHEME } from 'ui/src/store/types'

import { buildPersonaDerivationPath } from '@src/crypto/derivation_path'
import { useGetPublicKey } from '@src/hooks/use-get-public-key'

export const useAddPersona = () => {
	const networkId = useNetworkId()
	const getPublicKey = useGetPublicKey()

	const { personaIndexes, addPersona } = useNoneSharedStore(state => ({
		personaIndexes: state.personaIndexes[networkId] || {},
		addPersona: state.addPersonaAction,
	}))

	const create = async (name: string = '') => {
		const idx = Math.max(-1, ...Object.values(personaIndexes).map(persona => persona.entityIndex)) + 1
		const derivationPath = buildPersonaDerivationPath(networkId, idx)
		const publicKey = await getPublicKey(CURVE.CURVE25519, derivationPath)
		const address = await RadixEngineToolkit.Derive.virtualIdentityAddressFromPublicKey(publicKey, networkId)
		const identityAddress = address.toString()

		addPersona(networkId, identityAddress, {
			label: name,
			entityIndex: +idx,
			identityAddress,
			publicKeyHex: publicKey.hexString(),
			curve: CURVE.CURVE25519,
			scheme: SCHEME.CAP26,
			derivationPath,
		})
	}

	return useCallback(create, [networkId, getPublicKey, personaIndexes, addPersona])
}
