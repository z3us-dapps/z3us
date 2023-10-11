import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import { SettingsTitle } from '../components/settings-title'
import { SettingsWrapper } from '../components/settings-wrapper'

const messages = defineMessages({
	title: {
		id: 'settings.personas.title',
		defaultMessage: 'Personas',
	},
	subtitle: {
		id: 'settings.personas.subtitle',
		defaultMessage: `Manage your Radix network identities`,
	},
})

const Personas: React.FC = () => {
	const intl = useIntl()
	const networkId = useNetworkId()

	const { personaIndexes } = useNoneSharedStore(state => ({
		personaIndexes: state.personaIndexes[networkId] || {},
	}))

	return (
		<SettingsWrapper>
			<SettingsTitle
				backLink="/settings"
				title={intl.formatMessage(messages.title)}
				subTitle={intl.formatMessage(messages.subtitle)}
			/>
			<Box display="flex" flexDirection="column" gap="small">
				{Object.values(personaIndexes).map(persona => (
					<Box key={persona.identityAddress} display="flex" flexDirection="column" gap="small">
						<Text size="small" weight="medium" color="strong">
							{`${persona.label} ${persona.identityAddress}`}
							Name: {`${persona.givenNames} ${persona.familyName} (${persona.nameVariant})`}
							Email Addresses: {persona.emailAddresses?.join(', ')}
							Phone Numbers: {persona.phoneNumbers?.join(', ')}
						</Text>
					</Box>
				))}
			</Box>
		</SettingsWrapper>
	)
}

export default Personas
