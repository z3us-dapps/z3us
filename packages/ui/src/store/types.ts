import type { languages } from 'ui/src/constants/intl'

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
	ledgerDevice?: object
}

export type KeystoresState = {
	selectedKeystoreId: string
	selectKeystoreAction: (id: string) => void

	keystores: Keystore[]
	addKeystoreAction: (id: string, name: string, type: KeystoreType) => void
	removeKeystoreAction: (id: string) => void
	changeKeystoreNameAction: (id: string, name: string) => void
	changeKeystoreLedgerDeviceAction: (id: string, device: any) => void
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

export enum CURVE {
	CURVE25519 = 'curve25519',
	SECP256K1 = 'secp256k1',
}

export enum SCHEME {
	CAP26 = 'cap26',
	BIP440OLYMPIA = 'bip44Olympia',
}

// `m/44H/1022H/14H/618H/1460H/${index}H`
export type Persona = {
	identityAddress: string

	label: string

	nameVariant?: 'western' | 'eastern'
	nickName?: string
	givenNames?: string
	familyName?: string
	emailAddresses?: string[]
	phoneNumbers?: string[]

	entityIndex: number
	publicKeyHex: string
	curve: CURVE
	scheme: SCHEME
	derivationPath: string
}

export type Personas = { [address: string]: Persona }

export type NetworkPersonas = { [networkId: number]: Personas }

// `m/44H/1022H/14H/525H/1460H/${index}H`
export type Account = {
	address: string
	entityIndex: number
	publicKeyHex: string
	curve: CURVE
	scheme: SCHEME
	derivationPath: string
	olympiaAddress?: string
}

export type Accounts = { [address: string]: Account }

export type NetworkAccounts = { [networkId: number]: Accounts }

export type ApprovedDapps = { [dappAddress: string]: { persona: string; accounts: string[] } }

export type NetworkApprovedDapps = { [networkId: number]: ApprovedDapps }

export type ExtensionState = {
	radixConnectorEnabled: boolean
	toggleRadixConnectorEnabledAction: (enabled: boolean) => void

	personaIndexes: NetworkPersonas
	removePersonaAction: (networkId: number, address: string) => void
	addPersonaAction: (networkId: number, address: string, persona: Persona) => void

	accountIndexes: NetworkAccounts
	removeAccountAction: (networkId: number, address: string) => void
	addAccountAction: (networkId: number, address: string, account: Account) => void

	approvedDapps: NetworkApprovedDapps
	approveDappAction: (networkId: number, dappAddress: string, persona: string, accounts: string[]) => void
	forgetDappAction: (networkId: number, dappAddress: string) => void
}

export interface IExtensionStateSetter {
	(fn: (state: ExtensionState) => void): void
}

export type LOCALE = keyof typeof languages

export type IntlState = {
	locale: LOCALE
	selectLocaleAction: (locale: LOCALE) => void
}

export interface IIntlStateSetter {
	(fn: (state: IntlState) => void): void
}
