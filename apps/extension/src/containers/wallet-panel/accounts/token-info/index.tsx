import React from 'react'
import BigNumber from 'bignumber.js'
import { Line } from 'react-chartjs-2'
import { useTokenBalances, useTokenInfo } from '@src/services/react-query/queries/radix'
import { useMarketChart } from '@src/services/react-query/queries/market'
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
	week: { id: '1W', shortName: '1W', days: 7 },
	month: { id: '1M', shortName: '1M', days: 30 },
	threeMonth: { id: '3M', shortName: '3M', days: 90 },
	sixMonth: { id: '6M', shortName: '6M', days: 6 * 30 },
	oneYear: { id: '1Y', shortName: '1Y', days: 356 },
	allTime: { id: 'All', shortName: 'All', days: 5 * 356 },
}

export const TokenInfo = (): JSX.Element => {
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
		days: 14,
	})
	const { data: chart } = useMarketChart(currency, token?.symbol, state.days)

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
			draft.days = TIMEFRAMES[id].days
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
				<Grid gap="5" columns="3" css={{ pt: '0px' }}>
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
							mt: '0px',
							width: '100%',
							height: '170px',
							zIndex: '1',
							mx: '-15px',
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
										borderColor: ['rgba(27, 27, 27, 1, 1.0)'],
										borderWidth: 3,
									},
								],
							}}
							options={{
								responsive: true,
								maintainAspectRatio: false,
								elements: {
									point: {
										radius: 0,
										hoverRadius: 4,
									},
								},
								interaction: {
									mode: 'nearest',
									intersect: false,
									includeInvisible: true,
								},
								hover: {
									mode: 'nearest',
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
										callbacks: {
											title(items) {
												return items.map(item => new Date(+item.label * 1000).toLocaleDateString())
											},
											label(context) {
												return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(context.parsed.y)
											},
										},
									},
								},
							}}
							height={null}
							width={null}
						/>
						<Flex
							justify="between"
							css={{
								position: 'absolute',
								bottom: '10px',
								left: '30px',
								right: '30px',
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
										py: '5px',
										br: '20px',
										textTransform: 'uppercase',
										backgroundColor: id === 'threeMonth' ? '$bgPanelHover' : 'transparent',
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
