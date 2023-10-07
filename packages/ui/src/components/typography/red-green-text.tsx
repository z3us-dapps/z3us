import BigNumber from 'bignumber.js'
import React from 'react'

import Text, { type TextProps } from 'ui/src/components/typography/text'

export interface IProps extends TextProps {
	change: BigNumber
}

export const RedGreenText: React.FC<IProps> = props => {
	const { children, change, ...rest } = props

	const getChangeStatus = (): TextProps['color'] => {
		const zero = new BigNumber(0)
		if (change && change.gt(zero)) {
			return 'green'
		}
		if (change && change.lt(zero)) {
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
