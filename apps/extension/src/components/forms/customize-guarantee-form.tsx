import { useEffect, useMemo, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Form } from 'ui/src/components/form'
import NumberField from 'ui/src/components/form/fields/number-field'
import { SubmitButton } from 'ui/src/components/form/fields/submit-button'
import * as styles from 'ui/src/components/form/styles.css'
import { Button } from 'ui/src/components/router-button'
import { Text } from 'ui/src/components/typography'

import type { Change, Guarantee, Summary } from '@src/types/transaction'

const messages = defineMessages({
	button_title: {
		id: '9t1iiv',
		defaultMessage: 'Configure',
	},
	predicted: {
		id: 'ThFgDX',
		defaultMessage: 'Predicted',
	},
	guaranteed: {
		id: 'Zj8bMq',
		defaultMessage: 'Guaranteed',
	},
	percentage: {
		id: 'lEE/wF',
		defaultMessage: 'Adjust %',
	},
})

export type Values = { predicted: string; guaranteed: string; percentage: string }

export interface IProps {
	summary: Summary
	change: Change
	onSubmit: (values: Guarantee) => void
}

const CustomizeGuaranteeForm: React.FC<IProps> = ({ summary, change, onSubmit }) => {
	const intl = useIntl()
	const inputRef = useRef(null)

	const guaranteedAmount =
		summary.guarantees.find(
			({ index, resourceAddress }) => resourceAddress === change.resource && index === change.index - 1,
		)?.amount || 0

	const [validation, setValidation] = useState<ZodError>()
	const [initialValues, setInitialValues] = useState<Values>({
		predicted: `${change.amount}`,
		guaranteed: `${guaranteedAmount}`,
		percentage: `${(guaranteedAmount / change.amount) * 100}`,
	})

	const validationSchema = useMemo(
		() =>
			z.object({
				percentage: z.coerce.number().int().min(0).max(100),
			}),
		[],
	)

	useEffect(() => {
		setInitialValues({
			predicted: `${change.amount}`,
			guaranteed: `${(change.amount * Number(initialValues.percentage)) / 100}`,
			percentage: initialValues.percentage,
		})
	}, [change])

	useEffect(() => {
		inputRef?.current?.focus()
	}, [inputRef?.current])

	const handleSubmit = async (values: Values) => {
		setValidation(undefined)
		const result = validationSchema.safeParse(values)
		if (result.success === false) {
			setValidation(result.error)
			return
		}
		onSubmit({
			index: change.index - 1,
			resourceAddress: change.resource,
			amount: Number(values.guaranteed),
		} as Guarantee)
		setValidation(undefined)
	}

	const handlePercentageChange = value => {
		setInitialValues({
			predicted: `${change.amount}`,
			guaranteed: `${(change.amount * Number(value)) / 100}`,
			percentage: value,
		})
	}

	return (
		<Form onSubmit={handleSubmit} initialValues={initialValues} errors={validation?.format()}>
			<Box className={styles.formInputWrapper}>
				<Box display="flex" gap="xsmall" paddingBottom="xsmall">
					<Text size="small" color="strong">
						{intl.formatMessage(messages.predicted)}
					</Text>
				</Box>
				<NumberField sizeVariant="large" readOnly ref={inputRef} name="predicted" />
			</Box>
			<Box className={styles.formInputWrapper}>
				<Box display="flex" gap="xsmall" paddingBottom="xsmall">
					<Text size="small" color="strong">
						{intl.formatMessage(messages.guaranteed)}
					</Text>
				</Box>
				<NumberField sizeVariant="large" readOnly ref={inputRef} name="guaranteed" />
			</Box>
			<Box className={styles.formInputWrapper}>
				<Box display="flex" gap="xsmall" paddingBottom="xsmall">
					<Text size="small" color="strong">
						{intl.formatMessage(messages.percentage)}
					</Text>
				</Box>
				<NumberField sizeVariant="large" ref={inputRef} name="percentage" onChange={handlePercentageChange} />
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

export default CustomizeGuaranteeForm
