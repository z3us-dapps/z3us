import { KeystoreType } from './types'
import type { IKeystoresStateSetter, KeystoresState } from './types'

const defaultKeystore = { id: 'default', name: 'default', type: KeystoreType.RADIX_WALLET }

export const factory = (set: IKeystoresStateSetter): KeystoresState => ({
	keystores: [defaultKeystore],
	selectKeystoreId: defaultKeystore.id,

	addKeystoreAction: (id: string, name: string, type: KeystoreType) => {
		set(draft => {
			draft.keystores = [...draft.keystores, { id, name, type }]
			draft.selectKeystoreId = id
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
			const current = draft.keystores.find(({ id }) => id === draft.selectKeystoreId)
			if (!current) {
				if (draft.keystores.length > 0) {
					draft.selectKeystoreId = draft.keystores[0].id
				} else {
					draft.selectKeystoreId = ''
				}
			}
		})
	},

	selectKeystoreAction: (keystoreId: string) => {
		set(draft => {
			draft.selectKeystoreId = draft.keystores.find(({ id }) => id === keystoreId)?.id || ''
		})
	},
})
