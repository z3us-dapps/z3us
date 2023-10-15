import React, { useEffect } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { PlusIcon } from 'ui/src/components/icons'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import type { AddressBookEntry } from 'ui/src/store/types'

import { SettingsTitle } from '../components/settings-title'
import { SettingsWrapper } from '../components/settings-wrapper'
import { AddressBookTable } from './components/address-book-table'
import DeleteAddressBookEntryModal from './components/delete-entry-modal'
import UpsertAddressBookEntryModal from './components/upsert-entry-modal'

const messages = defineMessages({
	title: {
		defaultMessage: 'Address book',
	},
	subtitle: {
		defaultMessage: `Effortless organization for your address book accounts. Manage your Radix address book with ease, editing account names and addresses in a convenient table view for seamless transactions and better financial control`,
	},
	new_address: {
		defaultMessage: 'New address',
	},
})

export interface IState {
	entries: AddressBookEntry[]
	deleting: string | undefined
	editing: string | undefined
}

const AddressBook: React.FC = () => {
	const intl = useIntl()
	const networkId = useNetworkId()
	const accounts = useWalletAccounts()
	const { addressBook } = useNoneSharedStore(state => ({
		addressBook: state.addressBook[networkId] || {},
	}))

	const [state, setState] = useImmer<IState>({
		entries: [],
		deleting: undefined,
		editing: undefined,
	})

	useEffect(() => {
		setState(draft => {
			draft.entries = Object.values(addressBook).filter(e => !accounts[e.address])
		})
	}, [addressBook])

	const handleDeleteAddress = (address: string) => {
		setState(draft => {
			draft.deleting = address
		})
	}

	const handleAddEditAddress = (address: string = '') => {
		setState(draft => {
			draft.editing = address
		})
	}

	const handleCloseEditAddressDialog = () => {
		setState(draft => {
			draft.editing = undefined
		})
	}

	const handleCloseDeleteAddress = () => {
		setState(draft => {
			draft.deleting = undefined
		})
	}

	return (
		<>
			<SettingsWrapper>
				<SettingsTitle
					title={intl.formatMessage(messages.title)}
					subTitle={intl.formatMessage(messages.subtitle)}
				/>
				<Box display="flex" flexDirection="column" gap="small">
					<Box paddingBottom="medium">
						<Button styleVariant="primary" leftIcon={<PlusIcon />} onClick={() => handleAddEditAddress()}>
							{intl.formatMessage(messages.new_address)}
						</Button>
					</Box>
					<AddressBookTable data={state.entries} onEdit={handleAddEditAddress} onDelete={handleDeleteAddress} />
				</Box>
			</SettingsWrapper>

			<DeleteAddressBookEntryModal address={state.deleting} onClose={handleCloseDeleteAddress} />
			<UpsertAddressBookEntryModal address={state.editing} onClose={handleCloseEditAddressDialog} />
		</>
	)
}

export default AddressBook
