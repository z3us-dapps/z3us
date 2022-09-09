import { Action, ActionType } from '@src/types'

export const getInitials = (name: string) => {
	const initials = Array.prototype.map.call(name.split(' '), x => x.substring(0, 1).toUpperCase()).join('')
	return initials.substring(0, 2)
}

export const getShortAddress = (account = '') => {
	if (account === '') return ''
	return `${account?.substring(0, 4)}...${account?.slice(-4)}`
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
