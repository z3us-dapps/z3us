import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { AddressBookIcon, CoinsIcon, Settings2Icon, SettingsIcon } from 'ui/src/components/icons'
import { useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'

const messages = defineMessages({
	wallet_title: {
		id: 'settings.navigation.wallet.title',
		defaultMessage: 'Wallet',
	},
	wallet_subtitle: {
		id: 'settings.navigation.wallet.subtitle',
		defaultMessage: 'Manage your wallet',
	},
	general_title: {
		id: 'settings.navigation.general.title',
		defaultMessage: 'General',
	},
	general_subtitle: {
		id: 'settings.navigation.general.subtitle',
		defaultMessage:
			'Fine-tune your Z3US preferences. Manage session time and choose your ideal color theme for a personalized and secure Z3US experience.',
	},
	personas_title: {
		id: 'settings.navigation.personas.title',
		defaultMessage: 'Personas',
	},
	personas_subtitle: {
		id: 'settings.navigation.personas.subtitle',
		defaultMessage: `Manage your Radix network identities`,
	},
	accounts_title: {
		id: 'settings.navigation.accounts.title',
		defaultMessage: 'Accounts',
	},
	accounts_subtitle: {
		id: 'settings.navigation.accounts.subtitle',
		defaultMessage: `Customize your Radix account's look and feel. Personalize your experience by choosing a unique background image and color scheme that suits your style.`,
	},
	address_book_title: {
		id: 'settings.navigation.address_book.title',
		defaultMessage: 'Address book',
	},
	address_book_subtitle: {
		id: 'settings.navigation.address_book.subtitle',
		defaultMessage:
			'Effortless organization for your address book accounts. Manage your Radix address book with ease, editing account names and addresses in a convenient table view for seamless transactions and better financial control.',
	},
	authorized_dapps_title: {
		id: 'settings.navigation.authorized_dapps.title',
		defaultMessage: 'Authorized dApps',
	},
	authorized_dapps_subtitle: {
		id: 'settings.navigation.authorized_dapps.subtitle',
		defaultMessage: 'This are the dApps that you have logged into.',
	},
	key_management_title: {
		id: 'settings.navigation.key_management.title',
		defaultMessage: 'Key management',
	},
	key_management_subtitle: {
		id: 'settings.navigation.key_management.subtitle',
		defaultMessage: 'Export your Private Key or Seed Phrase',
	},
})

export const useMenuItems = () => {
	const intl = useIntl()
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	return useMemo(() => {
		const items = [
			{
				title: intl.formatMessage(messages.wallet_title),
				subTitle: intl.formatMessage(messages.wallet_subtitle),
				href: '/settings/wallet',
				icon: <SettingsIcon />,
			},
			{
				title: intl.formatMessage(messages.general_title),
				subTitle: intl.formatMessage(messages.general_subtitle),
				href: '/settings/general',
				icon: <Settings2Icon />,
			},
			{
				title: intl.formatMessage(messages.accounts_title),
				subTitle: intl.formatMessage(messages.accounts_subtitle),
				href: '/settings/accounts',
				icon: <CoinsIcon />,
			},
			{
				title: intl.formatMessage(messages.address_book_title),
				subTitle: intl.formatMessage(messages.address_book_subtitle),
				href: '/settings/address-book',
				icon: <AddressBookIcon />,
			},
		]
		const personasItem = {
			title: intl.formatMessage(messages.personas_title),
			subTitle: intl.formatMessage(messages.personas_subtitle),
			href: '/settings/personas',
			icon: <CoinsIcon />,
		}
		const authorizedDappsItem = {
			title: intl.formatMessage(messages.authorized_dapps_title),
			subTitle: intl.formatMessage(messages.authorized_dapps_subtitle),
			href: '/settings/authorized-dapps',
			icon: <AddressBookIcon />,
		}
		const keyManagementItem = {
			title: intl.formatMessage(messages.key_management_title),
			subTitle: intl.formatMessage(messages.key_management_subtitle),
			href: '/keystore/export',
			icon: <AddressBookIcon />,
		}
		switch (keystore?.type) {
			case KeystoreType.LOCAL:
				items.push(personasItem)
				items.push(authorizedDappsItem)
				items.push(keyManagementItem)
				break
			case KeystoreType.HARDWARE:
				items.push(personasItem)
				items.push(authorizedDappsItem)
				break
			default:
				break
		}
		return items
	}, [keystore])
}
