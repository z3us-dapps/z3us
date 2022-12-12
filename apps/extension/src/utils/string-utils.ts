import { Action, ActionType } from '@src/types'

export const getShortAddress = (account = '', shortLength = 4) => {
	if (account === '') return ''
	if (typeof account !== 'string') return ''
	return `${account?.substring(0, shortLength)}...${account?.slice(-shortLength)}`
}

export const getTransactionType = (address: string, activity: Action) => {
	switch (activity.type) {
		case ActionType.TRANSFER_TOKENS: {
			const isSend = activity.to_account !== address
			if (isSend) {
				return 'Send'
			}
			return 'Deposit'
		}
		case ActionType.STAKE_TOKENS:
			return 'Stake'
		case ActionType.UNSTAKE_TOKENS:
			return 'Unstake'
		case ActionType.CREATE_TOKEN:
			return 'Create Token'
		case ActionType.BURN_TOKENS:
			return 'Burn'
		case ActionType.MINT_TOKENS:
			return 'Mint'
		default:
			return 'Other'
	}
}
