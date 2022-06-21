import React, { useEffect } from 'react'
import { useSharedStore, useStore } from '@src/store'
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
import { Sign } from './sign'
import { Transaction } from './transaction'

export const Notification: React.FC = () => {
	const { hw, seed, isUnlocked, keystores } = useSharedStore(state => ({
		hw: state.hardwareWallet,
		seed: state.masterSeed,
		keystores: state.keystores,
		isUnlocked: Boolean(state.masterSeed || state.isHardwareWallet),
	}))
	const { selectAccount } = useStore(state => ({
		selectAccount: state.selectAccountAction,
	}))

	useEffect(() => {
		if (keystores.length === 0) {
			window.location.hash = '#/onboarding'
		}
	}, [keystores])

	useEffect(() => {
		if (hw || seed) {
			selectAccount(0, hw, seed)
		}
	}, [hw, seed])

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
				<AnimatedSwitch css={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
					<Route path="/connect/:id" component={Connect} />
					<Route path="/encrypt/:id" component={Encrypt} />
					<Route path="/decrypt/:id" component={Decrypt} />
					<Route path="/sign/:id" component={Sign} />
					<Route path="/transaction/:id" component={Transaction} />
				</AnimatedSwitch>
			</RouterScope>
		</Flex>
	)
}
