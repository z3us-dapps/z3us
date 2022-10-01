import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { useAccountValue } from '@src/hooks/react-query/queries/account'
import { QrHoverCard } from '@src/components/qr-hover-card'
import { Flex, Box, Text } from 'ui/src/components/atoms'
import { ToolTip } from 'ui/src/components/tool-tip'
import Button from 'ui/src/components/button'
import { HardwareWalletIcon } from 'ui/src/components/icons'
import { formatBigNumber } from '@src/utils/formatters'
import { AccountAddress } from '@src/components/account-address'
import PriceTicker from 'ui/src/components/price-ticker'
import LoaderBars from 'ui/src/components/loader-bars'
import { useSharedStore, useAccountStore } from '@src/hooks/use-store'
import { ColorSettings, KeystoreType } from '@src/types'
import { currencySettingsMap } from '@src/config'
import { getTickerChars } from '../get-ticker-chars'

interface ImmerT {
	accountValue: string
}

type IProps = {
	address: string
}

export const AccountInfo: React.FC<IProps> = ({ address }) => {
	const { isLoading, value, change } = useAccountValue()
	const { currency } = useSharedStore(state => ({
		currency: state.currency,
	}))
	const { signingKey, entry, activeSlideIndex } = useAccountStore(state => ({
		signingKey: state.signingKey,
		entry: Object.values(state.publicAddresses).find(_account => _account.address === address),
		activeSlideIndex: state.activeSlideIndex,
	}))
	const [state, setState] = useImmer<ImmerT>({
		accountValue: '',
	})
	const color = entry?.colorSettings?.[ColorSettings.COLOR_TEXT] || '#330867'
	const borderColor = entry?.colorSettings?.[ColorSettings.COLOR_BORDER] || '#FFFFFF'
	const currencyPrefix = currencySettingsMap[currency.toUpperCase()]?.prefix || ''
	const [charDictionary, tickerConstants] = getTickerChars(currencyPrefix)

	const accountPercentageChange = !value.isEqualTo(0)
		? `${change.isGreaterThan(0) ? '+' : ''}${change.div(value).multipliedBy(100).toFixed(2).toLocaleString()}%`
		: '0.00%'

	useEffect(() => {
		if (isLoading) return
		// NOTE: set to this value, to force the ticker animation
		setState(draft => {
			draft.accountValue = `${currencyPrefix}0.00`
		})
		setTimeout(() => {
			setState(draft => {
				draft.accountValue = formatBigNumber(value, currency, 2)
			})
		}, 200)
	}, [activeSlideIndex, isLoading])

	return (
		<Flex
			justify="center"
			css={{
				border: `1px solid ${borderColor}`,
				position: 'relative',
				background: entry?.background,
				boxShadow: '$accountPanelShadow',
				height: '100%',
				borderRadius: '14px',
				'&::before': {
					content: '""',
					position: 'absolute',
					top: '0',
					bottom: '0',
					left: '0',
					right: '0',
					pointerEvents: 'none',
					backgroundImage: 'url("/images/lightening-card-bg.svg")',
					backgroundSize: '100%',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center 20px',
				},
				'&::after': {
					content: '""',
					borderRadius: '12px',
					position: 'absolute',
					top: '-1px',
					bottom: '-1px',
					left: '-1px',
					right: '-1px',
					border: `2px solid ${borderColor}`,
					pointerEvents: 'none',
				},
			}}
		>
			<Flex
				direction="column"
				align="center"
				css={{ textAlign: 'center', position: 'relative', zIndex: '1', pt: '39px' }}
			>
				<AccountAddress address={address} css={{ fill: color, color }} />
				<Flex
					justify="center"
					css={{
						pt: '4px',
						pb: '0',
						height: '42px',
						position: 'relative',
						minWidth: '140px',
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
						<PriceTicker
							value={state.accountValue}
							refresh={activeSlideIndex}
							dictionary={charDictionary}
							constantKeys={tickerConstants}
						/>
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
				</Flex>
				<Text size="7" css={{ fill: color, color, mt: '4px' }}>
					<PriceTicker
						value={accountPercentageChange}
						refresh={state.accountValue}
						dictionary={charDictionary}
						constantKeys={tickerConstants}
					/>
				</Text>
			</Flex>
			<Box css={{ zIndex: 2, position: 'absolute', top: '$2', left: '$2' }}>
				<QrHoverCard css={{ fill: color, color }} />
			</Box>
			{signingKey?.type === KeystoreType.HARDWARE && (
				<Box css={{ zIndex: 2, position: 'absolute', bottom: '$3', right: '$3' }}>
					<ToolTip arrowOffset={8} message="Hardware wallet account">
						<Box>
							<Button clickable={false} iconOnly size="1" color="ghost" css={{ color, fill: color }}>
								<HardwareWalletIcon />
							</Button>
						</Box>
					</ToolTip>
				</Box>
			)}
		</Flex>
	)
}
