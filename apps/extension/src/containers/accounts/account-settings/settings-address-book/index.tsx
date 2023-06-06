/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ClassValue } from 'clsx'
import clsx from 'clsx'
import React, { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { useImmer } from 'use-immer'

import { Avatar, AvatarFallback, AvatarImage } from 'ui/src/components-v2/avatar'
import { Box } from 'ui/src/components-v2/box'
import { Button } from 'ui/src/components-v2/button'
import { Dialog } from 'ui/src/components-v2/dialog'
import { DialogAlert } from 'ui/src/components-v2/dialog-alert'
import { Table } from 'ui/src/components-v2/table'
import { Text } from 'ui/src/components-v2/typography'
import { EditIcon, LoadingBarsIcon, PlusIcon, TrashIcon } from 'ui/src/components/icons'

import * as styles from '../account-settings.css'
import { AddressNameCell } from './address-name-cell'

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

interface IImmerSettingsGeneralProps {
	deleteAccountId: string | undefined
	editAccountId: string | undefined
	isEditDialogVisible: boolean
	data: any
}

export const SettingsAddressBook: React.FC<ISettingsGeneralProps> = props => {
	const { className, scrollableNode } = props

	const [state, setState] = useImmer<IImmerSettingsGeneralProps>({
		deleteAccountId: undefined,
		editAccountId: undefined,
		isEditDialogVisible: true,
		data: Array.from({ length: 2000 }, (_, i) => ({
			id: generateRandomString(),
			firstName: generateRandomString(),
			lastName: Math.floor(Math.random() * 30),
			dateAdded: Math.floor(Math.random() * 30),
			dateUpdated: Math.floor(Math.random() * 30),
		})),
	})

	const handleDeleteAddress = (id: string) => {
		setState(draft => {
			draft.deleteAccountId = id
		})
	}

	const handleAddEditAddress = (id: string | undefined) => {
		setState(draft => {
			draft.editAccountId = id
			draft.isEditDialogVisible = true
		})
	}

	const handleCloseEditAddressDialog = () => {
		setState(draft => {
			draft.isEditDialogVisible = false
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

	const columns = useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'firstName',
				width: '70%',
				Cell: AddressNameCell,
			},
			{
				Header: '',
				accessor: 'lastName',
				width: 'auto',
				// eslint-disable-next-line react/no-unstable-nested-components
				// eslint-disable-next-line
				Cell: ({ row: { original } }) => (
					<Box display="flex" justifyContent="flex-end" flexShrink={0} gap="small">
						<Button
							sizeVariant="small"
							styleVariant="secondary"
							leftIcon={<TrashIcon />}
							onClick={() => {
								handleDeleteAddress(original.id)
							}}
						>
							Delete
						</Button>
						<Button
							sizeVariant="small"
							styleVariant="secondary"
							leftIcon={<EditIcon />}
							onClick={() => {
								handleAddEditAddress(original.id)
							}}
						>
							Edit
						</Button>
					</Box>
				),
			},
		],
		[],
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
						<Box paddingTop="medium">
							<Button
								styleVariant="primary"
								// disabled
								leftIcon={<PlusIcon />}
								onClick={() => handleAddEditAddress(undefined)}
							>
								New address
							</Button>
						</Box>
						{/* START ADDRESS BOOK TABLE */}
						<Box paddingTop="large">
							<Table scrollableNode={scrollableNode} data={state.data} columns={columns} />
						</Box>
						{/* END ADDRESS BOOK TABLE */}
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
				<Box padding="large">
					<Text size="xxxlarge" color="strong">
						heheheh
					</Text>

					{Array.from({ length: 5 }).map((_, index) => (
						// eslint-disable-next-line
						<Text size="xxlarge" key={index}>
							hadsofhasdohf
						</Text>
					))}

					<Box style={{position: 'sticky', top: '0'}}>
						<Text size="xxxlarge" color="strong">
							Sticky
						</Text>
					</Box>
					{Array.from({ length: 200 }).map((_, index) => (
						// eslint-disable-next-line
						<Text size="xxlarge" key={index}>
							hadsofhasdohf
						</Text>
					))}
				</Box>
			</Dialog>
		</>
	)
}
