import { KeystoreType } from './types'
import type { IKeystoresStateSetter, KeystoresState } from './types'

export const defaultKeystore = { id: 'default', name: 'Default', type: KeystoreType.RADIX_WALLET }

export const factory = (set: IKeystoresStateSetter): KeystoresState => ({
	keystores: [defaultKeystore],
	selectedKeystoreId: defaultKeystore.id,

	addKeystoreAction: (keystoreId: string, name: string, type: KeystoreType) => {
		set(draft => {
			const keystores = draft.keystores.filter(({ id }) => keystoreId !== id) || []
			draft.selectedKeystoreId = keystoreId
			draft.keystores = [...keystores, { id: keystoreId, name, type }]
		})
	},

	changeKeystoreNameAction: (id: string, name: string) => {
		set(draft => {
			const keystores = draft.keystores || []
			draft.keystores = keystores.map(keystore => (keystore.id === id ? { ...keystore, name } : keystore))
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

	selectKeystoreAction: (keystoreId: string) => {
		set(draft => {
			const keystore = draft.keystores.find(({ id }) => id === keystoreId)
			draft.selectedKeystoreId = keystore ? keystore.id : draft.keystores.length > 0 ? draft.keystores[0].id : ''
		})
	},
})
