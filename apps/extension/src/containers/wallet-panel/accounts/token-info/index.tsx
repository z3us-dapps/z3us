import React, { useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { Line } from 'react-chartjs-2'
import { InteractionMode } from 'chart.js'
import { useColorMode } from '@src/hooks/use-color-mode'
import { useTokenBalances, useTokenInfo } from '@src/hooks/react-query/queries/radix'
import { useMarketChart } from '@src/hooks/react-query/queries/market'
import { getSplitParams } from '@src/utils/url-utils'
import { useRoute, useLocation } from 'wouter'
import { useSharedStore } from '@src/store'
import { useImmer } from 'use-immer'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from 'ui/src/components/tool-tip'
import { Grid, Flex, Text, Box } from 'ui/src/components/atoms'
import { EXPLORER_URL } from '@src/config'
import { UpRightIcon, DownLeftIcon, ExternalLinkIcon } from 'ui/src/components/icons'
import Button from 'ui/src/components/button'
import { CircleAvatar } from '@src/components/circle-avatar'
import { TokenPrice } from './token-price'

const TIMEFRAMES = {
	week: { shortName: '1W', days: 7 },
	month: { shortName: '1M', days: 30 },
	threeMonth: { shortName: '3M', days: 90 },
	sixMonth: { shortName: '6M', days: 6 * 30 },
	oneYear: { shortName: '1Y', days: 356 },
	allTime: { shortName: 'All', days: 'max' },
}

const defaultChartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	elements: {
		point: {
			radius: 0,
			hoverRadius: 4,
		},
	},
	interaction: {
		mode: 'nearest' as InteractionMode,
		intersect: false,
		includeInvisible: true,
	},
	hover: {
		mode: 'nearest' as InteractionMode,
		intersect: false,
		includeInvisible: true,
	},
	scales: {
		xAxis: {
			display: false,
		},
		yAxis: {
			display: false,
		},
	},
	plugins: {
		tooltip: {
			displayColors: false,
			callbacks: {
				title(items) {
					return items.map(item => new Date(+item.label).toLocaleDateString())
				},
			},
		},
	},
}

