import React from 'react'

import { Box } from 'ui/src/components/box'
import { ShowHidePanel } from 'ui/src/components/show-hide-panel'
import { Text } from 'ui/src/components/typography'
import { type TZodReturnError } from 'ui/src/utils/get-zod-error'

interface IValidationErrorMessageProps {
	error: TZodReturnError
}

export const ValidationErrorMessage: React.FC<IValidationErrorMessageProps> = props => {
	const { error } = props

	return (
		<ShowHidePanel isChildrenVisible={error?.error}>
			<Box paddingTop="small">
				<Text size="xsmall" color="red">
					{error?.message}
				</Text>
			</Box>
		</ShowHidePanel>
	)
}
