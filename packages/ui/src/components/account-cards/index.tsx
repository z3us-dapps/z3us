import clsx from 'clsx'
import type { ClassValue } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useAddressBook } from 'ui/src/hooks/use-address-book'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import type { AddressBookEntry } from 'ui/src/store/types'
import { getShortAddress } from 'ui/src/utils/string-utils'

import { CopyAddressButton } from '../copy-address-button'
import * as styles from './account-cards.css'

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
	className?: string
}

export const AccountCard: React.FC<IAccountCardProps> = props => {
	const { address, isAllAccount = false, visible = true, showCopyAddressButton = true, className } = props

	const intl = useIntl()
	const addressBook = useAddressBook()
	const { data: balanceData } = useBalances(address)
	const { totalValue = 0 } = balanceData || {}
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const account = addressBook[address]

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
				</Box>
				<Box paddingBottom="xsmall">
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
							{account?.name}
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
