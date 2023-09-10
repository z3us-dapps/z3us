import { ChevronRightIcon, LockClosedIcon, Pencil2Icon } from '@radix-ui/react-icons'
import React, { useRef } from 'react'
import { useImmer } from 'use-immer'
import { useRoute } from 'wouter'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
} from 'ui/src/components/alert-dialog'
import { Box, Flex, MotionBox, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuItemIndicator,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuRightSlot,
	DropdownMenuTrigger,
	DropdownMenuTriggerItem,
} from 'ui/src/components/drop-down-menu'
import { HardwareWalletIcon, TrashIcon, Z3usIcon, Z3usIconOff, Z3usIconOn } from 'ui/src/components/icons'
import Input from 'ui/src/components/input'
import { ToolTip, Tooltip, TooltipContent, TooltipTrigger } from 'ui/src/components/tool-tip'

import { useColorMode } from '@src/hooks/use-color-mode'
import { useContentScriptStatus } from '@src/hooks/use-content-script-status'
import { useHashLocation } from '@src/hooks/use-hash-location'
import { useIsBabylon } from '@src/hooks/use-is-babylon'
import { useMessanger } from '@src/hooks/use-messanger'
import { useNoneSharedStore, useSharedStore } from '@src/hooks/use-store'
import { CONNECT } from '@src/lib/v1/actions'
import { KeystoreType } from '@src/types'
import { generateId } from '@src/utils/generate-id'

interface ImmerT {
	isOpen: boolean
	keystoreId: string | undefined
	editing: string | undefined
	tempEdit: string | undefined
}

