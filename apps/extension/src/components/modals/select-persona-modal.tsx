import clsx from 'clsx'
import { useEffect, useMemo, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot } from 'ui/src/components/dialog'
import { Form } from 'ui/src/components/form'
import SelectField from 'ui/src/components/form/fields/select-field'
import { Close2Icon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { ScrollArea } from 'ui/src/components/scroll-area'
import * as dialogStyles from 'ui/src/components/styles/dialog-styles.css'
import { ToolTip } from 'ui/src/components/tool-tip'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import AddPersonaForm from '../forms/add-persona-form'
import * as styles from './styles.css'

const messages = defineMessages({
	persona: {
		defaultMessage: 'Persona',
	},
	validation_persona: {
		defaultMessage: 'Please select persona',
	},
	form_button_title: {
		defaultMessage: 'Login',
	},
	close: {
		defaultMessage: 'Cancel',
	},
})

const initialValues = {
	persona: '',
}

export interface IProps {
	onConfirm: (address: string) => void
	onCancel: () => void
}

const SelectPersonaModal: React.FC<IProps> = ({ onConfirm, onCancel }) => {
	const intl = useIntl()
	const inputRef = useRef(null)
	const networkId = useNetworkId()
	const { personaIndexes } = useNoneSharedStore(state => ({
		personaIndexes: state.personaIndexes[networkId] || {},
	}))

	const [validation, setValidation] = useState<ZodError>()
	const [isScrolled, setIsScrolled] = useState<boolean>(false)
	const [isOpen, setIsOpen] = useState<boolean>(true)

	const validationSchema = useMemo(
		() =>
			z.object({
				persona: z.string().min(1, intl.formatMessage(messages.validation_persona)),
			}),
		[],
	)

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	const handleScroll = (event: Event) => {
		const target = event.target as Element
		const { scrollTop } = target

		setIsScrolled(scrollTop > 0)
	}

	const handleSubmit = async (values: typeof initialValues) => {
		const result = validationSchema.safeParse(values)
		if (result.success === false) {
			setValidation(result.error)
			return
		}
		onConfirm(values.persona)
		setIsOpen(false)
		setValidation(undefined)
	}

	const handleCancel = () => {
		onCancel()
		setIsOpen(false)
		setValidation(undefined)
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
							<Box>
								<Form
									onSubmit={handleSubmit}
									initialValues={initialValues}
									errors={validation?.format()}
									submitButtonTitle={intl.formatMessage(messages.form_button_title)}
								>
									<SelectField
										ref={inputRef}
										name="persona"
										placeholder={intl.formatMessage(messages.persona)}
										data={Object.keys(personaIndexes).map(address => ({
											id: address,
											title: personaIndexes[address].label || address,
										}))}
									/>
								</Form>
							</Box>
							<Box>
								<AddPersonaForm />
							</Box>
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

export default SelectPersonaModal
