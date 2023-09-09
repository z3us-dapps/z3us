import React, { Suspense, lazy } from 'react'
import { Route, Router } from 'wouter'

import { Box, Flex } from 'ui/src/components/atoms'

import { Loader } from '@src/components/loader'
import { Toasts } from '@src/containers/toasts'
import { useColorMode } from '@src/hooks/use-color-mode'
import { useEvents } from '@src/hooks/use-events'
import { multipathMatcher, useHashLocation } from '@src/hooks/use-hash-location'
import { useIsBabylon } from '@src/hooks/use-is-babylon'
import { useMessanger } from '@src/hooks/use-messanger'
import { useSharedStore } from '@src/hooks/use-store'
import { useVault } from '@src/hooks/use-vault'

import { Permissions } from './permissions'

// import { useManifestCompoler } from '@src/hooks/use-manifest-compiler'

const WalletPanel = lazy(() => import('@src/containers/wallet-panel'))
const Notification = lazy(() => import('@src/containers/notification'))
const OnboardingWorkFlow = lazy(() => import('@src/containers/onboarding'))
const HardwareWallet = lazy(() => import('@src/containers/hardware-wallet'))
const Credentials = lazy(() => import('@src/containers/credentials'))

export const App: React.FC = () => {
	const isBabylon = useIsBabylon()
	const { messanger } = useMessanger()
	useVault(messanger)
	useEvents(messanger)
	const [location] = useHashLocation()
	// useManifestCompoler()
	useColorMode()

	const isHardwareWalletRoute = location.startsWith('/hardware-wallet')
	const isOnboardingRoute = location.startsWith('/onboarding')

	const { isUnlocked } = useSharedStore(state => ({
		isUnlocked: state.isUnlocked,
	}))

	const isUiVisible = isUnlocked !== null || isHardwareWalletRoute || isOnboardingRoute

	return (
		<Box
			css={{
				position: 'relative',
				opacity: isUiVisible ? '1' : '0',
				transition: '$default',
				...(isHardwareWalletRoute
					? {
							width: '100vw',
							height: '100vh',
					  }
					: {
							width: '360px',
							height: '600px',
					  }),
			}}
		>
			{messanger ? (
				<Router matcher={multipathMatcher as any} hook={useHashLocation as any}>
					<Suspense fallback={<Loader />}>
						<Route path="/wallet/:rest*" component={WalletPanel} />
						{!isBabylon && <Route path="/notification/:rest*" component={Notification} />}
						{!isBabylon && (
							<Route path="/onboarding/:rest*">
								<OnboardingWorkFlow />
							</Route>
						)}
						{!isBabylon && (
							<Route path="/hardware-wallet/:rest*">
								<HardwareWallet />
							</Route>
						)}
						{!isBabylon && (
							<Route path="/credentials/:rest*">
								<Credentials />
							</Route>
						)}
						<Route component={WalletPanel} />
					</Suspense>
				</Router>
			) : (
				<Flex align="center" justify="center" css={{ height: '100%' }} />
			)}
			<Toasts />
			<Permissions />
		</Box>
	)
}
