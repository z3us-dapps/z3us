/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ClassValue } from 'clsx'
import clsx from 'clsx'
import React, { useMemo, useState } from 'react'
import { useImmer } from 'use-immer'

import { Avatar, AvatarFallback, AvatarImage } from 'ui/src/components-v2/avatar'
import { Box } from 'ui/src/components-v2/box'
import { Button } from 'ui/src/components-v2/button'
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
	deleteAccount: string | undefined
	data: any
}

export const SettingsAddressBook: React.FC<ISettingsGeneralProps> = props => {
	const { className, scrollableNode } = props

	const [state, setState] = useImmer<IImmerSettingsGeneralProps>({
		deleteAccount: undefined,
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
			draft.deleteAccount = id
		})
	}

	const handleCancelDeleteAddress = () => {
		setState(draft => {
			draft.deleteAccount = undefined
		})
	}

	const handleConfirmDeleteAddress = () => {
		setState(draft => {
			draft.data = state.data.filter(({ id }) => id !== state.deleteAccount)
			draft.deleteAccount = undefined
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
				Cell: ({ value, row: { original } }) => {
					// eslint-disable-next-line
					return (
						<Box key={original.id} id={original.id} display="flex" justifyContent="flex-end" flexShrink={0} gap="small">
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
							<Button sizeVariant="small" styleVariant="secondary" leftIcon={<EditIcon />}>
								Edit
							</Button>
						</Box>
					)
				},
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
								Ut imperdiet nam nam velit eu magna, neque eu eu porta. m duis non pretium, mus laoreet tempor velit
								integer tristique etiam integer.
							</Text>
						</Box>
						<Box paddingTop="medium">
							<Button
								styleVariant="primary"
								// disabled
								leftIcon={<PlusIcon />}
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
				open={!!state.deleteAccount}
				title="Are you sure?"
				description={
					<Box component="span">
						<Text truncate>Are you sure you want to delete {state.deleteAccount}</Text>?
					</Box>
				}
				confirmButtonText="Delete"
				onCancel={handleCancelDeleteAddress}
				onConfirm={handleConfirmDeleteAddress}
			/>
		</>
	)
}
