import browser from 'webextension-polyfill'
import React, { useRef, useEffect } from 'react'
import { useRoute } from 'wouter'
import { useSharedStore, useNoneSharedStore } from '@src/hooks/use-store'
import { useHashLocation } from '@src/hooks/use-hash-location'
import { useImmer } from 'use-immer'
import browserService from '@src/services/browser'
import Button from 'ui/src/components/button'
import { Z3usIconOn, Z3usIconOff, TrashIcon, HardwareWalletIcon, Z3usIcon } from 'ui/src/components/icons'
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
import { KeystoreType } from '@src/types'
import { generateId } from '@src/utils/generate-id'
import { checkContentScript, showConnected, showDisconnected } from '@src/lib/background/inject'
import { useColorMode } from '@src/hooks/use-color-mode'
import { CONNECT } from '@src/lib/v1/actions'

const popupURL = new URL(browser.runtime.getURL(''))

interface ImmerT {
	isOpen: boolean
	canConnectToTab: boolean
	isConnected: boolean
	keystoreId: string | undefined
	editing: string | undefined
	tempEdit: string | undefined
	currentTabId: number
	currentTabHost: string
}

export const Z3usMenu: React.FC = () => {
	const walletInputRef = useRef(null)
	const [location, setLocation] = useHashLocation()
	const [isSendRoute] = useRoute('/wallet/account/send')
	const [isSendRouteRri] = useRoute('/wallet/account/send/:rri')
	const [isDepositRoute] = useRoute('/wallet/account/deposit')
	const [isDepositRouteRri] = useRoute('/wallet/account/deposit/:rri')
	const [isActivityRoute] = useRoute('/wallet/account/activity')
	const [isSwapRoute] = useRoute('/wallet/swap/review')
	const isNotificationRoute = location.startsWith('/notification')

	const isDarkMode = useColorMode()
	const {
		keystores,
		keystoreId,
		isUnlocked,
		setIsUnlocked,
		selectKeystore,
		removeKeystore,
		changeKeystoreName,
		removeWallet,
		lock,
	} = useSharedStore(state => ({
		keystores: state.keystores,
		keystoreId: state.selectKeystoreId,
		isUnlocked: state.isUnlocked,
		setIsUnlocked: state.setIsUnlockedAction,
		addKeystore: state.addKeystoreAction,
		removeKeystore: state.removeKeystoreAction,
		selectKeystore: state.selectKeystoreAction,
		changeKeystoreName: state.changeKeystoreNameAction,
		lock: state.lockAction,
		removeWallet: state.removeWalletAction,
	}))
	const { approvedWebsites, reset, addPendingAction } = useNoneSharedStore(state => ({
		approvedWebsites: state.approvedWebsites,
		reset: state.resetAction,
		addPendingAction: state.addPendingActionAction,
	}))

	const [state, setState] = useImmer<ImmerT>({
		isOpen: false,
		canConnectToTab: false,
		isConnected: false,
		keystoreId: undefined,
		editing: undefined,
		tempEdit: '',
		currentTabId: 0,
		currentTabHost: '',
	})
	const isHideZ3usMenu =
		isSendRoute ||
		isSendRouteRri ||
		isDepositRoute ||
		isDepositRouteRri ||
		isActivityRoute ||
		isSwapRoute ||
		isNotificationRoute

	useEffect(() => {
		const load = async () => {
			const tab = await browserService.getCurrentTab()
			const tabURL = tab?.url ? new URL(tab.url) : null
			const tabHost = tabURL?.host || ''

			const hasContentScript = await checkContentScript(tab.id)
			const isConnected = hasContentScript && tabHost in approvedWebsites

			setState(draft => {
				draft.isConnected = isConnected
				draft.currentTabId = tab?.id || 0
				draft.currentTabHost = tabHost
				draft.canConnectToTab = tabURL?.hostname && tabURL?.hostname !== popupURL.hostname
			})

			if (isConnected) {
				showConnected()
			} else {
				showDisconnected()
			}
		}
		if (isUnlocked) load()
	}, [isUnlocked])

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
			if (state.currentTabId && state.currentTabHost) {
				const messageId = `${CONNECT}-${generateId()}`
				addPendingAction(messageId, {
					host: state.currentTabHost,
					request: { tabId: state.currentTabId },
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

	const Icon = state.isConnected ? (
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
						<Button iconOnly aria-label="Z3US menu" color="ghost" size="4" css={{ mr: '2px' }}>
							{!state.canConnectToTab ? <Z3usIcon /> : Icon}
						</Button>
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
						{state.canConnectToTab && !state.isConnected && (
							<DropdownMenu>
								<DropdownMenuTriggerItem onClick={handleInjectContentScript}>
									<Box css={{ flex: '1', pr: '$1' }}>
										<Text size="2" bold truncate css={{ maxWidth: '130px' }}>
											Connect to {state.currentTabHost}
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
