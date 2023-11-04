import clsx from 'clsx'
import { useEffect, useMemo, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Dialog } from 'ui/src/components/dialog'
import { Form } from 'ui/src/components/form'
import SelectField from 'ui/src/components/form/fields/select-field'
import { SubmitButton } from 'ui/src/components/form/fields/submit-button'
import { Button } from 'ui/src/components/router-button'
import { Text } from 'ui/src/components/typography'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import AddPersonaForm from '../forms/add-persona-form'
import * as styles from './styles.css'

const messages = defineMessages({
	persona_modal_title: {
		defaultMessage: 'Select persona',
		id: 'yEEu6R',
	},
	persona_modal_sub_title: {
		defaultMessage: 'You can use the drop down to select a persona, or create a new persona.',
		id: 'bfUQWv',
	},
	persona: {
		id: 'JGu6zs',
		defaultMessage: 'Persona',
	},
	validation_persona: {
		id: 'fkKPLv',
		defaultMessage: 'Please select persona',
	},
	form_button_add_persona_title: {
		id: 'UcOfEC',
		defaultMessage: 'Add persona',
	},
	form_button_title: {
		id: 'AyGauy',
		defaultMessage: 'Login',
	},
	close: {
		id: '47FYwb',
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
	const [isAddPersonaFormVisible, setIsAddPersonaFormVisible] = useState<boolean>(false)
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

	const handleClickAddPersona = () => {
		setIsAddPersonaFormVisible(true)
	}

	return (
		<Dialog open={isOpen} onClose={handleCancel}>
			<Box className={styles.modalContentWrapper}>
				<Box className={styles.modalContentTitleTextWrapper}>
					<Text color="strong" size="large" weight="strong">
						{intl.formatMessage(messages.persona_modal_title)}
					</Text>
					<Text>{intl.formatMessage(messages.persona_modal_sub_title)}</Text>
				</Box>
				<Form onSubmit={handleSubmit} initialValues={initialValues} errors={validation?.format()}>
					<SelectField
						ref={inputRef}
						name="persona"
						placeholder={intl.formatMessage(messages.persona)}
						sizeVariant="large"
						data={Object.keys(personaIndexes).map(address => ({
							id: address,
							title: personaIndexes[address].label || address,
						}))}
						fullWidth
					/>
					<Box className={clsx(styles.modalContentFormButtonWrapper, styles.modalContentFormBorderWrapper)}>
						<Button fullWidth sizeVariant="large" styleVariant="secondary" onClick={handleClickAddPersona}>
							{intl.formatMessage(messages.form_button_add_persona_title)}
						</Button>
						<SubmitButton>
							<Button fullWidth sizeVariant="large">
								{intl.formatMessage(messages.form_button_title)}
							</Button>
						</SubmitButton>
					</Box>
				</Form>
				{isAddPersonaFormVisible && (
					<Box className={clsx(styles.modalPersonaFormWrapper, styles.modalContentFormBorderWrapper)}>
						<AddPersonaForm />
					</Box>
				)}
			</Box>
		</Dialog>
	)
}

export default SelectPersonaModal
