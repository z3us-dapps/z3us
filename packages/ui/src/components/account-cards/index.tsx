import clsx from 'clsx'
import type { ClassValue } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'

import { getShortAddress } from '../../utils/string-utils'
import { CopyAddressButton } from '../copy-address-button'
import * as styles from './account-cards.css'

interface IAccountCardProps {
	id: string
	isAllAccount?: boolean
	visible?: boolean
	backgroundImage: string
	showCopyAddressButton?: boolean
	accountBalance: string
	accountName: string
	accountAddress: string
	className: string
}

export const AccountCard: React.FC<IAccountCardProps> = props => {
	const {
		id,
		isAllAccount = false,
		backgroundImage,
		visible = true,
		showCopyAddressButton = true,
		accountBalance,
		accountName,
		accountAddress,
		className,
	} = props

	return (
		<motion.li
			key={id}
			className={clsx(styles.card, isAllAccount && styles.cardAllWrapper, className)}
			style={{
				backgroundImage,
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
							{getShortAddress(accountAddress)}
						</Box>
					</Text>
					{showCopyAddressButton ? (
						<Box className={styles.copyAddressButtonWrapper}>
							<CopyAddressButton
								styleVariant="white-transparent"
								address={accountAddress}
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
							{accountBalance}
						</Box>
					</Text>
					<Text size="large" weight="strong">
						<Box component="span" className={clsx(styles.cardAccountText, isAllAccount && styles.cardAccountTextAll)}>
							{accountName}
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
	// should be typed, and required
	accountCards?: any
	selectedCardIndex: number
	isCardShadowVisible?: boolean
}

export const AccountCards: React.FC<IAccountCardsProps> = props => {
	const {
		className,
		isAllAccount = false,
		accountCards,
		selectedCardIndex = 0,
		showCopyAddressButton = false,
		isCardShadowVisible = true,
	} = props

	const accountAddress = 'rdx183794872309487'

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
				{accountCards.map(({ backgroundImage, accountName, accountId, accountBalance }, cardIndex: number) => (
					<AccountCard
						id={accountId}
						isAllAccount={isAllAccount}
						visible={selectedCardIndex === cardIndex}
						backgroundImage={backgroundImage}
						accountName={accountName}
						accountBalance={accountBalance}
						accountAddress={accountAddress}
						showCopyAddressButton={showCopyAddressButton}
					/>
				))}
			</motion.ul>
		</AnimatePresence>
	)
}
