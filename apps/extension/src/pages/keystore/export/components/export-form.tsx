import React, { useEffect, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Form } from 'ui/src/components/form'
import TextField from 'ui/src/components/form/fields/text-field'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'

import { useMessageClient } from '@src/hooks/use-message-client'

const messages = defineMessages({
	password_placeholder: {
		id: 'export.password_form.password.placeholder',
		defaultMessage: 'Password',
	},
	unlock_error: {
		id: 'export.password_form.error',
		defaultMessage: 'Incorrect password!',
	},
	form_button_title: {
		id: 'export.password_form.form.button.title',
		defaultMessage: 'Show',
	},
})

const initialValues = {
	password: '',
}

interface IProps {
	onUnlock: (secret: string) => void
}

export const ExportForm: React.FC<IProps> = ({ onUnlock }) => {
	const intl = useIntl()
	const inputRef = useRef(null)
	const client = useMessageClient()

	const [error, setError] = useState<string>('')

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			const secret = await client.getSecret(values.password)
			onUnlock(secret)
			setError('')
		} catch (err) {
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

export default ExportForm
