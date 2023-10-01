import { useNetworkId } from 'packages/ui/src/hooks/dapp/use-network-id'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

const messages = defineMessages({
	invalid_network: {
		id: 'interaction.network_alert.message',
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
