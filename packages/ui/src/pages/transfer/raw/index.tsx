import clsx from 'clsx'
import { ValidationErrorMessage } from 'packages/ui/src/components/validation-error-message'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Form } from 'ui/src/components/form'
import TextAreaField from 'ui/src/components/form/fields/text-area-field'
import { Text } from 'ui/src/components/typography'
import { useSendTransaction } from 'ui/src/hooks/use-send-transaction'

import * as styles from './styles.css'

const messages = defineMessages({
	button_submit: {
		id: 'transfer_raw.form.button.submit',
		defaultMessage: 'Send',
	},
	validation_raw: {
		id: 'transfer_raw.validation.raw',
		defaultMessage: 'Transaction can not be empty',
	},
	raw_title: {
		id: 'transfer_raw.form.raw.title',
		defaultMessage: 'Transaction manifest',
	},
	raw_subtitle: {
		id: 'transfer_raw.form.raw.subtitle',
		defaultMessage: 'Enter raw transaction manifest',
	},
	raw_placeholder: {
		id: 'transfer_raw.form.raw.placeholder',
		defaultMessage: 'Enter manifest...',
	},
})

const initialValues = {
	raw: '',
}

export const Raw: React.FC = () => {
	const intl = useIntl()
	const inputRef = useRef(null)
	const sendTransaction = useSendTransaction()

	const [validation, setValidation] = useState<ZodError>()

	const validationSchema = useMemo(
		() =>
			z.object({
				raw: z.string().min(1, intl.formatMessage(messages.validation_raw)),
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

		await sendTransaction({
			version: 1,
			transactionManifest: values.raw,
		})
	}

	return (
		<Form
			onSubmit={handleSubmit}
			initialValues={initialValues}
			errors={validation?.format()}
			submitButtonTitle={intl.formatMessage(messages.button_submit)}
			className={styles.transferFormWrapper}
		>
			<ValidationErrorMessage message={validation?.flatten().formErrors[0]} />
			<Box className={clsx(styles.transferFormGridBoxWrapper, styles.transferFormGridBoxWrapperBorder)}>
				<Box className={styles.transferFormGridBoxWrapperLeft}>
					<Text color="strong" size="xlarge" weight="strong">
						{intl.formatMessage(messages.raw_title)}
					</Text>
					<Text size="xsmall">{intl.formatMessage(messages.raw_subtitle)}</Text>
				</Box>
				<Box>
					<TextAreaField
						name="raw"
						placeholder={intl.formatMessage(messages.raw_placeholder)}
						sizeVariant="medium"
						className={styles.transferFormMessageTextArea}
					/>
				</Box>
			</Box>
		</Form>
	)
}

export default Raw
