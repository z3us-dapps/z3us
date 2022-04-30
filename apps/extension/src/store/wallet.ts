import TransportNodeHid from '@ledgerhq/hw-transport-webhid'
import { Network as NetworkID, Account, AccountT, AccountAddress, SigningKey } from '@radixdlt/application'
import { HDPathRadix, PrivateKey, HDMasterSeed, HDMasterSeedT } from '@radixdlt/crypto'
import { HardwareWalletLedger } from '@radixdlt/hardware-ledger'
import { startRegistration, startAuthentication } from '@simplewebauthn/browser'
import { JSONToHex } from '@src/utils/encoding'
import { MessageService } from '@src/services/messanger'
import {
	HAS,
	LOCK,
	NEW,
	RESET,
	UNLOCK,
	AUTH_HAS,
	AUTH_RESET,
	AUTH_REGISTRATION_OPTIONS,
	AUTH_VERIFY_REGISTRATION,
	AUTH_AUTHENTICATION_OPTIONS,
	AUTH_VERIFY_AUTHENTICATION,
} from '@src/lib/actions'
import { ColorSettings } from '@src/services/types'
import { HardwareWalletT } from '@radixdlt/hardware-wallet'

export type Network = {
	id: NetworkID
	url: URL
}

export type PendingAction = { payloadHex: string; createdAt: Date }

export type MasterSeed = HDMasterSeedT | null

export type AddressBookEntry = {
	name?: string
	isOwn?: boolean
	background?: string
	colorSettings?: { [key in ColorSettings]: string }
}

export type WalletStore = {
	messanger: MessageService | null
	setMessangerAction: (messanger: MessageService) => void
	sendResponseAction: (action: string, data: any) => Promise<void>
	hasKeystoreAction: () => Promise<boolean>
	createWalletAction: (words: string[], password: string) => Promise<void>
	unlockWalletAction: (password: string) => Promise<void>
	resetWalletAction: () => Promise<void>
	lockAction: () => Promise<void>
	// WebAuthn actions
	hasAuthAction: () => Promise<boolean>
	removeCredentialAction: () => Promise<void>
	registerCredentialAction: (
		userID: string,
		userName: string,
		userDisplayName: string,
		password: string,
	) => Promise<string>
	authenticateAction: () => Promise<string>

	hasKeystore: boolean
	account: AccountT | null
	getCurrentAddressAction: () => string

	masterSeed: MasterSeed
	setMasterSeedAction: (seed: MasterSeed) => Promise<void>
	setHasKeystoreAction: (hasKeystore: boolean) => void

	hardwareWallet: HardwareWalletT | null
	sendAPDUAction: (
		cla: number,
		ins: number,
		p1: number,
		p2: number,
		data?: Buffer,
		statusList?: number[],
	) => Promise<Buffer>

	hwPublicAddresses: { [key: number]: string }
	setHardwareWalletAction: (hardwareWallet: HardwareWalletT) => void
	setHWPublicAddressesAction: (addresses: { [key: number]: string }) => void

	publicAddresses: { [key: number]: string }
	setPublicAddressesAction: (addresses: { [key: number]: string }) => void

	removeAddressBookEntryAction: (address: string) => void
	setAddressBookEntryAction: (address: string, entry: AddressBookEntry) => void
	removeAccountAddressAction: (index: number) => void

	addressBook: { [key: string]: AddressBookEntry }

	walletUnlockTimeoutInMinutes: number
	setWalletUnclokTimeoutInMinutesAction: (timeoutInMinutes: number) => void

	selectedAccountIndex: number
	selectAccountAction: (newIndex: number) => Promise<void>
	selectAccountForAddressAction: (address: string) => Promise<void>

	networks: Network[]
	selectedNetworkIndex: number
	selectNetworkAction: (newIndex: number) => Promise<void>
	addNetworkAction: (id: NetworkID, url: URL) => void

	activeApp: Array<string | number>
	setActiveAppAction: (activeApp: Array<string | number>) => void

	activeSlideIndex: number
	setActiveSlideIndexAction: (newIndex: number) => Promise<void>

	accountPanelExpanded: boolean
	setAccountPanelExpandedAction: (expanded: boolean) => void

	approvedWebsites: {
		[key: string]: any
	}
	approveWebsiteAction: (host: string) => void
	declineWebsiteAction: (host: string) => void

	pendingActions: {
		[key: string]: PendingAction
	}
	addPendingActionAction: (id: string, request: any) => void
	removePendingActionAction: (id: string) => void
}

