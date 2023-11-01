import React, { useEffect, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Form } from 'ui/src/components/form'
import { SubmitButton } from 'ui/src/components/form/fields/submit-button'
import TextField from 'ui/src/components/form/fields/text-field'
import { Button } from 'ui/src/components/router-button'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'

import { useZdtState } from '../../hooks/zdt/use-zdt'

const messages = defineMessages({
	password_placeholder: {
		id: '5sg7KC',
		defaultMessage: 'Password',
	},
	unlock_error: {
		id: 'uyz8/R',
		defaultMessage: 'Incorrect password!',
	},
	form_button_title: {
		id: 'K7AkdL',
		defaultMessage: 'Show',
	},
})

const initialValues = {
	password: '',
}

interface IProps {
	onUnlock: (secret: string) => void
}

export const WalletSecretForm: React.FC<IProps> = ({ onUnlock }) => {
	const intl = useIntl()
	const inputRef = useRef(null)
	const { getSecret } = useZdtState()

	const [error, setError] = useState<string>('')

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			const secret = await getSecret(values.password)
			onUnlock(secret)
			setError('')
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err)
			setError(intl.formatMessage(messages.unlock_error))
		}
	}

	return (
		<Form onSubmit={handleSubmit} initialValues={initialValues}>
			<ValidationErrorMessage message={error} />
			<Box>
				<TextField
					ref={inputRef}
					isPassword
					name="password"
					placeholder={intl.formatMessage(messages.password_placeholder)}
					sizeVariant="medium"
				/>
			</Box>
			<SubmitButton>
				<Button sizeVariant="small" styleVariant="destructive">
					{intl.formatMessage(messages.form_button_title)}
				</Button>
			</SubmitButton>
		</Form>
	)
}

export default WalletSecretForm
