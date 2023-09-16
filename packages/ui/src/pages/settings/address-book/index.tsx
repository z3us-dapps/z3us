import React, { useEffect, useMemo, useState } from 'react'
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
import { AddressTableCell } from './components/address-table-cell'
import DeleteAddressBookEntryModal from './components/delete-entry-modal'
import UpsertAddressBookEntryModal from './components/upsert-entry-modal'

const messages = defineMessages({
	title: {
		id: 'settings.address_book.title',
		defaultMessage: 'Address book',
	},
	subtitle: {
		id: 'settings.address_book.subtitle',
		defaultMessage: `Effortless organization for your address book accounts. Manage your Radix address book with ease, editing account names and addresses in a convenient table view for seamless transactions and better financial control`,
	},
	new_address: {
		id: 'settings.address_book.new_address',
		defaultMessage: 'New address',
	},
})

export interface IState {
	deleteAccountAddress: string | undefined
	editAccountAddress: string | undefined
}

const AddressBook: React.FC = () => {
	const intl = useIntl()
	const networkId = useNetworkId()
	const accounts = useWalletAccounts()
	const { addressBook } = useNoneSharedStore(state => ({
		addressBook: state.addressBook[networkId] || {},
	}))

	const [entries, setEntries] = useState<AddressBookEntry[]>([])

	const [state, setState] = useImmer<IState>({
		deleteAccountAddress: undefined,
		editAccountAddress: undefined,
	})

	useEffect(() => {
		setEntries(Object.values(addressBook).filter(e => !accounts[e.address]))
	}, [addressBook])

	const handleDeleteAddress = (address: string) => {
		setState(draft => {
			draft.deleteAccountAddress = address
		})
	}

	const handleAddEditAddress = (address: string = '') => {
		setState(draft => {
			draft.editAccountAddress = address
		})
	}

	const handleCloseEditAddressDialog = () => {
		setState(draft => {
			draft.editAccountAddress = undefined
		})
	}

	const handleCloseDeleteAddress = () => {
		setState(draft => {
			draft.deleteAccountAddress = undefined
		})
	}

	const columns = useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'name',
				width: 'auto',
				// eslint-disable-next-line react/no-unstable-nested-components
				Cell: ({ row }) => (
					<AddressTableCell
						row={row}
						key={row.original.address}
						onDelete={() => handleDeleteAddress(row.original.address)}
						onEdit={() => handleAddEditAddress(row.original.address)}
					/>
				),
			},
		],
		[entries],
	)

	return (
		<>
			<SettingsWrapper>
				<SettingsTitle
					backLink="/settings"
					title={intl.formatMessage(messages.title)}
					subTitle={intl.formatMessage(messages.subtitle)}
				/>
				<Box display="flex" flexDirection="column" gap="small">
					<Box paddingBottom="medium">
						<Button styleVariant="primary" leftIcon={<PlusIcon />} onClick={() => handleAddEditAddress()}>
							{intl.formatMessage(messages.new_address)}
						</Button>
					</Box>
					<AddressBookTable data={entries} columns={columns} />
				</Box>
			</SettingsWrapper>

			<DeleteAddressBookEntryModal address={state.deleteAccountAddress} onClose={handleCloseDeleteAddress} />
			<UpsertAddressBookEntryModal address={state.editAccountAddress} onClose={handleCloseEditAddressDialog} />
		</>
	)
}

export default AddressBook
