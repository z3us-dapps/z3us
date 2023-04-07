import React from 'react'
import { useLocation, useRoute } from 'wouter'

import { Flex } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'

import { routesInfo } from '@src/config'
import { useNoneSharedStore } from '@src/hooks/use-store'

export const FooterNavigation: React.FC = () => {
	const { activeApp, setActiveApp } = useNoneSharedStore(state => ({
		activeApp: state.activeApp,
		setActiveApp: state.setActiveAppAction,
	}))
	const [page] = activeApp
	const [, setLocation] = useLocation()
	const [isSendRoute] = useRoute('/wallet/account/send')
	const [isSendRouteRri] = useRoute('/wallet/account/send/:rri')
	const [isSendConfirmRouteRri] = useRoute('/wallet/account/send/review/:rri')
	const [isDepositRoute] = useRoute('/wallet/account/deposit')
	const [isDepositRouteRri] = useRoute('/wallet/account/deposit/:rri')
	const isFooterHidden = isSendRoute || isSendRouteRri || isDepositRoute || isDepositRouteRri || isSendConfirmRouteRri

	return (
		<Flex
			css={{
				height: '55px',
				width: '100%',
				borderTop: '1px solid $borderPanel',
				background: '$bgPanel',
				position: 'relative',
				zIndex: '1',
				opacity: isFooterHidden ? '1' : '1',
				pointerEvents: isFooterHidden ? 'none' : 'all',
				transform: isFooterHidden ? 'translateY(55px)' : 'translateY(0px)',
				transition: '$default',
			}}
			as="ul"
		>
			{Object.entries(routesInfo).map(([key, { icon, href }], i) => {
				const isActive = key === page
				const currentPageIndex = Object.keys(routesInfo).findIndex(_key => _key === page)
				return (
					<Button
						key={key}
						as="button"
						onClick={() => {
							if (i !== currentPageIndex) {
								setActiveApp([key, i - currentPageIndex])
							}
							setLocation(`/wallet/${href}`)
						}}
						css={{
							flex: 1,
							padding: 0,
							position: 'relative',
							display: 'flex',
							outline: 'none',
							border: 'none',
							height: '54px',
							alignItems: 'center',
							flexDirection: 'column',
							background: '$bgPanel',
							transition: 'all 300ms ease-out',
							'&:focus:not(&:focus-visible)': {
								boxShadow: 'none',
							},
							'&:hover': {
								'> span': {
									...(!isActive
										? {
												background: '$bgPanelHover',
										  }
										: {}),
								},
							},
						}}
					>
						<Flex
							as="span"
							align="center"
							justify="center"
							css={{
								mt: '20px',
								flexShrink: '0',
								width: '32px',
								height: '32px',
								br: '50%',
								bg: isActive ? '$iconActive' : 'transparent',
								color: isActive ? '$txtInverse' : '$iconDefault',
								transition: 'all 100ms ease-out',
								svg: { transition: 'all 100ms ease-out' },
							}}
						>
							{icon}
						</Flex>
					</Button>
				)
			})}
		</Flex>
	)
}
