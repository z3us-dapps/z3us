import React from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import { ShowHidePanel } from '@src/components/show-hide-panel'

import { type TITransactionKey, type TZodValidation } from '../account-transfer-types'
import { getZodErrorMessage } from '../account-transfer-utils'

interface IValidationErrorMessageRequiredProps {
	validation: TZodValidation
	errorKey: TITransactionKey
}

interface IValidationErrorMessageOptionalProps {}

interface IValidationErrorMessageProps
	extends IValidationErrorMessageRequiredProps,
		IValidationErrorMessageOptionalProps {}

const defaultProps: IValidationErrorMessageOptionalProps = {}

export const ValidationErrorMessage: React.FC<IValidationErrorMessageProps> = props => {
	const { validation, errorKey } = props
	const errorMessage = getZodErrorMessage(validation, errorKey)

	return (
		<ShowHidePanel isChildrenVisible={!!errorMessage}>
			<Box paddingTop="small">
				<Text color="red">{errorMessage}</Text>
			</Box>
		</ShowHidePanel>
	)
}

ValidationErrorMessage.defaultProps = defaultProps
