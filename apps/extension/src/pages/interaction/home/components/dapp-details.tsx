import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { useEntityMetadata } from 'ui/src/hooks/dapp/use-entity-metadata'
import { getStringMetadata } from 'ui/src/services/metadata'
import { getShortAddress } from 'ui/src/utils/string-utils'

const messages = defineMessages({
	name: {
		id: 'interaction.dapp_details.name',
		defaultMessage: 'dApp: {name}',
	},
})

interface IProps {
	dAppDefinitionAddress: string
	origin?: string
}

export const DappDetails: React.FC<IProps> = ({ dAppDefinitionAddress, origin }) => {
	const intl = useIntl()
	const { data } = useEntityMetadata(dAppDefinitionAddress)
	const name = getStringMetadata('name', data)

	return (
		<h1>{intl.formatMessage(messages.name, { name: name || origin || getShortAddress(dAppDefinitionAddress) })}</h1>
	)
}
