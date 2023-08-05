import clsx, { type ClassValue } from 'clsx'
import { useNetworkId } from 'packages/ui/src/hooks/dapp/use-network-id'
import { getShortAddress } from 'packages/ui/src/utils/string-utils'
import React, { forwardRef } from 'react'
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
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from 'ui/src/components/dropdown-menu'
import {
	CheckIcon,
	ChevronDownIcon,
	HardwareWalletIcon,
	HomeIcon,
	LockIcon,
	NetworkIcon,
	Settings2Icon,
	ShareIcon,
} from 'ui/src/components/icons'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Link } from 'ui/src/components/router-link'
import { ScrollAreaRadix as ScrollArea } from 'ui/src/components/scroll-area-radix'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { useDappStatus } from 'ui/src/hooks/use-dapp-status'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'
import { useNoneSharedStore, useSharedStore } from 'ui/src/hooks/use-store'
import { useWalletAccounts } from 'ui/src/hooks/use-wallet-account'
import { KeystoreType } from 'ui/src/store/types'

import * as styles from './account-view-dropdown.css'

interface IAccountViewDropdownProps {
	className?: ClassValue
	styleVariant?: TStyleVariant
	isLeftButtonIconVisible?: boolean
}

export const AccountViewDropdown = forwardRef<HTMLElement, IAccountViewDropdownProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, styleVariant = 'tertiary', isLeftButtonIconVisible = true } = props

		const isMobile = useIsMobileWidth()
		const networkId = useNetworkId()
		const accounts = useWalletAccounts()

		const navigate = useNavigate()

		const dappStatus = useDappStatus()
		const { addressBook, selectedAccount, selectAccount } = useNoneSharedStore(state => ({
			addressBook: state.addressBook[networkId] || {},
			selectedAccount: state.selectedAccount,
			selectAccount: state.selectAccountAction,
		}))

		const { selectedKeystoreId, keystores, selectKeystore } = useSharedStore(state => ({
			selectedKeystoreId: state.selectedKeystoreId,
			keystores: state.keystores,
			selectKeystore: state.selectKeystoreAction,
		}))

		const handleGoToSettings = () => {
			navigate('/accounts/settings')
		}

		const entries = { ...addressBook, ...accounts }

		return (
			<Box ref={ref} className={clsx(styles.accountViewDropdownWrapper, className)}>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							styleVariant={styleVariant}
							sizeVariant="small"
							rounded
							leftIcon={
								isLeftButtonIconVisible ? (
									<Box marginRight="xsmall">
										<ResourceImageIcon size="small" address={selectedAccount} />
									</Box>
								) : null
							}
							rightIcon={<ChevronDownIcon />}
						>
							{entries[selectedAccount]?.name || getShortAddress(selectedAccount)}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuPortal>
						<DropdownMenuContent
							align={isMobile ? 'start' : 'end'}
							sideOffset={2}
							className={styles.accountViewContentWrapper}
						>
							<Box className={styles.accountViewPaddingWrapper}>
								{dappStatus && (
									<DropdownMenuLabel>
										<Text size="xsmall" weight="strong" color="strong">
											<Translation capitalizeFirstLetter text="walletDropdown.contentScriptTitle" />{' '}
											<Link href="https://ociswap.com/">
												<Text size="xsmall" weight="strong" color="strong">
													{dappStatus.currentTabHost}
												</Text>
											</Link>
										</Text>
									</DropdownMenuLabel>
								)}
								<DropdownMenuLabel>
									<Text size="xsmall" weight="strong" color="strong">
										<Translation capitalizeFirstLetter text="walletDropdown.walletTitle" />
									</Text>
								</DropdownMenuLabel>
								<DropdownMenuRadioGroup value={selectedKeystoreId} onValueChange={selectKeystore}>
									{keystores.map(keystore => (
										<DropdownMenuRadioItem key={keystore.id} value={keystore.id}>
											<DropdownMenuLeftSlot>
												{keystore.type === KeystoreType.RADIX_WALLET && <HomeIcon />}
												{keystore.type === KeystoreType.HARDWARE && <HardwareWalletIcon />}
												{keystore.type === KeystoreType.LOCAL && <NetworkIcon />}
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
								<DropdownMenuSeparator />
							</Box>
							<Box className={styles.accountViewPaddingXWrapper}>
								<DropdownMenuLabel>
									<Text size="xsmall" weight="strong" color="strong">
										<Translation capitalizeFirstLetter text="walletDropdown.accountTitle" />
									</Text>
								</DropdownMenuLabel>
							</Box>
							<ScrollArea
								fixHeight
								className={styles.accountViewSimpleBarWrapper}
								renderScrollArea={() => (
									<Box className={styles.accountViewPaddingWrapper}>
										<DropdownMenuRadioGroup value={selectedAccount} onValueChange={selectAccount}>
											{Object.values(accounts).map(account => (
												<DropdownMenuRadioItem key={account.address} value={account.address}>
													<DropdownMenuLeftSlot>
														<Box
															style={{ width: '60px', height: '40px' }}
															borderRadius="small"
															flexShrink={0}
															background="backgroundPrimary"
															marginRight="small"
														>
															<ResourceImageIcon size="small" address={account.address} />
														</Box>
													</DropdownMenuLeftSlot>
													<Box flexGrow={1} style={{ maxWidth: '98px' }}>
														<Text size="xsmall" truncate>
															{account.name}
														</Text>
													</Box>
													<DropdownMenuItemIndicator>
														<CheckIcon />
													</DropdownMenuItemIndicator>
												</DropdownMenuRadioItem>
											))}
										</DropdownMenuRadioGroup>
									</Box>
								)}
							/>

							<Box className={styles.accountViewPaddingWrapper}>
								<DropdownMenuLabel>
									<Text size="xsmall" weight="strong" color="strong" truncate>
										<Translation capitalizeFirstLetter text="walletDropdown.personaTitle" />
									</Text>
								</DropdownMenuLabel>

								<DropdownMenuRadioGroup value="light" onValueChange={() => {}}>
									<DropdownMenuRadioItem value="light">
										<Box flexGrow={1}>
											<Text size="xsmall" truncate>
												Main persona
											</Text>
										</Box>
										<DropdownMenuItemIndicator>
											<CheckIcon />
										</DropdownMenuItemIndicator>
									</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="dark">
										<Box flexGrow={1}>
											<Text size="xsmall" truncate>
												Degen persona
											</Text>
										</Box>
										<DropdownMenuItemIndicator>
											<CheckIcon />
										</DropdownMenuItemIndicator>
									</DropdownMenuRadioItem>
								</DropdownMenuRadioGroup>

								<DropdownMenuSeparator />

								<DropdownMenuItem onSelect={handleGoToSettings}>
									<DropdownMenuLeftSlot>
										<Settings2Icon />
									</DropdownMenuLeftSlot>
									<Box display="flex" marginLeft="small">
										<Text size="xsmall" truncate>
											<Translation capitalizeFirstLetter text="walletDropdown.settingsTitle" />
										</Text>
									</Box>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<DropdownMenuLeftSlot>
										<LockIcon />
									</DropdownMenuLeftSlot>
									<Box display="flex" marginLeft="small">
										<Text size="xsmall" truncate>
											<Translation capitalizeFirstLetter text="walletDropdown.lockTitle" />
										</Text>
									</Box>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<DropdownMenuLeftSlot>
										<ShareIcon />
									</DropdownMenuLeftSlot>
									<Box display="flex" marginLeft="small">
										<Text size="xsmall" truncate>
											<Translation capitalizeFirstLetter text="walletDropdown.openInBrowserTitle" />
										</Text>
									</Box>
								</DropdownMenuItem>
							</Box>

							<DropdownMenuArrow />
						</DropdownMenuContent>
					</DropdownMenuPortal>
				</DropdownMenu>
			</Box>
		)
	},
)
