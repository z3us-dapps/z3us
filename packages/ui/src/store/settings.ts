import { config } from '../constants/config'
import { type AddressBookEntry, CURRENCY, type ISettingsStateSetter, type SettingsState } from './types'

const defaultState = {
	gatewayBaseUrl: config.defaultGatewayBaseUrl,
	currency: config.defaultCurrency,
	walletUnlockTimeoutInMinutes: 5,
	pushNotificationsEnabled: true,
	addressBook: {},
}

export const factory = (set: ISettingsStateSetter): SettingsState => ({
	...defaultState,

	setGatewayUrl: (gatewayBaseUrl: string) => {
		set(state => {
			state.gatewayBaseUrl = gatewayBaseUrl
		})
	},

	setCurrencyAction: (currency: CURRENCY) => {
		set(state => {
			state.currency = currency
		})
	},

	setWalletUnlockTimeoutInMinutesAction: (timeoutInMinutes: number) => {
		set(state => {
			state.walletUnlockTimeoutInMinutes = timeoutInMinutes
		})
	},

	setPushNotificationsEnabledAction: (enabled: boolean) => {
		set(state => {
			state.pushNotificationsEnabled = enabled
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
