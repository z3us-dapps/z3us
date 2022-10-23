import React, { lazy, Suspense } from 'react'
import { useSharedStore } from '@src/hooks/use-store'
import { Router, Route } from 'wouter'
import { Box, Flex } from 'ui/src/components/atoms'
import { Loader } from '@src/components/loader'
import { Toasts } from '@src/containers/toasts'
import { useHashLocation, multipathMatcher } from '@src/hooks/use-hash-location'
import { useColorMode } from '@src/hooks/use-color-mode'
import { useVault } from '@src/hooks/use-vault'
import { useEvents } from '@src/hooks/use-events'
import { domExists } from '@src/utils/dom-exists'
import { Permissions } from './permissions'
// import { useManifestCompoler } from '@src/hooks/use-manifest-compiler'

const WalletPanel = lazy(() => import('@src/containers/wallet-panel'))
const Notification = lazy(() => import('@src/containers/notification'))
const OnboardingWorkFlow = lazy(() => import('@src/containers/onboarding'))
const HardwareWallet = lazy(() => import('@src/containers/hardware-wallet'))
const Credentials = lazy(() => import('@src/containers/credentials'))

export const App: React.FC = () => {
	const isHardwareWalletRoute = domExists && window.location.href.includes('html#/hardware-wallet')
	// useManifestCompoler()
	useColorMode()
	useVault()
	useEvents()

	const { messanger } = useSharedStore(state => ({
		messanger: state.messanger,
	}))

	return (
		<Box
			css={{
				position: 'relative',
				opacity: messanger ? '1' : '0',
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
					<Suspense fallback={Loader}>
						<Route path="/wallet/:rest*" component={WalletPanel} />
						<Route path="/notification/:rest*" component={Notification} />
						<Route path="/onboarding/:rest*">
							<OnboardingWorkFlow />
						</Route>
						<Route path="/hardware-wallet/:rest*">
							<HardwareWallet />
						</Route>
						<Route path="/credentials/:rest*">
							<Credentials />
						</Route>
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
