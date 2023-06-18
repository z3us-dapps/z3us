import clsx, { type ClassValue } from 'clsx'
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
import SimpleBar from 'ui/src/components/simple-bar'
import { Text } from 'ui/src/components/typography'
import { CheckIcon, ChevronDownIcon } from 'ui/src/components/icons'

import { TokenImageIcon } from '@src/components/token-image-icon'
import { useIsMobileWidth } from '@src/hooks/use-is-mobile'
import { useNoneSharedStore } from '@src/hooks/use-store'
import { useWalletAccounts } from '@src/hooks/use-wallet-account'

import * as styles from './account-view-dropdown.css'

interface IAccountViewDropdownRequiredProps {
	// onChange: (view: string) => void
}

interface IAccountViewDropdownOptionalProps {
	className?: ClassValue
	styleVariant?: TStyleVariant
	isLeftButtonIconVisible?: boolean
}

interface IAccountViewDropdownProps extends IAccountViewDropdownRequiredProps, IAccountViewDropdownOptionalProps {}

const defaultProps: IAccountViewDropdownOptionalProps = {
	className: undefined,
	styleVariant: 'tertiary',
	isLeftButtonIconVisible: true,
}

export const AccountViewDropdown = forwardRef<HTMLElement, IAccountViewDropdownProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, styleVariant, isLeftButtonIconVisible } = props

		const isMobile = useIsMobileWidth()
		const accounts = useWalletAccounts()
		const { addressBook, selectedAccount, selectAccount } = useNoneSharedStore(state => ({
			addressBook: state.addressBook,
			selectedAccount: state.selectedAccount,
			selectAccount: state.selectAccountAction,
		}))

		console.log(selectAccount)

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
									<Box style={{ marginRight: '4px' }}>
										<TokenImageIcon
											size="small"
											imgSrc="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
											imgAlt="btc token image"
											fallbackText="btc"
										/>
									</Box>
								) : null
							}
							rightIcon={<ChevronDownIcon />}
						>
							{addressBook[selectedAccount]?.name}
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
									<DropdownMenuRadioGroup value="light" onValueChange={(...args) => {console.log('DropdownMenuRadioGroup', args)}}>
										{accounts.map((account, idx) => (
											<DropdownMenuRadioItem value={idx % 2 === 0 ? 'light' : 'dark'}>
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

AccountViewDropdown.defaultProps = defaultProps
