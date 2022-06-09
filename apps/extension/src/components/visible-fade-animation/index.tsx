import React from 'react'
import { Box } from 'ui/src/components/atoms'

interface IProps {
	isVisible: boolean
}

export const VisibleFadeAnimation: React.FC<IProps> = ({ isVisible, children }) => (
	<Box
		css={{
			pe: !isVisible ? 'none' : 'auto',
			opacity: !isVisible ? '0' : '1',
			transition: '$default',
		}}
	>
		{children}
	</Box>
)
