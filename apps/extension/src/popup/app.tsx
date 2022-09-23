import React from 'react'
import { useSharedStore } from '@src/store'
import { Router, Route } from 'wouter'
import { Box, Flex } from 'ui/src/components/atoms'
import { WalletPanel } from '@src/containers/wallet-panel'
import { Notification } from '@src/containers/notification'
import { OnboardingWorkFlow } from '@src/containers/onboarding'
import { HardwareWallet } from '@src/containers/hardware-wallet'
import { Toasts } from '@src/containers/toasts'
import { useHashLocation, multipathMatcher } from '@src/hooks/use-hash-location'
import { useColorMode } from '@src/hooks/use-color-mode'
import { useVault } from '@src/hooks/use-vault'
import { domExists } from '@src/utils/dom-exists'
import { Permissions } from './permissions'
// import { Credentials } from '@src/containers/credentials'
// import { useManifestCompoler } from '@src/hooks/use-manifest-compiler'

export const App: React.FC = () => {
	const isHardwareWalletRoute = domExists && window.location.href.includes('html#/hardware-wallet')
	// useManifestCompoler()
	useColorMode()
	useVault()

	const { messanger } = useSharedStore(state => ({
		messanger: state.messanger,
	}))

	return (
		<Box
			css={{
				position: 'relative',
				opacity: messanger ? '1' : '0',
				transition: '$default',
				flex: '1 1 0',
				...(isHardwareWalletRoute
					? {
							width: '100vw',
							height: '100vh',
					  }
					: {
							minWidth: '360px',
							minHeight: '600px',
							width: '100%',
							height: '100%',
					  }),
			}}
		>
			{messanger ? (
				<Router matcher={multipathMatcher as any} hook={useHashLocation as any}>
					<Route path="/wallet/:rest*" component={WalletPanel} />
					<Route path="/notification/:rest*" component={Notification} />
					<Route path="/onboarding/:rest*">
						<OnboardingWorkFlow />
					</Route>
					<Route path="/hardware-wallet/:rest*">
						<HardwareWallet />
					</Route>
					{/* <Route path="/credentials/:rest*">
						<Credentials />
					</Route> */}
					<Route component={WalletPanel} />
				</Router>
			) : (
				<Flex align="center" justify="center" css={{ height: '100%' }} />
			)}
			<Toasts />
			<Permissions />
		</Box>
	)
}
