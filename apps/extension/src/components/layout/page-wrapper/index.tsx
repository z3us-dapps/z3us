import React from 'react'
import { Box } from 'ui/src/components/atoms'
import { CSS } from 'ui/src/theme'

interface IProps {
	children: React.ReactNode
	css?: CSS
}

export const PageWrapper: React.FC<IProps> = ({ children, css }: IProps) => (
	<Box css={{ py: '20px', px: '23px', ...css }}>{children}</Box>
)

PageWrapper.defaultProps = {
	css: undefined,
}