export const whiteList = [
	'walletUnlockTimeoutInMinutes',
	'publicAddresses',
	'hwPublicAddresses',
	'addressBook',
	'networks',
	'activeSlideIndex',
	'selectedNetworkIndex',
	'selectedAccountIndex',
	'accountPanelExpanded',
	'approvedWebsites',
	'pendingActions',
]

const rpName = 'z3us'

const mainnetURL = new URL('https://mainnet.radixdlt.com')
const stokenetURL = new URL('https://stokenet.radixdlt.com')

const defaultEntryBackground = 'radial-gradient(circle at 50% 0%, rgb(238, 171, 224) 50%, rgb(247, 219, 191) 76%)'

const defaultState = {
	hasKeystore: false,
	account: null,
	messanger: null,
	masterSeed: null,
	hardwareWallet: null,
	hwPublicAddresses: {},
	publicAddresses: {},
	addressBook: {},

	networks: [
		{ id: NetworkID.MAINNET, url: mainnetURL },
		{ id: NetworkID.STOKENET, url: stokenetURL },
	],

	activeApp: ['accounts', 0],
	activeSlideIndex: -1,
	accountPanelExpanded: false,
	selectedNetworkIndex: 0,
	selectedAccountIndex: 0,
	walletUnlockTimeoutInMinutes: 5,

	approvedWebsites: {},
	pendingActions: {},
}

const getHWSigningKeyForIndex = async (state: WalletStore, index: number) => {
	if (!state.hardwareWallet) return null

	const hdPath = HDPathRadix.create({ address: { index, isHardened: true } })
	const hardwareSigningKey = await state.hardwareWallet.makeSigningKey(hdPath, false).toPromise()

	return SigningKey.fromHDPathWithHWSigningKey({ hdPath, hardwareSigningKey })
}

const getSigningKeyForIndex = async (state: WalletStore, index: number) => {
	if (!state.masterSeed) return null

	const key = state.masterSeed.masterNode().derive(HDPathRadix.create({ address: { index, isHardened: true } }))

	const pk = PrivateKey.fromHex(key.privateKey.toString())
	if (pk.isErr()) {
		throw pk.error
	}

	return SigningKey.fromPrivateKey({
		privateKey: pk.value,
	})
}

