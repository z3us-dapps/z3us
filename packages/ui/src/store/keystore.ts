import type { IKeystoresStateSetter, KeystoreType, KeystoresState } from './types'

export const factory = (set: IKeystoresStateSetter): KeystoresState => ({
	keystores: [],
	selectKeystoreId: '',

	addKeystoreAction: (id: string, name: string, type: KeystoreType) => {
		set(draft => {
			draft.keystores = [...draft.keystores, { id, name, type }]
			draft.selectKeystoreId = id
		})
	},

	changeKeystoreNameAction: (id: string, name: string) => {
		set(draft => {
			const keysotres = draft.keystores || []
			draft.keystores = keysotres.map(keystore => (keystore.id === id ? { ...keystore, name } : keystore))
		})
	},

	removeKeystoreAction: (keystoreId: string) => {
		set(draft => {
			if (draft.selectKeystoreId === keystoreId) {
				draft.selectKeystoreId = ''
			}
			draft.keystores = draft.keystores.filter(({ id }) => keystoreId !== id) || []
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
