import React, { useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Form } from 'ui/src/components/form'
import PasswordField from 'ui/src/components/form/fields/password-field'
import { SubmitButton } from 'ui/src/components/form/fields/submit-button'
import TextField from 'ui/src/components/form/fields/text-field'
import { useSharedStore } from 'ui/src/hooks/use-store'
import type { Keystore } from 'ui/src/store/types'
import { KeystoreType } from 'ui/src/store/types'
import { generateId } from 'ui/src/utils/rand'

import { getSecret } from '@src/crypto/secret'
import { useMessageClient } from '@src/hooks/use-message-client'
import type { Data } from '@src/types/vault'

const messages = defineMessages({
	name_placeholder: {
		id: 'HAlOn1',
		defaultMessage: 'Name',
	},
	password_placeholder: {
		id: '5sg7KC',
		defaultMessage: 'Password',
	},
	confirm_password_placeholder: {
		id: 'w/ArXE',
		defaultMessage: 'Confirm your password',
	},
	form_button_title: {
		id: 's2g2Y9',
		defaultMessage: 'Create new wallet',
	},
	validation_name: {
		id: 'XK/xhU',
		defaultMessage: 'Please insert name',
	},
	validation_password: {
		id: '+N/BAb',
		defaultMessage: 'Insert password (at least 8 characters)',
	},
	validation_confirm_password: {
		id: 'yy3BXQ',
		defaultMessage: 'Password does not match',
	},
})

const initialValues = {
	name: '',
	password: '',
	confirmPassword: '',
}

interface IProps {
	keystoreType: Exclude<KeystoreType, KeystoreType.COMBINED>
	onSubmit: () => Data
	onNext?: () => void
}

export const NewKeystoreForm: React.FC<IProps> = ({ keystoreType, onSubmit, onNext }) => {
	const intl = useIntl()
	const client = useMessageClient()

	const { addKeystore } = useSharedStore(state => ({
		addKeystore: state.addKeystoreAction,
	}))

	const [validation, setValidation] = useState<ZodError>()

	const validationSchema = useMemo(
		() =>
			z
				.object({
					name: z.string().min(1, intl.formatMessage(messages.validation_name)),
					password: z.string().min(8, intl.formatMessage(messages.validation_password)),
					confirmPassword: z.string(),
				})
				.superRefine(({ confirmPassword, password }, ctx) => {
					if (confirmPassword !== password) {
						ctx.addIssue({
							code: 'custom',
							path: ['confirmPassword'],
							message: intl.formatMessage(messages.validation_confirm_password),
						})
					}
				}),
		[],
	)

	const handleSubmit = async (values: typeof initialValues) => {
		setValidation(undefined)
		const result = validationSchema.safeParse(values)
		if (result.success === false) {
			setValidation(result.error)
			return
		}

		setValidation(undefined)

		const data = onSubmit()

		const keystore: Keystore = {
			id: generateId(),
			name: values.name,
			type: keystoreType,
			ledgerDevice: keystoreType === KeystoreType.HARDWARE ? JSON.parse(getSecret(data)) : undefined,
		}

		addKeystore(keystore)

		await client.storeInVault(keystore, data, values.password)
		await client.unlockVault(keystore, values.password)

		if (onNext) onNext()
	}

	return (
		<Form onSubmit={handleSubmit} initialValues={initialValues} errors={validation?.format()}>
			<Box display="flex" flexDirection="column" gap="medium">
				<TextField name="name" placeholder={intl.formatMessage(messages.name_placeholder)} sizeVariant="large" />
				<PasswordField
					name="password"
					placeholder={intl.formatMessage(messages.password_placeholder)}
					sizeVariant="large"
				/>
				<PasswordField
					name="confirmPassword"
					placeholder={intl.formatMessage(messages.confirm_password_placeholder)}
					sizeVariant="large"
				/>
				<SubmitButton>
					<Button sizeVariant="large">{intl.formatMessage(messages.form_button_title)}</Button>
				</SubmitButton>
			</Box>
		</Form>
	)
}

export default NewKeystoreForm
