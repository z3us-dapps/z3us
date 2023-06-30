import { useNetworkId } from 'packages/ui/src/hooks/dapp/use-network-id'
import React, { useMemo } from 'react'
import { toast } from 'sonner'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Dialog } from 'ui/src/components/dialog'
import { DialogAlert } from 'ui/src/components/dialog-alert'
import { CheckCircleIcon, PlusIcon } from 'ui/src/components/icons'
import { type FormElement, Input } from 'ui/src/components/input'
import { Table } from 'ui/src/components/table'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import type { AddressBookEntry } from 'ui/src/store/types'

import * as styles from '../account-settings.css'
import { SettingsTitle } from '../components/settings-title'
import { AddressEditButtonsCell } from './address-edit-buttons-cell'
import { AddressNameCell } from './address-name-cell'
import { type IImmerSettingsGeneralProps, getError, validateAddressBookForm } from './settings-address-book-utils'

interface ISettingsGeneralProps {
	scrollableNode: HTMLElement
}

const emptyEntry: AddressBookEntry = {
	name: '',
	address: '',
	dateAdded: 0,
	dateUpdated: 0,
}

export const SettingsAddressBook: React.FC<ISettingsGeneralProps> = props => {
	const networkId = useNetworkId()
	const { addressBook, setAddressBookEntry, handleRemoveAddress } = useNoneSharedStore(state => ({
		addressBook: state.addressBook[networkId] || {},
		setAddressBookEntry: state.setAddressBookEntryAction,
		handleRemoveAddress: state.removeAddressBookEntryAction,
	}))

	const { scrollableNode } = props

	const [state, setState] = useImmer<IImmerSettingsGeneralProps>({
		deleteAccountAddress: undefined,
		editAccountAddress: undefined,
		isEditDialogVisible: false,
		editingAddress: emptyEntry,
		initValidation: false,
		validation: undefined,
	})

	useDeepCompareEffect(() => {
		if (state.initValidation) {
			setState(draft => {
				draft.validation = validateAddressBookForm(state.editingAddress)
			})
		}
	}, [state.editingAddress])

	const handleDeleteAddress = (address: string) => {
		setState(draft => {
			draft.deleteAccountAddress = address
		})
	}

	const handleAddEditAddress = (address?: string | undefined) => {
		const editingAddress = addressBook[address]

		setState(draft => {
			draft.editAccountAddress = address
			draft.isEditDialogVisible = true
			draft.editingAddress = {
				dateAdded: Date.now(),
				...editingAddress,
				name: editingAddress.name,
				address: editingAddress.address,
			}
			if (editingAddress) {
				draft.editingAddress.dateUpdated = Date.now()
			}
		})
	}

	const handleCloseEditAddressDialog = () => {
		setState(draft => {
			draft.editingAddress = emptyEntry
			draft.isEditDialogVisible = false
			draft.validation = undefined
			draft.initValidation = false
		})
	}

	const handleCancelDeleteAddress = () => {
		setState(draft => {
			draft.deleteAccountAddress = undefined
		})
	}

	const handleConfirmDeleteAddress = () => {
		handleRemoveAddress(networkId, state.deleteAccountAddress)

		setState(draft => {
			draft.deleteAccountAddress = undefined
		})

		toast('Address has been moved to archive', {
			// duration: Infinity,
		})
	}

	const handleChangeName = (e: React.ChangeEvent<FormElement>) => {
		const name = e.currentTarget.value

		setState(draft => {
			draft.editingAddress.name = name
		})
	}

	const handleChangeAddress = (e: React.ChangeEvent<FormElement>) => {
		const address = e.currentTarget.value

		setState(draft => {
			draft.editingAddress.address = address
		})
	}

	const handleSaveAddress = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const validation = validateAddressBookForm(state.editingAddress)

		setState(draft => {
			draft.initValidation = true
			draft.validation = validation
		})

		if (!validation.success) {
			return
		}

		setAddressBookEntry(networkId, state.editingAddress.address, state.editingAddress)

		const toastMessage = state.editAccountAddress ? 'updated' : 'saved'

		setState(draft => {
			draft.editAccountAddress = undefined
			draft.isEditDialogVisible = false
			draft.editingAddress = emptyEntry
			draft.editAccountAddress = undefined
			draft.validation = undefined
			draft.initValidation = false
		})

		toast(toastMessage, {
			// duration: Infinity,
		})
	}

	const columns = useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'name',
				width: '70%',
				Cell: AddressNameCell,
			},
			{
				Header: '',
				accessor: 'id',
				width: 'auto',
				// eslint-disable-next-line react/no-unstable-nested-components
				Cell: ({ row }) => (
					<AddressEditButtonsCell
						id={row.original.id}
						onDelete={() => handleDeleteAddress(row.original.id)}
						onEdit={() => handleAddEditAddress(row.original.id)}
					/>
				),
			},
		],
		[Object.keys(addressBook).length],
	)

	return (
		<>
			<Box className={styles.settingsSectionFlexColumnWrapper}>
				<SettingsTitle
					title={<Translation capitalizeFirstLetter text="settings.navigation.accountsAddressBookTitle" />}
					subTitle={<Translation capitalizeFirstLetter text="settings.navigation.accountsAddressBookSubTitle" />}
				/>
				<Box display="flex" flexDirection="column" gap="small">
					<Box paddingBottom="medium">
						<Button styleVariant="primary" leftIcon={<PlusIcon />} onClick={() => handleAddEditAddress()}>
							New address
						</Button>
					</Box>
					<Table scrollableNode={scrollableNode} data={Object.values(addressBook)} columns={columns} />
				</Box>
			</Box>
			<DialogAlert
				open={!!state.deleteAccountAddress}
				title="Are you sure?"
				description={
					<Box component="span">
						<Text truncate>Are you sure you want to delete {state.deleteAccountAddress}</Text>?
					</Box>
				}
				confirmButtonText="Delete"
				onCancel={handleCancelDeleteAddress}
				onConfirm={handleConfirmDeleteAddress}
			/>
			<Dialog open={state.isEditDialogVisible} onClose={handleCloseEditAddressDialog}>
				<Box
					component="form"
					padding="large"
					display="flex"
					flexDirection="column"
					gap="large"
					onSubmit={handleSaveAddress}
				>
					<Text size="xlarge" color="strong" weight="strong">
						Add address
					</Text>
					<Box display="flex" flexDirection="column" gap="xsmall">
						<Text size="xsmall">Name</Text>
						<Box>
							<Input
								placeholder="Name"
								value={state.editingAddress.name}
								onChange={handleChangeName}
								styleVariant={getError(state.validation, ['name']).error ? 'primary-error' : 'primary'}
							/>
							<ValidationErrorMessage error={getError(state.validation, ['name'])} />
						</Box>
					</Box>
					<Box display="flex" flexDirection="column" gap="xsmall">
						<Text size="xsmall">Address</Text>
						<Box>
							<Input
								placeholder="Address"
								value={state.editingAddress.address}
								styleVariant={getError(state.validation, ['address']).error ? 'primary-error' : 'primary'}
								onChange={handleChangeAddress}
								rightIcon={
									state.initValidation &&
									!getError(state.validation, ['address']).error && (
										<Box color="green500" display="flex">
											<CheckCircleIcon />
										</Box>
									)
								}
							/>
							<ValidationErrorMessage error={getError(state.validation, ['address'])} />
						</Box>
					</Box>
					<Box display="flex" gap="small" justifyContent="flex-end">
						<Button sizeVariant="small" styleVariant="secondary" onClick={handleCloseEditAddressDialog}>
							cancel
						</Button>
						<Button sizeVariant="small" type="submit">
							save
						</Button>
					</Box>
				</Box>
			</Dialog>
		</>
	)
}
