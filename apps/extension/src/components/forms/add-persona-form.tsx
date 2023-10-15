import { RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import { useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Form } from 'ui/src/components/form'
import TextField from 'ui/src/components/form/fields/text-field'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { CURVE, SCHEME } from 'ui/src/store/types'

import { buildPersonaDerivationPath } from '@src/crypto/derivation_path'
import { useGetPublicKey } from '@src/hooks/use-get-public-key'

const messages = defineMessages({
	name: {
		defaultMessage: 'Name',
	},
	validation_name: {
		defaultMessage: 'Name is required',
	},
	form_button_title: {
		defaultMessage: 'Add',
	},
})

const initialValues = {
	name: '',
}

const AddPersonaForm: React.FC = () => {
	const intl = useIntl()
	const networkId = useNetworkId()
	const getPublicKey = useGetPublicKey()
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

		const idx = Math.max(-1, ...Object.values(personaIndexes).map(persona => persona.entityIndex)) + 1
		const derivationPath = buildPersonaDerivationPath(networkId, idx)
		const publicKey = await getPublicKey(CURVE.CURVE25519, derivationPath)
		const address = await RadixEngineToolkit.Derive.virtualIdentityAddressFromPublicKey(publicKey, networkId)
		const identityAddress = address.toString()

		addPersona(networkId, identityAddress, {
			label: values.name,
			entityIndex: +idx,
			identityAddress,
			publicKeyHex: publicKey.hexString(),
			curve: CURVE.CURVE25519,
			scheme: SCHEME.CAP26,
			derivationPath,
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