export const TokenInfo = (): JSX.Element => {
	const isDarkMode = useColorMode()
	const [, setLocation] = useLocation()
	const [, params] = useRoute('/account/token/:rri')
	const rri = getSplitParams(params)

	const { isLoading, data: token } = useTokenInfo(rri)
	const { data } = useTokenBalances()
	const liquidBalances = data?.account_balances?.liquid_balances || []
	const staked = data?.account_balances?.staked_and_unstaking_balance.value

	const { currency } = useSharedStore(state => ({
		currency: state.currency,
	}))
	const [state, setState] = useImmer({
		selectedTimeFrame: 'threeMonth',
	})
	const { data: chart } = useMarketChart(currency, token?.symbol, TIMEFRAMES[state.selectedTimeFrame].days)

	const chartOptions = { ...defaultChartOptions }
	const callbacks = chartOptions.plugins.tooltip.callbacks as any
	callbacks.label = useCallback(
		context => new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(context.parsed.y),
		[currency],
	)

	const selectedToken = liquidBalances?.find(balance => balance.rri === rri)
	const selectedTokenAmmount = selectedToken ? new BigNumber(selectedToken.amount).shiftedBy(-18) : new BigNumber(0)
	const stakedAmount = selectedToken?.symbol === 'xrd' && staked ? new BigNumber(staked).shiftedBy(-18) : null

	const handleSendClick = () => {
		setLocation(`/account/send/${rri}`)
	}

	const handleDepositClick = () => {
		setLocation(`/account/deposit/${rri}`)
	}

	const handleGotoTokenExplorer = () => {
		window.open(`${EXPLORER_URL}/tokens/${rri}`)
	}

	const handleClickTimeFrame = (id: string) => {
		setState(draft => {
			draft.selectedTimeFrame = id
		})
	}

	if (isLoading) {
		return null
	}
	if (!token) {
		return null
	}

	return (
		<Flex
			direction="column"
			css={{
				position: 'absolute',
				top: '0px',
				left: '0',
				right: '0',
				height: '362px',
				overflow: 'hidden',
			}}
		>
			<Flex direction="column" align="center">
				<CircleAvatar
					borderWidth={0}
					shadow={false}
					width={36}
					height={36}
					image={token?.image || token?.iconURL}
					fallbackText={token?.symbol.toLocaleUpperCase()}
				/>
				<Text size="5" medium css={{ mt: '15px', pb: '5px' }}>
					{token.name} ({token.symbol.toLocaleUpperCase()})
				</Text>
				<TokenPrice
					symbol={token.symbol}
					ammount={token.symbol === 'xrd' ? selectedTokenAmmount.plus(stakedAmount) : selectedTokenAmmount}
				/>
				<Grid gap="5" columns="3" css={{ pt: '0px', position: 'relative', zIndex: '1' }}>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button size="5" color="inverse" iconOnly circle onClick={handleSendClick}>
								<UpRightIcon />
							</Button>
						</TooltipTrigger>
						<TooltipContent sideOffset={3} css={{ backgroundColor: '$bgPanel' }}>
							<TooltipArrow css={{ fill: '$bgPanel' }} />
							Send
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button size="5" color="inverse" iconOnly circle onClick={handleDepositClick}>
								<DownLeftIcon />
							</Button>
						</TooltipTrigger>
						<TooltipContent sideOffset={3} css={{ backgroundColor: '$bgPanel' }}>
							<TooltipArrow css={{ fill: '$bgPanel' }} />
							Deposit
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button size="5" color="inverse" iconOnly circle onClick={handleGotoTokenExplorer}>
								<ExternalLinkIcon />
							</Button>
						</TooltipTrigger>
						<TooltipContent sideOffset={3} css={{ backgroundColor: '$bgPanel' }}>
							<TooltipArrow css={{ fill: '$bgPanel' }} />
							Explorer
						</TooltipContent>
					</Tooltip>
				</Grid>
				{chart?.length > 0 && (
					<Box
						css={{
							position: 'relative',
							marginTop: '-5px',
							width: '100%',
							height: '150px',
							mx: '0',
							canvas: {
								position: 'relative',
								mx: '-5px',
							},
						}}
					>
						<Line
							data={{
								labels: chart.map(value => value[0]),
								datasets: [
									{
										data: chart.map(value => value[1]),
										backgroundColor: ['rgba(255, 255, 255, 0.0)'],
										borderColor: [isDarkMode ? 'rgba(255,255,255, 0.8)' : 'rbga(0,0,0,1)'],
										borderWidth: 3,
									},
								],
							}}
							options={chartOptions}
							height={null}
							width={null}
						/>
						<Flex
							justify="between"
							css={{
								position: 'absolute',
								bottom: '-15px',
								left: '15px',
								right: '15px',
								height: 'auto',
								zIndex: '2',
							}}
						>
							{Object.entries(TIMEFRAMES).map(([id, { shortName }]) => (
								<Button
									onClick={() => handleClickTimeFrame(id)}
									key={id}
									css={{
										fontSize: '12px',
										fontWeight: '500',
										px: '10px',
										py: '4px',
										br: '20px',
										textTransform: 'uppercase',
										border: '1px solid',
										backgroundColor: id === state.selectedTimeFrame ? '$bgPanelHover' : '$buttonBgTransparent',
										...(id === state.selectedTimeFrame
											? {
													backgroundColor: '$bgPanelHover',
													borderColor: '$borderPanel2',
											  }
											: {
													backgroundColor: 'transparent',
													borderColor: 'transparent',
											  }),
										'&:hover': {
											background: '$bgPanelHover',
										},
									}}
								>
									{shortName}
								</Button>
							))}
						</Flex>
					</Box>
				)}
			</Flex>
		</Flex>
	)
}
