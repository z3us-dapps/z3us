import clsx from 'clsx'
import { t } from 'i18next'
import { ValidationErrorMessage } from 'packages/ui/src/components/validation-error-message'
import React, { useEffect, useRef, useState } from 'react'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Form } from 'ui/src/components/form'
import TextAreaField from 'ui/src/components/form/fields/text-area-field'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { useSendTransaction } from 'ui/src/hooks/dapp/use-send-transaction'
import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import * as styles from './styles.css'

const initialValues = {
	raw: '',
}

const validationSchema = z.object({
	raw: z.string().min(1, 'Transaction can not be empty'),
})

export const Raw: React.FC = () => {
	const inputRef = useRef(null)
	const [validation, setValidation] = useState<ZodError>()
	const sendTransaction = useSendTransaction()

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	const handleSubmit = (values: typeof initialValues) => {
		const result = validationSchema.safeParse(values)
		if (result.success === false) {
			setValidation(result.error)
			return
		}

		sendTransaction({
			version: 1,
			transactionManifest: values.raw,
		})
	}

	return (
		<Form
			onSubmit={handleSubmit}
			initialValues={initialValues}
			errors={validation?.format()}
			submitButtonTitle={<Translation capitalizeFirstLetter text="transfer.raw.submitFormButtonTitle" />}
			className={styles.transferFormWrapper}
		>
			<ValidationErrorMessage message={validation?.flatten().formErrors[0]} />
			<Box className={clsx(styles.transferFormGridBoxWrapper, styles.transferFormGridBoxWrapperBorder)}>
				<Box className={styles.transferFormGridBoxWrapperLeft}>
					<Text color="strong" size="xlarge" weight="strong">
						<Translation capitalizeFirstLetter text="transfer.raw.messageTitle" />
					</Text>
					<Text size="xsmall">
						<Translation capitalizeFirstLetter text="transfer.raw.messageSubTitle" />
					</Text>
				</Box>
				<Box>
					<TextAreaField
						name="raw"
						placeholder={capitalizeFirstLetter(`${t('transfer.raw.inputPlaceholder')}`)}
						sizeVariant="medium"
						className={styles.transferFormMessageTextArea}
					/>
				</Box>
			</Box>
		</Form>
	)
}

export default Raw
