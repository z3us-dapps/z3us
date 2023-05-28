import React from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import { ShowHidePanel } from '@src/components/show-hide-panel'

import { type TZodValidation } from '../account-transfer-types'
import { getZodErrorMessage } from '../account-transfer-utils'

interface IValidationErrorMessageRequiredProps {
	validation: TZodValidation
	path: (string | number)[]
}

interface IValidationErrorMessageOptionalProps {}

interface IValidationErrorMessageProps
	extends IValidationErrorMessageRequiredProps,
		IValidationErrorMessageOptionalProps {}

const defaultProps: IValidationErrorMessageOptionalProps = {}

export const ValidationErrorMessage: React.FC<IValidationErrorMessageProps> = props => {
	const { validation, path } = props
	const errorMessage = getZodErrorMessage(validation, path)

	return (
		<ShowHidePanel isChildrenVisible={!!errorMessage}>
			<Box paddingTop="small">
				<Text size="xsmall" color="red">{errorMessage}</Text>
			</Box>
		</ShowHidePanel>
	)
}

ValidationErrorMessage.defaultProps = defaultProps