export const createWalletStore = (set, get) => ({
	...defaultState,

	hasAuthAction: async () => {
		const { messanger } = get()
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}
		return messanger.sendActionMessageFromPopup(AUTH_HAS, null)
	},

	removeCredentialAction: async () => {
		const { messanger } = get()
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}

		return messanger.sendActionMessageFromPopup(AUTH_RESET, null)
	},

	registerCredentialAction: async (userID: string, userName: string, userDisplayName: string, password: string) => {
		const { messanger } = get()
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}

		const options = await messanger.sendActionMessageFromPopup(AUTH_REGISTRATION_OPTIONS, {
			rpID: window.location.hostname,
			rpName,
			userID,
			userName,
			userDisplayName,
			password,
		})

		const credential = await startRegistration(options)

		return messanger.sendActionMessageFromPopup(AUTH_VERIFY_REGISTRATION, {
			expectedRPID: window.location.hostname,
			expectedOrigin: window.location.origin,
			credential,
		})
	},

	authenticateAction: async () => {
		const { messanger } = get()
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}

		const options = await messanger.sendActionMessageFromPopup(AUTH_AUTHENTICATION_OPTIONS, null)

		const credential = await startAuthentication(options)

		return messanger.sendActionMessageFromPopup(AUTH_VERIFY_AUTHENTICATION, {
			expectedRPID: window.location.hostname,
			expectedOrigin: window.location.origin,
			credential,
		})
	},

	authRegistrationOptions: async () => {
		const { messanger } = get()
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}
		return messanger.sendActionMessageFromPopup(AUTH_REGISTRATION_OPTIONS, null)
	},

	authVerifyRegistration: async () => {
		const { messanger } = get()
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}
		return messanger.sendActionMessageFromPopup(AUTH_VERIFY_REGISTRATION, null)
	},

	authAuthenticationOptions: async () => {
		const { messanger } = get()
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}
		return messanger.sendActionMessageFromPopup(AUTH_AUTHENTICATION_OPTIONS, null)
	},

	authVerifyAuthentication: async () => {
		const { messanger } = get()
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}
		return messanger.sendActionMessageFromPopup(AUTH_VERIFY_AUTHENTICATION, null)
	},

	sendResponseAction: async (action: string, data: any = {}) => {
		const { messanger } = get()
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}
		await messanger.sendActionReply(action, data)
	},

	hasKeystoreAction: async () => {
		const { messanger } = get()
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}
		const hasKeystore = await messanger.sendActionMessageFromPopup(HAS, null)
		return !!hasKeystore
	},

	createWalletAction: async (words: string[], password: string) => {
		const { messanger } = get()
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}
		const { seed, hasKeystore } = await messanger.sendActionMessageFromPopup(NEW, {
			words,
			password,
		})
		set(draft => {
			draft.hasKeystore = hasKeystore
			draft.masterSeed = HDMasterSeed.fromSeed(Buffer.from(seed, 'hex'))
		})
		const { selectAccountAction, selectedAccountIndex } = get()
		return selectAccountAction(selectedAccountIndex)
	},

	unlockWalletAction: async (password: string) => {
		const { messanger } = get()
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}
		const { seed, hasKeystore } = await messanger.sendActionMessageFromPopup(UNLOCK, password)

		set(draft => {
			draft.hasKeystore = hasKeystore
			draft.masterSeed = HDMasterSeed.fromSeed(Buffer.from(seed, 'hex'))
		})
		const { selectAccountAction, selectedAccountIndex } = get()
		return selectAccountAction(selectedAccountIndex)
	},

	resetWalletAction: async () => {
		const { messanger } = get()
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}
		await messanger.sendActionMessageFromPopup(RESET, null)
		set(state => {
			Object.keys(defaultState).forEach(key => {
				state[key] = defaultState[key]
			})
			state.messanger = messanger
		})
	},

	lockAction: async () => {
		const { messanger } = get()
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}
		await messanger.sendActionMessageFromPopup(LOCK, null)
		set(state => {
			state.account = null
			state.masterSeed = null
		})
	},

	setMasterSeedAction: async (seed: MasterSeed) => {
		set(draft => {
			draft.masterSeed = seed
		})
		const { selectAccountAction, selectedAccountIndex } = get()
		return selectAccountAction(selectedAccountIndex)
	},

	setHasKeystoreAction: (hasKeystore: boolean) => {
		set(state => {
			state.hasKeystore = hasKeystore
		})
	},

	setMessangerAction: (messanger: MessageService) => {
		set(state => {
			state.messanger = messanger
		})
	},

	setHardwareWalletAction: (hardwareWallet: HardwareWalletT): void =>
		set(state => {
			state.hardwareWallet = hardwareWallet
		}),

	sendAPDUAction: async (cla: number, ins: number, p1: number, p2: number, data?: Buffer, statusList?: number[]) => {
		const devices = await TransportNodeHid.list()
		if (devices.length === 0) {
			throw new Error('No device selected')
		}

		const device = devices[0]
		if (device.opened) {
			await device.close()
		}

		const transport = await TransportNodeHid.open(device)
		try {
			const result = await transport.send(cla, ins, p1, p2, data, statusList)
			await transport.close()
			return result
		} catch (e) {
			await transport.close()
			throw e
		}
	},

	getCurrentAddressAction: () => {
		const state = get()
		const publicIndexes = Object.keys(state.publicAddresses)

		if (state.selectedAccountIndex < publicIndexes.length) {
			return state.publicAddresses[state.selectedAccountIndex]
		}

		return state.hwPublicAddresses[state.selectedAccountIndex - publicIndexes.length]
	},

	setHWPublicAddressesAction: (addresses: { [key: number]: string }) => {
		set(state => {
			state.hwPublicAddresses = addresses
			Object.values(addresses).forEach(address => {
				if (!state.addressBook[address]) {
					state.addressBook[address] = { isOwn: true, background: defaultEntryBackground }
				}
			})
		})
	},

	setPublicAddressesAction: (addresses: { [key: number]: string }) => {
		set(state => {
			state.publicAddresses = addresses
			Object.values(addresses).forEach(address => {
				if (!state.addressBook[address]) {
					state.addressBook[address] = { isOwn: true, background: defaultEntryBackground }
				}
			})
		})
	},

	removeAccountAddressAction: (index: number) => {
		set(state => {
			const publicIndexes = Object.keys(state.publicAddresses)
			if (index < publicIndexes.length) {
				const address = state.publicAddresses[publicIndexes[index]]
				if (address) {
					delete state.addressBook[address]
					state.addressBook = { ...state.addressBook }
				}

				delete state.publicAddresses[publicIndexes[index]]
				state.publicAddresses = { ...state.publicAddresses }
			} else {
				const hwIndexes = Object.keys(state.hwPublicAddresses)
				const address = state.hwPublicAddresses[hwIndexes[index - publicIndexes.length]]
				if (address) {
					delete state.addressBook[address]
					state.addressBook = { ...state.addressBook }
				}

				delete state.hwPublicAddresses[hwIndexes[index - publicIndexes.length]]
				state.hwPublicAddresses = { ...state.hwPublicAddresses }
			}
			if (state.selectedAccountIndex >= index) {
				state.selectedAccountIndex -= 1
			}
		})
	},

	setAddressBookEntryAction: (address: string, settings: AddressBookEntry) => {
		set(state => {
			state.addressBook = { ...state.addressBook, [address]: { ...state.addressBook[address], ...settings } }
		})
	},

	removeAddressBookEntryAction: (address: string) => {
		set(state => {
			delete state.addressBook[address]
			state.addressBook = { ...state.addressBook }
		})
	},

	selectNetworkAction: async (newIndex: number) => {
		set(draft => {
			draft.selectedNetworkIndex = newIndex
		})

		let state = get()
		const network = state.networks[state.selectedNetworkIndex]

		const publicIndexes = Object.keys(state.publicAddresses)
		for (let i = 0; i < publicIndexes.length; i += 1) {
			// eslint-disable-next-line no-await-in-loop
			const signingKey = await getSigningKeyForIndex(state, +publicIndexes[i])
			if (signingKey) {
				const address = AccountAddress.fromPublicKeyAndNetwork({
					publicKey: signingKey.publicKey,
					network: network.id,
				})

				if (state.selectedAccountIndex === i) {
					set(draft => {
						draft.publicAddresses[publicIndexes[i]] = address.toString()
						draft.account = Account.create({ address, signingKey })
					})
				} else {
					set(draft => {
						draft.publicAddresses[publicIndexes[i]] = address.toString()
					})
				}
			} else if (state.selectedAccountIndex === i) {
				set(draft => {
					draft.account = null
				})
			}
		}

		const hwIndexes = Object.keys(state.hwPublicAddresses)
		if (hwIndexes.length > 0 && !state.hardwareWallet) {
			try {
				const hw = await HardwareWalletLedger.create({ send: state.sendAPDUAction }).toPromise()
				set(draft => {
					draft.hardwareWallet = hw
				})
				state = get()
			} catch (error) {
				console.error(error)
				return
			}
		}
		for (let i = 0; i < hwIndexes.length; i += 1) {
			// eslint-disable-next-line no-await-in-loop
			const signingKey = await getHWSigningKeyForIndex(state, +hwIndexes[i])
			if (signingKey) {
				const address = AccountAddress.fromPublicKeyAndNetwork({
					publicKey: signingKey.publicKey,
					network: network.id,
				})

				if (state.selectedAccountIndex === i + publicIndexes.length) {
					set(draft => {
						draft.hwPublicAddresses[hwIndexes[i]] = address.toString()
						draft.account = Account.create({ address, signingKey })
					})
				} else {
					set(draft => {
						draft.hwPublicAddresses[hwIndexes[i]] = address.toString()
					})
				}
			} else if (state.selectedAccountIndex === i + publicIndexes.length) {
				set(draft => {
					draft.account = null
				})
			}
		}
	},

	selectAccountAction: async (newIndex: number) => {
		set(draft => {
			draft.selectedAccountIndex = newIndex
			draft.activeSlideIndex = newIndex
		})

		let state = get()
		const network = state.networks[state.selectedNetworkIndex]

		const publicIndexes = Object.keys(state.publicAddresses)
		if (newIndex < publicIndexes.length) {
			const signingKey = await getSigningKeyForIndex(state, +publicIndexes[newIndex])
			if (signingKey) {
				const address = AccountAddress.fromPublicKeyAndNetwork({
					publicKey: signingKey.publicKey,
					network: network.id,
				})

				set(draft => {
					draft.publicAddresses[publicIndexes[newIndex]] = address.toString()
					draft.account = Account.create({ address, signingKey })
				})
			}
		} else {
			const hwIndexes = Object.keys(state.hwPublicAddresses)
			if (hwIndexes.length > 0 && !state.hardwareWallet) {
				try {
					const hw = await HardwareWalletLedger.create({ send: state.sendAPDUAction }).toPromise()
					set(draft => {
						draft.hardwareWallet = hw
					})
					state = get()
				} catch (error) {
					console.error(error)
					return
				}
			}
			const signingKey = await getHWSigningKeyForIndex(state, +hwIndexes[newIndex - publicIndexes.length])
			if (signingKey) {
				const address = AccountAddress.fromPublicKeyAndNetwork({
					publicKey: signingKey.publicKey,
					network: network.id,
				})

				set(draft => {
					draft.hwPublicAddresses[hwIndexes[newIndex - publicIndexes.length]] = address.toString()
					draft.account = Account.create({ address, signingKey })
				})
			}
		}
	},

	selectAccountForAddressAction: async (address: string) => {
		let selectedAccount = null
		const { selectAccountAction, publicAddresses, hwPublicAddresses } = get()

		const publicIndexes = Object.keys(publicAddresses)
		for (let i = 0; i < publicIndexes.length; i += 1) {
			if (publicAddresses[publicIndexes[i]] === address) {
				selectedAccount = i
				break
			}
		}
		if (!selectedAccount) {
			const hwIndexes = Object.keys(hwPublicAddresses)
			for (let i = 0; i < hwIndexes.length; i += 1) {
				if (hwPublicAddresses[hwIndexes[i]] === address) {
					selectedAccount = i + publicIndexes.length
					break
				}
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

	setWalletUnclokTimeoutInMinutesAction: (timeoutInMinutes: number) => {
		set(state => {
			state.walletUnlockTimeoutInMinutes = timeoutInMinutes
		})
	},

	setAccountPanelExpandedAction: (expanded: boolean) => {
		set(state => {
			state.accountPanelExpanded = expanded
		})
	},

	setActiveAppAction: (activeApp: Array<string | number>) => {
		set(state => {
			state.activeApp = activeApp
		})
	},

	setActiveSlideIndexAction: async (newIndex: number) => {
		const { publicAddresses, hwPublicAddresses } = get()
		const publicIndexes = Object.keys(publicAddresses)
		const hwIndexes = Object.keys(hwPublicAddresses)

		const maxIndex = publicIndexes.length + hwIndexes.length

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
