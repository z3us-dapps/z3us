/* eslint-disable */
import React, { forwardRef, useEffect, useState, useRef } from 'react'
import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import { PlusIcon, MagnifyingGlassIcon, ArrowLeftIcon, ArrowRightIcon, QrCodeIcon } from 'ui/src/components/icons'
import { Avatar, AvatarImage, AvatarFallback } from 'ui/src/components-v2/avatar'
import { Button } from '@src/components/button'
// import clsx from 'clsx'
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'

import * as styles from './account-switcher.css'

const CARD_COLORS = [
	{
		// accountId: 'rdx1...ldg0',
		accountName: 'all',
		accountBalance: '$80,043.43',
		// backgroundImage:
		// 	'url("/images/account-images/z3us-apple-hermes-v2.png"), radial-gradient(77.21% 96.45% at 50% 100%, #BF9E76 0%, #BF9E76 17.71%, #BF9E76 50.52%, #BF9E76 100%)',
	},
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
			'url("/images/account-images/z3us-athens.png"), radial-gradient(77.21% 96.45% at 50% 100%, #C0D7EF 0%, #C0D7EF 17.71%, #C0D7EF 50.52%, #C0D7EF 100%)',
	},
	{
		accountId: 'rdx1...ldg0',
		accountName: 'Defi',
		accountBalance: '$80,043.43',
		backgroundImage:
			'url("/images/account-images/z3us-apple-hermes-v2.png"), radial-gradient(77.21% 96.45% at 50% 100%, #BF9E76 0%, #BF9E76 17.71%, #BF9E76 50.52%, #BF9E76 100%)',
	},
]

interface IAccountSwitcherRequiredProps {}

interface IAccountSwitcherOptionalProps {
	isScrolled?: boolean
}

interface IAccountSwitcherProps extends IAccountSwitcherRequiredProps, IAccountSwitcherOptionalProps {}

const defaultProps: IAccountSwitcherOptionalProps = {
	isScrolled: false,
}

const SLIDER_WIDTH = 324

