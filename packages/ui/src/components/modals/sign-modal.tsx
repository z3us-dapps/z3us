import { useEffect, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Form } from 'ui/src/components/form'
import TextField from 'ui/src/components/form/fields/text-field'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'

import { ModalContainer } from './components/container'

const messages = defineMessages({
	password_placeholder: {
		id: 'modals.sign.form.password.placeholder',
		defaultMessage: 'Password',
	},
	unlock_error: {
		id: 'modals.sign.form.error',
		defaultMessage: 'Incorrect password!',
	},
	form_button_title: {
		id: 'modals.sign.form.submit_button.title',
		defaultMessage: 'Sign',
	},
})

const initialValues = {
	password: '',
}

export interface IProps {
	isOpen: boolean
	onConfirm: (password: string) => void
	onCancel: () => void
}

const SignModal: React.FC<IProps> = ({ isOpen, onConfirm, onCancel }) => {
	const intl = useIntl()
	const inputRef = useRef(null)

	const [error, setError] = useState<string>('')

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			onConfirm(values.password)
			setError('')
		} catch (err) {
			console.error(err)
			setError(intl.formatMessage(messages.unlock_error))
		}
	}

	return (
		<ModalContainer show={isOpen} closeOnTap onClose={onCancel}>
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
		</ModalContainer>
	)
}

export default SignModal
