import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot } from 'ui/src/components/dialog'
import { Form } from 'ui/src/components/form'
import TextField from 'ui/src/components/form/fields/text-field'
import { Close2Icon } from 'ui/src/components/icons'
import { type IInputProps, Input } from 'ui/src/components/input'
import { Button } from 'ui/src/components/router-button'
import { ScrollArea } from 'ui/src/components/scroll-area'
import * as dialogStyles from 'ui/src/components/styles/dialog-styles.css'
import { ToolTip } from 'ui/src/components/tool-tip'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'

import TextAreaField from '../form/fields/text-area-field'
import * as styles from './styles.css'

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
	close: {
		id: 'modals.sign.close_button',
		defaultMessage: 'Cancel',
	},
})

const initialValues = {
	password: '',
}

export interface IProps {
	manifest: string
	onConfirm: (password: string) => void
	onCancel: () => void
}

const SignModal: React.FC<IProps> = ({ manifest, onConfirm, onCancel }) => {
	const intl = useIntl()
	const inputRef = useRef(null)

	const [isScrolled, setIsScrolled] = useState<boolean>(false)
	const [isOpen, setIsOpen] = useState<boolean>(true)
	const [error, setError] = useState<string>('')

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	const handleScroll = (event: Event) => {
		const target = event.target as Element
		const { scrollTop } = target

		setIsScrolled(scrollTop > 0)
	}

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			onConfirm(values.password)
			setError('')
			setIsOpen(false)
		} catch (err) {
			console.error(err)
			setError(intl.formatMessage(messages.unlock_error))
		}
	}

	const handleCancel = () => {
		onCancel()
		setError('')
		setIsOpen(false)
	}

	const handleEscapeKeyDown = () => {
		handleCancel()
	}

	const handleOnInteractOutside = () => {
		handleCancel()
	}

	return (
		<DialogRoot open={isOpen} modal>
			<DialogPortal>
				<DialogOverlay className={dialogStyles.dialogOverlay} />
				<DialogContent
					onEscapeKeyDown={handleEscapeKeyDown}
					onInteractOutside={handleOnInteractOutside}
					className={clsx(dialogStyles.dialogContent, styles.content)}
				>
					<ScrollArea onScroll={handleScroll}>
						<Box className={styles.scrollWrapper}>
							<Input value={manifest} elementType="textarea" type="text" disabled />
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
						</Box>
					</ScrollArea>
					<Box className={clsx(styles.headerWrapper, isScrolled && styles.headerWrapperShadow)}>
						<Box flexGrow={1} />
						<Box flexGrow={1} display="flex" justifyContent="flex-end" gap="small">
							<ToolTip message={intl.formatMessage(messages.close)}>
								<Button styleVariant="ghost" sizeVariant="small" iconOnly onClick={handleCancel}>
									<Close2Icon />
								</Button>
							</ToolTip>
						</Box>
					</Box>
				</DialogContent>
			</DialogPortal>
		</DialogRoot>
	)
}

export default SignModal