export const AccountSwitcher = forwardRef<HTMLButtonElement, IAccountSwitcherProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { isScrolled } = props
		console.log('isScrolled:', isScrolled)

		const navigate = useNavigate()
		const { account, assetType, asset } = useAccountParams()
		const [isMounted, setIsMounted] = useState<boolean>(false)
		const [cards, setCards] = useState<Array<any>>(CARD_COLORS)
		const [selectedIndexCard, setSelectedIndexCard] = useState<number>(0)

		const handleCardClick = (_account: string) => {
			setIsMounted(true)
			const cardIndex = CARD_COLORS.findIndex(({ accountName }) => accountName === _account)
			setSelectedIndexCard(cardIndex)
			navigate(`/accounts/${_account.toLowerCase()}${assetType ? `/${assetType}` : ''}`)
		}

		const handleGotoNextAccount = () => {
			if (selectedIndexCard === CARD_COLORS.length - 1) return
			const newIndex = selectedIndexCard + 1
			setSelectedIndexCard(newIndex)
			// eslint-disable-next-line
			const cardAccount = CARD_COLORS.find((item, index) => index === newIndex)
			navigate(`/accounts/${cardAccount.accountName.toLowerCase()}${assetType ? `/${assetType}` : ''}`)
		}

		const handleGotoPrevAccount = () => {
			if (selectedIndexCard === 0) return
			const newIndex = selectedIndexCard - 1
			setSelectedIndexCard(newIndex)
			// eslint-disable-next-line
			const cardAccount = CARD_COLORS.find((item, index) => index === newIndex)
			navigate(`/accounts/${cardAccount.accountName.toLowerCase()}${assetType ? `/${assetType}` : ''}`)
		}

		useEffect(() => {
			if (!isMounted) {
				const cardIndex = CARD_COLORS.findIndex(({ accountName }) => accountName.toLowerCase() === account)
				setSelectedIndexCard(cardIndex)
			}

			setIsMounted(true)
		}, [account])

		return (
			<>
				<Box display="flex" gap="small" className={styles.tempyy}></Box>
				{asset ? (
					<Box borderBottom={1} borderColor="borderDivider" borderStyle="solid" flexShrink={0}>
						<Box display="flex" flexDirection="column" alignItems="center">
							<Box display="flex" width="full" justifyContent="flex-end" paddingTop="large" paddingX="large">
								<Button iconOnly styleVariant="ghost" sizeVariant="small">
									<ArrowLeftIcon />
								</Button>
							</Box>
							<Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
								<Box paddingBottom="small">
									<Avatar>
										<AvatarImage
											className="AvatarImage"
											src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
											alt="Colm Tuite"
										/>
										<AvatarFallback className="AvatarFallback" delayMs={600}>
											CT
										</AvatarFallback>
									</Avatar>
								</Box>
								<Text size="large" color="strong">
									Bitcoin
								</Text>
								<Text size="xxxlarge" weight="medium" color="strong">
									$12,424
								</Text>
								<Text size="xlarge">+4,345 (13.3%)</Text>
							</Box>
							<Box display="flex" paddingTop="large" gap="large" position="relative" paddingBottom="large">
								<Button iconOnly rounded styleVariant="inverse" sizeVariant="large" onClick={() => {}}>
									<ArrowLeftIcon />
								</Button>
								<Button iconOnly rounded styleVariant="inverse" sizeVariant="large" onClick={() => {}}>
									<ArrowLeftIcon />
								</Button>
								<Button iconOnly rounded styleVariant="inverse" sizeVariant="large" onClick={() => {}}>
									<QrCodeIcon />
								</Button>
							</Box>
							<Box className={styles.tempBg}>asdfasdf</Box>
							<Box display="flex" paddingTop="small" paddingBottom="xlarge" gap="small">
								<Button rounded styleVariant="tertiary" sizeVariant="small" onClick={() => {}}>
									3M
								</Button>
								<Button rounded styleVariant="tertiary" sizeVariant="small" onClick={() => {}}>
									3M
								</Button>
								<Button rounded styleVariant="tertiary" sizeVariant="small" onClick={() => {}}>
									3M
								</Button>
								<Button rounded styleVariant="secondary" sizeVariant="small" onClick={() => {}}>
									All
								</Button>
							</Box>
						</Box>
					</Box>
				) : (
					<Box
						paddingTop="large"
						padding="large"
						borderBottom={1}
						borderColor="borderDivider"
						borderStyle="solid"
						flexShrink={0}
						className={styles.accountCardWrapper}
					>
						<Box display="flex" gap="small" className={styles.tempyy}>
							<Button
								iconOnly
								styleVariant="ghost"
								sizeVariant="small"
								onClick={handleGotoPrevAccount}
								disabled={selectedIndexCard === 0}
							>
								<ArrowLeftIcon />
							</Button>
							<Button
								iconOnly
								styleVariant="ghost"
								sizeVariant="small"
								onClick={handleGotoNextAccount}
								disabled={selectedIndexCard === CARD_COLORS.length - 1}
							>
								<ArrowRightIcon />
							</Button>
						</Box>
						<Box ref={ref} display="flex" flexDirection="column" alignItems="center">
							<AnimatePresence initial={false}>
								<motion.ul
									key="all"
									initial={{ opacity: 0, y: 0 }}
									animate={{
										opacity: 1,
										y: 0,
										width: isScrolled ? 183 : 344,
										height: isScrolled ? 106 : 200,
									}}
									exit={{ opacity: 0, y: 0 }}
									transition={{ duration: 0.3 }}
									className={styles.cardWrapperAll}
								>
									{cards.map(({ backgroundImage, accountName, accountId, accountBalance }, idx) => {
										return (
											<motion.li
												key={accountName}
												className={styles.card}
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
												animate={selectedIndexCard === idx ? 'selected' : 'notSelected'}
											>
												<Box paddingX="large" paddingY="medium" display="flex" flexDirection="column" height="full">
													<Box flexGrow={1} paddingTop="xsmall">
														<Text size="large" weight="medium" color="strong" className={styles.cardAccountText}>
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
												<Box className={styles.cardAccountShine} />
											</motion.li>
										)
									})}
								</motion.ul>
							</AnimatePresence>
							<Box display="flex" paddingTop="large" gap="large" position="relative" zIndex={1}>
								<Button iconOnly rounded styleVariant="inverse" sizeVariant="large" onClick={() => {}}>
									<ArrowLeftIcon />
								</Button>
								<Button iconOnly rounded styleVariant="inverse" sizeVariant="large" onClick={() => {}}>
									<ArrowLeftIcon />
								</Button>
								<Button iconOnly rounded styleVariant="inverse" sizeVariant="large" onClick={() => {}}>
									<QrCodeIcon />
								</Button>
							</Box>
						</Box>
					</Box>
				)}
			</>
		)
	},
)

AccountSwitcher.defaultProps = defaultProps
