import { Action } from '@src/types'

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
		case 'TransferTokens': {
			const isSend = activity.to_account !== address
			if (isSend) {
				return 'Withdraw'
			}
			return 'Deposit'
		}
		case 'StakeTokens':
			return 'Stake'
		case 'UnstakeTokens':
			return 'Unstake'
		case 'CreateTokenDefinition':
			return 'Create Token'
		case 'BurnTokens':
			return 'Burn'
		case 'MintTokens':
			return 'Mint'
		default:
			return 'Other'
	}
}
