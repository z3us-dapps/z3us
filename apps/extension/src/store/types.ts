import { ColorSettings } from '@src/types'

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

export type SharedState = ThemeState & ToastsState

export type NoneSharedState = SettingsState

export type AppState = SharedState & NoneSharedState
