import React, { useEffect, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Form } from 'ui/src/components/form'
import TextField from 'ui/src/components/form/fields/text-field'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'

import { useMessageClient } from '@src/hooks/use-message-client'

const messages = defineMessages({
	password_placeholder: {
		id: 'unlock.password.placeholder',
		defaultMessage: 'Password',
	},
	unlock_error: {
		id: 'unlock.error',
		defaultMessage: 'Incorrect password!',
	},
	form_button_title: {
		id: 'unlock.form.button.title',
		defaultMessage: 'Unlock',
	},
})

const initialValues = {
	password: '',
}

interface IProps {
	onUnlock: () => void
}

export const Unlock: React.FC<IProps> = ({ onUnlock }) => {
	const intl = useIntl()
	const inputRef = useRef(null)
	const client = useMessageClient()

	const [error, setError] = useState<string>('')

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			await client.unlockVault(values.password)
			onUnlock()
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

export default Unlock
