import { Network as NetworkID, MnemomicT, AccountT } from '@radixdlt/application'
import { HDMasterSeedT } from '@radixdlt/crypto'
import { HardwareWalletT } from '@radixdlt/hardware-wallet'
import { MessageService } from '@src/services/messanger'
import { ColorSettings, VisibleTokens } from '@src/types'

export interface Toast {
	id?: string
	children?: React.ReactNode
	type: string
	title?: string
	subTitle?: string
	duration?: number
	isAutoRemovable?: boolean
}

export type Network = {
	id: NetworkID
	url: URL
}

export type AddressBookEntry = {
	name?: string
	address?: string
	background?: string
	colorSettings?: { [key in ColorSettings]: string }
}

export type PendingAction = { payloadHex: string; createdAt: Date }

export enum KeystoreType {
	LOCAL = 'local',
	HARDWARE = 'hardware',
}

export type Keystore = {
	id: string
	name: string
	type: KeystoreType
}

export type ToastsStore = {
	toasts: Array<Toast>
	addToastAction: (toast?: Toast) => void
	removeToastAction: (id: string) => void
	addConfirmWithHWToastAction: () => void
}

export type ThemeStore = {
	theme: string
	setThemeAction: (theme: string) => void
}

export type OnBoardingStore = {
	onBoardingStep: string
	isRestoreWorkflow: boolean
	mnemonic: MnemomicT | null
	password: string | null

	connectHardwareWalletStep: string

	setOnboardingStepAction: (step: string) => void
	setMnemomicAction: (mnemonic: MnemomicT) => void
	setPasswordAction: (password: string) => void
	setIsRestoreWorkflowAction: (restore: boolean) => void

	setConnectHardwareWalletStepAction: (step: string) => void
}

export type SettingsStore = {
	walletUnlockTimeoutInMinutes: number
	setWalletUnclokTimeoutInMinutesAction: (timeoutInMinutes: number) => void

	addressBook: { [key: string]: AddressBookEntry }
	removeAddressBookEntryAction: (address: string) => void
	setAddressBookEntryAction: (address: string, entry: AddressBookEntry) => void

	activeApp: Array<string | number>
	setActiveAppAction: (activeApp: Array<string | number>) => void

	accountPanelExpanded: boolean
	setAccountPanelExpandedAction: (expanded: boolean) => void

	currency: string
	setCurrencyAction: (currency: string) => void
}

export type BackgroundStore = {
	messanger: MessageService | null

	setMessangerAction: (messanger: MessageService) => void
	sendResponseAction: (
		action: string,
		data: { id: string; host: string; payload: { request: any; value: any } },
	) => Promise<void>
	hasKeystoreAction: () => Promise<boolean>
	createWalletAction: (words: string[], password: string) => Promise<HDMasterSeedT>
	unlockWalletAction: (password: string) => Promise<HDMasterSeedT>
	removeWalletAction: () => Promise<void>
	lockAction: () => Promise<void>

	// WebAuthn actions
	hasAuthAction: () => Promise<boolean>
	authenticateAction: () => Promise<string>
	removeCredentialAction: () => Promise<void>
	registerCredentialAction: (
		userID: string,
		userName: string,
		userDisplayName: string,
		password: string,
	) => Promise<string>
}

export type KeystoresStore = {
	selectKeystoreId: string
	selectKeystoreAction: (id: string) => void

	keystores: Keystore[]
	addKeystoreAction: (id: string, name: string, type: KeystoreType) => void
	removeKeystoreAction: (id: string) => void
	changeKeystoreNameAction: (id: string, name: string) => void
}

export type LocalWalletStore = {
	masterSeed: HDMasterSeedT | null

	setMasterSeedAction: (seed: HDMasterSeedT) => void
}

export type HardwareWalletStore = {
	isHardwareWallet: boolean
	unlockHardwareWalletAction: () => void

	hardwareWallet: HardwareWalletT | null
	setHardwareWalletAction: (hw: HardwareWalletT) => void
}

export type WalletStore = {
	account: AccountT | null
	resetAction: () => void
	getCurrentAddressAction: () => string

	publicAddresses: { [key: number]: AddressBookEntry }
	setPublicAddressesAction: (addresses: { [key: number]: string }) => void
	setPublicAddressAction: (address: string, entry: AddressBookEntry) => void
	removePublicAddressesAction: (index: number) => void

	networks: Network[]
	selectedNetworkIndex: number
	selectNetworkAction: (
		newIndex: number,
		hardwareWallet: HardwareWalletT | null,
		masterSeed: HDMasterSeedT | null,
	) => Promise<void>
	addNetworkAction: (id: NetworkID, url: URL) => void

	selectedAccountIndex: number
	selectAccountAction: (
		newIndex: number,
		hardwareWallet: HardwareWalletT | null,
		masterSeed: HDMasterSeedT | null,
	) => Promise<void>
	selectAccountForAddressAction: (
		address: string,
		hardwareWallet: HardwareWalletT | null,
		masterSeed: HDMasterSeedT | null,
	) => Promise<void>

	visibleTokens: VisibleTokens
	hiddenTokens: VisibleTokens
	tokenSearch: string
	setVisibleTokensAction: (visibleTokens: VisibleTokens) => void
	setHiddenTokensAction: (hiddenTokens: VisibleTokens) => void
	setTokenSearchAction: (search: string) => void

	activeSlideIndex: number
	setActiveSlideIndexAction: (
		newIndex: number,
		hardwareWallet: HardwareWalletT | null,
		masterSeed: HDMasterSeedT | null,
	) => Promise<void>

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

export type SharedStore = ThemeStore &
	ToastsStore &
	OnBoardingStore &
	SettingsStore &
	BackgroundStore &
	KeystoresStore &
	LocalWalletStore &
	HardwareWalletStore

export type AccountStore = WalletStore

export type AppStore = SharedStore & AccountStore
