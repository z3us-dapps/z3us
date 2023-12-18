import type { Intent, SignatureWithPublicKey } from '@radixdlt/radix-engine-toolkit'
import { RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import { useCallback } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Text } from 'ui/src/components/typography'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network'
import { useAccountIndexes } from 'ui/src/hooks/use-account-indexes'
import { useSharedStore } from 'ui/src/hooks/use-store'

import { usePasswordModal } from '@src/hooks/modal/use-password-modal'
import { useMessageClient } from '@src/hooks/use-message-client'

const messages = defineMessages({
	title: {
		id: 'S7xWC3',
		defaultMessage: 'Signature requested',
	},
})

const Content = () => {
	const intl = useIntl()

	return <Text>{intl.formatMessage(messages.title)}</Text>
}

export const useSignTransactionWithBackground = () => {
	const networkId = useNetworkId()
	const client = useMessageClient()
	const confirm = usePasswordModal()
	const accountIndexes = useAccountIndexes()

	const { selectedKeystore } = useSharedStore(state => ({
		selectedKeystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	const sign = async (intent: Intent, needSignaturesFrom: string[]): Promise<SignatureWithPublicKey[]> => {
		const password = await confirm({ content: <Content /> })
		const intentHash = await RadixEngineToolkit.Intent.intentHash(intent)
		return Promise.all(
			needSignaturesFrom.map(signBy =>
				client.signToSignatureWithPublicKey(
					selectedKeystore,
					accountIndexes[signBy].curve,
					accountIndexes[signBy].derivationPath,
					password,
					intentHash.hash,
					accountIndexes[signBy].combinedKeystoreId,
				),
			),
		)
	}

	return useCallback(sign, [networkId, accountIndexes, client, selectedKeystore, confirm])
}
