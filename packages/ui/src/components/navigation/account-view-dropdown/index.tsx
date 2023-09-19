import clsx, { type ClassValue } from 'clsx'
import React, { forwardRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import type { TStyleVariant } from 'ui/src/components/button'
import { Button } from 'ui/src/components/button'
import {
	DropdownMenu,
	DropdownMenuArrow,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuItemIndicator,
	DropdownMenuLabel,
	DropdownMenuLeftSlot,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuRightSlot,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from 'ui/src/components/dropdown-menu'
import {
	CheckIcon,
	ChevronRightIcon,
	HardwareWalletIcon,
	HomeIcon,
	LockIcon,
	MenuIcon,
	MoonIcon,
	PlusIcon,
	ShareIcon,
	SunIcon,
	Z3usIcon,
} from 'ui/src/components/icons'
import { Link } from 'ui/src/components/router-link'
import { Text } from 'ui/src/components/typography'
import { useDappStatus } from 'ui/src/hooks/use-dapp-status'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'
import { useSharedStore } from 'ui/src/hooks/use-store'
import { useTheme } from 'ui/src/hooks/use-theme'
import { useZdtState } from 'ui/src/hooks/zdt/use-zdt'
import { KeystoreType } from 'ui/src/store/types'
import { Theme } from 'ui/src/types/types'

import { ToolTip } from '../../tool-tip'
import * as styles from './styles.css'

interface IAccountViewDropdownProps {
	className?: ClassValue
	styleVariant?: TStyleVariant
}

const weights = {
	[KeystoreType.RADIX_WALLET]: 1,
	[KeystoreType.HARDWARE]: 2,
	[KeystoreType.LOCAL]: 3,
}

const messages = defineMessages({
	content_script: {
		id: 'account_menu.content_script',
		defaultMessage: 'Connected DApp: {DappLink}',
	},
	wallet: {
		id: 'account_menu.wallet',
		defaultMessage: 'Wallet',
	},
	wallet_add: {
		id: 'account_menu.wallet_add',
		defaultMessage: 'Add wallet...',
	},
	account: {
		id: 'account_menu.account',
		defaultMessage: 'Account',
	},
	persona: {
		id: 'account_menu.persona',
		defaultMessage: 'Persona',
	},
	settings: {
		id: 'account_menu.settings',
		defaultMessage: 'Settings',
	},
	lock: {
		id: 'account_menu.lock',
		defaultMessage: 'Lock',
	},
	open_in_browser: {
		id: 'account_menu.open_in_browser',
		defaultMessage: 'Open in browser',
	},
	theme: {
		id: 'account_menu.theme',
		defaultMessage: 'Theme',
	},
	theme_light: {
		id: 'account_menu.theme_light',
		defaultMessage: 'Light',
	},
	theme_dark: {
		id: 'account_menu.theme_dark',
		defaultMessage: 'Dark',
	},
	theme_system: {
		id: 'account_menu.theme_system',
		defaultMessage: 'System',
	},
	menu: {
		id: 'account_menu.menu',
		defaultMessage: 'Menu',
	},
})

export const AccountViewDropdown = forwardRef<HTMLElement, IAccountViewDropdownProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, styleVariant = 'ghost' } = props

		const intl = useIntl()
		const navigate = useNavigate()
		const { lock, isWallet } = useZdtState()
		const dappStatus = useDappStatus()
		const isMobile = useIsMobileWidth()
		const { resolvedTheme, theme, setTheme } = useTheme()
		const { selectedKeystoreId, keystores, selectKeystore } = useSharedStore(state => ({
			selectedKeystoreId: state.selectedKeystoreId,
			keystores: state.keystores,
			selectKeystore: state.selectKeystoreAction,
		}))

		const [isSwitchingKeystore, setIsSwitchingKeystore] = useState<boolean>(false)

		const handleSelectKeystore = async (id: string) => {
			setIsSwitchingKeystore(true)
			try {
				await lock()
				selectKeystore(id)
			} catch (err) {
				console.error(err)
			} finally {
				setIsSwitchingKeystore(false)
			}
		}

		const handleOpenInBrowser = () => {
			window.open(window.location.href, '_blank', 'noreferrer')
		}

		const handleAddNewWallet = () => {
			navigate('/keystore/new')
		}

		return (
			<Box ref={ref} className={clsx(styles.accountViewDropdownWrapper, className)}>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Box>
							<ToolTip message={intl.formatMessage(messages.menu)}>
								<Button styleVariant={styleVariant} sizeVariant="small" rounded iconOnly>
									<MenuIcon />
								</Button>
							</ToolTip>
						</Box>
					</DropdownMenuTrigger>
					<DropdownMenuPortal>
						<DropdownMenuContent
							align={isMobile ? 'start' : 'end'}
							sideOffset={2}
							className={styles.accountViewContentWrapper}
						>
							<Box className={styles.accountViewPaddingWrapper}>
								<DropdownMenuLabel>
									<Text size="xsmall" weight="strong" color="strong">
										{intl.formatMessage(messages.content_script, {
											DappLink: (
												<Link href={dappStatus.currentTabHost}>
													<Text size="xsmall" weight="strong" color="strong">
														{dappStatus.currentTabHost}
													</Text>
												</Link>
											),
										})}
									</Text>
								</DropdownMenuLabel>
								<DropdownMenuLabel>
									<Text size="xsmall" weight="strong" color="strong">
										{intl.formatMessage(messages.wallet)}
									</Text>
								</DropdownMenuLabel>
								<DropdownMenuRadioGroup
									disabled={isSwitchingKeystore}
									value={selectedKeystoreId}
									onValueChange={handleSelectKeystore}
								>
									{[...keystores]
										.sort((a, b) => weights[a.type] - weights[b.type])
										.map(keystore => (
											<DropdownMenuRadioItem key={keystore.id} value={keystore.id}>
												<DropdownMenuLeftSlot>
													{keystore.type === KeystoreType.RADIX_WALLET && <HomeIcon />}
													{keystore.type === KeystoreType.HARDWARE && <HardwareWalletIcon />}
													{keystore.type === KeystoreType.LOCAL && <Z3usIcon />}
												</DropdownMenuLeftSlot>
												<Box flexGrow={1} marginLeft="small">
													<Text size="xsmall"> {keystore.name}</Text>
												</Box>
												<DropdownMenuItemIndicator>
													<CheckIcon />
												</DropdownMenuItemIndicator>
											</DropdownMenuRadioItem>
										))}
								</DropdownMenuRadioGroup>

								{isWallet && (
									<DropdownMenuItem onSelect={handleAddNewWallet}>
										<DropdownMenuLeftSlot>
											<PlusIcon />
										</DropdownMenuLeftSlot>
										<Box display="flex" marginLeft="small">
											<Text size="xsmall" truncate>
												{intl.formatMessage(messages.wallet_add)}
											</Text>
										</Box>
									</DropdownMenuItem>
								)}
							</Box>

							<DropdownMenuSeparator />

							<Box className={styles.accountViewPaddingWrapper}>
								{isWallet && (
									<>
										<DropdownMenuItem onSelect={lock}>
											<DropdownMenuLeftSlot>
												<LockIcon />
											</DropdownMenuLeftSlot>
											<Box display="flex" marginLeft="small">
												<Text size="xsmall" truncate>
													{intl.formatMessage(messages.lock)}
												</Text>
											</Box>
										</DropdownMenuItem>
										<DropdownMenuItem onSelect={handleOpenInBrowser}>
											<DropdownMenuLeftSlot>
												<ShareIcon />
											</DropdownMenuLeftSlot>
											<Box display="flex" marginLeft="small">
												<Text size="xsmall" truncate>
													{intl.formatMessage(messages.open_in_browser)}
												</Text>
											</Box>
										</DropdownMenuItem>
									</>
								)}
								<DropdownMenuSub>
									<DropdownMenuSubTrigger>
										<DropdownMenuLeftSlot>
											{resolvedTheme === Theme.LIGHT && <SunIcon />}
											{resolvedTheme === Theme.DARK && <MoonIcon />}
										</DropdownMenuLeftSlot>
										<Box flexGrow={1} display="flex" marginLeft="small">
											<Text size="xsmall" truncate>
												{intl.formatMessage(messages.theme)}
											</Text>
										</Box>
										<DropdownMenuRightSlot>
											<ChevronRightIcon />
										</DropdownMenuRightSlot>
									</DropdownMenuSubTrigger>
									<DropdownMenuPortal>
										<DropdownMenuSubContent>
											<DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
												{[
													{ id: Theme.LIGHT, title: intl.formatMessage(messages.theme_light) },
													{ id: Theme.DARK, title: intl.formatMessage(messages.theme_dark) },
													{ id: Theme.SYSTEM, title: intl.formatMessage(messages.theme_system) },
												].map(({ id, title }) => (
													<DropdownMenuRadioItem key={id} value={id}>
														<Box flexGrow={1} marginLeft="small">
															<Text size="xsmall" capitalizeFirstLetter>
																{title}
															</Text>
														</Box>
														<DropdownMenuItemIndicator>
															<CheckIcon />
														</DropdownMenuItemIndicator>
													</DropdownMenuRadioItem>
												))}
											</DropdownMenuRadioGroup>
										</DropdownMenuSubContent>
									</DropdownMenuPortal>
								</DropdownMenuSub>
							</Box>
							<DropdownMenuArrow />
						</DropdownMenuContent>
					</DropdownMenuPortal>
				</DropdownMenu>
			</Box>
		)
	},
)
