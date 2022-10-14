import { Network as NetworkID, MnemomicT, HDNodeT, StrengthT, LanguageT } from '@radixdlt/application'
import { MessageService } from '@src/services/messanger'
import { ColorSettings, Keystore, KeystoreType, SigningKey, SigningKeyType, VisibleTokens } from '@src/types'
import { String } from '@stitches/react/types/util'

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
	onBoardingStep: String
	setOnboardingStepAction: (step: string) => void

	workflowEntryStep: string
	setWorkflowEntryStepAction: (step: string) => void

	connectHardwareWalletStep: string
	setConnectHardwareWalletStepAction: (step: string) => void

	mnemonic: MnemomicT | null
	setMnemomicAction: (mnemonic: MnemomicT) => void

	privateKey: string
	setPrivateKeyAction: (key: string) => void

	password: string | null
	setPasswordAction: (password: string) => void

	importingAddresses: { [key: number]: string }
	setImportingAddressesAction: (addresses: { [key: number]: string }) => void
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
		type: SigningKeyType,
		secret: string,
		password: string,
		index: number,
	) => Promise<{ publicKey?: string; type?: SigningKeyType }>
	unlockWalletAction: (
		password: string,
		index: number,
	) => Promise<{ isUnlocked: boolean; publicKey?: string; type?: SigningKeyType }>
	lockAction: () => Promise<void>
	pingAction: () => Promise<void>
	getWalletAction: (password: string) => Promise<{
		type: SigningKeyType
		hdMasterNode: HDNodeT
		mnemonic?: Readonly<{
			strength: StrengthT
			entropy: string
			words: string[]
			phrase: string
			language: LanguageT
		}>
	}>
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
}

export type AccountState = {
	resetAction: () => void

	publicAddresses: { [key: number]: AddressBookEntry }
	getCurrentAddressAction: () => string
	setPublicAddressesAction: (addresses: { [key: number]: string }) => void
	addPublicAddressAction: (index: number, entry: AddressBookEntry) => void
	updatePublicAddressAction: (address: string, entry: AddressBookEntry) => void
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

	blockedWebsites: {
		[key: string]: any
	}
	blockWebsiteAction: (host: string) => void
	unblockWebsiteAction: (host: string) => void

	pendingActions: {
		[key: string]: PendingAction
	}
	addPendingActionAction: (id: string, request: any) => void
	removePendingActionAction: (id: string) => void
}

export type SharedState = ThemeState & ToastsState & OnBoardingState & BackgroundState & KeystoresState & WalletState

export type NoneSharedState = AccountState & SettingsState

export type AppState = SharedState & NoneSharedState
