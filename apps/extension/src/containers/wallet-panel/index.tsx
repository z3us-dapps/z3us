import React, { lazy, ReactNode, Suspense, useEffect } from 'react'
import { useLocation } from 'wouter'
import { useSharedStore } from '@src/hooks/use-store'
import { AnimatePresence, motion } from 'framer-motion'
import { Box, MotionBox } from 'ui/src/components/atoms'
import UnlockedPanel from '@src/components/unlocked-panel'
import { routesInfo, PANEL_HEIGHT, APP_WIDTH, ACCOUNTS, STAKING, SWAP, SETTINGS } from '@src/config'
import { FooterNavigation } from './components/footer-navigation'
import { HeaderNavigation } from './components/header-navigation'

const Accounts = lazy(() => import('./accounts'))
const Staking = lazy(() => import('./staking'))
const Settings = lazy(() => import('./settings'))
const Swap = lazy(() => import('./swap'))

const AccountPage = ({ children }: { children: ReactNode }) => <Suspense fallback="Loading...">{children}</Suspense>

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
	const { activeApp } = useSharedStore(state => ({
		activeApp: state.activeApp,
	}))
	const [page, direction] = activeApp
	const routes = Object.values(routesInfo)

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

	return (
		<UnlockedPanel>
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
							{page === ACCOUNTS ? (
								<AccountPage>
									<Accounts />
								</AccountPage>
							) : null}
							{page === STAKING ? (
								<AccountPage>
									<Staking />
								</AccountPage>
							) : null}
							{page === SWAP ? (
								<AccountPage>
									<Swap />
								</AccountPage>
							) : null}
							{page === SETTINGS ? (
								<AccountPage>
									<Settings />
								</AccountPage>
							) : null}
						</motion.div>
					</AnimatePresence>
					<FooterNavigation />
				</MotionBox>
			</Box>
		</UnlockedPanel>
	)
}

export default WalletPanel
