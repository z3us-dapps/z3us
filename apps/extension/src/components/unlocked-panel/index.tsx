import React, { ReactNode, useEffect } from 'react'

import { Box, MotionBox } from 'ui/src/components/atoms'
import { CSS } from 'ui/src/theme'

import { LockedPanel } from '@src/components/locked-panel'
import { Z3usMenu } from '@src/components/z3us-menu'
import { ACCOUNTS } from '@src/config'
import { useNoneSharedStore, useSharedStore } from '@src/hooks/use-store'

const defaultProps = {
	css: undefined,
}

export const UnlockedPanel = ({ children, css }: { children: ReactNode; css?: CSS }) => {
	const { isUnlocked, keystores } = useSharedStore(state => ({
		isUnlocked: state.isUnlocked,
		keystores: state.keystores,
	}))
	const { activeApp } = useNoneSharedStore(state => ({
		activeApp: state.activeApp,
	}))
	const [page] = activeApp

	useEffect(() => {
		if (keystores !== null && keystores.length === 0) {
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
						...css,
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

UnlockedPanel.defaultProps = defaultProps

export default UnlockedPanel
