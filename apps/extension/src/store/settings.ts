import type { AddressBookEntry, SettingsState } from './types'

const defaultState = {
	currency: 'USD',
	walletUnlockTimeoutInMinutes: 5,
	transactionNotificationsEnabled: true,
	addressBook: {},
}

export const factory = (set): SettingsState => ({
	...defaultState,

	setAddressBookEntryAction: (address: string, settings: AddressBookEntry) => {
		set(state => {
			state.addressBook = {
				...state.addressBook,
				[address]: { ...state.addressBook[address], address, ...settings },
			}
		})
	},

	removeAddressBookEntryAction: (address: string) => {
		set(state => {
			delete state.addressBook[address]
			state.addressBook = { ...state.addressBook }
		})
	},

	setWalletUnclokTimeoutInMinutesAction: (timeoutInMinutes: number) => {
		set(state => {
			state.walletUnlockTimeoutInMinutes = timeoutInMinutes
		})
	},

	setCurrencyAction: (currency: string) => {
		set(state => {
			state.currency = currency
		})
	},

	setTransactionNotificationsEnabledAction: (enabled: boolean) => {
		set(state => {
			state.transactionNotificationsEnabled = enabled
		})
	},
})
