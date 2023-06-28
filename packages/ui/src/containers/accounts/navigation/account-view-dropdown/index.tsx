import clsx, { type ClassValue } from 'clsx'
import { useNetworkId } from 'packages/ui/src/hooks/dapp/use-network-id'
import { getShortAddress } from 'packages/ui/src/utils/string-utils'
import React, { forwardRef } from 'react'

import { Box } from 'ui/src/components/box'
import type { TStyleVariant } from 'ui/src/components/button'
import { Button } from 'ui/src/components/button'
import {
	DropdownMenu,
	DropdownMenuArrow,
	DropdownMenuContent,
	DropdownMenuItemIndicator,
	DropdownMenuLeftSlot,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from 'ui/src/components/dropdown-menu'
import { CheckIcon, ChevronDownIcon } from 'ui/src/components/icons'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import SimpleBar from 'ui/src/components/simple-bar'
import { Text } from 'ui/src/components/typography'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { useWalletAccounts } from 'ui/src/hooks/use-wallet-account'

import * as styles from './account-view-dropdown.css'

interface IAccountViewDropdownProps {
	className?: ClassValue
	styleVariant?: TStyleVariant
	isLeftButtonIconVisible?: boolean
}

// TODO: rename and move inside the navigation
export const AccountViewDropdown = forwardRef<HTMLElement, IAccountViewDropdownProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, styleVariant = 'tertiary', isLeftButtonIconVisible = true } = props

		const isMobile = useIsMobileWidth()
		const networkId = useNetworkId()
		const accounts = useWalletAccounts()
		const { addressBook, selectedAccount, selectAccount } = useNoneSharedStore(state => ({
			addressBook: state.addressBook[networkId] || {},
			selectedAccount: state.selectedAccount,
			selectAccount: state.selectAccountAction,
		}))

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
							<SimpleBar className={styles.accountViewSimpleBarWrapper}>
								<Box className={styles.accountViewScrollAreaWrapper}>
									<DropdownMenuRadioGroup value={selectAccount} onValueChange={selectAccount}>
										{Object.values(accounts).map(account => (
											<DropdownMenuRadioItem key={account.address} value={account.address}>
												<DropdownMenuLeftSlot>
													<Box
														style={{ width: '60px', height: '40px' }}
														borderRadius="small"
														flexShrink={0}
														background="backgroundPrimary"
														marginRight="small"
													/>
												</DropdownMenuLeftSlot>
												<Box flexGrow={1} style={{ maxWidth: '98px' }}>
													<Text size="xsmall" truncate>
														{account.name}
													</Text>
												</Box>
												{account.address === selectedAccount && (
													<DropdownMenuItemIndicator>
														<CheckIcon />
													</DropdownMenuItemIndicator>
												)}
											</DropdownMenuRadioItem>
										))}
									</DropdownMenuRadioGroup>
								</Box>
							</SimpleBar>
							<DropdownMenuArrow />
						</DropdownMenuContent>
					</DropdownMenuPortal>
				</DropdownMenu>
			</Box>
		)
	},
)
