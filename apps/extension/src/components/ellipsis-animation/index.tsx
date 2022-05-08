import React from 'react'
import { keyframes } from 'ui/src/theme'
import { Flex, Text } from 'ui/src/components/atoms'

const dotAnimation = keyframes({
	from: { width: 0 },
	to: { width: '20px' },
})

interface IProps {
	children: React.ReactNode
}

// NOTE see here: https://codesandbox.io/s/tvqol?file=/src/pages/botty/components/BottyDots.css
export const EllipsisAnimation: React.FC<IProps> = ({ children }) => (
	<Flex align="end">
		{children}
		<Text
			size="9"
			css={{
				position: 'relative',
				ml: '$1',
				border: '0px solid',
				width: '25px',
				height: '25px',
				overflow: 'hidden',
				'&:after': {
					content: '...',
					position: 'absolute',
					bottom: '0',
					left: '0',
					display: 'inline-block',
					overflow: 'hidden',
					verticalAlign: 'bottom',
					width: '0em',
					animation: `${dotAnimation} steps(4,end) 900ms infinite`,
				},
			}}
		/>
	</Flex>
)