export const Z3usMenu: React.FC = () => {
	const isBabylon = useIsBabylon()
	const walletInputRef = useRef(null)
	const [location, setLocation] = useHashLocation()
	const [isSendRoute] = useRoute('/wallet/account/send')
	const [isSendRouteRri] = useRoute('/wallet/account/send/:rri')
	const [isDepositRoute] = useRoute('/wallet/account/deposit')
	const [isDepositRouteRri] = useRoute('/wallet/account/deposit/:rri')
	const [isActivityRoute] = useRoute('/wallet/account/activity')
	const [isSwapRoute] = useRoute('/wallet/swap/review')
	const isNotificationRoute = location.startsWith('/notification')

	const { lockAction: lock, removeWalletAction: removeWallet } = useMessanger()
	const isDarkMode = useColorMode()
	const contentScriptStatus = useContentScriptStatus()
	const { keystores, keystoreId, isUnlocked, setIsUnlocked, selectKeystore, removeKeystore, changeKeystoreName } =
		useSharedStore(state => ({
			keystores: state.keystores,
			keystoreId: state.selectKeystoreId,
			isUnlocked: state.isUnlocked,
			setIsUnlocked: state.setIsUnlockedAction,
			addKeystore: state.addKeystoreAction,
			removeKeystore: state.removeKeystoreAction,
			selectKeystore: state.selectKeystoreAction,
			changeKeystoreName: state.changeKeystoreNameAction,
		}))
	const { reset, addPendingAction } = useNoneSharedStore(state => ({
		reset: state.resetAction,
		addPendingAction: state.addPendingActionAction,
	}))

	const [state, setState] = useImmer<ImmerT>({
		isOpen: false,
		keystoreId: undefined,
		editing: undefined,
		tempEdit: '',
	})
	const isHideZ3usMenu =
		isSendRoute ||
		isSendRouteRri ||
		isDepositRoute ||
		isDepositRouteRri ||
		isActivityRoute ||
		isSwapRoute ||
		isNotificationRoute

	const handleLockWallet = async () => {
		setIsUnlocked(false)
		await lock()
	}

	const handleValueChange = async (id: string) => {
		if (id === keystoreId) return
		setIsUnlocked(false)
		selectKeystore(id)
		setLocation('#/wallet/account')
		await lock()
	}

	const handleAdd = () => {
		window.location.hash = '#/onboarding'
	}

	const confirmRemoveWallet = () => async () => {
		await removeWallet()
		reset()
		removeKeystore(state.keystoreId)
		setState(draft => {
			draft.keystoreId = undefined
		})
		handleLockWallet()
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
		const findKeystore = keystores.find(keystore => keystore.id === keyStoreId)
		setState(draft => {
			draft.editing = keyStoreId
			draft.tempEdit = findKeystore?.name || keyStoreId
		})

		// select the input text when the dialog becomes visible
		setTimeout(() => {
			walletInputRef.current.select()
		}, 50)
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

	const handleSubmitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleSaveWalletName()
	}

	const handleInjectContentScript = async () => {
		try {
			if (contentScriptStatus.currentTabId && contentScriptStatus.currentTabHost) {
				const messageId = `${CONNECT}-${generateId()}`
				addPendingAction(messageId, {
					host: contentScriptStatus.currentTabHost,
					request: { tabId: contentScriptStatus.currentTabId },
					action: 'connect',
				})
				setState(draft => {
					draft.isOpen = false
				})
				setLocation(`#/notification/connect/${messageId}`)
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
		}
	}

	const Icon = contentScriptStatus.isConnected ? (
		<Z3usIconOn bgColor={isDarkMode ? '#323232' : 'white'} />
	) : (
		<Z3usIconOff bgColor={isDarkMode ? '#323232' : '#white'} />
	)

	return (
		<Box
			css={{
				position: 'fixed',
				top: '6px',
				left: '6px',
				zIndex: '1',
				transition: '$default',
				pe: isHideZ3usMenu ? 'none' : 'auto',
				opacity: isHideZ3usMenu ? '0' : '1',
			}}
		>
			<MotionBox animate={state.isOpen ? 'open' : 'closed'}>
				<DropdownMenu onOpenChange={handleDropDownMenuOpenChange}>
					<DropdownMenuTrigger asChild>
						<Box>
							{contentScriptStatus.canConnectToTab ? (
								<Tooltip>
									<TooltipTrigger asChild>
										<Button iconOnly aria-label="Z3US menu" color="ghost" size="4" css={{ mr: '2px' }}>
											{Icon}
										</Button>
									</TooltipTrigger>
									<TooltipContent sideOffset={1} side="right" css={{ position: 'relative' }}>
										You are {!contentScriptStatus.isConnected ? 'not' : ''} connected to{' '}
										{contentScriptStatus.currentTabHost}
									</TooltipContent>
								</Tooltip>
							) : (
								<Button iconOnly aria-label="Z3US menu" color="ghost" size="4" css={{ mr: '2px' }}>
									<Z3usIcon />
								</Button>
							)}
						</Box>
					</DropdownMenuTrigger>
					<DropdownMenuContent side="bottom" sideOffset={6} alignOffset={-3} css={{ minWidth: '130px' }}>
						{keystores.length > 0 && (
							<DropdownMenu>
								<DropdownMenuTriggerItem>
									<Box css={{ flex: '1', pr: '$1' }}>Wallet</Box>
									<DropdownMenuRightSlot>
										<ChevronRightIcon />
									</DropdownMenuRightSlot>
								</DropdownMenuTriggerItem>
								<DropdownMenuContent avoidCollisions side="right" css={{ minWidth: '130px' }}>
									<DropdownMenuRadioGroup value={keystoreId} onValueChange={handleValueChange}>
										{keystores.map(({ id, name, type }) => (
											<DropdownMenuRadioItem key={id} value={id}>
												<DropdownMenuItemIndicator css={{ width: '16px', left: '0', right: 'unset' }} />
												<Flex align="center" css={{ width: '100%', pl: '$1', pr: '$2' }}>
													<Flex
														justify="start"
														align="center"
														css={{
															pr: '$3',
															flex: '1',
														}}
													>
														<Text
															size="2"
															bold
															truncate
															css={{ maxWidth: `${type === KeystoreType.HARDWARE ? '80px' : '104px'}` }}
														>
															{name}
														</Text>
													</Flex>
													<Flex justify="end" css={{ mr: '-6px' }}>
														{type === KeystoreType.HARDWARE && (
															<ToolTip message="Hardware wallet account">
																<Box css={{ width: '24px', height: '24px', mr: '3px' }}>
																	<Button size="1" clickable={false}>
																		<HardwareWalletIcon />
																	</Button>
																</Box>
															</ToolTip>
														)}
														{isUnlocked && keystoreId === id && (
															<>
																<ToolTip message="Remove">
																	<Button size="1" iconOnly color="ghost" onClick={() => handleRemoveWallet(id)}>
																		<TrashIcon />
																	</Button>
																</ToolTip>
																<ToolTip message="Edit name">
																	<Button size="1" iconOnly color="ghost" onClick={() => handleEditWalletName(id)}>
																		<Pencil2Icon />
																	</Button>
																</ToolTip>
															</>
														)}
													</Flex>
												</Flex>
											</DropdownMenuRadioItem>
										))}
									</DropdownMenuRadioGroup>
								</DropdownMenuContent>
							</DropdownMenu>
						)}
						{!isBabylon && (
							<DropdownMenuItem onSelect={handleAdd}>
								<Box css={{ flex: '1', pr: '$4' }}>Add new wallet</Box>
							</DropdownMenuItem>
						)}
						{isUnlocked && (
							<DropdownMenuItem onSelect={handleLockWallet}>
								<Box css={{ flex: '1' }}>Lock wallet</Box>
								<DropdownMenuRightSlot>
									<LockClosedIcon />
								</DropdownMenuRightSlot>
							</DropdownMenuItem>
						)}
						{contentScriptStatus.canConnectToTab && !contentScriptStatus.isConnected && (
							<DropdownMenu>
								<DropdownMenuTriggerItem onClick={handleInjectContentScript}>
									<Box css={{ flex: '1', pr: '$1' }}>
										<Text size="2" bold truncate css={{ maxWidth: '130px' }}>
											Connect to {contentScriptStatus.currentTabHost}
										</Text>
									</Box>
								</DropdownMenuTriggerItem>
							</DropdownMenu>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			</MotionBox>
			<AlertDialog open={!!state.editing}>
				<AlertDialogContent>
					<form onSubmit={handleSubmitForm}>
						<AlertDialogTitle>Edit wallet name</AlertDialogTitle>
						<AlertDialogDescription>
							<Text>
								Enter name for your wallet and click <b>Save</b>.
							</Text>
							<Box css={{ pt: '$3', pb: '$1' }}>
								<Input
									ref={walletInputRef}
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
								<Button size="2" color="primary" type="submit">
									Save
								</Button>
							</AlertDialogAction>
						</Flex>
					</form>
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
		</Box>
	)
}
