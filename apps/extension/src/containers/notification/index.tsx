import React, { useEffect, lazy, Suspense } from 'react'
import { useAccountStore, useSharedStore } from '@src/hooks/use-store'
import { useHashLocation } from '@src/hooks/use-hash-location'
import { AnimatedSwitch } from '@src/components/router-animated-switch'
import { RouterScope } from '@src/components/router-scope'
import { LockedPanel } from '@src/components/locked-panel'
import { WalletMenu } from '@src/components/wallet-menu'
import { Loader } from '@src/components/loader'
import { Route } from 'wouter'
import { Flex } from 'ui/src/components/atoms'

const Connect = lazy(() => import('./connect'))
const Encrypt = lazy(() => import('./encrypt'))
const Decrypt = lazy(() => import('./decrypt'))
const Sign = lazy(() => import('./sign'))
const Transaction = lazy(() => import('./transaction'))

export const Notification: React.FC = () => {
	const { keystores } = useSharedStore(state => ({
		keystores: state.keystores,
	}))
	const { isUnlocked } = useAccountStore(state => ({
		isUnlocked: state.isUnlocked,
	}))

	useEffect(() => {
		if (keystores.length === 0) {
			window.location.hash = '#/onboarding'
		}
	}, [keystores])

	if (!isUnlocked) {
		return <LockedPanel />
	}

	return (
		<Flex
			direction="column"
			css={{
				position: 'relative',
				width: '100%',
				height: '100%',
				overflow: 'hidden',
				border: '1px solid $borderPanel',
				color: '$txtDefault',
				backgroundColor: '$bgPanel',
			}}
		>
			<Flex justify="end" css={{ height: '48px', position: 'relative', pt: '6px', pl: '6px', pr: '6px' }}>
				<WalletMenu />
			</Flex>
			<RouterScope base="/notification" hook={useHashLocation as any}>
				<Suspense fallback={Loader}>
					<AnimatedSwitch css={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
						<Route path="/connect/:id" component={Connect} />
						<Route path="/encrypt/:id" component={Encrypt} />
						<Route path="/decrypt/:id" component={Decrypt} />
						<Route path="/sign/:id" component={Sign} />
						<Route path="/transaction/:id" component={Transaction} />
					</AnimatedSwitch>
				</Suspense>
			</RouterScope>
		</Flex>
	)
}

export default Notification
