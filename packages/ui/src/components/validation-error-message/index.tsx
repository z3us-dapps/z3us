import React from 'react'

import { Box } from 'ui/src/components/box'
import { ShowHidePanel } from 'ui/src/components/show-hide-panel'
import { Text } from 'ui/src/components/typography'

interface IValidationErrorMessageProps {
	message?: string
}

export const ValidationErrorMessage: React.FC<IValidationErrorMessageProps> = ({ message }) => (
	<ShowHidePanel isChildrenVisible={!!message}>
		<Box paddingTop="small">
			<Text size="xsmall" color="red">
				{message}
			</Text>
		</Box>
	</ShowHidePanel>
)
