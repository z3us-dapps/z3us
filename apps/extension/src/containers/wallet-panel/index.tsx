import React, { useEffect } from 'react'
import { useLocation } from 'wouter'
import { useStore } from '@src/store'
import { useImmer } from 'use-immer'
import { useColorMode } from '@src/hooks/use-color-mode'
import { LockedPanel } from '@src/components/locked-panel'
import { AnimatePresence, motion } from 'framer-motion'
import { Box, MotionBox } from 'ui/src/components/atoms'
import { Accounts } from './accounts'
import { Staking } from './staking'
import { Settings } from './settings'
import { FooterNavigation } from './components/footer-navigation'
import { HeaderNavigation } from './components/header-navigation'
import { routesInfo, PANEL_HEIGHT, APP_WIDTH } from './config'

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
	const isDarkMode = useColorMode()
	const { activeApp, account, hasKeystore } = useStore(state => ({
		activeApp: state.activeApp,
		account: state.account,
		hasKeystore: state.hasKeystoreAction,
	}))
	const [state, setState] = useImmer({
		hasCheckedKeyStore: false,
	})
	const [page, direction] = activeApp
	const routes = Object.values(routesInfo)
	const currentRoute = routesInfo[page]
	const walletPanelBgColor = currentRoute.bgColor[isDarkMode ? 1 : 0]

	useEffect(() => {
		const load = async () => {
			const hasKeystoreWallet = await hasKeystore()
			setState(draft => {
				draft.hasCheckedKeyStore = true
			})
			if (!hasKeystoreWallet) {
				window.location.hash = '#/onboarding'
			}
		}
		load()
	}, [])

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

	if (!state.hasCheckedKeyStore) {
		return <div />
	}

	return (
		<>
			<MotionBox
				initial={false}
				animate={account ? 'unlocked' : 'locked'}
				css={{
					width: '100%',
					height: '100%',
					position: 'relative',
					overflow: 'hidden',
					background: walletPanelBgColor,
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
							{page === 'accounts' ? (
								<motion.div
									key={`page-${activeApp}`}
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
									<Accounts />
								</motion.div>
							) : null}
							{page === 'staking' ? (
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
									<Staking />
								</motion.div>
							) : null}
							{page === 'settings' ? (
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
									<Settings />
								</motion.div>
							) : null}
						</AnimatePresence>
						<FooterNavigation />
					</MotionBox>
				</Box>
			</MotionBox>
			<LockedPanel />
		</>
	)
}
