import React from 'react'

import Text, { type TextProps } from 'ui/src/components/typography/text'
import { type ChangeStatus } from 'ui/src/hooks/dapp/use-total-balance'

const colorMap: { [key: string]: TextProps['color'] } = {
	positive: 'green',
	negative: 'red',
	default: 'neutral',
}

export interface IProps extends TextProps {
	changeStatus: ChangeStatus
}

export const RedGreenText: React.FC<IProps> = props => {
	const { children, changeStatus, ...rest } = props

	return (
		<Text {...rest} color={colorMap[changeStatus] || colorMap.default}>
			{children}
		</Text>
	)
}

export default RedGreenText
