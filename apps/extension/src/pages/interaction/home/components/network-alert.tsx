import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
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

	return (
		<Box display="flex" flexDirection="column" gap="xsmall" alignItems="center" justifyContent="center">
			<ValidationErrorMessage
				align="center"
				message={intl.formatMessage(messages.invalid_network, { dAppNetworkId, networkId })}
			/>
		</Box>
	)
}
