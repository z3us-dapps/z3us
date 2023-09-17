import { KeystoreType } from './types'
import type { IKeystoresStateSetter, KeystoresState } from './types'

export const defaultKeystore = { id: 'default', name: 'Default', type: KeystoreType.RADIX_WALLET }

export const factory = (set: IKeystoresStateSetter): KeystoresState => ({
	keystores: [defaultKeystore],
	selectedKeystoreId: defaultKeystore.id,

	addKeystoreAction: (id: string, name: string, type: KeystoreType) => {
		set(draft => {
			draft.keystores = [...draft.keystores, { id, name, type }]
			draft.selectedKeystoreId = id
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
			draft.keystores = draft.keystores.filter(({ id }) => keystoreId !== id) || []
			const current = draft.keystores.find(({ id }) => id === draft.selectedKeystoreId)
			if (!current) {
				if (draft.keystores.length > 0) {
					draft.selectedKeystoreId = draft.keystores[0].id
				} else {
					draft.selectedKeystoreId = ''
				}
			}
		})
	},

	selectKeystoreAction: (keystoreId: string) => {
		set(draft => {
			draft.selectedKeystoreId = draft.keystores.find(({ id }) => id === keystoreId)?.id || ''
		})
	},
})
