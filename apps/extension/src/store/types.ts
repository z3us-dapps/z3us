export interface Toast {
	id?: string
	children?: React.ReactNode
	type: string
	title?: string
	subTitle?: string
	duration?: number
	isAutoRemovable?: boolean
}

export type AddressBookEntry = {
	name: string
	address: string
	dateAdded: number
	dateUpdated: number
	background?: string
	colorSettings?: { [key: string]: string }
}

export type ToastsState = {
	toasts: Array<Toast>
	addToastAction: (toast?: Toast) => void
	removeToastAction: (id: string) => void
}

export type ThemeState = {
	theme: string
	setThemeAction: (theme: string) => void
}

export type SettingsState = {
	currency: string
	setCurrencyAction: (currency: string) => void

	walletUnlockTimeoutInMinutes: number
	setWalletUnclokTimeoutInMinutesAction: (timeoutInMinutes: number) => void

	transactionNotificationsEnabled: boolean
	setTransactionNotificationsEnabledAction: (enabled: boolean) => void

	addressBook: { [key: string]: AddressBookEntry }
	removeAddressBookEntryAction: (address: string) => void
	setAddressBookEntryAction: (address: string, entry: AddressBookEntry) => void
}

export type SharedState = ThemeState & ToastsState

export type NoneSharedState = SettingsState

export type AppState = SharedState & NoneSharedState
