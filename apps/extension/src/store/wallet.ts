import { GetState, SetState } from 'zustand'
import { Network as NetworkID, Account, AccountAddress } from '@radixdlt/application'
import { JSONToHex } from '@src/utils/encoding'
import { getDefaultAddressEntry, getHWSigningKeyForIndex, getLocalSigningKeyForIndex } from './helpers'
import { AccountStore, AddressBookEntry, WalletStore } from './types'

export const whiteList = [
	'publicAddresses',
	'approvedWebsites',
	'pendingActions',
	'networks',
	'activeSlideIndex',
	'selectedNetworkIndex',
	'selectedAccountIndex',
]

const mainnetURL = new URL('https://mainnet.radixdlt.com')
const stokenetURL = new URL('https://stokenet.radixdlt.com')

const defaultState = {
	account: null,

	networks: [
		{ id: NetworkID.MAINNET, url: mainnetURL },
		{ id: NetworkID.STOKENET, url: stokenetURL },
	],

	activeSlideIndex: -1,
	selectedNetworkIndex: 0,
	selectedAccountIndex: 0,

	publicAddresses: {},
	approvedWebsites: {},
	pendingActions: {},
}

const updatePublicAddressEntry = async (set: SetState<AccountStore>, state: AccountStore, idx: number) => {
	const network = state.networks[state.selectedNetworkIndex]
	const publicIndexes = Object.keys(state.publicAddresses)

	let index: number
	let { selectedAccountIndex } = state
	if (idx < publicIndexes.length) {
		index = +publicIndexes[idx]
	} else {
		index = publicIndexes.length > 0 ? +publicIndexes[publicIndexes.length - 1] + 1 : 0
		selectedAccountIndex = publicIndexes.length
		set(draft => {
			draft.selectedAccountIndex = publicIndexes.length
			draft.activeSlideIndex = publicIndexes.length
		})
	}

	const entry = state.publicAddresses[index]
	const signingKeyGetter = entry?.isHardWallet ? getHWSigningKeyForIndex : getLocalSigningKeyForIndex
	const signingKey = await signingKeyGetter(state, index)
	if (signingKey) {
		const address = AccountAddress.fromPublicKeyAndNetwork({
			publicKey: signingKey.publicKey,
			network: network.id,
		})
		set(draft => {
			draft.publicAddresses[index] = {
				...getDefaultAddressEntry(index, state.hardwareWallet !== null),
				...entry,
				isOwn: true,
				address: address.toString(),
			}
		})
		if (selectedAccountIndex === idx) {
			set(draft => {
				draft.account = Account.create({ address, signingKey })
			})
		}
	} else {
		set(draft => {
			draft.account = null
		})
	}
}

export const factory = (set: SetState<AccountStore>, get: GetState<AccountStore>): WalletStore => ({
	...defaultState,

	lockAction: async () => {
		set(state => {
			state.account = null
			state.masterSeed = null
			state.hardwareWallet = null
		})
	},

	resetAction: async () => {
		set(state => {
			state.masterSeed = null
			state.hardwareWallet = null
			Object.keys(defaultState).forEach(key => {
				state[key] = defaultState[key]
			})
		})
	},

	getCurrentAddressAction: () => {
		const { publicAddresses, selectedAccountIndex } = get()
		const publicIndexes = Object.keys(publicAddresses)
		return publicAddresses[publicIndexes[selectedAccountIndex]]
	},

	setPublicAddressesAction: (addresses: { [key: number]: string }) => {
		set(state => {
			const publicAddresses = {}
			Object.keys(addresses).forEach((key, index) => {
				publicAddresses[key] = {
					...getDefaultAddressEntry(index, state.hardwareWallet !== null),
					...state.publicAddresses[key],
					isOwn: true,
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
				state.publicAddresses = { ...state.publicAddresses, [index]: { ...entry, address, ...settings, isOwn: true } }
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
		let selectedAccount = null
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
			if (!state.networks.filter(network => network.url === url)) {
				state.networks = [...state.networks, { id, url }]
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
