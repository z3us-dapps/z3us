import React from 'react'
import { Box } from 'ui/src/components/atoms'

interface IProps {
	isVisible: boolean
}

export const VisibleFadeAnimation: React.FC<IProps> = ({ isVisible, children }) => (
	<Box
		css={{
			pe: isVisible ? 'auto' : 'none',
			opacity: isVisible ? '1' : '0',
			transition: '$default',
		}}
	>
		{children}
	</Box>
)
