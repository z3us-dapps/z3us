import type { Intent, SignatureWithPublicKey } from '@radixdlt/radix-engine-toolkit'
import { RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import { useCallback } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Text } from 'ui/src/components/typography'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import { usePasswordModal } from '@src/hooks/modal/use-password-modal'
import { useMessageClient } from '@src/hooks/use-message-client'

const messages = defineMessages({
	title: {
		id: 'hooks.transaction.sign_background.title',
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

	const { accountIndexes } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes[networkId] || {},
	}))

	const sign = async (intent: Intent, needSignaturesFrom: string[]): Promise<SignatureWithPublicKey[]> => {
		const password = await confirm(<Content />)
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
