// @ts-nocheck
// TODO: fix ts
import clsx from 'clsx'
import type { ClassValue } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'

import { getShortAddress } from '../../utils/string-utils'
import { CopyAddressButton } from '../copy-address-button'
import * as styles from './account-cards.css'

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
					<motion.li
						key={accountId}
						className={clsx(styles.card, isAllAccount && styles.cardAllWrapper)}
						style={{
							backgroundImage,
						}}
						variants={{
							selected: {
								opacity: 1,
								zIndex: 1,
								transition: { ease: 'easeOut', duration: 0.3 },
							},
							notSelected: {
								opacity: 0,
								zIndex: 0,
								transition: { ease: 'easeOut', duration: 0.3 },
							},
						}}
						animate={selectedCardIndex === cardIndex ? 'selected' : 'notSelected'}
					>
						<Box className={clsx(styles.cardAccountWrapper)}>
							<Box flexGrow={1} paddingTop="xsmall" display="flex" gap="small">
								<Text size="large" weight="medium" className={styles.cardAccountTextSpaced}>
									<Box
										component="span"
										className={clsx(styles.cardAccountText, isAllAccount && styles.cardAccountTextAll)}
									>
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
									<Box
										component="span"
										className={clsx(styles.cardAccountText, isAllAccount && styles.cardAccountTextAll)}
									>
										{accountBalance}
									</Box>
								</Text>
								<Text size="large" weight="strong">
									<Box
										component="span"
										className={clsx(styles.cardAccountText, isAllAccount && styles.cardAccountTextAll)}
									>
										{accountName}
									</Box>
								</Text>
							</Box>
						</Box>
						<Box className={styles.cardAccountShine} />
					</motion.li>
				))}
			</motion.ul>
		</AnimatePresence>
	)
}
