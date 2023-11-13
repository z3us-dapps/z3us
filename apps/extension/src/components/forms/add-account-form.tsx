import { useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { toast } from 'sonner'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Button } from 'ui/src/components/button'
import { Form } from 'ui/src/components/form'
import { SubmitButton } from 'ui/src/components/form/fields/submit-button'
import TextField from 'ui/src/components/form/fields/text-field'

import { useAddAccount } from '@src/hooks/use-add-account'

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
		id: '8YK60G',
		defaultMessage: 'Failed to add new account',
	},
	success_toast: {
		id: '+SuAiT',
		defaultMessage: 'Successfully added new account',
	},
})

interface IProps {
	onSuccess?: (address: string) => void
}

const AddAccountForm: React.FC<IProps> = ({ onSuccess }) => {
	const intl = useIntl()
	const addAccount = useAddAccount()

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

		await addAccount(values.name)
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
			<TextField name="name" placeholder={intl.formatMessage(messages.name)} />

			<SubmitButton>
				<Button sizeVariant="small">{intl.formatMessage(messages.form_button_title)}</Button>
			</SubmitButton>
		</Form>
	)
}

export default AddAccountForm
