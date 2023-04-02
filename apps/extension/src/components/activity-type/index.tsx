import React from 'react'

import Pill from 'ui/src/components/pill'

import { Action, ActionType } from '@src/types'
import { getTransactionType } from '@src/utils/string-utils'

interface IProps {
	accountAddress: string
	activity: Action
}

export const ActivityType: React.FC<IProps> = ({ activity, accountAddress }) => {
	const label = getTransactionType(accountAddress, activity)

	switch (activity.type) {
		case ActionType.TRANSFER_TOKENS: {
			const isSend = activity.to_account !== accountAddress
			if (isSend) {
				return <Pill color="gradientOrange">{label}</Pill>
			}
			return <Pill color="gradientGreen">{label}</Pill>
		}
		case ActionType.STAKE_TOKENS:
			return <Pill color="inverse">{label}</Pill>
		case ActionType.UNSTAKE_TOKENS:
			return <Pill color="inverse">{label}</Pill>
		case ActionType.CREATE_TOKEN:
			return <Pill color="inverse">{label}</Pill>
		case ActionType.BURN_TOKENS:
			return <Pill color="inverse">{label}</Pill>
		case ActionType.MINT_TOKENS:
			return <Pill color="inverse">{label}</Pill>
		default:
			return <Pill color="inverse">{label}</Pill>
	}
}
