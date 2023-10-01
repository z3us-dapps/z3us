import { RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import { useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Form } from 'ui/src/components/form'
import TextField from 'ui/src/components/form/fields/text-field'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import { useMessageClient } from '@src/hooks/use-message-client'

const messages = defineMessages({
	name: {
		id: 'forms.add_persona.form.name',
		defaultMessage: 'Name',
	},
	validation_name: {
		id: 'forms.add_persona.validation.name',
		defaultMessage: 'Name is required',
	},
	form_button_title: {
		id: 'forms.add_persona.form.submit_button.title',
		defaultMessage: 'Add',
	},
})

const initialValues = {
	name: '',
}

const AddPersonaForm: React.FC = () => {
	const intl = useIntl()
	const client = useMessageClient()
	const networkId = useNetworkId()
	const { personaIndexes, addPersona } = useNoneSharedStore(state => ({
		personaIndexes: state.personaIndexes[networkId] || {},
		addPersona: state.addPersonaAction,
	}))

	const [validation, setValidation] = useState<ZodError>()

	const validationSchema = useMemo(
		() =>
			z.object({
				name: z.string().min(1, intl.formatMessage(messages.validation_name)),
			}),
		[],
	)

	const handleSubmit = async (values: typeof initialValues) => {
		const result = validationSchema.safeParse(values)
		if (result.success === false) {
			setValidation(result.error)
			return
		}

		const idx = Object.keys(personaIndexes).findLastIndex(() => true) + 1
		const publicKey = await client.getPublicKey('persona', +idx)
		const address = await RadixEngineToolkit.Derive.virtualIdentityAddressFromPublicKey(publicKey, networkId)

		addPersona(networkId, +idx, {
			label: values.name,
			identityAddress: address.toString(),
			publicKeyHex: publicKey.hexString(),
		})
		setValidation(undefined)
	}

	return (
		<Form
			onSubmit={handleSubmit}
			initialValues={initialValues}
			errors={validation?.format()}
			submitButtonTitle={intl.formatMessage(messages.form_button_title)}
		>
			<TextField name="name" placeholder={intl.formatMessage(messages.name)} />
		</Form>
	)
}

export default AddPersonaForm
