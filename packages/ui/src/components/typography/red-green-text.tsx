import React from 'react'

import Text, { type TextProps } from 'ui/src/components/typography/text'

export interface IProps extends TextProps {
	change: number
}

export const RedGreenText: React.FC<IProps> = props => {
	const { children, change, ...rest } = props

	const getChangeStatus = (): TextProps['color'] => {
		if (change && change > 0) {
			return 'green'
		}
		if (change && change < 0) {
			return 'red'
		}
		return 'neutral'
	}

	return (
		<Text {...rest} color={getChangeStatus()}>
			{children}
		</Text>
	)
}

export default RedGreenText
