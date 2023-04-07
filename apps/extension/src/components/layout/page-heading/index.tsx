import React from 'react'

import { Text } from 'ui/src/components/atoms'
import { CSS } from 'ui/src/theme'

interface IProps {
	children: React.ReactNode
	css?: CSS
}

export const PageHeading: React.FC<IProps> = ({ children, css }) => (
	<Text css={{ fontSize: '32px', lineHeight: '38px', fontWeight: '800', ...css }}>{children}</Text>
)

PageHeading.defaultProps = {
	css: undefined,
}
