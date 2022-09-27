import { Network as NetworkID, MnemomicT } from '@radixdlt/application'
import { MessageService } from '@src/services/messanger'
import { ColorSettings, Keystore, KeystoreType, SigningKey, VisibleTokens } from '@src/types'

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

export type ToastsState = {
	toasts: Array<Toast>
	addToastAction: (toast?: Toast) => void
	removeToastAction: (id: string) => void
	addConfirmWithHWToastAction: () => void
}

export type ThemeState = {
	theme: string
	setThemeAction: (theme: string) => void
}

export type OnBoardingState = {
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

export type SettingsState = {
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

	transactionNotificationsEnabled: boolean
	setTransactionNotificationsEnabledAction: (enabled: boolean) => void
}

export type BackgroundState = {
	messanger: MessageService | null

	setMessangerAction: (messanger: MessageService) => void
	sendResponseAction: (
		action: string,
		data: { id: string; host: string; payload: { request: any; value: any } },
	) => Promise<void>
	hasKeystoreAction: () => Promise<boolean>
	createWalletAction: (
		type: 'mnemonic' | 'key',
		secret: string,
		password: string,
		index: number,
	) => Promise<{ publicKey?: string }>
	unlockWalletAction: (password: string, index: number) => Promise<{ publicKey?: string }>
	lockAction: () => Promise<void>
	removeWalletAction: () => Promise<void>

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

export type KeystoresState = {
	selectKeystoreId: string
	selectKeystoreAction: (id: string) => void

	keystores: Keystore[]
	addKeystoreAction: (id: string, name: string, type: KeystoreType) => void
	removeKeystoreAction: (id: string) => void
	changeKeystoreNameAction: (id: string, name: string) => void
}

export type WalletState = {
	resetAction: () => void

	isUnlocked: boolean
	setIsUnlockedAction: (isUnlocked: boolean) => void

	signingKey: SigningKey | null
	setSigningKeyAction: (signingKey: SigningKey | null) => void
	getCurrentAddressAction: () => string
	getAccountTypeAction: () => KeystoreType

	publicAddresses: { [key: number]: AddressBookEntry }
	setPublicAddressesAction: (addresses: { [key: number]: string }) => void
	setPublicAddressAction: (address: string, entry: AddressBookEntry) => void
	removePublicAddressesAction: (index: number) => void

	networks: Network[]
	selectedNetworkIndex: number
	selectNetworkAction: (newIndex: number) => Promise<void>
	addNetworkAction: (id: NetworkID, url: URL) => void

	selectedAccountIndex: number
	selectAccountAction: (newIndex: number) => Promise<void>
	selectAccountForAddressAction: (address: string) => Promise<void>

	visibleTokens: VisibleTokens
	hiddenTokens: VisibleTokens
	tokenSearch: string
	setVisibleTokensAction: (visibleTokens: VisibleTokens) => void
	setHiddenTokensAction: (hiddenTokens: VisibleTokens) => void
	setTokenSearchAction: (search: string) => void

	activeSlideIndex: number
	setActiveSlideIndexAction: (newIndex: number) => Promise<void>

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

export type SharedState = ThemeState & ToastsState & OnBoardingState & SettingsState & BackgroundState & KeystoresState

export type AccountState = WalletState

export type AppState = SharedState & AccountState
