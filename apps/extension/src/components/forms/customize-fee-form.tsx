import { useEffect, useMemo, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Form } from 'ui/src/components/form'
import { AccountSelect } from 'ui/src/components/form/fields/account-select'
import NumberField from 'ui/src/components/form/fields/number-field'
import { SubmitButton } from 'ui/src/components/form/fields/submit-button'
import * as styles from 'ui/src/components/form/styles.css'
import { Button } from 'ui/src/components/router-button'
import { Text } from 'ui/src/components/typography'

import type { TransactionSettings } from '@src/types/transaction'

const messages = defineMessages({
	button_title: {
		id: 'JXdbo8',
		defaultMessage: 'Done',
	},
	fee_payer: {
		id: '20LABU',
		defaultMessage: 'Pay fee from',
	},
	padding: {
		id: 'O0ErXZ',
		defaultMessage: 'Adjust fee padding amount (XRD)',
	},
	tip_title: {
		id: '4URWRD',
		defaultMessage: 'Adjust tip to lock',
	},
	tip_sub_title: {
		id: '1PCIKQ',
		defaultMessage: '(% of execution + finalization fees)',
	},
})

export interface IProps {
	settings: TransactionSettings
	onSubmit: (values: TransactionSettings) => void
}

const CustomizeFeeForm: React.FC<IProps> = ({ settings, onSubmit }) => {
	const intl = useIntl()
	const inputRef = useRef(null)

	const [validation, setValidation] = useState<ZodError>()

	const validationSchema = useMemo(
		() =>
			z.object({
				feePayer: z.undefined().or(z.string()),
				tipPercentage: z.coerce.number().int().min(0).max(100),
				padding: z.coerce.number().min(0),
			}),
		[],
	)

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	const handleSubmit = async (values: TransactionSettings) => {
		setValidation(undefined)
		const result = validationSchema.safeParse(values)
		if (result.success === false) {
			setValidation(result.error)
			return
		}
		onSubmit(values)
		setValidation(undefined)
	}

	return (
		<Form onSubmit={handleSubmit} initialValues={settings} errors={validation?.format()}>
			<Box className={styles.formInputWrapper}>
				<Box paddingBottom="xsmall">
					<Text size="small" color="strong">
						{intl.formatMessage(messages.fee_payer)}
					</Text>
				</Box>
				<AccountSelect name="feePayer" />
			</Box>
			<Box className={styles.formInputWrapper}>
				<Box display="flex" gap="xsmall" paddingBottom="xsmall">
					<Text size="small" color="strong">
						{intl.formatMessage(messages.padding)}
					</Text>
				</Box>
				<NumberField sizeVariant="large" ref={inputRef} name="padding" />
			</Box>
			<Box className={styles.formInputWrapper}>
				<Box display="flex" gap="xsmall" paddingBottom="xsmall">
					<Text size="small" color="strong">
						{intl.formatMessage(messages.tip_title)}
					</Text>
					<Text size="small">{intl.formatMessage(messages.tip_sub_title)}</Text>
				</Box>
				<NumberField sizeVariant="large" ref={inputRef} name="tipPercentage" />
			</Box>
			<Box paddingTop="large">
				<SubmitButton>
					<Button sizeVariant="large" fullWidth>
						{intl.formatMessage(messages.button_title)}
					</Button>
				</SubmitButton>
			</Box>
		</Form>
	)
}

export default CustomizeFeeForm
