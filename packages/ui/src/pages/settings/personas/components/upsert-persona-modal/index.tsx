import React, { useEffect, useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Dialog } from 'ui/src/components/dialog'
import PersonaDataForm from 'ui/src/components/form/persona-data-form'
import { SelectSimple } from 'ui/src/components/select'
import { Text } from 'ui/src/components/typography'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network'
import { usePersonaIndexes } from 'ui/src/hooks/use-persona-indexes'
import { useNoneSharedStore, useSharedStore } from 'ui/src/hooks/use-store'
import { useZdtState } from 'ui/src/hooks/zdt/use-zdt'
import { KeystoreType, type Persona } from 'ui/src/store/types'

const messages = defineMessages({
	title: {
		id: 'y50Ejq',
		defaultMessage: 'Persona details',
	},
	keySource: {
		defaultMessage: 'Key source',
		id: 'RlCZeE',
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
	validation_key_source: {
		id: 'CIXFwg',
		defaultMessage: 'Please select key source',
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
	const personaIndexes = usePersonaIndexes()

	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))
	const { addPersona } = useNoneSharedStore(state => ({
		addPersona: state.addPersonaAction,
	}))
	const [keySourceId, setKeySourceId] = useState<string>('')

	useEffect(() => {
		if (!keystore || keySourceId) return
		setKeySourceId(keystore.id)
	}, [keystore])

	const selectItems = useMemo(
		() =>
			keystore?.type === KeystoreType.COMBINED
				? Object.keys(keystore.keySources).map(id => ({ id, title: keystore.keySources[id].name }))
				: [],
		[keystore],
	)

	const handleSubmit = async values => {
		if (!keySourceId) throw new Error(intl.formatMessage(messages.validation_key_source))

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
			const keyParts = await buildNewPersonKeyParts(keySourceId)
			addPersona(networkId, keyParts.identityAddress, {
				...details,
				...keyParts,
			} as Persona)

			toast.success(intl.formatMessage(messages.created_toast), {})
		} else {
			addPersona(networkId, identityAddress, {
				...(currentDetails || {}),
				...details,
			} as Persona)

			toast.success(intl.formatMessage(messages.updated_toast), {})
		}

		onClose()
	}

	return (
		<Dialog open={identityAddress !== undefined} onClose={onClose}>
			<Box padding="large" display="flex" flexDirection="column" gap="medium">
				<Text size="xlarge" color="strong" weight="strong">
					{intl.formatMessage(messages.title)}
				</Text>
				{!identityAddress && selectItems.length > 0 && (
					<>
						<Box>
							<SelectSimple
								fullWidth
								value={keySourceId}
								onValueChange={setKeySourceId}
								data={selectItems}
								sizeVariant="xlarge"
								placeholder={intl.formatMessage(messages.keySource)}
							/>
						</Box>
						<Box borderTop={1} borderStyle="solid" borderColor="borderDivider" />
					</>
				)}
				<Box display="flex" flexDirection="column" gap="xsmall">
					<PersonaDataForm onSubmit={handleSubmit} identityAddress={identityAddress} />
				</Box>
				<Box>
					<Button fullWidth sizeVariant="large" styleVariant="secondary" onClick={onClose}>
						{intl.formatMessage(messages.cancel)}
					</Button>
				</Box>
			</Box>
		</Dialog>
	)
}

export default UpsertPersonaModal
