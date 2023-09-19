import BigNumber from 'bignumber.js'
import React, { useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts'

import { Box } from 'ui/src/components/box'
import { CardButtons } from 'ui/src/components/card-buttons'
import { ChartToolTip } from 'ui/src/components/chart-tool-tip'
import { Close2Icon, LockIcon } from 'ui/src/components/icons'
import { AccountsTransactionInfo } from 'ui/src/components/layout/account-transaction-info'
import Loader from 'ui/src/components/loader'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Button } from 'ui/src/components/router-button'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useMarketChart, useXRDPriceOnDay } from 'ui/src/hooks/queries/market'
import { useTokens } from 'ui/src/hooks/queries/oci'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { getStringMetadata } from 'ui/src/services/metadata'

import MetadataValue from './metadata-value'
import * as styles from './styles.css'

const messages = defineMessages({
	back: {
		id: 'accounts.resource_details.token.back',
		defaultMessage: 'Back',
	},
	metadata: {
		id: 'accounts.resource_details.token.metadata',
		defaultMessage: 'Metadata',
	},
	summary: {
		id: 'accounts.resource_details.token.summary',
		defaultMessage: 'Summary',
	},
	details_address: {
		id: 'accounts.resource_details.token.details_address',
		defaultMessage: 'Address',
	},
	details_divisibility: {
		id: 'accounts.resource_details.token.details_divisibility',
		defaultMessage: 'Divisibility',
	},
	details_total_supply: {
		id: 'accounts.resource_details.token.details_total_supply',
		defaultMessage: 'Total supply',
	},
	details_total_minted: {
		id: 'accounts.resource_details.token.details_total_minted',
		defaultMessage: 'Total minted',
	},
	details_total_burned: {
		id: 'accounts.resource_details.token.details_total_burned',
		defaultMessage: 'Total burned',
	},
})

const TIMEFRAMES = {
	week: { shortName: '1W', days: 7 },
	month: { shortName: '1M', days: 30 },
	threeMonth: { shortName: '3M', days: 90 },
	sixMonth: { shortName: '6M', days: 6 * 30 },
	oneYear: { shortName: '1Y', days: 356 },
	allTime: { shortName: 'All', days: 'max' },
}

