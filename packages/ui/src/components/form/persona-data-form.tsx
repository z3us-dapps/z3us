import { useEffect, useMemo, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Form } from 'ui/src/components/form'
import { FieldsGroup } from 'ui/src/components/form/fields-group'
import SelectField from 'ui/src/components/form/fields/select-field'
import TextField from 'ui/src/components/form/fields/text-field'
import { CirclePlusIcon, TrashIcon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

const messages = defineMessages({
	form_button_title: {
		id: 'forms.persona_data.submit_button.title',
		defaultMessage: 'Submit',
	},
	email_address: {
		id: 'forms.persona_data.email_address',
		defaultMessage: 'Email address',
	},
	button_add_email_address: {
		id: 'forms.persona_data.button_add.email_address',
		defaultMessage: 'Add email address',
	},
	validation_email: {
		id: 'forms.persona_data.validation.email',
		defaultMessage: 'Please select valid email',
	},
	phone_number: {
		id: 'forms.persona_data.phone_number',
		defaultMessage: 'Phone number',
	},
	button_add_phone_number: {
		id: 'forms.persona_data.button_add.phone_number',
		defaultMessage: 'Add phone number',
	},
	validation_phone_number: {
		id: 'forms.persona_data.validation.phone_number',
		defaultMessage: 'Please select valid phone number',
	},
	variant: {
		id: 'forms.persona_data.variant',
		defaultMessage: 'Name variant',
	},
	western: {
		id: 'forms.persona_data.western',
		defaultMessage: 'Western',
	},
	eastern: {
		id: 'forms.persona_data.eastern',
		defaultMessage: 'Eastern',
	},
	nickname: {
		id: 'forms.persona_data.nickname',
		defaultMessage: 'Nickname',
	},
	validation_nickname: {
		id: 'forms.persona_data.validation.nickname',
		defaultMessage: 'Please insert valid nickname',
	},
	given_names: {
		id: 'forms.persona_data.given_names',
		defaultMessage: 'Given names',
	},
	validation_given_names: {
		id: 'forms.persona_data.validation.given_names',
		defaultMessage: 'Please insert valid given names',
	},
	family_name: {
		id: 'forms.persona_data.family_name',
		defaultMessage: 'Family name',
	},
	validation_family_name: {
		id: 'forms.persona_data.validation.family_name',
		defaultMessage: 'Please insert valid family name',
	},
})

const nameVariants = ['western', 'eastern']

type Values = {
	names: [
		{
			variant: string
			nickname: string
			givenNames: string
			familyName: string
		},
	]
	emailAddresses: { email: string }[]
	phoneNumbers: { number: string }[]
}
export interface IProps {
	identityAddress?: string
	customValidationSchema?: z.AnyZodObject
	onSubmit: (values: Values) => void
}

const PersonaDataForm: React.FC<IProps> = ({ identityAddress, customValidationSchema, onSubmit }) => {
	const intl = useIntl()
	const inputRef = useRef(null)
	const networkId = useNetworkId()
	const { personaIndexes } = useNoneSharedStore(state => ({
		personaIndexes: state.personaIndexes[networkId] || {},
	}))

	const [validation, setValidation] = useState<ZodError>()

	const initialValues: Values = {
		names: [
			{
				variant: personaIndexes?.[identityAddress]?.nameVariant || 'western',
				nickname: personaIndexes?.[identityAddress]?.nickName || '',
				givenNames: personaIndexes?.[identityAddress]?.givenNames || '',
				familyName: personaIndexes?.[identityAddress]?.familyName || '',
			},
		],
		emailAddresses: personaIndexes?.[identityAddress]?.emailAddresses?.map(email => ({ email })) || [],
		phoneNumbers: personaIndexes?.[identityAddress]?.phoneNumbers?.map(number => ({ number })) || [],
	}

	const validationSchema = useMemo(() => {
		const emailSchema = z.object({
			email: z.string().min(1, intl.formatMessage(messages.validation_email)),
		})
		const phoneSchema = z.object({
			number: z.string().min(1, intl.formatMessage(messages.validation_phone_number)),
		})

		const schema: any = {
			emailAddresses: z.array(emailSchema).or(z.undefined()),
			phoneNumbers: z.array(phoneSchema).or(z.undefined()),
			names: z.array(
				z.object({
					variant: z.literal('western').or(z.literal('eastern')),
					givenNames: z.string().or(z.undefined()),
					familyName: z.string().or(z.undefined()),
					nickname: z.string().or(z.undefined()),
				}),
			),
		}

		return z.object(schema)
	}, [])

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	const handleSubmit = async (values: typeof initialValues) => {
		const result = validationSchema.safeParse(values)
		if (result.success === false) {
			setValidation(result.error)
			return
		}
		if (customValidationSchema) {
			const customValidationResult = customValidationSchema.safeParse(values)
			if (customValidationResult.success === false) {
				setValidation(customValidationResult.error)
				return
			}
		}
		onSubmit(values)
		setValidation(undefined)
	}

	return (
		<Form
			onSubmit={handleSubmit}
			initialValues={initialValues}
			errors={validation?.format()}
			submitButtonTitle={intl.formatMessage(messages.form_button_title)}
		>
			<FieldsGroup name="names" defaultKeys={1} ignoreTriggers>
				<SelectField
					name="variant"
					placeholder={intl.formatMessage(messages.variant)}
					data={nameVariants.map(variant => ({
						id: variant,
						title: intl.formatMessage(messages[variant]),
					}))}
				/>
				<TextField name="nickname" placeholder={intl.formatMessage(messages.nickname)} />
				<TextField name="givenNames" placeholder={intl.formatMessage(messages.given_names)} />
				<TextField name="familyName" placeholder={intl.formatMessage(messages.family_name)} />
			</FieldsGroup>
			<FieldsGroup
				name="emailAddresses"
				defaultKeys={0}
				trashTrigger={
					<Button styleVariant="ghost" sizeVariant="small" iconOnly>
						<TrashIcon />
					</Button>
				}
				addTrigger={
					<Button
						styleVariant="secondary"
						sizeVariant="xlarge"
						fullWidth
						leftIcon={
							<Box marginLeft="small">
								<CirclePlusIcon />
							</Box>
						}
					>
						{intl.formatMessage(messages.button_add_email_address)}
					</Button>
				}
			>
				<TextField name="email" placeholder={intl.formatMessage(messages.email_address)} />
			</FieldsGroup>
			<FieldsGroup
				name="phoneNumbers"
				defaultKeys={0}
				trashTrigger={
					<Button styleVariant="ghost" sizeVariant="small" iconOnly>
						<TrashIcon />
					</Button>
				}
				addTrigger={
					<Button
						styleVariant="secondary"
						sizeVariant="xlarge"
						fullWidth
						leftIcon={
							<Box marginLeft="small">
								<CirclePlusIcon />
							</Box>
						}
					>
						{intl.formatMessage(messages.button_add_phone_number)}
					</Button>
				}
			>
				<TextField name="number" placeholder={intl.formatMessage(messages.phone_number)} />
			</FieldsGroup>
		</Form>
	)
}

export default PersonaDataForm
