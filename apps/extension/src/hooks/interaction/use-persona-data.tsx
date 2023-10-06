import type { PersonaDataRequestItem } from '@radixdlt/radix-dapp-toolkit'
import { defineMessages, useIntl } from 'react-intl'

import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

const messages = defineMessages({
	not_implemented: {
		id: 'hooks.interaction.persona_data.not_implemented',
		defaultMessage: 'Not implemented',
	},
})

export const usePersonaData = () => {
	const intl = useIntl()
	const networkId = useNetworkId()

	const { personaIndexes } = useNoneSharedStore(state => ({
		personaIndexes: state.personaIndexes[networkId] || {},
	}))

	const buildPersonaData = async (selectedPersona: string, req?: PersonaDataRequestItem) => {
		if (!req) return undefined
		const persona = personaIndexes[selectedPersona]
		console.log('buildPersonaData', persona)
		throw new Error(intl.formatMessage(messages.not_implemented))
	}

	return buildPersonaData
}
