import React from 'react'
import { useStore } from '@src/store'
import Button from 'ui/src/components/button'
import { CloseIcon } from 'ui/src/components/icons'
import { useRoute } from 'wouter'
import { MotionBox } from 'ui/src/components/atoms'
import { QrHoverCard } from '@src/components/qr-hover-card'
import { WalletMenu } from '@src/components/wallet-menu'
import { AnimatePresence } from 'framer-motion'
import { ACCOUNTS } from '@src/containers/wallet-panel/config'
import { AccountNaviation } from './account-navigation'

export const HeaderNavigation = (): JSX.Element => {
	const { activeApp } = useStore(state => ({
		activeApp: state.activeApp,
	}))
	const [page] = activeApp
	const [isTokenMatch] = useRoute('/wallet/account/token/:rri')
	return (
		<MotionBox
			variants={{
				locked: {
					transform: `translateY(-50px)`,
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
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				height: '48px',
				pt: '6px',
				pl: '6px',
				pr: '6px',
				justifyContent: 'space-between',
			}}
		>
			<QrHoverCard />
			<AccountNaviation />
			<AnimatePresence>
				{isTokenMatch && page === ACCOUNTS ? (
					<MotionBox
						animate={{ opacity: 1, y: 0 }}
						initial={{ opacity: 0, y: 0 }}
						exit={{ opacity: 0, y: 0 }}
						transition={{ duration: 0.2 }}
					>
						<Button
							as="a"
							href="#/wallet/account"
							color="ghost"
							iconOnly
							aria-label="wallet options"
							size="3"
							css={{ mt: '2px', mr: '2px' }}
						>
							<CloseIcon />
						</Button>
					</MotionBox>
				) : (
					<WalletMenu />
				)}
			</AnimatePresence>
		</MotionBox>
	)
}
