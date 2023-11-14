import { useEffect, useMemo, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Form } from 'ui/src/components/form'
import { FieldsGroup } from 'ui/src/components/form/fields-group'
import NumberField from 'ui/src/components/form/fields/number-field'
import SelectField from 'ui/src/components/form/fields/select-field'
import { SubmitButton } from 'ui/src/components/form/fields/submit-button'
import TextField from 'ui/src/components/form/fields/text-field'
import { MailIcon, PhoneIcon, TrashIcon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { Text } from 'ui/src/components/typography'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import * as styles from './styles.css'

const messages = defineMessages({
	customize_fee_form_button_title: {
		id: 'JXdbo8',
		defaultMessage: 'Done',
	},
	customize_fee_form_pay_from: {
		id: '20LABU',
		defaultMessage: 'Pay fee from',
	},
	customize_fee_form_adjust_padding: {
		id: 'O0ErXZ',
		defaultMessage: 'Adjust fee padding amount (XRD)',
	},
	customize_fee_form_adjust_tip_title: {
		id: '4URWRD',
		defaultMessage: 'Adjust tip to lock',
	},
	customize_fee_form_adjust_tip_sub_title: {
		id: '1PCIKQ',
		defaultMessage: '(% of execution + finalization fees)',
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

const CustomizeFeeForm: React.FC<IProps> = ({ identityAddress, customValidationSchema, onSubmit }) => {
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

	const validationSchema = useMemo(
		() =>
			// const emailSchema = z.object({
			// 	email: z.string().min(1, intl.formatMessage(messages.validation_email)),
			// })
			// const phoneSchema = z.object({
			// 	number: z.string().min(1, intl.formatMessage(messages.validation_phone_number)),
			// })

			// const schema: any = {
			// 	emailAddresses: z.array(emailSchema).or(z.undefined()),
			// 	phoneNumbers: z.array(phoneSchema).or(z.undefined()),
			// 	names: z.array(
			// 		z.object({
			// 			variant: z.literal('western').or(z.literal('eastern')),
			// 			givenNames: z.string().or(z.undefined()),
			// 			familyName: z.string().or(z.undefined()),
			// 			nickname: z.string().or(z.undefined()),
			// 		}),
			// 	),
			// }

			z.object({}),
		[],
	)

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
		onSubmit(values)
		setValidation(undefined)
	}

	return (
		<Form onSubmit={handleSubmit} initialValues={initialValues} errors={validation?.format()}>
			<FieldsGroup name="names" defaultKeys={1} ignoreTriggers>
				<Box className={styles.formInputWrapper}>
					<Box paddingBottom="xsmall">
						<Text size="small" color="strong">
							{intl.formatMessage(messages.customize_fee_form_pay_from)}
						</Text>
					</Box>
					<SelectField
						name="variant"
						sizeVariant="xlarge"
						styleVariant="tertiary"
						fullWidth
						// placeholder={intl.formatMessage(messages.variant)}
						data={[{ title: 'hello', id: 'hello' }]}
						// data={nameVariants.map(variant => ({
						// 	id: variant,
						// 	title: intl.formatMessage(messages[variant]),
						// }))}
					/>
				</Box>
				<Box className={styles.formInputWrapper}>
					<Box display="flex" gap="xsmall" paddingBottom="xsmall">
						<Text size="small" color="strong">
							{intl.formatMessage(messages.customize_fee_form_adjust_padding)}
						</Text>
					</Box>
					<NumberField
						sizeVariant="large"
						ref={inputRef}
						name="nickname"
						// placeholder={intl.formatMessage(messages.nickname)}
					/>
				</Box>
				<Box className={styles.formInputWrapper}>
					<Box display="flex" gap="xsmall" paddingBottom="xsmall">
						<Text size="small" color="strong">
							{intl.formatMessage(messages.customize_fee_form_adjust_tip_title)}
						</Text>
						<Text size="small">{intl.formatMessage(messages.customize_fee_form_adjust_tip_sub_title)}</Text>
					</Box>
					<NumberField
						sizeVariant="large"
						ref={inputRef}
						name="nickname"
						// placeholder={intl.formatMessage(messages.nickname)}
					/>
				</Box>
			</FieldsGroup>
			<Box paddingTop="large">
				<SubmitButton>
					<Button sizeVariant="large" fullWidth>
						{intl.formatMessage(messages.customize_fee_form_button_title)}
					</Button>
				</SubmitButton>
			</Box>
		</Form>
	)
}

export default CustomizeFeeForm
