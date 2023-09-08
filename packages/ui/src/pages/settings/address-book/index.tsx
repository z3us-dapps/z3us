import React, { useEffect, useMemo, useState } from 'react'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { PlusIcon } from 'ui/src/components/icons'
import Translation from 'ui/src/components/translation'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { useWalletAccounts } from 'ui/src/hooks/use-wallet-account'
import type { AddressBookEntry } from 'ui/src/store/types'

import { SettingsTitle } from '../components/settings-title'
import { SettingsWrapper } from '../components/settings-wrapper'
import { AddressBookTable } from './components/address-book-table'
import { AddressTableCell } from './components/address-table-cell'
import DeleteAddressBookEntryModal from './components/delete-entry-modal'
import UpsertAddressBookEntryModal from './components/upsert-entry-modal'

export interface IState {
	deleteAccountAddress: string | undefined
	editAccountAddress: string | undefined
}

const AddressBook: React.FC = () => {
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
					backLink="/accounts/settings"
					title={<Translation capitalizeFirstLetter text="settings.navigation.title" />}
					subTitle={<Translation capitalizeFirstLetter text="settings.navigation.sub_title" />}
				/>
				<Box display="flex" flexDirection="column" gap="small">
					<Box paddingBottom="medium">
						<Button styleVariant="primary" leftIcon={<PlusIcon />} onClick={() => handleAddEditAddress()}>
							<Translation capitalizeFirstLetter text="settings.address_book.new_address" />
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
