import React, { ReactNode, useEffect } from 'react'
import { useNoneSharedStore, useSharedStore } from '@src/hooks/use-store'
import { LockedPanel } from '@src/components/locked-panel'
import { Z3usMenu } from '@src/components/z3us-menu'
import { Box, MotionBox } from 'ui/src/components/atoms'
import { ACCOUNTS } from '@src/config'

export const UnlockedPanel = ({ children }: { children: ReactNode }) => {
	const { isUnlocked, keystores } = useSharedStore(state => ({
		isUnlocked: state.isUnlocked,
		keystores: state.keystores,
	}))
	const { activeApp } = useNoneSharedStore(state => ({
		activeApp: state.activeApp,
	}))
	const [page] = activeApp

	useEffect(() => {
		if (keystores.length === 0) {
			window.location.hash = '#/onboarding'
		}
	}, [keystores.length])

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
					{children}
				</MotionBox>
			) : null}
			<LockedPanel />
			<Box
				css={{
					pe: !isUnlocked ? 'unset' : 'none',
					opacity: !isUnlocked ? '0' : '1',
					transition: '$default',
				}}
			>
				<Z3usMenu />
			</Box>
		</>
	)
}

export default UnlockedPanel
