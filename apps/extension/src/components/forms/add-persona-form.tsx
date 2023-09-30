import { useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { z } from 'zod'
import { ZodError } from 'zod'

import { Form } from 'ui/src/components/form'
import TextField from 'ui/src/components/form/fields/text-field'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

const messages = defineMessages({
	name: {
		id: 'forms.add_persona.form.name',
		defaultMessage: 'Name',
	},
	validation_name: {
		id: 'forms.add_persona.validation.name',
		defaultMessage: 'Name is required',
	},
	form_button_title: {
		id: 'forms.add_persona.form.submit_button.title',
		defaultMessage: 'Add',
	},
})

const initialValues = {
	name: '',
}

const AddPersonaForm: React.FC = () => {
	const intl = useIntl()
	const { personaIndexes, addPersona } = useNoneSharedStore(state => ({
		personaIndexes: state.personaIndexes,
		addPersona: state.addPersonaAction,
	}))

	const [validation, setValidation] = useState<ZodError>()

	const validationSchema = useMemo(() => {
		return z.object({
			name: z.string().min(1, intl.formatMessage(messages.validation_name)),
		})
	}, [])

	const handleSubmit = async (values: typeof initialValues) => {
		const result = validationSchema.safeParse(values)
		if (result.success === false) {
			setValidation(result.error)
			return
		}
		const idx = Object.keys(personaIndexes)?.[0] || 0
		addPersona(+idx, { label: values.name })
		setValidation(undefined)
	}

	return (
		<Form
			onSubmit={handleSubmit}
			initialValues={initialValues}
			errors={validation?.format()}
			submitButtonTitle={intl.formatMessage(messages.form_button_title)}
		>
			<TextField name={'name'} placeholder={intl.formatMessage(messages.name)} />
		</Form>
	)
}

export default AddPersonaForm
