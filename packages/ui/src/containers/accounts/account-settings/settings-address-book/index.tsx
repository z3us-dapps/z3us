import { useNetworkId } from 'packages/ui/src/hooks/dapp/use-network-id'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
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
import { AddressTableCell } from './address-table-cell'
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

const generateRandomString = () => Math.random().toString(36).substring(7)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loadingItems = Array.from({ length: 100 }).map((_, i, a) => {
	const randomStr = generateRandomString()
	return {
		id: `${i}-${randomStr}`,
		name: `${i}-${randomStr}`,
		address: `${i}-${randomStr}`,
		token: `${i}-${randomStr}`,
		portfolio: '65%',
		price: '$1.83',
		balance: '99',
	}
})

export const SettingsAddressBook: React.FC<ISettingsGeneralProps> = props => {
	const { scrollableNode } = props
	const networkId = useNetworkId()
	const { t } = useTranslation()
	const { addressBook, setAddressBookEntry, handleRemoveAddress } = useNoneSharedStore(state => ({
		addressBook: state.addressBook[networkId] || {},
		setAddressBookEntry: state.setAddressBookEntryAction,
		handleRemoveAddress: state.removeAddressBookEntryAction,
	}))

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
				width: 'auto',
				// eslint-disable-next-line react/no-unstable-nested-components
				Cell: ({ row }) => (
					<AddressTableCell
						id={row.original.id}
						name={row.original.name}
						address={row.original.address}
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
					backLink="/accounts/settings"
					title={<Translation capitalizeFirstLetter text="settings.navigation.accountsAddressBookTitle" />}
					subTitle={<Translation capitalizeFirstLetter text="settings.navigation.accountsAddressBookSubTitle" />}
				/>
				<Box display="flex" flexDirection="column" gap="small">
					<Box paddingBottom="medium">
						<Button styleVariant="primary" leftIcon={<PlusIcon />} onClick={() => handleAddEditAddress()}>
							<Translation capitalizeFirstLetter text="settings.addressBook.newAddress" />
						</Button>
					</Box>
					<Table
						styleVariant="secondary"
						sizeVariant="medium"
						scrollableNode={scrollableNode}
						// data={Object.values(addressBook)}
						// TODO: temp data for testing
						data={loadingItems}
						columns={columns}
					/>
				</Box>
			</Box>
			<DialogAlert
				open={!!state.deleteAccountAddress}
				title={<Translation capitalizeFirstLetter text="settings.addressBook.deleteAlertTitle" />}
				description={
					<Box component="span">
						<Text truncate>
							<Translation capitalizeFirstLetter text="settings.addressBook.deleteAlertDescription" />{' '}
							{state.deleteAccountAddress}
						</Text>
						?
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
						<Translation capitalizeFirstLetter text="settings.addressBook.addDialogTitle" />
					</Text>
					<Box display="flex" flexDirection="column" gap="xsmall">
						<Text size="xsmall">
							<Translation capitalizeFirstLetter text="settings.addressBook.addDialogNameTitle" />
						</Text>
						<Box>
							<Input
								placeholder={t('settings.addressBook.addDialogInputNamePlaceholder')}
								value={state.editingAddress.name}
								onChange={handleChangeName}
								styleVariant={getError(state.validation, ['name']).error ? 'primary-error' : 'primary'}
							/>
							<ValidationErrorMessage error={getError(state.validation, ['name'])} />
						</Box>
					</Box>
					<Box display="flex" flexDirection="column" gap="xsmall">
						<Text size="xsmall">
							<Translation capitalizeFirstLetter text="settings.addressBook.addDialogAddressTitle" />
						</Text>
						<Box>
							<Input
								placeholder={t('settings.addressBook.Address')}
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
							<Translation capitalizeFirstLetter text="global.cancel" />
						</Button>
						<Button sizeVariant="small" type="submit">
							<Translation capitalizeFirstLetter text="global.save" />
						</Button>
					</Box>
				</Box>
			</Dialog>
		</>
	)
}