const TokenDetails: React.FC = () => {
	const intl = useIntl()
	const { resourceId, accountId } = useParams()
	const { data, isLoading } = useEntityDetails(resourceId)

	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))
	const { data: xrdPrice } = useXRDPriceOnDay(currency, new Date())
	const { data: tokens } = useTokens()

	const name = getStringMetadata('name', data?.metadata?.items)
	const symbol = getStringMetadata('symbol', data?.metadata?.items)
	const description = getStringMetadata('description', data?.metadata?.items)
	const validator = getStringMetadata('validator', data?.metadata?.items)

	let tokenKey = symbol?.toUpperCase()
	if (!tokenKey && validator) tokenKey = 'XRD'
	const token = tokens[tokenKey] || null

	const value = new BigNumber(token?.price.xrd || 0).multipliedBy(xrdPrice)
	const change = new BigNumber(token ? +(token.price.usd || 0) / +(token.price.usd_24h || 0) : 0).dividedBy(100)
	const increase = new BigNumber(token ? +(token.price.usd || 0) - +(token.price.usd_24h || 0) : 0)

	const [timeFrame, setTimeFrame] = useState<string>('threeMonth')
	const { data: chart } = useMarketChart(currency, symbol, TIMEFRAMES[timeFrame].days)

	const renderTooltipContent = ({ active, payload }) => {
		if (active && payload && payload.length) {
			const dataItem = payload[0].payload

			return <ChartToolTip name={dataItem.name} value={dataItem.inCurrency} />
		}

		return null
	}

	if (!resourceId) return null
	if (isLoading) return <Loader />

	return (
		<Box flexShrink={0}>
			<Box display="flex" flexDirection="column" alignItems="center">
				<Box className={styles.assetCloseBtnWrapper}>
					<ToolTip message={intl.formatMessage(messages.back)}>
						<Button iconOnly styleVariant="ghost" sizeVariant="small" to={`/accounts/${accountId}/${resourceId}`}>
							<Close2Icon />
						</Button>
					</ToolTip>
				</Box>
				<Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
					<Box paddingBottom="small">
						<ResourceImageIcon address={resourceId} />
					</Box>
					<Text size="large" color="strong">
						{name}
					</Text>
					<Text size="small">{description}</Text>
					<Text size="xxxlarge" weight="medium" color="strong">
						{intl.formatNumber(value.toNumber(), { style: 'currency', currency })}
					</Text>
					<Text size="xlarge">
						{`${intl.formatNumber(increase.toNumber(), { style: 'currency', currency })} (${intl.formatNumber(
							change.toNumber(),
							{ style: 'percent', maximumFractionDigits: 2 },
						)})`}
					</Text>
				</Box>
				<Box display="flex" paddingTop="large" gap="large" position="relative" paddingBottom="large">
					<CardButtons />
				</Box>

				{chart && (
					<>
						<Box className={styles.chartBgWrapper}>
							<ResponsiveContainer width="100%" height="100%">
								<AreaChart
									width={500}
									height={400}
									data={chart.map(value => ({
										name: intl.formatDate(value[0]),
										value: value[1],
										inCurrency: intl.formatNumber(value[1], { style: 'currency', currency }),
									}))}
									margin={{
										top: 10,
										right: 0,
										left: 0,
										bottom: 0,
									}}
								>
									{/* <CartesianGrid strokeDasharray="3 3" /> */}
									{/* <XAxis dataKey="name" /> */}
									{/* <YAxis /> */}
									<defs>
										<linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
											<stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
										</linearGradient>
									</defs>
									<Area
										// type="linear"
										type="monotone"
										dataKey="value"
										stroke="#8884d8"
										fill="url(#areaGradient)"
										strokeWidth={3} // Adjust the stroke width here
									/>
									<Tooltip content={renderTooltipContent} cursor={false} />
								</AreaChart>
							</ResponsiveContainer>
						</Box>
						<Box className={styles.assetChartBtnsWrapper}>
							{Object.entries(TIMEFRAMES).map(([id, { shortName }]) => (
								<Button
									key={id}
									rounded
									styleVariant={id === 'all' ? 'secondary' : 'tertiary'}
									sizeVariant="small"
									onClick={() => setTimeFrame(id)}
								>
									{shortName}
								</Button>
							))}
						</Box>
					</>
				)}

				<Box display="flex" flexDirection="column">
					<Box marginTop="xsmall" paddingBottom="medium">
						<Text size="medium" weight="medium" color="strong">
							{intl.formatMessage(messages.summary)}
						</Text>
					</Box>
					<AccountsTransactionInfo
						leftTitle={
							<Text size="large" color="strong">
								{intl.formatMessage(messages.details_address)}
							</Text>
						}
						rightData={<Text size="small">{resourceId}</Text>}
					/>

					<AccountsTransactionInfo
						leftTitle={
							<Text size="large" color="strong">
								{intl.formatMessage(messages.details_divisibility)}
							</Text>
						}
						rightData={<Text size="small">{data?.details?.divisibility}</Text>}
					/>
					<AccountsTransactionInfo
						leftTitle={
							<Text size="large" color="strong">
								{intl.formatMessage(messages.details_total_supply)}
							</Text>
						}
						rightData={
							<Text size="small">
								{intl.formatNumber(+data?.details?.total_supply || 0, {
									style: 'decimal',
									maximumFractionDigits: 8,
								})}
							</Text>
						}
					/>
					<AccountsTransactionInfo
						leftTitle={
							<Text size="large" color="strong">
								{intl.formatMessage(messages.details_total_minted)}
							</Text>
						}
						rightData={
							<Text size="small">
								{intl.formatNumber(+data?.details?.total_minted || 0, {
									style: 'decimal',
									maximumFractionDigits: 8,
								})}
							</Text>
						}
					/>
					<AccountsTransactionInfo
						leftTitle={
							<Text size="large" color="strong">
								{intl.formatMessage(messages.details_total_burned)}
							</Text>
						}
						rightData={
							<Text size="small">
								{intl.formatNumber(+data?.details?.total_burned || 0, {
									style: 'decimal',
									maximumFractionDigits: 8,
								})}
							</Text>
						}
					/>
				</Box>

				<Box display="flex" flexDirection="column">
					<Box marginTop="xsmall" paddingBottom="medium">
						<Text size="medium" weight="medium" color="strong">
							{intl.formatMessage(messages.metadata)}
						</Text>
					</Box>
					{data?.metadata.items.map(item => (
						<AccountsTransactionInfo
							key={item.key}
							leftTitle={
								<Text size="large" color="strong">
									{item.is_locked === true && <LockIcon />}
									{(item.key as string).toUpperCase()}
								</Text>
							}
							rightData={
								<Text size="small">
									<MetadataValue value={item} />
								</Text>
							}
						/>
					))}
				</Box>
			</Box>
		</Box>
	)
}

export default TokenDetails
