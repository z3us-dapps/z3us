import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Dialog } from 'ui/src/components/dialog'
import PersonaDataForm from 'ui/src/components/form/persona-data-form'
import { Text } from 'ui/src/components/typography'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { useZdtState } from 'ui/src/hooks/zdt/use-zdt'
import type { Persona } from 'ui/src/store/types'

const messages = defineMessages({
	title: {
		id: 'y50Ejq',
		defaultMessage: 'Persona details',
	},
	updated_toast: {
		id: 'YcDkRR',
		defaultMessage: 'Successfully updated persona details',
	},
	created_toast: {
		id: 'PIWhuk',
		defaultMessage: 'Successfully added new persona',
	},
	cancel: {
		id: '47FYwb',
		defaultMessage: 'Cancel',
	},
})

interface IProps {
	identityAddress?: string
	onClose: () => void
}

const UpsertPersonaModal: React.FC<IProps> = ({ identityAddress, onClose }) => {
	const intl = useIntl()
	const networkId = useNetworkId()
	const { buildNewPersonKeyParts } = useZdtState()
	const { personaIndexes, addPersona } = useNoneSharedStore(state => ({
		personaIndexes: state.personaIndexes[networkId] || {},
		addPersona: state.addPersonaAction,
	}))

	const handleSubmit = async values => {
		const currentDetails = personaIndexes?.[identityAddress]
		const labelParts: string[] = []
		if (values.names?.[0]?.givenNames) {
			labelParts.push(values.names?.[0]?.givenNames)
		}
		if (values.names?.[0]?.nickname) {
			labelParts.push(`"${values.names?.[0]?.nickname}"`)
		}
		if (values.names?.[0]?.familyName) {
			labelParts.push(values.names?.[0]?.familyName)
		}

		const details = {
			label: labelParts.length > 0 ? labelParts.join(' ') : currentDetails?.label || '',
			nickName: values.names?.[0]?.nickname,
			nameVariant: values.names?.[0]?.variant,
			givenNames: values.names?.[0]?.givenNames,
			familyName: values.names?.[0]?.familyName,
			emailAddresses: values.emailAddresses?.map(({ email }) => email) || [],
			phoneNumbers: values.phoneNumbers?.map(({ number }) => number) || [],
		}

		if (identityAddress === '') {
			const keyParts = await buildNewPersonKeyParts()
			addPersona(networkId, keyParts.identityAddress, {
				...details,
				...keyParts,
			} as Persona)

			toast(intl.formatMessage(messages.created_toast), {})
		} else {
			addPersona(networkId, identityAddress, {
				...(currentDetails || {}),
				...details,
			} as Persona)

			toast(intl.formatMessage(messages.updated_toast), {})
		}

		onClose()
	}

	return (
		<Dialog open={identityAddress !== undefined} onClose={onClose}>
			<Box padding="large" display="flex" flexDirection="column" gap="large">
				<Text size="xlarge" color="strong" weight="strong">
					{intl.formatMessage(messages.title)}
				</Text>
				<Box display="flex" flexDirection="column" gap="xsmall">
					<PersonaDataForm onSubmit={handleSubmit} identityAddress={identityAddress} />
				</Box>
				<Box display="flex" gap="small" justifyContent="flex-end">
					<Button sizeVariant="small" styleVariant="secondary" fullWidth onClick={onClose}>
						{intl.formatMessage(messages.cancel)}
					</Button>
				</Box>
			</Box>
		</Dialog>
	)
}

export default UpsertPersonaModal
