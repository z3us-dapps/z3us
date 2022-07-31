import React, { useEffect } from 'react'
import { useLocation } from 'wouter'
import { useSharedStore } from '@src/store'
import { LockedPanel } from '@src/components/locked-panel'
import { AnimatePresence, motion } from 'framer-motion'
import { Z3usMenu } from '@src/components/z3us-menu'
import { Box, MotionBox } from 'ui/src/components/atoms'
import { routesInfo, PANEL_HEIGHT, APP_WIDTH, ACCOUNTS, STAKING, SWAP, SETTINGS } from '@src/config'
import { Accounts } from './accounts'
import { Staking } from './staking'
import { Settings } from './settings'
import { Swap } from './swap'
import { FooterNavigation } from './components/footer-navigation'
import { HeaderNavigation } from './components/header-navigation'

const pageVariants = {
	enter: (_direction: number) => ({
		x: _direction > 0 ? APP_WIDTH : -APP_WIDTH,
		opacity: 0,
	}),
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1,
	},
	exit: (_direction: number) => ({
		zIndex: 0,
		x: _direction < 0 ? APP_WIDTH : -APP_WIDTH,
		opacity: 0,
	}),
}

const pageTransition = {
	x: { type: 'spring', stiffness: 300, damping: 30, duration: 2 },
	opacity: { duration: 0.2 },
}

const pageStyle = {
	position: 'absolute',
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'flex-end',
	bottom: '0',
	top: '0',
}

export const WalletPanel = (): JSX.Element => {
	const [location] = useLocation()
	const { isUnlocked, activeApp, keystores } = useSharedStore(state => ({
		activeApp: state.activeApp,
		keystores: state.keystores,
		isUnlocked: Boolean(state.masterSeed || state.isHardwareWallet),
	}))
	const [page, direction] = activeApp
	const routes = Object.values(routesInfo)

	useEffect(() => {
		if (keystores.length === 0) {
			window.location.hash = '#/onboarding'
		}
	}, [keystores])

	useEffect(() => {
		if (location === '/onboarding') {
			window.location.hash = `#/onboarding`
			return
		}
		const url = location.split('/wallet')?.[1]?.split('/')[1]
		const splitUrl = url?.split('?')[0]
		let toIndex = routes.findIndex(route => route.href === splitUrl)
		if (toIndex === -1) {
			toIndex = 0
			window.location.hash = `#/wallet/account`
		}
	}, [location])

	if (keystores.length === 0) {
		return null
	}

	return (
		<>
			{isUnlocked ? (
				<MotionBox
					initial={false}
					animate={isUnlocked ? 'unlocked' : 'locked'}
					css={{
						width: '100%',
						height: '100%',
						position: 'relative',
						overflow: 'hidden',
						background: page === ACCOUNTS ? '$bgPanel2' : '$bgPanel',
						transition: 'background-color 300ms ease-out',
					}}
				>
					<HeaderNavigation />
					<Box css={{ position: 'absolute', top: '48px', bottom: '0', left: '0', right: '0' }}>
						<MotionBox
							variants={{
								locked: {
									transform: `translateY(${PANEL_HEIGHT})`,
									transition: {
										type: 'spring',
										stiffness: 200,
										damping: 20,
									},
								},
								unlocked: () => ({
									transform: 'translateY(0px)',
									transition: {
										delay: 0,
										type: 'spring',
										stiffness: 200,
										damping: 26,
									},
								}),
							}}
							css={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'flex-end',
								width: '100%',
								position: 'absolute',
								bottom: '0',
								height: PANEL_HEIGHT,
							}}
						>
							<AnimatePresence initial={false} custom={direction}>
								<motion.div
									key={`page-${page}`}
									initial="enter"
									animate="center"
									exit="exit"
									variants={pageVariants}
									custom={direction}
									style={{
										...(pageStyle as any),
									}}
									transition={pageTransition}
								>
									{page === ACCOUNTS ? <Accounts /> : null}
									{page === STAKING ? <Staking /> : null}
									{page === SWAP ? <Swap /> : null}
									{page === SETTINGS ? <Settings /> : null}
								</motion.div>
							</AnimatePresence>
							<FooterNavigation />
						</MotionBox>
					</Box>
				</MotionBox>
			) : null}
			<LockedPanel />
			<Z3usMenu />
		</>
	)
}
