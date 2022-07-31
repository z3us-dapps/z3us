import React from 'react'
import { useSharedStore } from '@src/store'
import { useLocation, useRoute } from 'wouter'
import { Box, Flex, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { routesInfo } from '@src/config'

export const FooterNavigation: React.FC = () => {
	const { activeApp, setActiveApp } = useSharedStore(state => ({
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
			{Object.entries(routesInfo).map(([key, { icon, name }], i) => {
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
							// if clicking accounts while on accounts
							if (i === 0 && currentPageIndex === 0) {
								setLocation('/wallet/account')
							}
							// if clicking swap
							if (i === 2) {
								setLocation('/wallet/swap')
							}
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
							'&:hover': {
								background: '$bgPanelHover',
							},
							'&:focus:not(&:focus-visible)': {
								boxShadow: 'none',
							},
							'&:focus': {
								boxShadow: '$buttonFocusShadow',
							},
							'&:active': {
								boxShadow: '$buttonFocusShadow',
							},
						}}
					>
						<Box
							as="span"
							css={{
								mt: '$5',
								color: isActive ? '$iconActive' : '$iconDefault',
								svg: { transition: 'all 300ms ease-out' },
							}}
						>
							{icon}
						</Box>
						<Text
							as="span"
							css={{
								textTransform: 'uppercase',
								fontSize: '11px',
								pt: '2px',
								fontWeight: '800',
								color: isActive ? '$iconActive' : '$iconDefault',
								svg: { transition: 'all 300ms ease-out' },
							}}
						>
							{name}
						</Text>
					</Button>
				)
			})}
		</Flex>
	)
}
