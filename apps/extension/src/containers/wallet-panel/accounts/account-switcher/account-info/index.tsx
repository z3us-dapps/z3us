import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { useAccountValue } from '@src/services/react-query/queries/account'
import { Flex, Box, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { HardwareWalletIcon } from 'ui/src/components/icons'
import { ActivityIcon } from 'ui/src/components/icons'
import { formatBigNumber } from '@src/utils/formatters'
import { AccountAddress } from '@src/components/account-address'
import PriceTicker from 'ui/src/components/price-ticker'
import PriceLabel from 'ui/src/components/price-label'
import LoaderBars from 'ui/src/components/loader-bars'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from 'ui/src/components/tool-tip'
import { useStore } from '@src/store'
import { ColorSettings } from '@src/services/types'
import { AccountModal } from '@src/containers/wallet-panel/settings/accounts/account-modal'

type IProps = {
	address: string
}

export const AccountInfo = ({ address }: IProps): JSX.Element => {
	const { addressBook, activeSlideIndex } = useStore(state => ({
		addressBook: state.addressBook,
		activeSlideIndex: state.activeSlideIndex,
	}))
	const [state, setState] = useImmer({
		accountValue: '',
	})
	const entry = addressBook[address]
	const color = entry?.colorSettings?.[ColorSettings.COLOR_TEXT] || '#330867'

	const { isLoading, value, change } = useAccountValue()
	//const accountValue = formatBigNumber(value, 'USD', 2)
	const accountPercentageChange = !value.isEqualTo(0)
		? `${change.isGreaterThan(0) ? '+' : ''}${change.div(value).multipliedBy(100).toFixed(2).toLocaleString()}%`
		: '0.00%'

	useEffect(() => {
		// NOTE: set to this value, to force the ticker animation
		setState(draft => {
			draft.accountValue = '$4.44'
		})
		setTimeout(() => {
			setState(draft => {
				draft.accountValue = formatBigNumber(value, 'USD', 2)
			})
		}, 200)
	}, [activeSlideIndex])

	return (
		<Flex
			justify="center"
			css={{
				border: '1px solid #fff',
				position: 'relative',
				background: entry?.background,
				boxShadow: '$accountPanelShadow',
				height: '100%',
				borderRadius: '14px',
				'&::before': {
					// @TODO: might remove this element, testing now
					display: 'none',
					//content: '""',
					borderRadius: '12px',
					position: 'absolute',
					top: '0',
					left: '0',
					bottom: '0',
					right: '0',
					pointerEvents: 'none',
					opacity: '0.7',
					'background-image': 'url("/images/img-noise-300x170.png")',
					'background-size': '100%',
					'mask-image': 'radial-gradient(circle at 50% 50%, transparent 40%, black)',
				},
				'&::after': {
					content: '""',
					borderRadius: '12px',
					position: 'absolute',
					top: '0',
					bottom: '0',
					left: '0',
					right: '0',
					border: '2px solid #fff',
					pointerEvents: 'none',
				},
			}}
		>
			<Flex
				direction="column"
				align="center"
				css={{ textAlign: 'center', position: 'relative', zIndex: '1', pt: '41px' }}
			>
				<AccountAddress address={address} css={{ fill: color, color }} />
				<Text
					bold
					as="h2"
					css={{
						pt: '2px',
						pb: '2px',
						height: '42px',
						position: 'relative',
					}}
				>
					<Text
						bold
						as="h2"
						css={{
							fontSize: '32px',
							lineHeight: '38px',
							color,
							opacity: !isLoading ? '1' : '0',
							transition: '$default',
						}}
					>
						<PriceTicker value={state.accountValue} refresh={activeSlideIndex} />
					</Text>
					<Box
						css={{
							position: 'absolute',
							top: '9px',
							left: '0',
							width: '100%',
							pe: 'none',
							opacity: !isLoading ? '0' : '1',
							transition: '$default',
						}}
					>
						<LoaderBars />
					</Box>
				</Text>
				<PriceLabel
					color={change.isGreaterThan(0) ? 'greenContrast' : 'redContrast'}
					css={{
						opacity: !isLoading ? '1' : '0',
						transition: '$default',
					}}
				>
					<Text size="2" bold>
						<PriceTicker value={accountPercentageChange} refresh={activeSlideIndex} />
					</Text>
				</PriceLabel>
			</Flex>
			<Box css={{ zIndex: 2, position: 'absolute', top: '$2', right: '$2' }}>
				<AccountModal address={address} toolTipSideOffset={3} toolTipBgColor="$bgPanel" toolTipMessage="Edit">
					<Button iconOnly size="3" color="ghost" css={{ color, fill: color }}>
						<ActivityIcon />
					</Button>
				</AccountModal>
			</Box>
			{entry?.isHardWallet && (
				<Box css={{ zIndex: 2, position: 'absolute', bottom: '$1', left: '$1' }}>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button iconOnly size="3" color="ghost" css={{ color, fill: color }}>
								<HardwareWalletIcon />
							</Button>
						</TooltipTrigger>
						<TooltipContent sideOffset={3}>
							<TooltipArrow offset={15} />
							Harware wallet account
						</TooltipContent>
					</Tooltip>
				</Box>
			)}
		</Flex>
	)
}
