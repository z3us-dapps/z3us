import { useEffect, useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { toast } from 'sonner'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Form } from 'ui/src/components/form'
import { SubmitButton } from 'ui/src/components/form/fields/submit-button'
import TextField from 'ui/src/components/form/fields/text-field'
import { SelectSimple } from 'ui/src/components/select'
import { useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'

import { useAddPersona } from '@src/hooks/use-add-persona'

import * as styles from './styles.css'

const messages = defineMessages({
	name: {
		id: 'HAlOn1',
		defaultMessage: 'Name',
	},
	keySource: {
		defaultMessage: 'Key source',
		id: 'RlCZeE',
	},
	validation_name: {
		id: 'Gvxoji',
		defaultMessage: 'Name is required',
	},
	form_button_title: {
		id: 'VzzYJk',
		defaultMessage: 'Create',
	},
	error_toast: {
		id: '2dcP1f',
		defaultMessage: 'Failed to add new persona',
	},
	success_toast: {
		id: 'PIWhuk',
		defaultMessage: 'Successfully added new persona',
	},
})

interface IProps {
	onSuccess?: (address: string) => void
	inputRef?: React.Ref<HTMLInputElement | null>
}

const AddPersonaForm: React.FC<IProps> = ({ onSuccess, inputRef }) => {
	const intl = useIntl()
	const addPersona = useAddPersona()

	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	const [initialValues, restFormValues] = useState<{ name: string }>({ name: '' })
	const [validation, setValidation] = useState<ZodError>()
	const [keySourceId, setKeySourceId] = useState<string>('')

	useEffect(() => {
		if (!keystore || keySourceId) return
		setKeySourceId(keystore.id)
	}, [keystore])

	const selectItems = useMemo(
		() =>
			keystore?.type === KeystoreType.COMBINED
				? Object.keys(keystore.keySources).map(id => ({ id, title: keystore.keySources[id].name }))
				: [],
		[keystore],
	)

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

		await addPersona(keySourceId, values.name)
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
			{selectItems.length > 0 && (
				<>
					<SelectSimple
						fullWidth
						value={keySourceId}
						onValueChange={setKeySourceId}
						data={selectItems}
						sizeVariant="xlarge"
						placeholder={intl.formatMessage(messages.keySource)}
					/>
					<Box paddingY="large">
						<Box borderTop={1} borderStyle="solid" borderColor="borderDivider" />
					</Box>
				</>
			)}
			<TextField ref={inputRef} sizeVariant="large" name="name" placeholder={intl.formatMessage(messages.name)} />
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
