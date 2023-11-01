import clsx from 'clsx'
import type { ClassValue } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import {
	DropdownMenu,
	DropdownMenuArrow,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLeftSlot,
	DropdownMenuPortal,
	DropdownMenuTrigger,
} from 'ui/src/components/dropdown-menu'
import { DotsHorizontalCircleIcon, TrashIcon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components/typography'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useAddressBook } from 'ui/src/hooks/use-address-book'
import { useNoneSharedStore, useSharedStore } from 'ui/src/hooks/use-store'
import { type AddressBookEntry, KeystoreType, SCHEME } from 'ui/src/store/types'
import { getShortAddress } from 'ui/src/utils/string-utils'

import { useNetworkId } from '../../hooks/dapp/use-network-id'
import { useZdtState } from '../../hooks/zdt/use-zdt'
import { CopyAddressButton } from '../copy-address-button'
import * as styles from './account-cards.css'

const messages = defineMessages({
	legacy: {
		defaultMessage: '(Legacy)',
		id: 'GIGKXJ',
	},
	delete_account: {
		defaultMessage: 'Delete account',
		id: 'wyxJrL',
	},
	confirm: {
		defaultMessage: 'Are you sure you want to delete account {address} ?',
		id: 'RFnHfO',
	},
})

interface IAccountCardIconProps {
	address: string
	className?: string
}

export const AccountCardIcon: React.FC<IAccountCardIconProps> = props => {
	const { address, className } = props

	const addressBook = useAddressBook()
	const account = addressBook[address]

	return (
		<Box
			className={clsx(styles.accountCardIconWrapper, className)}
			style={{
				...(account?.cardImage
					? {
							backgroundImage: `url(/images/account-images/${account?.cardImage}), ${account?.cardColor}`,
					  }
					: {}),
			}}
		/>
	)
}

interface IAccountCardProps {
	address: string
	isAllAccount?: boolean
	visible?: boolean
	showCopyAddressButton?: boolean
	showAccountOptions?: boolean
	className?: string
}

export const AccountCard: React.FC<IAccountCardProps> = props => {
	const {
		address,
		isAllAccount = false,
		visible = true,
		showCopyAddressButton = true,
		showAccountOptions = true,
		className,
	} = props

	const intl = useIntl()
	const addressBook = useAddressBook()
	const networkId = useNetworkId()
	const { isWallet, confirm } = useZdtState()
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))
	const { currency, accountIndexes, removeAccount } = useNoneSharedStore(state => ({
		currency: state.currency,
		accountIndexes: state.accountIndexes[networkId] || {},
		removeAccount: state.removeAccountAction,
	}))
	const { data: balanceData } = useBalances(address)
	const { totalValue = 0 } = balanceData || {}

	const account = addressBook[address]
	const isLegacy = accountIndexes[address]?.scheme === SCHEME.BIP440OLYMPIA
	const canRemoveAccount = isWallet && keystore?.type !== KeystoreType.RADIX_WALLET

	const handleRemoveAccount = async () => {
		await confirm(
			intl.formatMessage(messages.confirm, { address: getShortAddress(address) }),
			intl.formatMessage(messages.delete_account),
			false,
		)
		removeAccount(networkId, address)
	}

	return (
		<motion.li
			key={address}
			className={clsx(styles.card, isAllAccount && styles.cardAllWrapper, className)}
			style={{
				...(account?.cardImage
					? { backgroundImage: `url(/images/account-images/${account?.cardImage}), ${account?.cardColor}` }
					: {}),
			}}
			variants={{
				visible: {
					opacity: 1,
					transition: { ease: 'easeOut', duration: 0.3 },
				},
				notVisible: {
					opacity: 0,
					transition: { ease: 'easeOut', duration: 0.3 },
				},
			}}
			animate={visible ? 'visible' : 'notVisible'}
		>
			<Box className={clsx(styles.cardAccountWrapper)}>
				<Box flexGrow={1} paddingTop="xsmall" display="flex" gap="small">
					<Text size="large" weight="medium" className={styles.cardAccountTextSpaced}>
						<Box component="span" className={clsx(styles.cardAccountText, isAllAccount && styles.cardAccountTextAll)}>
							{getShortAddress(address)}
						</Box>
					</Text>
					{showCopyAddressButton ? (
						<Box className={styles.copyAddressButtonWrapper}>
							<CopyAddressButton
								styleVariant="white-transparent"
								address={address}
								iconOnly
								rounded={false}
								tickColor="white"
							/>
						</Box>
					) : null}
					<Box display="flex" flexGrow={1} justifyContent="flex-end" alignItems="flex-start">
						{showAccountOptions && canRemoveAccount && (
							<Box className={styles.accountDropdownWrapper}>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button iconOnly sizeVariant="small" styleVariant="white-transparent">
											<DotsHorizontalCircleIcon />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuPortal>
										<DropdownMenuContent align="end" sideOffset={2} className={styles.accountDropdownContentWrapper}>
											<DropdownMenuItem onSelect={handleRemoveAccount}>
												<DropdownMenuLeftSlot>
													<TrashIcon />
												</DropdownMenuLeftSlot>
												<Box display="flex" marginLeft="xsmall">
													<Text size="xsmall" truncate>
														{intl.formatMessage(messages.delete_account)}
													</Text>
												</Box>
											</DropdownMenuItem>
											<DropdownMenuArrow />
										</DropdownMenuContent>
									</DropdownMenuPortal>
								</DropdownMenu>
							</Box>
						)}
					</Box>
				</Box>
				<Box paddingBottom="xsmall" display="flex" flexDirection="column">
					<Text size="xlarge" weight="stronger">
						<Box component="span" className={clsx(styles.cardAccountText, isAllAccount && styles.cardAccountTextAll)}>
							{intl.formatNumber(totalValue, {
								style: 'currency',
								currency,
							})}
						</Box>
					</Text>
					<Text size="large" weight="strong">
						<Box component="span" className={clsx(styles.cardAccountText, isAllAccount && styles.cardAccountTextAll)}>
							{`${account?.name} ${isLegacy ? intl.formatMessage(messages.legacy) : ``}`}
						</Box>
					</Text>
				</Box>
			</Box>
			<Box className={styles.cardAccountShine} />
		</motion.li>
	)
}

interface IAccountCardsProps {
	className?: ClassValue
	isAllAccount?: boolean
	showCopyAddressButton?: boolean
	accounts: AddressBookEntry[]
	selectedCardIndex: number
	isCardShadowVisible?: boolean
}

export const AccountCards: React.FC<IAccountCardsProps> = props => {
	const {
		className,
		isAllAccount = false,
		accounts,
		selectedCardIndex = 0,
		showCopyAddressButton = false,
		isCardShadowVisible = true,
	} = props

	return (
		<AnimatePresence initial={false}>
			<motion.ul
				key="cards"
				initial={{ opacity: 0, y: 0 }}
				animate={{
					opacity: 1,
					y: 0,
					x: 0,
				}}
				exit={{ opacity: 0, y: 0 }}
				transition={{ duration: 0.3 }}
				className={clsx(styles.cardWrapperAll, isCardShadowVisible && styles.cardShadow, className)}
			>
				{accounts.map(({ address }, cardIndex: number) => (
					<AccountCard
						key={address}
						address={address}
						isAllAccount={isAllAccount}
						visible={selectedCardIndex === cardIndex}
						showCopyAddressButton={showCopyAddressButton}
					/>
				))}
			</motion.ul>
		</AnimatePresence>
	)
}
