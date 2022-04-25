import React, { useEffect } from 'react'
import { useStore } from '@src/store'
import { useHashLocation } from '@src/hooks/use-hash-location'
import { AnimatedSwitch } from '@src/components/router-animated-switch'
import { RouterScope } from '@src/components/router-scope'
import { LockedPanel } from '@src/components/locked-panel'
import { WalletMenu } from '@src/components/wallet-menu'
import { Route } from 'wouter'
import { Flex } from 'ui/src/components/atoms'

import { Connect } from './connect'
import { Encrypt } from './encrypt'
import { Decrypt } from './decrypt'
import { Transaction } from './transaction'

export const Notification: React.FC = () => {
	const { account, hasKeystoreAction } = useStore(state => ({
		hasKeystoreAction: state.hasKeystoreAction,
		account: state.account,
	}))

	useEffect(() => {
		const load = async () => {
			const hasKeystoreWallet = await hasKeystoreAction()
			if (!hasKeystoreWallet) {
				window.location.hash = '#/onboarding'
			}
		}
		load()
	}, [])

	if (!account) {
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
			{account ? (
				<>
					<Flex justify="end" css={{ height: '48px', position: 'relative', pt: '6px', pl: '6px', pr: '6px' }}>
						<WalletMenu />
					</Flex>
					<RouterScope base="/notification" hook={useHashLocation as any}>
						<AnimatedSwitch css={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
							<Route path="/connect/:id" component={Connect} />
							<Route path="/encrypt/:id" component={Encrypt} />
							<Route path="/decrypt/:id" component={Decrypt} />
							<Route path="/transaction/:id" component={Transaction} />
						</AnimatedSwitch>
					</RouterScope>
				</>
			) : (
				<LockedPanel />
			)}
		</Flex>
	)
}
