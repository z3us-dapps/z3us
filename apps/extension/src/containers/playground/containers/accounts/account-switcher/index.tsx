/* eslint-disable */
import React, { forwardRef, useEffect, useState, useRef } from 'react'
import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import { PlusIcon, MagnifyingGlassIcon, ArrowLeftIcon, ArrowRightIcon } from 'ui/src/components/icons'
// import { Button } from 'ui/src/components-v2/button'
import { Button } from '@src/components/button'
import clsx from 'clsx'
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'
// import { useLocationKey } from '@src/containers/playground/hooks/use-location-key'
import move from 'lodash-move'

import * as styles from './account-switcher.css'

// const singleCards = [1, 2, 3, 4, 5]

const cardVariants = {
	selected: {
		rotateY: 0,
		scale: 1,
		transition: { duration: 0.35 },
		zIndex: 10,
		boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
	},
	notSelected: i => ({
		rotateY: i * 15,
		scale: 1 - Math.abs(i * 0.15),
		x: i ? i * 50 : 0,
		opacity: 1 - Math.abs(i * 0.15),
		zIndex: 10 - Math.abs(i),
		boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
		transition: { duration: 0.35 },
	}),
}

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
		transition: { duration: isMounted ? 0.4 : 0, type: 'spring', stiffness: 200, damping: 20 },
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

const SLIDER_WIDTH = 324

export const AccountSwitcher = forwardRef<HTMLButtonElement, IAccountSwitcherProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { disabled, iconOnly, onClick, className, sizeVariant, styleVariant } = props

		const navigate = useNavigate()
		const { account, assetType, asset } = useAccountParams()
		const [isMounted, setIsMounted] = useState<boolean>(false)
		const [animate, setAnimate] = useState<string>('initial')
		const [cards, setCards] = useState<Array<any>>(CARD_COLORS)

		const [isCardsHovered, setIsCardsHovered] = useState<boolean>(false)
		const cardsLength = cards.length - 1
		const isAllAccounts = account === 'all'

		// content for account cards
		const [xVal, setXVal] = useState<number>(0)
		const [selectedIndexCard, setSelectedIndexCard] = useState<number>(0)
		//  end content for account cards

		const handleMouseEnter = () => {
			setIsMounted(true)
			setIsCardsHovered(true)
		}

		const handleMouseLeave = () => {
			setIsCardsHovered(false)
		}

		const handleCardClick = (_account: string) => {
			setIsMounted(true)
			const cardIndex = CARD_COLORS.findIndex(({ accountName }) => accountName === _account)
			setXVal(cardIndex * -SLIDER_WIDTH)
			setSelectedIndexCard(cardIndex)
			navigate(`/accounts/${_account}/${assetType}`)
			// setAnimate('transitioning')
		}

		const handleGotoNextAccount = () => {
			if (selectedIndexCard === CARD_COLORS.length - 1) return
			const newIndex = selectedIndexCard + 1
			setSelectedIndexCard(newIndex)
			setXVal(newIndex * -SLIDER_WIDTH)
		}

		const handleGotoPrevAccount = () => {
			if (selectedIndexCard === 0) return
			const newIndex = selectedIndexCard - 1
			setSelectedIndexCard(newIndex)
			setXVal(newIndex * -SLIDER_WIDTH)
		}

		console.log('selectedIndexCard ', selectedIndexCard)

		useEffect(() => {
			setIsCardsHovered(false)
			// const cardIndex = cards.findIndex(_card => _card?.accountName === account)
			// setAnimate('transitioning')
			// if (!isMounted && cardIndex >= 0) {
			// 	setCards(move(cards, cardIndex, 0))
			// 	setAnimate('initial')
			// } else if (cardIndex >= 0) {
			// 	setAnimate('transitioning')
			// 	setSelectedCard(cardIndex)
			// 	setTimeout(() => {
			// 		setCards(move(cards, cardIndex, 0))
			// 		setAnimate('initial')
			// 	}, 500)
			// }
		}, [account])

		// useEffect(() => {
		// 	setXVal(selectedIndexCard * -SLIDER_WIDTH)
		// }, [selectedIndexCard])

		return (
			<>
				<Box paddingTop="large" paddingX="large" display="flex" alignItems="center">
					{isAllAccounts ? (
						<>
							<Box flexGrow={1}>
								<Text size="xlarge" weight="medium" color="strong">
									Accounts
								</Text>
							</Box>
							<Button
								styleVariant="ghost"
								sizeVariant="small"
								onClick={() => {
									console.log(99, 'new account')
								}}
							>
								<PlusIcon />
								New account
							</Button>
						</>
					) : (
						<>
							<Box flexGrow={1}>
								<Button styleVariant="ghost" sizeVariant="small" to="/accounts/all/">
									<ArrowLeftIcon />
									All accounts
								</Button>
							</Box>
							<Box display="flex" gap="small">
								<Button iconOnly styleVariant="ghost" sizeVariant="small" onClick={handleGotoPrevAccount}>
									<ArrowLeftIcon />
								</Button>
								<Button iconOnly styleVariant="ghost" sizeVariant="small" onClick={handleGotoNextAccount}>
									<ArrowRightIcon />
								</Button>
							</Box>
						</>
					)}
				</Box>
				<Box
					paddingTop="large"
					paddingX="xlarge"
					borderBottom={1}
					borderColor="borderDivider"
					borderStyle="solid"
					flexShrink={0}
				>
					<Box ref={ref} display="flex" flexDirection="column" alignItems="center" style={{ minHeight: '230px' }}>
						<AnimatePresence initial={false}>
							{isAllAccounts ? (
								<motion.ul
									key="all"
									initial={{ opacity: 0, y: 0 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 50 }}
									transition={{ duration: 0.3 }}
									className={styles.cardWrapperAll}
									onMouseEnter={handleMouseEnter}
									onMouseLeave={handleMouseLeave}
								>
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
												custom={{ isCardsHovered, cardsLength, selectedIndexCard, index, isMounted }}
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
								</motion.ul>
							) : (
								<Box className={styles.cardWrapperAccount}>
									<motion.ul
										initial={false}
										animate={{ x: xVal }}
										transition={{ ease: 'easeOut', duration: 0.3 }}
										className={styles.cardWrapperAccountList}
										style={{ width: `${SLIDER_WIDTH * CARD_COLORS.length}px` }}
									>
										{CARD_COLORS.map(({ backgroundImage, accountName, accountId, accountBalance }, i) => (
											<motion.li
												key={accountId}
												className={styles.card}
												style={{ position: 'relative', backgroundImage }}
												onClick={() => handleCardClick(accountName)}
												variants={cardVariants}
												animate={selectedIndexCard === i ? 'selected' : 'notSelected'}
												custom={selectedIndexCard ? selectedIndexCard - i : 0}
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
										))}
									</motion.ul>
								</Box>
							)}
						</AnimatePresence>
					</Box>
				</Box>
			</>
		)
	},
)

AccountSwitcher.defaultProps = defaultProps
