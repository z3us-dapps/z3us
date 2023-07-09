export type AddressBookEntry = {
	name: string
	address: string
	dateAdded: number
	dateUpdated: number
	background?: string
	colorSettings?: { [key: string]: string }
}

export enum KeystoreType {
	LOCAL = 'local',
	HARDWARE = 'hardware',
	RADIX_WALLET = 'radix_wallet',
}

export type Keystore = {
	id: string
	name: string
	type: KeystoreType
}

export type ThemeState = {
	theme: string
	setThemeAction: (theme: string) => void
}

export interface IThemeStateSetter {
	(fn: (state: ThemeState) => void): void
}

export type KeystoresState = {
	selectKeystoreId: string
	selectKeystoreAction: (id: string) => void

	keystores: Keystore[]
	addKeystoreAction: (id: string, name: string, type: KeystoreType) => void
	removeKeystoreAction: (id: string) => void
	changeKeystoreNameAction: (id: string, name: string) => void
}

export interface IKeystoresStateSetter {
	(fn: (state: KeystoresState) => void): void
}

export type WalletState = {
	sharedStoreReloadTrigger: number
	reloadSharedStoreAction: () => void
}

export interface IWalletStateSetter {
	(fn: (state: WalletState) => void): void
}

export type SettingsState = {
	gatewayBaseUrl: string
	setGatewayUrl: (currency: string) => void

	currency: string
	setCurrencyAction: (currency: string) => void

	walletUnlockTimeoutInMinutes: number
	setWalletUnlockTimeoutInMinutesAction: (timeoutInMinutes: number) => void

	transactionNotificationsEnabled: boolean
	setTransactionNotificationsEnabledAction: (enabled: boolean) => void

	addressBook: { [networkId: number]: { [key: string]: AddressBookEntry } }
	removeAddressBookEntryAction: (networkId: number, address: string) => void
	setAddressBookEntryAction: (networkId: number, address: string, entry: AddressBookEntry) => void
}

export interface ISettingsStateSetter {
	(fn: (state: SettingsState) => void): void
}

export type RdtState = {
	selectedAccount: string
	selectAccountAction: (address: string) => void
}

export interface IRdtStateSetter {
	(fn: (state: RdtState) => void): void
}

export type OlympiaState = {
	olympiaAddresses?: { [key: number]: { address: string } }
}

export type SharedState = ThemeState & WalletState & KeystoresState

export type NoneSharedState = SettingsState & RdtState & OlympiaState

export type AppState = SharedState & NoneSharedState
