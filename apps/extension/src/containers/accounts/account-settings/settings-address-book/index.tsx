/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ClassValue } from 'clsx'
import clsx from 'clsx'
import React, { useMemo } from 'react'
import { toast } from 'sonner'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components-v2/box'
import { Button } from 'ui/src/components-v2/button'
import { Dialog } from 'ui/src/components-v2/dialog'
import { DialogAlert } from 'ui/src/components-v2/dialog-alert'
import { type FormElement, Input, type TSizeVariant, type TStyleVariant } from 'ui/src/components-v2/input'
import { Table } from 'ui/src/components-v2/table'
import { Text } from 'ui/src/components-v2/typography'
import { CheckCircleIcon, EditIcon, LoadingBarsIcon, PlusIcon, TrashIcon } from 'ui/src/components/icons'

import { ValidationErrorMessage } from '@src/components/validation-error-message'

import * as styles from '../account-settings.css'
import { AddressEditButtonsCell } from './address-edit-buttons-cell'
import { AddressNameCell } from './address-name-cell'
import { type IImmerSettingsGeneralProps, getError, validateAddressBookForm } from './settings-address-book-utils'

function generateRandomString() {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const minLength = 10
	const maxLength = 100
	const stringLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength
	let randomString = ''

	// eslint-disable-next-line
	for (let i = 0; i < stringLength; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length)
		randomString += characters.charAt(randomIndex)
	}

	return randomString
}

interface ISettingsGeneralProps {
	className?: ClassValue
	scrollableNode: HTMLElement
}

export const SettingsAddressBook: React.FC<ISettingsGeneralProps> = props => {
	const { className, scrollableNode } = props

	const [state, setState] = useImmer<IImmerSettingsGeneralProps>({
		deleteAccountId: undefined,
		editAccountId: undefined,
		isEditDialogVisible: false,
		data: Array.from({ length: 2 }, (_, i) => ({
			id: generateRandomString(),
			name: generateRandomString(),
			address: 'rdx14587ghgjdjfhalkhglakjdfhladfgy36fu4t87g8y84ht84h8gh48h',
			dateAdded: Math.floor(Math.random() * 30),
			dateUpdated: Math.floor(Math.random() * 30),
		})),
		editingAddress: {
			name: '',
			address: '',
		},
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

	const handleDeleteAddress = (id: string) => {
		setState(draft => {
			draft.deleteAccountId = id
		})
	}

	const handleAddEditAddress = (id?: string | undefined) => {
		const editingAddress = state.data.find(address => address.id === id)

		setState(draft => {
			draft.editAccountId = id
			draft.isEditDialogVisible = true
			if (editingAddress) {
				draft.editingAddress = { name: editingAddress.name, address: editingAddress.address }
			}
		})
	}

	const handleCloseEditAddressDialog = () => {
		setState(draft => {
			draft.editingAddress = { name: '', address: '' }
			draft.isEditDialogVisible = false
			draft.validation = undefined
			draft.initValidation = false
		})
	}

	const handleCancelDeleteAddress = () => {
		setState(draft => {
			draft.deleteAccountId = undefined
		})
	}

	const handleConfirmDeleteAddress = () => {
		setState(draft => {
			draft.data = state.data.filter(({ id }) => id !== state.deleteAccountId)
			draft.deleteAccountId = undefined
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

		const toastMessage = state.editAccountId ? 'updated' : 'saved'

		setState(draft => {
			if (state.editAccountId) {
				const entryIndex = state.data.findIndex(item => item.id === state.editAccountId)
				if (entryIndex !== -1) {
					draft.data[entryIndex].name = state.editingAddress.name
					draft.data[entryIndex].address = state.editingAddress.address
					draft.editAccountId = undefined
				}
			} else {
				draft.data = [
					...state.data,
					{
						id: generateRandomString(),
						name: state.editingAddress.name,
						address: state.editingAddress.address,
						dateAdded: Math.floor(Math.random() * 30),
						dateUpdated: Math.floor(Math.random() * 30),
					},
				]
			}

			draft.isEditDialogVisible = false
			draft.editingAddress = { name: '', address: '' }
			draft.editAccountId = undefined
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
		[state.data.length],
	)

	return (
		<>
			<Box className={clsx(styles.settingsSectionFlexColumnWrapper, className)}>
				<Box className={styles.settingsSectionWrapper}>
					<Box display="flex" flexDirection="column" gap="small">
						<Text size="xxlarge" weight="strong" color="strong">
							Address book
						</Text>
						<Box>
							<Text>
								add Ut imperdiet nam nam velit eu magna, neque eu eu porta. m duis non pretium, mus laoreet tempor velit
								integer tristique etiam integer.
							</Text>
						</Box>
						<Box paddingBottom="medium" paddingTop="medium">
							<Button styleVariant="primary" leftIcon={<PlusIcon />} onClick={() => handleAddEditAddress()}>
								New address
							</Button>
						</Box>
						<Table scrollableNode={scrollableNode} data={state.data} columns={columns} />
					</Box>
				</Box>
			</Box>
			<DialogAlert
				open={!!state.deleteAccountId}
				title="Are you sure?"
				description={
					<Box component="span">
						<Text truncate>Are you sure you want to delete {state.deleteAccountId}</Text>?
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
						{/* <Button sizeVariant="small" onClick={handleSaveAddress}> */}
						<Button sizeVariant="small" type="submit">
							save
						</Button>
					</Box>
				</Box>
			</Dialog>
		</>
	)
}
