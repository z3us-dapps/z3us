import clsx from 'clsx'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Form } from 'ui/src/components/form'
import { SubmitButton } from 'ui/src/components/form/fields/submit-button'
import TextAreaField from 'ui/src/components/form/fields/text-area-field'
import { Text } from 'ui/src/components/typography'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { useSendTransaction } from 'ui/src/hooks/use-send-transaction'

import * as styles from './styles.css'

const messages = defineMessages({
	button_submit: {
		id: '9WRlF4',
		defaultMessage: 'Send',
	},
	validation_raw: {
		id: 'irmqsz',
		defaultMessage: 'Transaction manifest can not be empty',
	},
	raw_title: {
		id: 'c+Uxfa',
		defaultMessage: 'Transaction manifest',
	},
	raw_subtitle: {
		id: 'psAdnA',
		defaultMessage: 'Enter raw transaction manifest',
	},
	raw_placeholder: {
		id: 'iP8zle',
		defaultMessage: 'Enter transaction manifest',
	},
	error_toast: {
		id: 'fjqZcw',
		defaultMessage: 'Failed submitting transaction to the network',
	},
	success_toast: {
		id: 'Gkt0d0',
		defaultMessage: 'Successfully submitted transaction to the network',
	},
	toast_action_label: {
		id: 'K7AkdL',
		defaultMessage: 'Show',
	},
})

const initialValues = {
	raw: '',
}

export const Raw: React.FC = () => {
	const intl = useIntl()
	const inputRef = useRef(null)
	const sendTransaction = useSendTransaction()
	const [searchParams, setSearchParams] = useSearchParams()

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
		}).then(res => {
			if (res.isErr()) {
				toast.error(intl.formatMessage(messages.error_toast), { description: res.error.message })
			} else {
				toast.success(intl.formatMessage(messages.success_toast), {
					description: res.value.status,
					action: {
						label: intl.formatMessage(messages.toast_action_label),
						onClick: () => {
							searchParams.set('tx', `${res.value.transactionIntentHash}`)
							setSearchParams(searchParams)
						},
					},
				})
			}
		})
	}

	return (
		<Form
			onSubmit={handleSubmit}
			initialValues={initialValues}
			errors={validation?.format()}
			className={styles.transferFormWrapper}
		>
			<ValidationErrorMessage message={validation?.flatten().formErrors[0]} />
			<Box className={clsx(styles.transferFormGridBoxWrapper)}>
				<Box className={styles.transferFormGridBoxWrapperLeft}>
					<Text color="strong" size="xlarge" weight="strong">
						{intl.formatMessage(messages.raw_title)}
					</Text>
					<Text size="xsmall">{intl.formatMessage(messages.raw_subtitle)}</Text>
				</Box>
				<Box className={styles.transferFormMessageWrapper}>
					<TextAreaField
						ref={inputRef}
						name="raw"
						placeholder={intl.formatMessage(messages.raw_placeholder)}
						sizeVariant="medium"
						className={styles.transferFormMessageTextArea}
					/>
				</Box>
			</Box>
			<SubmitButton>
				<Button sizeVariant="large">{intl.formatMessage(messages.button_submit)}</Button>
			</SubmitButton>
		</Form>
	)
}

export default Raw
