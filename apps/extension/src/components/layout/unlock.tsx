import { t } from 'i18next'
import { ValidationErrorMessage } from 'packages/ui/src/components/validation-error-message'
import React, { useEffect, useRef, useState } from 'react'

import { Box } from 'ui/src/components/box'
import { Form } from 'ui/src/components/form'
import TextField from 'ui/src/components/form/fields/text-field'
import Translation from 'ui/src/components/translation'
import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import { useMessageClient } from '@src/hooks/use-message-client'

const initialValues = {
	password: '',
}
interface IProps {
	onUnlock: () => void
}

export const Unlock: React.FC<IProps> = ({ onUnlock }) => {
	const inputRef = useRef(null)
	const client = useMessageClient()

	const [error, setError] = useState<string>('')

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			await client.unlockVault(values.password)
			onUnlock()
			setError('')
		} catch (err) {
			setError(t('unlock.password.incorrect'))
		}
	}

	return (
		<Form
			onSubmit={handleSubmit}
			initialValues={initialValues}
			submitButtonTitle={<Translation capitalizeFirstLetter text="unlock.password.submitFormButtonTitle" />}
		>
			<ValidationErrorMessage message={error} />
			<Box>
				<Box>
					<TextField
						isPassword
						name="password"
						placeholder={capitalizeFirstLetter(`${t('unlock.password.inputPlaceholder')}`)}
						sizeVariant="medium"
					/>
				</Box>
			</Box>
		</Form>
	)
}

export default Unlock
