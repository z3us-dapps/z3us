import React from 'react'

import { Box } from 'ui/src/components/box'
import { ShowHidePanel } from 'ui/src/components/show-hide-panel'
import Text, { type TextProps } from 'ui/src/components/typography/text'

interface IValidationErrorMessageProps extends Omit<TextProps, 'children'> {
	message?: string
}

export const ValidationErrorMessage: React.FC<IValidationErrorMessageProps> = props => {
	const { message, size = 'xsmall', color = 'red', ...rest } = props
	return (
		<ShowHidePanel isChildrenVisible={!!message}>
			<Box paddingTop="xsmall">
				<Text size={size} color={color} {...rest}>
					{message}
				</Text>
			</Box>
		</ShowHidePanel>
	)
}
