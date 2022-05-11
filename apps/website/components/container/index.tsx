import React from 'react'
import { Box } from 'ui/src/components/atoms'
import { CSS } from 'ui/src/theme'

interface IProps {
	children: React.ReactNode
	css?: CSS
}

const defaultProps = {
	css: undefined,
}

export const Container: React.FC<IProps> = ({ children, css }) => (
	<Box
		css={{
			position: 'relative',
			maxWidth: '1288px',
			width: '100%',
			px: '25px',
			mx: 'auto',
			'@xs': { border: '0px solid white', px: '10px' },
			'@sm': { border: '0px solid green', px: '20px' },
			'@md': { border: '0px solid yellow' },
			'@lg': { border: '0px solid blue' },
			'@xl': { border: '0px solid red' },
			...(css as any),
		}}
	>
		{children}
	</Box>
)

Container.defaultProps = defaultProps
