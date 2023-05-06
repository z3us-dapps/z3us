import clsx from 'clsx'
import type { ClassValue } from 'clsx'
import { motion } from 'framer-motion'
import React from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import { CopyAddressButton } from '@src/components/copy-address-button'
import { getShortAddress } from '@src/utils/string-utils'

import * as styles from './animated-card.css'

interface IAnimatedCardRequiredProps {
	selectedCardIndex: number
	cardIndex: number
	accountAddress: string
	accountBalance: string
	accountName: string
	isAllAccount: boolean
}

interface IAnimatedCardOptionalProps {
	className?: ClassValue
	backgroundImage?: string
	showCopyAddressButton?: boolean
}

interface IAnimatedCardProps extends IAnimatedCardRequiredProps, IAnimatedCardOptionalProps {}

const defaultProps: IAnimatedCardOptionalProps = {
	className: undefined,
	backgroundImage: undefined,
	showCopyAddressButton: false,
}

export const AnimatedCard: React.FC<IAnimatedCardProps> = props => {
	const {
		className,
		backgroundImage,
		selectedCardIndex,
		cardIndex,
		accountAddress,
		accountBalance,
		accountName,
		showCopyAddressButton,
		isAllAccount,
	} = props

	return (
		<motion.li
			className={clsx(styles.card, isAllAccount && styles.cardAllWrapper, className)}
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

AnimatedCard.defaultProps = defaultProps
