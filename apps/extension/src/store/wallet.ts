import { SigningKey } from '@src/types'
import { WalletState } from './types'

const defaultState = {
	isUnlocked: undefined,
	signingKey: null,
}

export const factory = (set): WalletState => ({
	...defaultState,

	resetAction: () => {
		set(state => {
			Object.keys(defaultState).forEach(key => {
				state[key] = defaultState[key]
			})
		})
	},

	setIsUnlockedAction: (isUnlocked: boolean) => {
		set(draft => {
			draft.isUnlocked = isUnlocked
			if (!isUnlocked) {
				draft.signingKey = null
			}
		})
	},

	setSigningKeyAction: (signingKey: SigningKey | null) => {
		set(draft => {
			draft.signingKey = signingKey
		})
	},
})
