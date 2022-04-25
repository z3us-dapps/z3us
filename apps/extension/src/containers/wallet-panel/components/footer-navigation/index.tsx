import React from 'react'
import { useStore } from '@src/store'
import { useRoute } from 'wouter'
import { Box, Flex, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { routesInfo } from '@src/containers/wallet-panel/config'

export const FooterNavigation: React.FC = () => {
	const { activeApp, setActiveApp } = useStore(state => ({
		activeApp: state.activeApp,
		setActiveApp: state.setActiveAppAction,
	}))
	const [page] = activeApp
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
						as="button"
						onClick={() => {
							if (i !== currentPageIndex) {
								setActiveApp([key, i - currentPageIndex])
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
						{/*TODO: remove this, when we replace with something, to blatant to copy phantom with this :)*/}
						{/*{isActive && (
							<MotionBox
								layoutId="underline"
								css={{
									width: '100%',
									height: '2px',
									background: '#673add',
									zIndex: '1',
									position: 'absolute',
									bottom: 0,
								}}
							/>
						)}*/}
					</Button>
				)
			})}
		</Flex>
	)
}
