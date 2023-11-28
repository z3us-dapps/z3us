import { useEffect, useMemo, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Form } from 'ui/src/components/form'
import { FieldsGroup } from 'ui/src/components/form/fields-group'
import SelectField from 'ui/src/components/form/fields/select-field'
import { SubmitButton } from 'ui/src/components/form/fields/submit-button'
import TextField from 'ui/src/components/form/fields/text-field'
import { MailIcon, PhoneIcon, TrashIcon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import * as styles from './styles.css'

const messages = defineMessages({
	form_button_title: {
		id: 'wSZR47',
		defaultMessage: 'Submit',
	},
	email_address: {
		id: 'hJZwTS',
		defaultMessage: 'Email address',
	},
	button_add_email_address: {
		id: 'IbfkPE',
		defaultMessage: 'Add email address',
	},
	validation_email: {
		id: 'LPhKkU',
		defaultMessage: 'Please select valid email',
	},
	phone_number: {
		id: 'jdJhOL',
		defaultMessage: 'Phone number',
	},
	button_add_phone_number: {
		id: 'K2K+5t',
		defaultMessage: 'Add phone number',
	},
	validation_phone_number: {
		id: 'aY46qO',
		defaultMessage: 'Please select valid phone number',
	},
	variant: {
		id: '5EhO92',
		defaultMessage: 'Name variant',
	},
	western: {
		id: 'bfLy10',
		defaultMessage: 'Western',
	},
	eastern: {
		id: 'sYQG1D',
		defaultMessage: 'Eastern',
	},
	nickname: {
		id: 'SBkvpf',
		defaultMessage: 'Nickname',
	},
	given_names: {
		id: 'de/sqY',
		defaultMessage: 'Given names',
	},
	family_name: {
		id: 'AeMjAR',
		defaultMessage: 'Family name',
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
	onSubmit: (values: Values) => Promise<void>
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

	const selectItems = useMemo(
		() =>
			nameVariants.map(variant => ({
				id: variant,
				title: intl.formatMessage(messages[variant]),
			})),
		[intl],
	)

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
		setValidation(undefined)
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
		await onSubmit(values)
		setValidation(undefined)
	}

	return (
		<Form onSubmit={handleSubmit} initialValues={initialValues} errors={validation?.format()}>
			<FieldsGroup name="names" defaultKeys={1} ignoreTriggers>
				<Box className={styles.formInputWrapper}>
					<SelectField
						name="variant"
						sizeVariant="xlarge"
						fullWidth
						placeholder={intl.formatMessage(messages.variant)}
						data={selectItems}
					/>
				</Box>
				<Box className={styles.formInputWrapper}>
					<TextField
						sizeVariant="large"
						ref={inputRef}
						name="nickname"
						placeholder={intl.formatMessage(messages.nickname)}
					/>
				</Box>

				<Box className={styles.formInputWrapper}>
					<TextField sizeVariant="large" name="givenNames" placeholder={intl.formatMessage(messages.given_names)} />
				</Box>

				<Box className={styles.formInputWrapper}>
					<TextField sizeVariant="large" name="familyName" placeholder={intl.formatMessage(messages.family_name)} />
				</Box>
			</FieldsGroup>
			<FieldsGroup
				name="emailAddresses"
				className={styles.formFieldGroupWrapper}
				defaultKeys={0}
				trashTrigger={
					<Button styleVariant="ghost" sizeVariant="small" iconOnly>
						<TrashIcon />
					</Button>
				}
				addTrigger={
					<Box className={styles.formInputWrapper}>
						<Button styleVariant="secondary" sizeVariant="large" fullWidth leftIcon={<MailIcon />}>
							{intl.formatMessage(messages.button_add_email_address)}
						</Button>
					</Box>
				}
			>
				<TextField sizeVariant="large" name="email" placeholder={intl.formatMessage(messages.email_address)} />
			</FieldsGroup>
			<FieldsGroup
				name="phoneNumbers"
				className={styles.formFieldGroupWrapper}
				defaultKeys={0}
				trashTrigger={
					<Button styleVariant="ghost" sizeVariant="small" iconOnly>
						<TrashIcon />
					</Button>
				}
				addTrigger={
					<Box className={styles.formInputWrapper}>
						<Button styleVariant="secondary" sizeVariant="large" fullWidth leftIcon={<PhoneIcon />}>
							{intl.formatMessage(messages.button_add_phone_number)}
						</Button>
					</Box>
				}
			>
				<TextField sizeVariant="large" name="number" placeholder={intl.formatMessage(messages.phone_number)} />
			</FieldsGroup>
			<Box className={styles.formInputSubmitButtonWrapper}>
				<SubmitButton>
					<Button sizeVariant="large" fullWidth>
						{intl.formatMessage(messages.form_button_title)}
					</Button>
				</SubmitButton>
			</Box>
		</Form>
	)
}

export default PersonaDataForm
