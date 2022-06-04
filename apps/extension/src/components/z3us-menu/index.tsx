import React from 'react'
import { useSharedStore } from '@src/store'
import { useImmer } from 'use-immer'
import Button from 'ui/src/components/button'
import { Z3usIcon, TrashIcon, HardwareWalletIcon } from 'ui/src/components/icons'
import { ToolTip } from 'ui/src/components/tool-tip'
import { LockClosedIcon, ChevronRightIcon, Pencil2Icon } from '@radix-ui/react-icons'
import { Box, MotionBox, Text, Flex } from 'ui/src/components/atoms'
import Input from 'ui/src/components/input'
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogAction,
	AlertDialogCancel,
} from 'ui/src/components/alert-dialog'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuItemIndicator,
	DropdownMenuRightSlot,
	DropdownMenuTriggerItem,
} from 'ui/src/components/drop-down-menu'
import { KeystoreType } from '@src/store/types'

export const Z3usMenu: React.FC = () => {
	const { keystores, keystoreId, selectKeystore, removeKeystore, changeKeystoreName, removeWallet, lock, isUnlocked } =
		useSharedStore(state => ({
			keystores: state.keystores,
			keystoreId: state.selectKeystoreId,
			addKeystore: state.addKeystoreAction,
			removeKeystore: state.removeKeystoreAction,
			selectKeystore: state.selectKeystoreAction,
			changeKeystoreName: state.changeKeystoreNameAction,
			lock: state.lockAction,
			removeWallet: state.removeWalletAction,
			isUnlocked: Boolean(state.masterSeed || state.isHardwareWallet),
		}))

	const [state, setState] = useImmer({
		isOpen: false,
		keystoreId: undefined,
		editing: undefined,
		tempEdit: '',
	})

	const handleLockWallet = async () => {
		await lock()
	}

	const handleValueChange = async (id: string) => {
		selectKeystore(id)
		await lock()
	}

	const handleAdd = () => {
		window.location.hash = '#/onboarding'
	}

	const confirmRemoveWallet = () => async () => {
		selectKeystore(state.keystoreId)
		await removeWallet()
		removeKeystore(state.keystoreId)
		setState(draft => {
			draft.keystoreId = undefined
		})
	}

	const handleRemoveWallet = (wallet: string) => {
		setState(draft => {
			draft.keystoreId = wallet
		})
	}

	const handleDropDownMenuOpenChange = (open: boolean) => {
		setState(draft => {
			draft.isOpen = open
		})
	}

	const handleCancelRemoveWallet = () => {
		setState(draft => {
			draft.keystoreId = undefined
		})
	}

	const handleEditWalletName = (keyStoreId: string) => {
		setState(draft => {
			draft.editing = keyStoreId
			draft.tempEdit = keyStoreId
		})
	}

	const editWalletName = (name: string) => {
		setState(draft => {
			draft.tempEdit = name
		})
	}

	const handleCancelEditWalletName = () => {
		setState(draft => {
			draft.editing = undefined
			draft.tempEdit = undefined
		})
	}

	const handleSaveWalletName = () => {
		changeKeystoreName(state.editing, state.tempEdit)
		setState(draft => {
			draft.editing = undefined
			draft.tempEdit = undefined
		})
	}

	return (
		<>
			<MotionBox animate={state.isOpen ? 'open' : 'closed'}>
				<DropdownMenu onOpenChange={handleDropDownMenuOpenChange}>
					<DropdownMenuTrigger asChild>
						<Button iconOnly aria-label="wallet options" color="ghost" size="4" css={{ mr: '2px' }}>
							<Z3usIcon color="#7448ff" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent side="bottom" sideOffset={6} alignOffset={-3} css={{ minWidth: '130px' }}>
						<DropdownMenu>
							<DropdownMenuTriggerItem>
								<Box css={{ flex: '1', pr: '$1' }}>Wallet</Box>
								<DropdownMenuRightSlot>
									<ChevronRightIcon />
								</DropdownMenuRightSlot>
							</DropdownMenuTriggerItem>
							<DropdownMenuContent avoidCollisions side="right" css={{ minWidth: '180px' }}>
								<DropdownMenuRadioGroup value={keystoreId} onValueChange={handleValueChange}>
									{keystores.map(({ id, name, type }) => (
										<DropdownMenuRadioItem key={id} value={id}>
											<DropdownMenuItemIndicator css={{ width: '16px', left: '0', right: 'unset' }} />
											<Flex align="center" css={{ width: '100%', pl: '$2' }}>
												<Box css={{ flex: '1' }}>
													<Text size="2" bold truncate css={{ maxWidth: '100px' }}>
														{name}
														{type === KeystoreType.HARDWARE && <HardwareWalletIcon />}
													</Text>
												</Box>
												<Box>
													<ToolTip message="Delete">
														<Button size="1" iconOnly color="ghost" onClick={() => handleRemoveWallet(id)}>
															<TrashIcon />
														</Button>
													</ToolTip>
													<ToolTip message="Edit">
														<Button size="1" iconOnly color="ghost" onClick={() => handleEditWalletName(id)}>
															<Pencil2Icon />
														</Button>
													</ToolTip>
												</Box>
											</Flex>
										</DropdownMenuRadioItem>
									))}
								</DropdownMenuRadioGroup>
							</DropdownMenuContent>
						</DropdownMenu>
						<DropdownMenuItem onSelect={handleAdd}>
							<Box css={{ flex: '1', pr: '$4' }}>Add new wallet</Box>
						</DropdownMenuItem>
						{isUnlocked && (
							<DropdownMenuItem onSelect={handleLockWallet}>
								<Box css={{ flex: '1' }}>Lock wallet</Box>
								<DropdownMenuRightSlot>
									<LockClosedIcon />
								</DropdownMenuRightSlot>
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			</MotionBox>
			<AlertDialog open={!!state.editing}>
				<AlertDialogContent>
					<AlertDialogTitle>Edit wallet name</AlertDialogTitle>
					<AlertDialogDescription>
						<Text>
							Enter name for your wallet and click <b>Save</b>.
						</Text>
						<Box css={{ pt: '$3', pb: '$1' }}>
							<Input
								focusOnMount
								type="text"
								value={state.tempEdit}
								placeholder="Enter wallet name"
								onChange={(e: React.ChangeEvent<HTMLInputElement>): void => editWalletName(e.target.value)}
							/>
						</Box>
					</AlertDialogDescription>
					<Flex justify="end">
						<AlertDialogCancel asChild>
							<Button size="2" color="tertiary" css={{ mr: '$2' }} onClick={handleCancelEditWalletName}>
								Cancel
							</Button>
						</AlertDialogCancel>
						<AlertDialogAction asChild>
							<Button size="2" color="primary" onClick={handleSaveWalletName}>
								Save
							</Button>
						</AlertDialogAction>
					</Flex>
				</AlertDialogContent>
			</AlertDialog>
			<AlertDialog open={!!state.keystoreId}>
				<AlertDialogContent>
					<AlertDialogTitle>Remove wallet</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to remove the wallet? This action cannot be undone.
					</AlertDialogDescription>
					<Flex justify="end">
						<AlertDialogCancel asChild>
							<Button size="2" color="tertiary" css={{ mr: '$2' }} onClick={handleCancelRemoveWallet}>
								Cancel
							</Button>
						</AlertDialogCancel>
						<AlertDialogAction asChild>
							<Button size="2" color="red" onClick={confirmRemoveWallet()}>
								Yes, remove wallet
							</Button>
						</AlertDialogAction>
					</Flex>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
