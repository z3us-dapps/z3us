import React, { forwardRef, useEffect, useState } from 'react'
import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'
// import { useLocationKey } from '@src/containers/playground/hooks/use-location-key'
import move from 'lodash-move'

import * as styles from './account-switcher.css'

export const MOTION_VARIANTS = {
	initial: ({
		isMounted,
		isCardsHovered,
		cardsLength,
		index,
	}: {
		isMounted: boolean
		isCardsHovered: boolean
		cardsLength: number
		index: number
		direction: 'forward' | 'backward'
	}) => ({
		top: isCardsHovered ? (cardsLength - index) * 60 : (cardsLength - index) * 10,
		scale: isCardsHovered ? 1 : 1 - index * 0.14,
		zIndex: cardsLength - index,
		// transition: { type: 'spring', stiffness: 100, damping: 20, duration: 2 },
		// boxShadow:
		// 	'0px 136px 192px rgba(0, 0, 0, 0.3), 0px 50px 50px rgba(0, 0, 0, 0.25), 0px 24px 24px rgba(0, 0, 0, 0.2), 0px 12px 12px rgba(0, 0, 0, 0.15)',
		transition: { duration: isMounted ? 0.4 : 0 },
	}),
	transitioning: ({
		selectedCard,
		cardsLength,
		index,
	}: {
		selectedCard: number
		cardsLength: number
		index: number
		direction: 'forward' | 'backward'
	}) => ({
		top: index < selectedCard ? (cardsLength - index) * 60 + 129 : (cardsLength - index) * 60,
		scale: index === selectedCard ? 1.05 : 1 - index * 0.03,
		// boxShadow:
		// 	index === selectedCard
		// 		? 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px'
		// 		: '0px 136px 192px rgba(0, 0, 0, 0.3), 0px 50px 50px rgba(0, 0, 0, 0.25), 0px 24px 24px rgba(0, 0, 0, 0.2), 0px 12px 12px rgba(0, 0, 0, 0.15)',
		zIndex: cardsLength - index,
		// transition: { duration: 0 },
		transition: { type: 'spring', stiffness: 200, damping: 25 },
	}),
}

const CARD_COLORS = [
	{
		accountId: 'rdx1...6go0',
		accountName: 'Spend',
		accountBalance: '$1043.43',
		backgroundImage:
			'url("/images/account-images/z3us-apple-hermes.png"), radial-gradient(77.21% 96.45% at 50% 100%, #FE845E 0%, #E08BAB 17.71%, #AB8CFF 50.52%, #946DFF 100%)',
	},
	{
		accountId: 'rdx1...ma41',
		accountName: 'Savings',
		accountBalance: '$5043.43',
		backgroundImage:
			'url("/images/account-images/z3us-apple-hermes.png"), radial-gradient(77.21% 96.45% at 50% 100%, #C0D7EF 0%, #C0D7EF 17.71%, #C0D7EF 50.52%, #C0D7EF 100%)',
	},
	{
		accountId: 'rdx1...ldg0',
		accountName: 'Defi',
		accountBalance: '$80,043.43',
		backgroundImage:
			'url("/images/account-images/z3us-apple-hermes.png"), radial-gradient(77.21% 96.45% at 50% 100%, #BF9E76 0%, #BF9E76 17.71%, #BF9E76 50.52%, #BF9E76 100%)',
	},
]

interface IAccountSwitcherRequiredProps {}

interface IAccountSwitcherOptionalProps {
	className?: number
	onClick?: () => void
	disabled?: boolean
	iconOnly?: boolean
	sizeVariant?: 'small' | 'medium' | 'large'
	styleVariant?: 'primary' | 'secondary' | 'ghost'
}

interface IAccountSwitcherProps extends IAccountSwitcherRequiredProps, IAccountSwitcherOptionalProps {}

const defaultProps: IAccountSwitcherOptionalProps = {
	className: undefined,
	onClick: undefined,
	iconOnly: false,
	disabled: false,
	sizeVariant: 'medium',
	styleVariant: 'primary',
}

export const AccountSwitcher = forwardRef<HTMLButtonElement, IAccountSwitcherProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { disabled, iconOnly, onClick, className, sizeVariant, styleVariant } = props

		const navigate = useNavigate()
		const { account, assetType, asset } = useAccountParams()
		const [isMounted, setIsMounted] = useState<boolean>(false)
		const [animate, setAnimate] = useState<string>('initial')
		const [cards, setCards] = useState<Array<any>>(CARD_COLORS)
		const [selectedCard, setSelectedCard] = useState<number>(0)
		const [isCardsHovered, setIsCardsHovered] = useState<boolean>(false)
		const cardsLength = cards.length - 1

		const handleMouseEnter = () => {
			setIsMounted(true)
			setIsCardsHovered(true)
		}

		const handleMouseLeave = () => {
			setIsCardsHovered(false)
		}

		const handleCardClick = (_account: string) => {
			setIsMounted(true)

			navigate(`/accounts/${_account}/${assetType}`)
		}

		useEffect(() => {
			const cardIndex = cards.findIndex(_card => _card?.accountName === account)
			if (!isMounted && cardIndex >= 0) {
				setCards(move(cards, cardIndex, 0))
				setAnimate('initial')
			} else if (cardIndex >= 0) {
				setAnimate('transitioning')
				setSelectedCard(cardIndex)
				setTimeout(() => {
					setCards(move(cards, cardIndex, 0))
					setAnimate('initial')
				}, 500)
			}
		}, [account])

		return (
			<Box ref={ref} display="flex" flexDirection="column" alignItems="center" style={{ minHeight: '230px' }}>
				<ul className={styles.cardWrapper} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
					{cards.map(({ backgroundImage, accountName, accountId, accountBalance }, index) => {
						const canDrag = index === 0

						return (
							<motion.li
								key={accountId}
								className={styles.card}
								style={{
									backgroundImage,
								}}
								variants={MOTION_VARIANTS}
								animate={animate}
								custom={{ isCardsHovered, cardsLength, selectedCard, index, isMounted }}
								onClick={() => handleCardClick(accountName)}
							>
								<Box paddingX="large" paddingY="medium" display="flex" flexDirection="column" height="full">
									<Box flexGrow={1} paddingTop="xsmall">
										<Text size="large" weight="medium" color="strong" className={styles.cardAccount}>
											{accountId}
										</Text>
									</Box>
									<Box paddingBottom="xsmall">
										<Text size="xlarge" weight="stronger" color="strong">
											{accountBalance}
										</Text>
										<Text size="large" weight="strong" color="strong">
											{accountName}
										</Text>
									</Box>
								</Box>
							</motion.li>
						)
					})}
				</ul>
			</Box>
		)
	},
)

AccountSwitcher.defaultProps = defaultProps
