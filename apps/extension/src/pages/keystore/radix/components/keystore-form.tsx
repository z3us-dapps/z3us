import React, { useEffect, useMemo, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { ZodError } from 'zod'

import { Form } from 'ui/src/components/form'
import TextField from 'ui/src/components/form/fields/text-field'
import { useSharedStore } from 'ui/src/hooks/use-store'
import { defaultKeystore } from 'ui/src/store/keystore'
import { Keystore, KeystoreType } from 'ui/src/store/types'
import { generateId } from 'ui/src/utils/generate-id'

import { useMessageClient } from '@src/hooks/use-message-client'
import { Data, DataType } from '@src/types/vault'

const messages = defineMessages({
	name_placeholder: {
		id: 'keystore.form.new.placeholder',
		defaultMessage: 'Name',
	},
	password_placeholder: {
		id: 'keystore.form.password.placeholder',
		defaultMessage: 'Password',
	},
	confirm_password_placeholder: {
		id: 'keystore.form.confirm_password.placeholder',
		defaultMessage: 'Confirm your password',
	},
	form_button_title: {
		id: 'keystore.form.button.submit',
		defaultMessage: 'Create',
	},
	validation_name: {
		id: 'keystore.form.validation.new',
		defaultMessage: 'Please insert name',
	},
	validation_password: {
		id: 'keystore.form.validation.password',
		defaultMessage: 'Insert password (at least 8 characters)',
	},
	validation_confirm_password: {
		id: 'keystore.form.validation.confirm_password',
		defaultMessage: 'Password does not match',
	},
})

const initialValues = {
	name: '',
	password: '',
	confirmPassword: '',
}

interface IProps {
	connectionPassword: string
}

export const KeystoreForm: React.FC<IProps> = ({ connectionPassword }) => {
	const intl = useIntl()
	const navigate = useNavigate()
	const inputRef = useRef(null)
	const client = useMessageClient()
	const { selectedKeystoreId, addKeystore, removeKeystore } = useSharedStore(state => ({
		selectedKeystoreId: state.selectedKeystoreId,
		addKeystore: state.addKeystoreAction,
		removeKeystore: state.removeKeystoreAction,
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

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	const handleSubmit = async (values: typeof initialValues) => {
		const result = validationSchema.safeParse(values)
		if (result.success === false) {
			setValidation(result.error)
			return
		}

		setValidation(undefined)

		const keystore: Keystore = {
			id: generateId(),
			name: values.name,
			type: KeystoreType.RADIX_WALLET,
		}
		const data: Data = {
			type: DataType.STRING,
			secret: connectionPassword,
		}

		await client.storeInVault(keystore, data, values.password)
		if (selectedKeystoreId === defaultKeystore.id) {
			await client.removeFromVault(selectedKeystoreId)
			removeKeystore(defaultKeystore.id)
		}
		addKeystore(keystore.id, keystore.name, keystore.type)
		navigate('/')
	}

	if (!connectionPassword) return null

	return (
		<Form
			onSubmit={handleSubmit}
			initialValues={initialValues}
			errors={validation?.format()}
			submitButtonTitle={intl.formatMessage(messages.form_button_title)}
		>
			<TextField
				ref={inputRef}
				name="name"
				placeholder={intl.formatMessage(messages.name_placeholder)}
				sizeVariant="medium"
			/>
			<TextField
				isPassword
				name="password"
				placeholder={intl.formatMessage(messages.password_placeholder)}
				sizeVariant="medium"
			/>
			<TextField
				isPassword
				name="confirmPassword"
				placeholder={intl.formatMessage(messages.confirm_password_placeholder)}
				sizeVariant="medium"
			/>
		</Form>
	)
}

export default KeystoreForm
