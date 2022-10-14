import { Network as NetworkID } from '@radixdlt/application'
import { JSONToHex } from '@src/utils/encoding'
import { VisibleTokens } from '@src/types'
import { networks } from '@src/config'
import { getDefaultAddressEntry } from './helpers'
import { AddressBookEntry, AccountState } from './types'

export const whiteList = [
	'publicAddresses',
	'pendingActions',
	'approvedWebsites',
	'blockedWebsites',
	'networks',
	'visibleTokens',
	'hiddenTokens',
	'activeSlideIndex',
	'selectedNetworkIndex',
	'selectedAccountIndex',
]

const defaultState = {
	networks,

	activeSlideIndex: -1,
	selectedNetworkIndex: 0,
	selectedAccountIndex: 0,

	visibleTokens: {},
	hiddenTokens: {},
	tokenSearch: '',

	publicAddresses: {},
	pendingActions: {},
	approvedWebsites: {},
	blockedWebsites: {},
}

export const factory = (set, get): AccountState => ({
	...defaultState,

	resetAction: () => {
		set(state => {
			Object.keys(defaultState).forEach(key => {
				state[key] = defaultState[key]
			})
		})
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

	addPublicAddressAction: (index: number, entry: AddressBookEntry) => {
		set(state => {
			state.publicAddresses[index] = entry
		})
	},

	updatePublicAddressAction: (address: string, settings: AddressBookEntry) => {
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
	},

	selectAccountAction: async (newIndex: number) => {
		set(draft => {
			draft.selectedAccountIndex = newIndex
			draft.activeSlideIndex = newIndex
		})
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
			delete state.blockedWebsites[host]
			state.blockedWebsites = { ...state.blockedWebsites }
			state.approvedWebsites = { ...state.approvedWebsites, [host]: true }
		})
	},

	declineWebsiteAction: (host: string) => {
		set(state => {
			delete state.approvedWebsites[host]
			state.approvedWebsites = { ...state.approvedWebsites }
		})
	},

	blockWebsiteAction: (host: string) => {
		set(state => {
			delete state.approvedWebsites[host]
			state.approvedWebsites = { ...state.approvedWebsites }
			state.blockedWebsites = { ...state.blockedWebsites, [host]: true }
		})
	},

	unblockWebsiteAction: (host: string) => {
		set(state => {
			delete state.blockedWebsites[host]
			state.blockedWebsites = { ...state.blockedWebsites }
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
