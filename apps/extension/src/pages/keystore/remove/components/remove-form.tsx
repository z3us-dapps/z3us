import { useSharedStore } from 'packages/ui/src/hooks/use-store'
import React, { useEffect, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Form } from 'ui/src/components/form'
import TextField from 'ui/src/components/form/fields/text-field'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'

import { useMessageClient } from '@src/hooks/use-message-client'

const messages = defineMessages({
	password_placeholder: {
		id: 'keystore.remove.password_form.password.placeholder',
		defaultMessage: 'Password',
	},
	unlock_error: {
		id: 'keystore.remove.password_form.error',
		defaultMessage: 'Incorrect password!',
	},
	form_button_title: {
		id: 'keystore.remove.password_form.form.button.title',
		defaultMessage: 'Confirm',
	},
})

const initialValues = {
	password: '',
}

export const RemoveForm: React.FC = () => {
	const intl = useIntl()
	const inputRef = useRef(null)
	const client = useMessageClient()
	const { selectedKeystoreId, removeKeystore } = useSharedStore(state => ({
		selectedKeystoreId: state.selectedKeystoreId,
		removeKeystore: state.removeKeystoreAction,
	}))

	const [error, setError] = useState<string>('')

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			await client.removeFromVault(values.password)
			removeKeystore(selectedKeystoreId)
			await client.lockVault()
			setError('')
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err)
			setError(intl.formatMessage(messages.unlock_error))
		}
	}

	return (
		<Form
			onSubmit={handleSubmit}
			initialValues={initialValues}
			submitButtonTitle={intl.formatMessage(messages.form_button_title)}
		>
			<ValidationErrorMessage message={error} />
			<Box>
				<Box>
					<TextField
						isPassword
						name="password"
						placeholder={intl.formatMessage(messages.password_placeholder)}
						sizeVariant="medium"
					/>
				</Box>
			</Box>
		</Form>
	)
}

export default RemoveForm
