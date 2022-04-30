import React from 'react'
import { useImmer } from 'use-immer'
import { useStore } from '@src/store'
import { useEventListener } from 'usehooks-ts'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from 'ui/src/components/tool-tip'
import { Box, Flex, Text, StyledLink } from 'ui/src/components/atoms'
import { getShortAddress } from '@src/utils/string-utils'
import { PlusIcon } from 'ui/src/components/icons'
import Button from 'ui/src/components/button'
import Input from 'ui/src/components/input'
import InputFeedBack from 'ui/src/components/input/input-feedback'
import { CircleAvatar } from '@src/components/circle-avatar'
import { Pencil2Icon, CheckIcon, Cross2Icon, TrashIcon } from '@radix-ui/react-icons'
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogAction,
	AlertDialogCancel,
} from 'ui/src/components/alert-dialog'
import { EXPLORER_URL } from '@src/containers/wallet-panel/config'
import { AccountAddress } from '@radixdlt/account'

export const AddressBook: React.FC = () => {
	const { addressBook, setAddressBookEntry, handleRemoveAddress, addToast } = useStore(state => ({
		addresses: [...Object.values(state.publicAddresses), ...Object.values(state.hwPublicAddresses)],
		addressBook: state.addressBook,
		setAddressBookEntry: state.setAddressBookEntryAction,
		handleRemoveAddress: state.removeAddressBookEntryAction,
		addToast: state.addToastAction,
	}))

	const [state, setState] = useImmer({
		editing: '',
		tempEdit: '',
		isLoading: false,
		address: '',
		name: '',
		errorMessage: '',
		isAddAddressDialogOpen: false,
	})

	const handleEdit = (address: string) => {
		setState(draft => {
			draft.editing = draft.editing === address ? '' : address
			draft.tempEdit = addressBook[address]?.name
		})
	}

	const handleCloseDialog = () => {
		setState(draft => {
			draft.isAddAddressDialogOpen = false
			draft.errorMessage = ''
		})
	}

	const editAccountName = (name: string) => {
		setState(draft => {
			draft.tempEdit = name
		})
	}

	const handleOpenAddAddressDialog = () => {
		setState(draft => {
			draft.isAddAddressDialogOpen = true
		})
	}

	const handleCancelEdit = () => {
		setState(draft => {
			draft.editing = ''
			draft.tempEdit = ''
		})
	}

	const handleCommitEdit = () => {
		setState(draft => {
			draft.editing = ''
		})
		setAddressBookEntry(state.editing, { name: state.tempEdit, isOwn: false })
	}

	const handleSubmitForm = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()

		setState(draft => {
			draft.isLoading = true
		})

		try {
			const result = AccountAddress.fromUnsafe(state.address)
			if (result.isErr()) {
				throw result.error
			}

			setAddressBookEntry(state.address, { name: state.name, isOwn: false })

			setState(draft => {
				draft.name = ''
				draft.address = ''
				draft.errorMessage = ''
				draft.isAddAddressDialogOpen = false
			})

			addToast({
				type: 'success',
				title: 'Succesfully added to address book',
				duration: 5000,
			})
		} catch (error) {
			setState(draft => {
				draft.errorMessage = 'Please enter a valid address.'
			})
		}

		setState(draft => {
			draft.isLoading = false
		})
	}

	useEventListener('keypress', e => {
		if (e.code === 'Enter' && state.editing !== '') {
			handleCommitEdit()
		}
	})

	return (
		<Box css={{ px: '$3', py: '$3' }}>
			<Box>
				{Object.entries(addressBook).map(([address, { name, isOwn }]) => {
					if (isOwn) {
						return null
					}
					const isEditing = address === state.editing
					return (
						<Flex key={address} align="center" css={{ flex: '1', position: 'relative' }}>
							<Flex align="center" css={{ flex: '1', height: '$9' }}>
								<Flex align="center" css={{ flex: '1', maxWidth: '240px' }}>
									{isEditing ? (
										<>
											<CircleAvatar image="" width={24} height={24} borderWidth={1} />
											<Box css={{ width: '202px', ml: '8px' }}>
												<Input
													selectOnMount
													type="text"
													value={state.tempEdit}
													placeholder="Enter address"
													onChange={(e: React.ChangeEvent<HTMLInputElement>): void => editAccountName(e.target.value)}
												/>
											</Box>
										</>
									) : (
										<>
											<Box css={{ maxWidth: '156px', pr: '$1' }}>
												<Text truncate>{name}</Text>
											</Box>
											<Tooltip>
												<TooltipTrigger asChild>
													<Text truncate>
														<StyledLink
															css={{ color: '$txtMuted' }}
															underline
															target="_blank"
															href={`${EXPLORER_URL}accounts/${address}`}
														>
															{getShortAddress(address)}
														</StyledLink>
													</Text>
												</TooltipTrigger>
												<TooltipContent sideOffset={5}>
													<TooltipArrow />
													Go to explorer
												</TooltipContent>
											</Tooltip>
										</>
									)}
								</Flex>
							</Flex>
							<Flex align="center">
								{isEditing ? (
									<>
										<Button size="1" color="ghost" iconOnly onClick={() => handleCommitEdit()}>
											<CheckIcon />
										</Button>
										<Button size="1" color="ghost" iconOnly onClick={() => handleCancelEdit()}>
											<Cross2Icon />
										</Button>
									</>
								) : (
									<>
										<Tooltip>
											<TooltipTrigger asChild>
												<Button size="1" color="ghost" iconOnly onClick={() => handleEdit(address)}>
													<Pencil2Icon />
												</Button>
											</TooltipTrigger>
											<TooltipContent sideOffset={5}>
												<TooltipArrow />
												Edit
											</TooltipContent>
										</Tooltip>
										<AlertDialog>
											<AlertDialogTrigger asChild>
												<Box>
													<Tooltip>
														<TooltipTrigger asChild>
															<Button size="1" color="ghost" iconOnly>
																<TrashIcon />
															</Button>
														</TooltipTrigger>
														<TooltipContent sideOffset={5}>
															<TooltipArrow offset={15} />
															Remove account
														</TooltipContent>
													</Tooltip>
												</Box>
											</AlertDialogTrigger>
											<AlertDialogContent>
												<Box css={{ p: '$1' }}>
													<AlertDialogTitle>
														<Text medium size="5">
															Remove address?
														</Text>
													</AlertDialogTitle>
													<AlertDialogDescription>
														<Text size="3">Are you sure you want to delete this address?</Text>
													</AlertDialogDescription>
													<Flex css={{ mt: '$3' }} justify="end" gap={2}>
														<AlertDialogAction asChild>
															<Button size="2" color="red" onClick={() => handleRemoveAddress(address)}>
																Delete
															</Button>
														</AlertDialogAction>
														<AlertDialogCancel asChild>
															<Button size="2" color="tertiary">
																Cancel
															</Button>
														</AlertDialogCancel>
													</Flex>
												</Box>
											</AlertDialogContent>
										</AlertDialog>
									</>
								)}
							</Flex>
						</Flex>
					)
				})}
			</Box>
			<Box css={{ mt: '0' }}>
				<AlertDialog open={state.isAddAddressDialogOpen}>
					<AlertDialogTrigger asChild>
						<Button size="4" color="primary" fullWidth onClick={handleOpenAddAddressDialog}>
							<PlusIcon />
							Add new address
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<Box css={{ p: '$1' }}>
							<AlertDialogTitle>
								<Flex align="center">
									<Text medium size="5" css={{ pr: '2px' }}>
										Add address
									</Text>
								</Flex>
							</AlertDialogTitle>
							<AlertDialogDescription css={{ mt: '4px' }}>
								<Text size="3">Enter the address you want to save to the address book.</Text>
							</AlertDialogDescription>
							<Box css={{ mt: '$1' }}>
								<form onSubmit={handleSubmitForm}>
									<Box>
										<Input
											type="text"
											placeholder="Name"
											error={!!state.errorMessage}
											onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
												setState(draft => {
													draft.name = e.target.value
													draft.errorMessage = ''
												})
											}}
											css={{ mb: '$2' }}
										/>
										<Input
											type="text"
											placeholder="Address"
											error={!!state.errorMessage}
											onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
												setState(draft => {
													draft.address = e.target.value
													draft.errorMessage = ''
												})
											}}
											css={{ mb: '$2' }}
										/>
									</Box>
									<InputFeedBack
										showFeedback={!!state.errorMessage}
										animateHeight={16}
										css={{ display: 'flex', alignItems: 'flex-end', overflow: 'clip' }}
									>
										<Text color="red" medium>
											{state.errorMessage}
										</Text>
									</InputFeedBack>

									<Flex css={{ mt: '$4' }} justify="end" gap={2}>
										<AlertDialogAction asChild>
											<Button type="submit" size="2" color="primary" loading={state.isLoading}>
												<PlusIcon /> Add address
											</Button>
										</AlertDialogAction>
										<AlertDialogCancel asChild>
											<Button size="2" color="tertiary" onClick={handleCloseDialog}>
												Cancel
											</Button>
										</AlertDialogCancel>
									</Flex>
								</form>
							</Box>
						</Box>
					</AlertDialogContent>
				</AlertDialog>
			</Box>
		</Box>
	)
}
