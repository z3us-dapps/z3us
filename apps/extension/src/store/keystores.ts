import { SetState } from 'zustand'
import { KeystoresStore, KeystoreType, SharedStore } from './types'

export const whiteList = ['keystores', 'selectKeystoreId']

export const factory = (set: SetState<SharedStore>): KeystoresStore => ({
	keystores: [],
	selectKeystoreId: '',

	addKeystoreAction: (id: string, name: string, type: KeystoreType) => {
		set(draft => {
			draft.keystores = [...draft.keystores, { id, name, type, hasPassword: false }]
			draft.selectKeystoreId = id
		})
	},

	// @NOTE: In the case that the user does not complete the `restore` process, the keystore is removed.
	cleanKeystoresAction: async () => {
		set(draft => {
			const keystoresNotSetup = draft.keystores.filter(_keystore => !_keystore.hasPassword)
			const isNotSetupKeystoreSelected = keystoresNotSetup.some(({ id }) => id === draft.selectKeystoreId)
			const updatedKeyStores = draft.keystores.filter(_keystore => _keystore.hasPassword)
			draft.keystores = updatedKeyStores
			draft.selectKeystoreId = isNotSetupKeystoreSelected ? updatedKeyStores?.[0]?.id : draft.selectKeystoreId
		})
	},

	changeKeystoreNameAction: (id: string, name: string) => {
		set(draft => {
			draft.keystores = draft.keystores.map(keystore => (keystore.id === id ? { ...keystore, name } : keystore))
		})
	},

	changeKeystoreStatusForPasswordAction: (id: string, hasPassword: boolean) => {
		set(draft => {
			draft.keystores = draft.keystores.map(keystore => (keystore.id === id ? { ...keystore, hasPassword } : keystore))
		})
	},

	removeKeystoreAction: (keystoreId: string) => {
		set(draft => {
			if (draft.selectKeystoreId === keystoreId) {
				draft.selectKeystoreId = ''
			}
			draft.keystores = draft.keystores.filter(({ id }) => keystoreId !== id)
			if (draft.keystores.length > 0) {
				draft.selectKeystoreId = draft.keystores[0].id
			}
		})
	},

	selectKeystoreAction: (keystoreId: string) => {
		set(draft => {
			draft.selectKeystoreId = draft.keystores.find(({ id }) => id === keystoreId)?.id || ''
		})
	},
})
