import { SetState } from 'zustand'
import { AddressBookEntry, SettingsStore, SharedStore } from './types'

export const whiteList = ['walletUnlockTimeoutInMinutes', 'addressBook', 'accountPanelExpanded', 'currency']

const defaultState = {
	addressBook: {},

	activeApp: ['accounts', 0],
	accountPanelExpanded: false,
	walletUnlockTimeoutInMinutes: 5,
	currency: 'USD',
}

export const factory = (set: SetState<SharedStore>): SettingsStore => ({
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

	setAccountPanelExpandedAction: (expanded: boolean) => {
		set(state => {
			state.accountPanelExpanded = expanded
		})
	},

	setActiveAppAction: (activeApp: Array<string | number>) => {
		set(state => {
			state.activeApp = activeApp
		})
	},

	setCurrencyAction: (currency: string) => {
		set(state => {
			state.currency = currency
		})
	},
})
