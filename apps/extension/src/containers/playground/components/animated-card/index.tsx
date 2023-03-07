import clsx from 'clsx'
import { motion } from 'framer-motion'
import React from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import * as styles from './animated-card.css'

interface IAnimatedCardRequiredProps {
	backgroundImage: string
	selectedCardIndex: number
	cardIndex: number
	animateOnScroll: boolean
	accountId: string
	accountBalance: string
	accountName: string
}

interface IAnimatedCardOptionalProps {
	className?: string
}

interface IAnimatedCardProps extends IAnimatedCardRequiredProps, IAnimatedCardOptionalProps {}

const defaultProps: IAnimatedCardOptionalProps = {
	className: undefined,
}

export const AnimatedCard: React.FC<IAnimatedCardProps> = props => {
	const {
		className,
		backgroundImage,
		selectedCardIndex,
		cardIndex,
		animateOnScroll,
		accountId,
		accountBalance,
		accountName,
	} = props

	return (
		<motion.li
			className={clsx(styles.card, className)}
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
			<Box className={clsx(styles.cardAccountWrapper, animateOnScroll && styles.cardAccountWrapperAnimated)}>
				<Box flexGrow={1} paddingTop="xsmall">
					<Text size="large" weight="medium" color="white" className={styles.cardAccountText}>
						{accountId}
					</Text>
				</Box>
				<Box paddingBottom="xsmall">
					<Text size="xlarge" weight="stronger" color="white">
						{accountBalance}
					</Text>
					<Text size="large" weight="strong" color="white">
						{accountName}
					</Text>
				</Box>
			</Box>
			<Box className={styles.cardAccountShine} />
		</motion.li>
	)
}

AnimatedCard.defaultProps = defaultProps
