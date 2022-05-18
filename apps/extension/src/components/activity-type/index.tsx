import React from 'react'
import { Action } from '@src/types'
import Pill from 'ui/src/components/pill'
import { getTransactionType } from '@src/utils/string-utils'

interface IProps {
	accountAddress: string
	activity: Action
}

export const ActivityType: React.FC<IProps> = ({ activity, accountAddress }) => {
	const label = getTransactionType(accountAddress, activity)

	switch (activity.type) {
		case 'TransferTokens': {
			const isSend = activity.to_account !== accountAddress
			if (isSend) {
				return <Pill color="gradientOrange">{label}</Pill>
			}
			return <Pill color="gradientGreen">{label}</Pill>
		}
		case 'StakeTokens':
			return <Pill color="inverse">{label}</Pill>
		case 'UnstakeTokens':
			return <Pill color="inverse">{label}</Pill>
		case 'CreateTokenDefinition':
			return <Pill color="inverse">{label}</Pill>
		case 'BurnTokens':
			return <Pill color="inverse">{label}</Pill>
		case 'MintTokens':
			return <Pill color="inverse">{label}</Pill>
		default:
			return <Pill color="inverse">{label}</Pill>
	}
}
