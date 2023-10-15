import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'

const messages = defineMessages({
	invalid_network: {
		id: 'eQuFfI',
		defaultMessage: 'Network mismatch, dApp uses {dAppNetworkId} wallet uses {networkId}',
	},
})

interface IProps {
	networkId: number
}

export const NetworkAlert: React.FC<IProps> = ({ networkId: dAppNetworkId }) => {
	const intl = useIntl()
	const networkId = useNetworkId()

	if (!dAppNetworkId || dAppNetworkId === networkId) {
		return null
	}

	return <h1>{intl.formatMessage(messages.invalid_network, { dAppNetworkId, networkId })}</h1>
}
