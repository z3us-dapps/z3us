export type AddressBook = { [networkId: number]: { [key: string]: AddressBookEntry } }

export type AddressBookEntry = {
	name: string
	address: string
	dateAdded: number
	dateUpdated: number
	cardImage?: string
	cardColor?: string
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

export type KeystoresState = {
	selectedKeystoreId: string
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

export enum CURRENCY {
	USD = 'USD',
	EUR = 'EUR',
	AUD = 'AUD',

	BTC = 'BTC',
	XRD = 'XRD',
}

export type SettingsState = {
	gatewayBaseUrl: string
	setGatewayUrlAction: (currency: string) => void

	currency: CURRENCY
	setCurrencyAction: (currency: CURRENCY) => void

	walletUnlockTimeoutInMinutes: number
	setWalletUnlockTimeoutInMinutesAction: (timeoutInMinutes: number) => void

	pushNotificationsEnabled: boolean
	setPushNotificationsEnabledAction: (enabled: boolean) => void

	addressBook: AddressBook
	removeAddressBookEntryAction: (networkId: number, address: string) => void
	setAddressBookEntryAction: (networkId: number, address: string, entry: AddressBookEntry) => void
}

export interface ISettingsStateSetter {
	(fn: (state: SettingsState) => void): void
}

export type SharedState = WalletState & KeystoresState

export type NoneSharedState = SettingsState & ExtensionState & IntlState

export type AppState = SharedState & NoneSharedState

export type Persona = {
	label: string
	identityAddress: string
	publicKeyHex: string
}

export type PersonaIndexes = { [networkId: number]: { [idx: number]: Persona } }

export type Account = {
	address: string
	publicKeyHex: string
	olympiaAddress?: string
}

export type AccountIndexes = { [networkId: number]: { [idx: number]: Account } }

export type ExtensionState = {
	radixConnectorEnabled: boolean
	toggleRadixConnectorEnabledAction: (enabled: boolean) => void

	personaIndexes: PersonaIndexes
	removePersonaAction: (networkId: number, idx: number) => void
	addPersonaAction: (networkId: number, idx: number, persona: Persona) => void

	accountIndexes: AccountIndexes
	removeAccountAction: (networkId: number, idx: number) => void
	addAccountAction: (networkId: number, idx: number, address: Account) => void
}

export interface IExtensionStateSetter {
	(fn: (state: ExtensionState) => void): void
}

export enum LOCALE {
	en = 'en',
	pl = 'pl',
}

export type IntlState = {
	locale: LOCALE
	selectLocaleAction: (locale: LOCALE) => void
}

export interface IIntlStateSetter {
	(fn: (state: IntlState) => void): void
}
