import React from 'react'
import { Text } from 'ui/src/components/atoms'
import { CSS } from 'ui/src/theme'

interface IProps {
	children: React.ReactNode
	css?: CSS
}

export const PageSubHeading: React.FC<IProps> = ({ children, css }) => (
	<Text css={{ fontSize: '14px', lineHeight: '19px', fontWeight: '500', mt: '19px', ...css }}>{children}</Text>
)

PageSubHeading.defaultProps = {
	css: undefined,
}
