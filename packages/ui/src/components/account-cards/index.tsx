import clsx from 'clsx'
import type { ClassValue } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate, useSearchParams } from 'react-router-dom'

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
import { DotsHorizontalCircleIcon, InformationIcon, TrashIcon } from 'ui/src/components/icons'
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
	show_details: {
		defaultMessage: 'Show details',
		id: 's2XIgr',
	},
	delete_account: {
		defaultMessage: 'Delete account',
		id: 'wyxJrL',
	},
	confirm: {
		defaultMessage: 'Are you sure you want to delete account {address}?',
		id: 'nusXRL',
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
	enableClick?: boolean
	className?: string
}

export const AccountCard: React.FC<IAccountCardProps> = props => {
	const {
		address,
		isAllAccount = false,
		visible = true,
		showCopyAddressButton = true,
		showAccountOptions = true,
		enableClick = false,
		className,
	} = props

	const intl = useIntl()
	const navigate = useNavigate()
	const [searchParams, setSearchParams] = useSearchParams()
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

	const handleRemoveAccount = async event => {
		event.stopPropagation()
		await confirm({
			title: intl.formatMessage(messages.delete_account),
			content: intl.formatMessage(messages.confirm, { address: getShortAddress(address) }),
			buttonTitle: intl.formatMessage(messages.delete_account),
			buttonStyleVariant: 'destructive',
			ignorePassword: true,
		})

		removeAccount(networkId, address)
	}

	const handleShowDetails = event => {
		event.stopPropagation()
		searchParams.delete('tx')
		searchParams.set('query', `${address}`)
		setSearchParams(searchParams)
	}

	const handleClick = () => {
		if (!enableClick) return
		navigate(`/accounts/${address}?${searchParams}`)
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
			<Box className={clsx(styles.cardAccountWrapper)} onClick={handleClick}>
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
					<Text
						color="white"
						size="large"
						weight="strong"
						truncate
						className={clsx(styles.cardAccountText, isAllAccount && styles.cardAccountTextAll)}
					>
						{`${account?.name} ${isLegacy ? intl.formatMessage(messages.legacy) : ``}`}
					</Text>
				</Box>
			</Box>
			{showAccountOptions && (
				<Box className={styles.accountDropdownWrapper}>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button iconOnly sizeVariant="small" styleVariant="white-transparent">
								<DotsHorizontalCircleIcon />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuPortal>
							<DropdownMenuContent align="end" sideOffset={2} className={styles.accountDropdownContentWrapper}>
								<DropdownMenuItem onSelect={handleShowDetails}>
									<DropdownMenuLeftSlot>
										<InformationIcon />
									</DropdownMenuLeftSlot>
									<Box display="flex" marginLeft="xsmall">
										<Text size="xsmall" truncate>
											{intl.formatMessage(messages.show_details)}
										</Text>
									</Box>
								</DropdownMenuItem>
								{canRemoveAccount && (
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
								)}
								<DropdownMenuArrow />
							</DropdownMenuContent>
						</DropdownMenuPortal>
					</DropdownMenu>
				</Box>
			)}
			<Box className={styles.cardAccountShine} />
		</motion.li>
	)
}

interface IAccountCardsProps {
	className?: ClassValue
	isAllAccount?: boolean
	enableClick?: boolean
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
		enableClick = false,
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
						enableClick={enableClick}
					/>
				))}
			</motion.ul>
		</AnimatePresence>
	)
}
