import { Keystore, KeystoreType } from '@src/types'
import { KeystoresState } from './types'

export const whiteList = ['keystores', 'selectKeystoreId']

const defaultKeystore: Keystore = { id: '', type: KeystoreType.LOCAL, name: 'default' }

export const factory = (set): KeystoresState => ({
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
			draft.keystores = draft.keystores.map(keystore => (keystore.id === id ? { ...keystore, name } : keystore))
		})
	},

	removeKeystoreAction: (keystoreId: string) => {
		set(draft => {
			if (draft.selectKeystoreId === keystoreId) {
				draft.selectKeystoreId = defaultKeystore.id
			}
			draft.keystores = draft.keystores.filter(({ id }) => keystoreId !== id)
			if (draft.keystores.length > 0) {
				draft.selectKeystoreId = draft.keystores[0].id
			}
		})
	},

	selectKeystoreAction: (keystoreId: string) => {
		set(draft => {
			draft.selectKeystoreId = draft.keystores.find(({ id }) => id === keystoreId)?.id || defaultKeystore.id
		})
	},
})
