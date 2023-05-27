import React from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import { ShowHidePanel } from '@src/components/show-hide-panel'

import { getZodErrorMessage } from '../account-transfer-utils'

interface IValidationErrorMessageRequiredProps {
	validation: any
	// TODO: fix type to be key of
	errorKey: string
}

interface IValidationErrorMessageOptionalProps {}

interface IValidationErrorMessageProps
	extends IValidationErrorMessageRequiredProps,
		IValidationErrorMessageOptionalProps {}

const defaultProps: IValidationErrorMessageOptionalProps = {}

export const ValidationErrorMessage: React.FC<IValidationErrorMessageProps> = props => {
	const { validation, errorKey } = props

	const errorMessage = getZodErrorMessage(validation?.error, errorKey)

	return (
		<ShowHidePanel isChildrenVisible={!!errorMessage}>
			<Box paddingTop="small">
				<Text color="red">{errorMessage}</Text>
			</Box>
		</ShowHidePanel>
	)
}

ValidationErrorMessage.defaultProps = defaultProps
