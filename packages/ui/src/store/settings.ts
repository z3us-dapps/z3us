import { config } from '../constants/config'
import { type AddressBookEntry, type ISettingsStateSetter, type SettingsState } from './types'

const defaultState = {
	gatewayBaseUrl: config.defaultGatewayBaseUrl,
	currency: config.defaultCurrency,
	walletUnlockTimeoutInMinutes: 5,
	transactionNotificationsEnabled: true,
	addressBook: {},
}

export const factory = (set: ISettingsStateSetter): SettingsState => ({
	...defaultState,

	setGatewayUrl: (gatewayBaseUrl: string) => {
		set(state => {
			state.gatewayBaseUrl = gatewayBaseUrl
		})
	},

	setCurrencyAction: (currency: string) => {
		set(state => {
			state.currency = currency
		})
	},

	setWalletUnclokTimeoutInMinutesAction: (timeoutInMinutes: number) => {
		set(state => {
			state.walletUnlockTimeoutInMinutes = timeoutInMinutes
		})
	},

	setTransactionNotificationsEnabledAction: (enabled: boolean) => {
		set(state => {
			state.transactionNotificationsEnabled = enabled
		})
	},

	setAddressBookEntryAction: (networkId: number, address: string, settings: AddressBookEntry) => {
		set(state => {
			const addressBook = state.addressBook[networkId] || {}
			state.addressBook[networkId] = {
				...addressBook,
				[address]: { ...addressBook, ...{ address }, ...settings },
			}
		})
	},

	removeAddressBookEntryAction: (networkId: number, address: string) => {
		set(state => {
			const addressBook = state.addressBook[networkId] || {}
			delete addressBook[address]

			state.addressBook = { ...state.addressBook, [networkId]: addressBook }
		})
	},
})