import { AccountAddress, Network as NetworkID } from '@radixdlt/application'
import { JSONToHex } from '@src/utils/encoding'
import { KeystoreType, SigningKey, VisibleTokens } from '@src/types'
import { networks } from '@src/config'
import { getDefaultAddressEntry } from './helpers'
import { AccountState, AddressBookEntry, WalletState } from './types'

export const whiteList = [
	'publicAddresses',
	'approvedWebsites',
	'pendingActions',
	'networks',
	'visibleTokens',
	'hiddenTokens',
	'activeSlideIndex',
	'selectedNetworkIndex',
	'selectedAccountIndex',
]

const defaultState = {
	isUnlocked: false,
	signingKey: null,

	networks,

	activeSlideIndex: -1,
	derivedAccountIndex: 0,
	selectedNetworkIndex: 0,
	selectedAccountIndex: 0,

	visibleTokens: {},
	hiddenTokens: {},
	tokenSearch: '',

	publicAddresses: {},
	approvedWebsites: {},
	pendingActions: {},
}

const updatePublicAddressEntry = async (set, state: AccountState, idx: number) => {
	const publicIndexes = Object.keys(state.publicAddresses)

	let index: number = 0
	if (idx < publicIndexes.length) {
		index = +publicIndexes[idx]
	} else {
		index = publicIndexes.length > 0 ? +publicIndexes[publicIndexes.length - 1] + 1 : 0
		set(draft => {
			draft.derivedAccountIndex = publicIndexes.length
			draft.selectedAccountIndex = publicIndexes.length
			draft.activeSlideIndex = publicIndexes.length
		})
	}

	set(draft => {
		draft.derivedAccountIndex = index
	})
}

export const factory = (set, get): WalletState => ({
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

			if (signingKey) {
				const network = draft.networks[draft.selectedNetworkIndex]
				const address = AccountAddress.fromPublicKeyAndNetwork({
					publicKey: signingKey.publicKey,
					network: network.id,
				})

				draft.publicAddresses[draft.derivedAccountIndex] = {
					...getDefaultAddressEntry(draft.derivedAccountIndex),
					...draft.publicAddresses[draft.derivedAccountIndex],
					address: address.toString(),
				}
			}
		})
	},

	getAccountTypeAction: (): KeystoreType => {
		const { signingKey } = get()

		if (signingKey) {
			return signingKey.type
		}

		return KeystoreType.LOCAL
	},

	getCurrentAddressAction: () => {
		const { publicAddresses, selectedAccountIndex } = get()
		const publicIndexes = Object.keys(publicAddresses)
		return publicAddresses[publicIndexes[selectedAccountIndex]]?.address
	},

	setPublicAddressesAction: (addresses: { [key: number]: string }) => {
		set(state => {
			const publicAddresses = {}
			Object.keys(addresses).forEach((key, index) => {
				publicAddresses[key] = {
					...getDefaultAddressEntry(index),
					...state.publicAddresses[key],
					address: addresses[key],
				}
			})
			state.publicAddresses = publicAddresses
		})
	},

	setPublicAddressAction: (address: string, settings: AddressBookEntry) => {
		set(state => {
			const publicIndexes = Object.keys(state.publicAddresses)
			const index = Object.values(state.publicAddresses).findIndex(
				(entry: AddressBookEntry) => entry.address === address,
			)
			const entry = state.publicAddresses[publicIndexes[index]]
			if (entry) {
				state.publicAddresses = { ...state.publicAddresses, [index]: { ...entry, ...settings, address } }
			}
		})
	},

	removePublicAddressesAction: (index: number) => {
		set(state => {
			const publicIndexes = Object.keys(state.publicAddresses)
			if (index < publicIndexes.length) {
				delete state.publicAddresses[publicIndexes[index]]
				state.publicAddresses = { ...state.publicAddresses }
			}
			state.selectedAccountIndex = 0
			state.activeSlideIndex = -1
		})
	},

	selectNetworkAction: async (newIndex: number) => {
		set(draft => {
			draft.selectedNetworkIndex = newIndex
		})

		const state = get()
		for (let i = 0; i < Object.keys(state.publicAddresses).length; i += 1) {
			// eslint-disable-next-line no-await-in-loop
			await updatePublicAddressEntry(set, state, i)
		}
	},

	selectAccountAction: async (newIndex: number) => {
		set(draft => {
			draft.selectedAccountIndex = newIndex
			draft.activeSlideIndex = newIndex
		})

		await updatePublicAddressEntry(set, get(), newIndex)
	},

	selectAccountForAddressAction: async (address: string) => {
		let selectedAccount = 0
		const { selectAccountAction, publicAddresses } = get()

		const publicIndexes = Object.keys(publicAddresses)
		for (let i = 0; i < publicIndexes.length; i += 1) {
			if (publicAddresses[publicIndexes[i]].address === address) {
				selectedAccount = i
				break
			}
		}

		return selectAccountAction(selectedAccount)
	},

	addNetworkAction: (id: NetworkID, url: URL) => {
		set(state => {
			const found = state.networks.find(network => network.url.href === url.href)
			if (!found) {
				state.networks = [...networks, { id, url }]
			}
		})
	},

	setActiveSlideIndexAction: async (newIndex: number) => {
		const { publicAddresses } = get()
		const publicIndexes = Object.keys(publicAddresses)
		const maxIndex = publicIndexes.length

		if (maxIndex > 0) {
			newIndex = Math.min(maxIndex, newIndex)
		} else if (newIndex > 1) {
			newIndex = 1
		}

		set(draft => {
			draft.activeSlideIndex = newIndex
		})

		const { selectAccountAction } = get()

		if (newIndex < maxIndex && newIndex >= 0) {
			return selectAccountAction(newIndex)
		}

		return undefined
	},

	setVisibleTokensAction: (visibleTokens: VisibleTokens) => {
		set(state => {
			state.visibleTokens = visibleTokens
		})
	},

	setHiddenTokensAction: (hiddenTokens: VisibleTokens) => {
		set(state => {
			state.hiddenTokens = hiddenTokens
		})
	},

	setTokenSearchAction: (search: string) => {
		set(state => {
			state.tokenSearch = search
		})
	},

	approveWebsiteAction: (host: string) => {
		set(state => {
			state.approvedWebsites = { ...state.approvedWebsites, [host]: true }
		})
	},

	declineWebsiteAction: (host: string) => {
		set(state => {
			delete state.approvedWebsites[host]
			state.approvedWebsites = { ...state.approvedWebsites }
		})
	},

	addPendingActionAction: (id: string, request: any) => {
		set(state => {
			state.pendingActions = {
				...state.pendingActions,
				[id]: { payloadHex: JSONToHex(request), createdAt: new Date() },
			}
		})
	},

	removePendingActionAction: (id: string) => {
		set(state => {
			delete state.pendingActions[id]
			state.pendingActions = { ...state.pendingActions }
		})
	},
})
