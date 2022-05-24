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

export const PageContainer: React.FC<IProps> = ({ children, css }) => (
	<Box
		css={{
			position: 'relative',
			maxWidth: '1264px',
			width: '100%',
			px: '15px',
			mx: 'auto',
			'@xs': { border: '0px solid brown' },
			'@sm': { border: '0px solid green', px: '20px' },
			'@md': { border: '0px solid pink' },
			'@lg': { border: '0px solid blue' },
			'@xl': { border: '0px solid red' },
			...(css as any),
		}}
	>
		{children}
	</Box>
)

PageContainer.defaultProps = defaultProps
