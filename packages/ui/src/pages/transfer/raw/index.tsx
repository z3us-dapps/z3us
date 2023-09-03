import clsx from 'clsx'
import { t } from 'i18next'
import React, { useEffect, useRef } from 'react'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Form } from 'ui/src/components/form'
import { TextAreaField } from 'ui/src/components/form/fields/text-area-field'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import { useTransferContext } from '../use-context'
import * as styles from './styles.css'

const initialValues = {
	raw: '',
}

const validationSchema = z.object({
	raw: z.string().min(1, 'Transaction input can not be empty'),
})

export const Raw: React.FC = () => {
	const inputRef = useRef(null)
	const { onSubmit } = useTransferContext()

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	const handleSubmit = async (values: typeof initialValues) => {
		onSubmit({
			version: 1,
			transactionManifest: values.raw,
		})
	}

	const handleValidate = (values: typeof initialValues) => {
		const result = validationSchema.safeParse(values)
		if (result.success === false) return result.error
		return undefined
	}

	return (
		<Form
			onSubmit={handleSubmit}
			validate={handleValidate}
			initialValues={initialValues}
			submitButtonTitle={<Translation capitalizeFirstLetter text="transfer.raw.submitFormButtonTitle" />}
			className={styles.transferFormWrapper}
		>
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
