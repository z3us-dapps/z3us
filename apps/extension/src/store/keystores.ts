import { SetState } from 'zustand'
import { KeystoresStore, KeystoreType, SharedStore } from './types'

export const whiteList = ['keystores', 'selectKeystoreName']

export const keystoreNameBlackList = ['shared', 'hw']

export const factory = (set: SetState<SharedStore>): KeystoresStore => ({
	hasKeystore: false,
	keystores: [],
	selectKeystoreId: '',

	setHasKeystoreAction: (hasKeystore: boolean) => {
		set(state => {
			state.hasKeystore = hasKeystore
		})
	},

	addKeystoreAction: (id: string, name: string, type: KeystoreType) => {
		if (keystoreNameBlackList.includes(id)) {
			return
		}
		set(draft => {
			draft.keystores = [...draft.keystores, { id, name, type }]
			draft.selectKeystoreId = id
		})
	},

	changeKeystoreNameAction: (id: string, name: string) => {
		if (keystoreNameBlackList.includes(id)) {
			return
		}
		set(draft => {
			draft.keystores = draft.keystores.map(keystore => (keystore.id === id ? { ...keystore, name } : keystore))
		})
	},

	removeKeystoreAction: (keystoreId: string) => {
		set(draft => {
			if (draft.selectKeystoreId === keystoreId) {
				draft.selectKeystoreId = ''
			}
			draft.keystores = draft.keystores.filter(({ id }) => keystoreId !== id)
		})
	},

	selectKeystoreAction: (keystoreId: string) => {
		set(draft => {
			draft.selectKeystoreId = draft.keystores.find(({ id }) => id === keystoreId)?.id || ''
		})
	},
})
