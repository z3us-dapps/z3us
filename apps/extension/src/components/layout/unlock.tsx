import React, { useEffect, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Form } from 'ui/src/components/form'
import TextField from 'ui/src/components/form/fields/text-field'
import { SelectSimple } from 'ui/src/components/select'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { useSharedStore } from 'ui/src/hooks/use-store'

import { useMessageClient } from '@src/hooks/use-message-client'

const messages = defineMessages({
	password_placeholder: {
		defaultMessage: 'Password',
	},
	unlock_error: {
		defaultMessage: 'Incorrect password!',
	},
	form_button_title: {
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

	const { keystore, keystores, selectKeystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
		keystores: state.keystores,
		selectKeystore: state.selectKeystoreAction,
	}))

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
			// eslint-disable-next-line no-console
			console.error(err)
			setError(intl.formatMessage(messages.unlock_error))
		}
	}

	return (
		<Box display="flex" alignItems="center" gap="medium" flexDirection="column">
			<ValidationErrorMessage message={error} />
			<SelectSimple
				value={keystore?.id}
				onValueChange={selectKeystore}
				data={keystores.map(({ id, name }) => ({ id, title: name }))}
			/>
			<Form
				onSubmit={handleSubmit}
				initialValues={initialValues}
				submitButtonTitle={intl.formatMessage(messages.form_button_title)}
			>
				<TextField
					isPassword
					name="password"
					placeholder={intl.formatMessage(messages.password_placeholder)}
					sizeVariant="medium"
				/>
			</Form>
		</Box>
	)
}

export default Unlock
