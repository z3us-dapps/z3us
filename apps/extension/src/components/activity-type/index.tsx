import React from 'react'
import { Action } from '@src/services/types'
import Pill from 'ui/src/components/pill'

interface IProps {
	accountAddress: string
	activity: Action
}

export const ActivityType: React.FC<IProps> = ({ activity, accountAddress }: IProps) => {
	switch (activity.type) {
		case 'TransferTokens': {
			const isSend = activity.to_account !== accountAddress
			if (isSend) {
				return <Pill color="gradientOrange">Send</Pill>
			}
			return <Pill color="gradientGreen">Deposit</Pill>
		}
		case 'StakeTokens':
			return <Pill color="inverse">Stake</Pill>
		case 'UnstakeTokens':
			return <Pill color="inverse">Unstake</Pill>
		case 'CreateTokenDefinition':
			return <Pill color="inverse">Create Token</Pill>
		case 'BurnTokens':
			return <Pill color="inverse">Burn</Pill>
		case 'MintTokens':
			return <Pill color="inverse">Mint</Pill>
		default:
			return <Pill color="inverse">Other</Pill>
	}
}
