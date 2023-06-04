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
}

export const SettingsAddressBook: React.FC<ISettingsGeneralProps> = props => {
	const { className, scrollableNode } = props

	const [state, setState] = useImmer<IImmerSettingsGeneralProps>({
		deleteAccount: undefined,
	})

	const data = useMemo(
		() =>
			Array.from({ length: 2000 }, (_, i) => ({
				firstName: generateRandomString(),
				lastName: Math.floor(Math.random() * 30),
				dateAdded: Math.floor(Math.random() * 30),
				dateUpdated: Math.floor(Math.random() * 30),
			})),
		[],
	)

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

	const handleConfirmDeleteAddress  = () => {
		setState(draft => {
			draft.deleteAccount = undefined
		})
	}

	const columns = useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'firstName',
				width: '70%',
				// eslint-disable-next-line react/no-unstable-nested-components
				// eslint-disable-next-line
				Cell: ({ value: cellValue, row }) => {
					// eslint-disable-next-line
					return (
						<Box key={row.id} id={row.id} display="flex" alignItems="center" gap="small" style={{ minWidth: 0 }}>
							<Box
								flexShrink={0}
								style={{ width: '30px', height: '30px', overflow: 'hidden', background: 'orange' }}
								borderRadius="full"
							>
								{/* TODO: need variants on this component */}
								{/* TODO: just show image as this avatar flashes */}
								{/* <Avatar className="sdf"> */}
								{/* 	<AvatarImage */}
								{/* 		className="sdf" */}
								{/* 		src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80" */}
								{/* 		alt="Colm Tuite" */}
								{/* 	/> */}
								{/* 	<AvatarFallback delayMs={600} className="sdf"> */}
								{/* 		<Text>CT</Text> */}
								{/* 	</AvatarFallback> */}
								{/* </Avatar> */}
							</Box>
							<Box flexGrow={1} style={{ minWidth: 0 }}>
								<Text size="small" color="strong" truncate>
									{cellValue}
								</Text>
								<Text size="xsmall" truncate>
									{cellValue}
								</Text>
							</Box>
						</Box>
					)
				},
			},
			{
				Header: '',
				accessor: 'lastName',
				width: 'auto',
				// eslint-disable-next-line react/no-unstable-nested-components
				// eslint-disable-next-line
				Cell: ({ value: cellValue, row }) => {
					// eslint-disable-next-line
					return (
						<Box key={row.id} id={row.id} display="flex" justifyContent="flex-end" flexShrink={0} gap="small">
							<Button
								sizeVariant="small"
								styleVariant="secondary"
								leftIcon={<TrashIcon />}
								onClick={() => {
									handleDeleteAddress('test')
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
							<Table scrollableNode={scrollableNode} data={data} columns={columns} />
						</Box>
						{/* END ADDRESS BOOK TABLE */}
					</Box>
				</Box>
			</Box>
			<DialogAlert
				open={!!state.deleteAccount}
				title="Are you sure?"
				description="Are you sure you want to delete this address?"
				confirmButtonText="Delete"
				onCancel={handleCancelDeleteAddress}
				onConfirm={handleConfirmDeleteAddress}
			/>
		</>
	)
}
