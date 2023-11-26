import type { IKeystoresStateSetter, Keystore, KeystoresState } from './types'

export const factory = (set: IKeystoresStateSetter): KeystoresState => ({
	keystores: [],
	selectedKeystoreId: '',

	selectKeystoreAction: (keystoreId: string) => {
		set(draft => {
			const keystore = draft.keystores.find(({ id }) => id === keystoreId)
			// eslint-disable-next-line no-nested-ternary
			draft.selectedKeystoreId = keystore ? keystore.id : draft.keystores.length > 0 ? draft.keystores[0].id : ''
		})
	},

	addKeystoreAction: (keystore: Keystore) => {
		set(draft => {
			const keystores = draft.keystores.filter(({ id }) => keystore.id !== id) || []

			draft.selectedKeystoreId = keystore.id
			draft.keystores = [...keystores, keystore]
		})
	},

	removeKeystoreAction: (keystoreId: string) => {
		set(draft => {
			const keystores = draft.keystores.filter(({ id }) => keystoreId !== id) || []
			const current = keystores.find(({ id }) => id === draft.selectedKeystoreId)
			if (!current) {
				draft.selectedKeystoreId = keystores.length > 0 ? keystores[0].id : ''
			}
			draft.keystores = keystores
		})
	},

	changeKeystoreNameAction: (id: string, name: string) => {
		set(draft => {
			const keystores = draft.keystores || []
			draft.keystores = keystores.map(keystore => (keystore.id === id ? { ...keystore, name } : keystore))
		})
	},
})
