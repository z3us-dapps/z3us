import { SetState } from 'zustand'
import { KeystoresStore, SharedStore } from './types'

export const whiteList = ['keystores', 'selectKeystoreName']

export const keystoreNameBlackList = ['shared', 'hw']

export const factory = (set: SetState<SharedStore>): KeystoresStore => ({
	hasKeystore: false,
	keystores: [],
	selectKeystoreName: '',

	setHasKeystoreAction: (hasKeystore: boolean) => {
		set(state => {
			state.hasKeystore = hasKeystore
		})
	},

	addKeystore: async (keystoreId: string) => {
		if (keystoreNameBlackList.includes(keystoreId)) {
			return
		}
		set(draft => {
			draft.keystores = [...draft.keystores, keystoreId]
			draft.selectKeystoreName = keystoreId
		})
	},

	removeKeystore: async (keystoreId: string) => {
		set(draft => {
			if (draft.selectKeystoreName === keystoreId) {
				draft.selectKeystoreName = ''
			}
			draft.keystores = draft.keystores.filter(id => keystoreId !== id)
		})
	},

	selectKeystore: async (keystoreId: string) => {
		set(draft => {
			draft.selectKeystoreName = draft.keystores.find(id => id === keystoreId) || ''
		})
	},
})
