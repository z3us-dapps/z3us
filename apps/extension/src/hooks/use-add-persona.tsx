import { RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import { useCallback } from 'react'

import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import type { Persona } from 'ui/src/store/types'
import { CURVE, SCHEME } from 'ui/src/store/types'

import { buildPersonaDerivationPath } from '@src/crypto/derivation_path'
import { useGetPublicKey } from '@src/hooks/use-get-public-key'

export const useBuildNewPersonKeyParts = () => {
	const networkId = useNetworkId()
	const getPublicKey = useGetPublicKey()
	const { personaIndexes } = useNoneSharedStore(state => ({
		personaIndexes: state.personaIndexes[networkId] || {},
	}))

	const buildNewPersonKeyParts = useCallback(
		async (combinedKeystoreId: string) => {
			const idx =
				Math.max(
					-1,
					...Object.values(personaIndexes)
						.filter(persona => persona.combinedKeystoreId === combinedKeystoreId)
						.map(persona => persona.entityIndex),
				) + 1
			const derivationPath = buildPersonaDerivationPath(networkId, idx)
			const publicKey = await getPublicKey(CURVE.CURVE25519, derivationPath, combinedKeystoreId)
			const address = await RadixEngineToolkit.Derive.virtualIdentityAddressFromPublicKey(publicKey, networkId)
			const identityAddress = address.toString()

			return {
				entityIndex: +idx,
				identityAddress,
				publicKeyHex: publicKey.hexString(),
				curve: CURVE.CURVE25519,
				scheme: SCHEME.CAP26,
				derivationPath,
				combinedKeystoreId,
			}
		},
		[networkId, personaIndexes, getPublicKey],
	)

	return buildNewPersonKeyParts
}

export const useAddPersona = () => {
	const networkId = useNetworkId()
	const getPublicKey = useGetPublicKey()
	const buildNewPersonKeyParts = useBuildNewPersonKeyParts()

	const { personaIndexes, addPersona } = useNoneSharedStore(state => ({
		personaIndexes: state.personaIndexes[networkId] || {},
		addPersona: state.addPersonaAction,
	}))

	const create = async (combinedKeystoreId: string, name: string = '') => {
		const keyParts = await buildNewPersonKeyParts(combinedKeystoreId)
		addPersona(networkId, keyParts.identityAddress, {
			...keyParts,
			label: name,
		} as Persona)

		return keyParts.identityAddress
	}

	return useCallback(create, [networkId, getPublicKey, personaIndexes, addPersona])
}
