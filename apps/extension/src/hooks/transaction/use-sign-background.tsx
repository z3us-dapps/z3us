import type { Intent, SignatureWithPublicKey } from '@radixdlt/radix-engine-toolkit'
import { RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import { useCallback } from 'react'

import { Input } from 'ui/src/components/input'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import { useMessageClient } from '@src/hooks/use-message-client'
import { useSignModal } from '@src/hooks/use-sign-modal'

const modalContent = (manifest: string) => <Input value={manifest} elementType="textarea" type="textarea" disabled />

export const useSignTransactionWithBackground = () => {
	const networkId = useNetworkId()
	const client = useMessageClient()
	const confirm = useSignModal()

	const { accountIndexes } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes[networkId] || {},
	}))

	const sign = async (intent: Intent, needSignaturesFrom: string[]): Promise<SignatureWithPublicKey[]> => {
		const content = modalContent(
			(await RadixEngineToolkit.Instructions.convert(intent.manifest.instructions, networkId, 'String'))
				.value as string,
		)
		const password = await confirm(content)

		const intentHash = await RadixEngineToolkit.Intent.intentHash(intent)
		return Promise.all(
			needSignaturesFrom.map(signBy =>
				client.signToSignatureWithPublicKey(
					accountIndexes[signBy].curve,
					accountIndexes[signBy].derivationPath,
					password,
					intentHash.hash,
				),
			),
		)
	}

	return useCallback(sign, [networkId, accountIndexes, client, confirm])
}
