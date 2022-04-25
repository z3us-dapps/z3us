import React from 'react'
import { Text } from 'ui/src/components/atoms'
import { CSS } from 'ui/src/theme'

interface IProps {
	children: React.ReactNode
	css?: CSS
}

export const PageSubHeading: React.FC<IProps> = ({ children, css }: IProps) => (
	<Text css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500', mt: '20px', ...css }}>{children}</Text>
)

PageSubHeading.defaultProps = {
	css: undefined,
}
