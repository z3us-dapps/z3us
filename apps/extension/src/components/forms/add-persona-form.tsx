import { useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { toast } from 'sonner'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Form } from 'ui/src/components/form'
import { SubmitButton } from 'ui/src/components/form/fields/submit-button'
import TextField from 'ui/src/components/form/fields/text-field'

import { useAddPersona } from '@src/hooks/use-add-persona'

import * as styles from './styles.css'

const messages = defineMessages({
	name: {
		id: 'HAlOn1',
		defaultMessage: 'Name',
	},
	validation_name: {
		id: 'Gvxoji',
		defaultMessage: 'Name is required',
	},
	form_button_title: {
		id: '2/2yg+',
		defaultMessage: 'Add',
	},
	error_toast: {
		id: 'qIEHp4',
		defaultMessage: 'Failed to add new person',
	},
	success_toast: {
		id: 'PIWhuk',
		defaultMessage: 'Successfully added new persona',
	},
})

interface IProps {
	onSuccess?: (address: string) => void
}

const AddPersonaForm: React.FC<IProps> = ({ onSuccess }) => {
	const intl = useIntl()
	const addPersona = useAddPersona()

	const [initialValues, restFormValues] = useState<{ name: string }>({ name: '' })
	const [validation, setValidation] = useState<ZodError>()

	const validationSchema = useMemo(
		() =>
			z.object({
				name: z.string().min(1, intl.formatMessage(messages.validation_name)),
			}),
		[],
	)

	const handleSubmit = async (values: typeof initialValues) => {
		setValidation(undefined)
		const result = validationSchema.safeParse(values)
		if (result.success === false) {
			setValidation(result.error)
			return
		}

		await addPersona(values.name)
			.then(address => {
				toast.success(intl.formatMessage(messages.success_toast))
				restFormValues({ name: '' })
				if (onSuccess) onSuccess(address)
			})
			.catch(error => toast.error(intl.formatMessage(messages.error_toast), { description: error.message }))
			.finally(() => setValidation(undefined))
	}

	return (
		<Form onSubmit={handleSubmit} initialValues={initialValues} errors={validation?.format()}>
			<TextField sizeVariant="large" name="name" placeholder={intl.formatMessage(messages.name)} />
			<Box className={styles.modalContentFormButtonWrapper}>
				<SubmitButton>
					<Button fullWidth sizeVariant="xlarge">
						{intl.formatMessage(messages.form_button_title)}
					</Button>
				</SubmitButton>
			</Box>
		</Form>
	)
}

export default AddPersonaForm
