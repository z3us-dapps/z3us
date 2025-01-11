import type { MetadataStringArrayValue, StateEntityDetailsResponseItemDetails } from '@radixdlt/babylon-gateway-api-sdk'
import React, { useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useLocation } from 'react-router-dom'
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts'

import { ActivityList } from 'ui/src/components/activity-list'
import { Box } from 'ui/src/components/box'
import { CardButtons } from 'ui/src/components/card-buttons'
import { ChartToolTip } from 'ui/src/components/chart-tool-tip'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { Check2Icon, Close2Icon, LockIcon } from 'ui/src/components/icons'
import { AccountsTransactionInfo } from 'ui/src/components/layout/account-transaction-info'
import MetadataValue from 'ui/src/components/metadata-value'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Button } from 'ui/src/components/router-button'
import { Link } from 'ui/src/components/router-link'
import { Tabs, TabsContent } from 'ui/src/components/tabs'
import { RedGreenText, Text } from 'ui/src/components/typography'
import { CURRENCY_STYLES, DECIMAL_STYLES, PERCENTAGE_STYLES } from 'ui/src/constants/number'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useKnownAddresses } from 'ui/src/hooks/dapp/use-known-addresses'
import { useMarketChart, useXRDCurrentPrice } from 'ui/src/hooks/queries/coingecko'
import { useUsfHistory } from 'ui/src/hooks/queries/oci'
import { useToken } from 'ui/src/hooks/queries/tokens'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { findMetadataValue } from 'ui/src/services/metadata'
import { TimeFrames } from 'ui/src/types'

import ComponentDetails from './components/component-details'
import FungibleResourceDetails from './components/fungible-resource-details'
import FungibleVaultDetails from './components/fungible-vault-details'
import NonFungibleResourceDetails from './components/non-fungible-resource-details'
import NonFungibleVaultDetails from './components/non-fungible-vault-details'
import PackageDetails from './components/package-details'
import * as styles from './styles.css'

const DETAILS = 'details'
const ACTIVITIES = 'activities'

const DISPLAY_ROLES = ['burner', 'minter', 'freezer', 'recaller', 'depositor', 'withdrawer']
const IGNORE_METADATA = ['name', 'description', 'symbol', 'icon_url', 'validator', 'tags', 'pool']

const messages = defineMessages({
	tab_details: {
		id: 'Lv0zJu',
		defaultMessage: 'Details',
	},
	tab_activities: {
		id: 'UmEsZF',
		defaultMessage: 'Activities',
	},
	back: {
		id: 'cyR7Kh',
		defaultMessage: 'Back',
	},
	metadata: {
		id: '8Q504V',
		defaultMessage: 'Metadata',
	},
	roles: {
		id: 'kAAlGL',
		defaultMessage: 'Rules',
	},
	summary: {
		id: 'RrCui3',
		defaultMessage: 'Summary',
	},
	name: {
		id: 'HAlOn1',
		defaultMessage: 'Name',
	},
	symbol: {
		id: '3HepmQ',
		defaultMessage: 'Symbol',
	},
	validator: {
		id: 'Ykb512',
		defaultMessage: 'Validator',
	},
	pool: {
		id: '11oARw',
		defaultMessage: 'Pool',
	},
	details_address: {
		id: 'e6Ph5+',
		defaultMessage: 'Address',
	},
	burner: {
		defaultMessage: 'Burnable',
		id: 'MjwQp7',
	},
	minter: {
		defaultMessage: 'Mintable',
		id: '84m3CV',
	},
	freezer: {
		defaultMessage: 'Freezable',
		id: 'I1qodS',
	},
	recaller: {
		defaultMessage: 'Recallable',
		id: 'IvrL45',
	},
	depositor: {
		defaultMessage: 'Depositable',
		id: '3/+Xgy',
	},
	withdrawer: {
		defaultMessage: 'Withdrawable',
		id: '1wANY0',
	},
})

const Details: { [key in StateEntityDetailsResponseItemDetails['type']]: React.FC<any> } = {
	Component: ComponentDetails,
	FungibleResource: FungibleResourceDetails,
	FungibleVault: FungibleVaultDetails,
	NonFungibleResource: NonFungibleResourceDetails,
	NonFungibleVault: NonFungibleVaultDetails,
	Package: PackageDetails,
}

interface IValueProps {
	resourceId: string
}

export const ResourceValue: React.FC<IValueProps> = ({ resourceId }) => {
	const intl = useIntl()

	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const { data: xrdPrice } = useXRDCurrentPrice(currency)
	const { data: token } = useToken(resourceId)

	const [format, setFormat] = useState<'currency' | 'xrd'>('currency')

	const handleToggleFormat = () => {
		setFormat(format === 'currency' ? 'xrd' : 'currency')
	}

	return (
		<>
			<Box component="button" onClick={handleToggleFormat} className={styles.totalValueWrapper}>
				<Text size="xxxlarge" weight="medium" color="strong" align="center">
					{format === 'currency'
						? intl.formatNumber((token?.price.xrd.now || 0) * xrdPrice, { currency, ...CURRENCY_STYLES })
						: `${intl.formatNumber(token?.price.xrd.now || 0, { maximumSignificantDigits: 3, ...DECIMAL_STYLES })} XRD`}
				</Text>
			</Box>
			<Box display="flex" gap="xsmall">
				<Text size="large">
					{format === 'currency'
						? intl.formatNumber((token?.price.xrd.increase || 0) * xrdPrice, { currency, ...CURRENCY_STYLES })
						: `${intl.formatNumber(token?.price.xrd.increase || 0, {
								maximumSignificantDigits: 3,
								...DECIMAL_STYLES,
						  })} XRD`}
				</Text>
				<RedGreenText size="large" change={token?.price.usd.change || 0}>
					{`(${intl.formatNumber(token?.price.usd.change || 0, PERCENTAGE_STYLES)})`}
				</RedGreenText>
			</Box>
		</>
	)
}

interface IProps {
	resourceId: string
	hideButtons?: boolean
}

const ResourceDetails: React.FC<IProps> = ({ resourceId, hideButtons }) => {
	const intl = useIntl()
	const location = useLocation()

	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const { data, isLoading } = useEntityDetails(resourceId)
	const { data: knownAddresses } = useKnownAddresses()
	const { data: xrdPrice } = useXRDCurrentPrice(currency)

	const DetailsComponent = Details[data?.details?.type]
	const name = findMetadataValue('name', data?.metadata?.items)
	const symbol = findMetadataValue('symbol', data?.metadata?.items)
	const description = findMetadataValue('description', data?.metadata?.items)
	const validator = findMetadataValue('validator', data?.metadata?.items)
	const pool = findMetadataValue('pool', data?.metadata?.items)
	const tags =
		(data?.metadata?.items?.find(m => m.key === 'tags')?.value?.typed as MetadataStringArrayValue)?.values || []

	const [timeFrame, setTimeFrame] = useState<TimeFrames>(TimeFrames.THREE_MONTHS)
	const { data: udfHistory } = useUsfHistory(resourceId, timeFrame)
	const { data: marketData } = useMarketChart(currency, symbol, timeFrame)

	const chartData = useMemo(() => {
		if (resourceId === knownAddresses?.resourceAddresses.xrd) {
			if (!marketData) return []
			return marketData.map(_value => ({
				name: intl.formatDate(_value[0]),
				value: _value[1],
				inCurrency: intl.formatNumber(_value[1], { currency, ...CURRENCY_STYLES }),
			}))
		}
		if (!udfHistory) return []
		return udfHistory.t.map((t, idx) => {
			const v = parseFloat(udfHistory.c[idx]) || 0
			return {
				name: intl.formatDate(t * 1000),
				value: v,
				inCurrency: intl.formatNumber(v * xrdPrice, { currency, ...CURRENCY_STYLES }),
			}
		})
	}, [resourceId, knownAddresses, udfHistory, marketData])

	const metadata = useMemo(() => data?.metadata.items.filter(item => !IGNORE_METADATA.includes(item.key)) || [], [data])
	const roles = useMemo(
		() =>
			data?.details?.type === 'FungibleVault' ||
			data?.details?.type === 'NonFungibleVault' ||
			data?.details?.type === 'Package'
				? []
				: data?.details?.role_assignments?.entries.filter(item => DISPLAY_ROLES.includes(item.role_key.name)) || [],
		[data],
	)

	const renderTooltipContent = ({ active, payload }) => {
		if (active && payload && payload.length) {
			const dataItem = payload[0].payload

			return <ChartToolTip color="#8884d8" name={dataItem.name} value={dataItem.inCurrency} />
		}

		return null
	}

	if (!resourceId) return null
	if (isLoading) return <FallbackLoading />

	return (
		<Box flexShrink={0}>
			<Box display="flex" flexDirection="column" alignItems="center">
				<Box className={styles.assetInfoWrapper}>
					<Box paddingBottom="small">
						<ResourceImageIcon size={{ mobile: 'xlarge', tablet: 'xxlarge' }} address={resourceId} />
					</Box>
					<Text size="xxlarge" weight="strong" color="strong" align="center">
						{name}
					</Text>
					{!validator && data?.details?.type === 'FungibleResource' && <ResourceValue resourceId={resourceId} />}
				</Box>

				{hideButtons !== true && (
					<Box display="flex" paddingTop="large" gap="large" position="relative">
						<CardButtons />
					</Box>
				)}

				{chartData.length > 0 && (
					<>
						<Box className={styles.chartBgWrapper}>
							<ResponsiveContainer width="99%" height="100%">
								<AreaChart
									width={500}
									height={400}
									data={chartData}
									margin={{
										top: 10,
										right: 0,
										left: 0,
										bottom: 0,
									}}
								>
									<defs>
										<linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
											<stop offset="0%" stopColor="#8884d8" stopOpacity={0.3} />
											<stop offset="100%" stopColor="#82ca9d" stopOpacity={0} />
										</linearGradient>
									</defs>
									<Area type="monotone" dataKey="value" stroke="#8884d8" fill="url(#areaGradient)" strokeWidth={3} />
									<Tooltip content={renderTooltipContent} cursor={false} />
								</AreaChart>
							</ResponsiveContainer>
						</Box>
						<Box className={styles.assetChartBtnWrapper}>
							{Object.keys(TimeFrames).map(tf => (
								<Button
									key={tf}
									rounded
									styleVariant={TimeFrames[tf] === timeFrame ? 'secondary' : 'tertiary'}
									sizeVariant="small"
									onClick={() => setTimeFrame(TimeFrames[tf])}
								>
									{TimeFrames[tf]}
								</Button>
							))}
						</Box>
					</>
				)}

				<Tabs
					list={[
						{ label: intl.formatMessage(messages.tab_details), value: DETAILS },
						{ label: intl.formatMessage(messages.tab_activities), value: ACTIVITIES },
					]}
					defaultValue={DETAILS}
					className={styles.tabsWrapper}
				>
					<TabsContent value={DETAILS}>
						<Box className={styles.tokenSummaryWrapper}>
							<Box display="flex" flexDirection="column">
								<Text size="large" weight="medium" color="strong">
									{intl.formatMessage(messages.summary)}
								</Text>
								<Box paddingTop="xsmall">
									<Text size="xxsmall">{description}</Text>
								</Box>

								{tags.length > 0 && (
									<Box paddingTop="medium" className={styles.tagsWrapper}>
										{tags.map(tag => (
											<Box key={tag} className={styles.tag}>
												<Button sizeVariant="xsmall" styleVariant="tertiary" rounded disabled>
													{tag}
												</Button>
											</Box>
										))}
									</Box>
								)}

								<AccountsTransactionInfo
									leftTitle={
										<Text size="xxsmall" color="strong" weight="medium">
											{intl.formatMessage(messages.details_address)}
										</Text>
									}
									rightData={
										<Box display="flex" alignItems="flex-end" className={styles.tokenSummaryRightMaxWidth}>
											<Text size="xxsmall" truncate>
												{resourceId}
											</Text>
											<CopyAddressButton
												styleVariant="ghost"
												sizeVariant="xsmall"
												address={resourceId}
												iconOnly
												rounded={false}
												tickColor="colorStrong"
											/>
										</Box>
									}
								/>

								<AccountsTransactionInfo
									leftTitle={
										<Text size="xxsmall" color="strong" weight="medium">
											{intl.formatMessage(messages.name)}
										</Text>
									}
									rightData={
										<Text size="xxsmall" truncate>
											{name}
										</Text>
									}
								/>

								{symbol && (
									<AccountsTransactionInfo
										leftTitle={
											<Text size="xxsmall" color="strong" weight="medium">
												{intl.formatMessage(messages.symbol)}
											</Text>
										}
										rightData={
											<Text size="xxsmall" truncate>
												{symbol.toUpperCase()}
											</Text>
										}
									/>
								)}

								{validator && (
									<AccountsTransactionInfo
										leftTitle={
											<Text size="xxsmall" color="strong" weight="medium">
												{intl.formatMessage(messages.validator)}
											</Text>
										}
										rightData={
											<Box display="flex" alignItems="flex-end" className={styles.tokenSummaryRightMaxWidth}>
												<Link
													size="xxsmall"
													truncate
													to={`${location.pathname}?query=${encodeURIComponent(validator)}`}
												>
													{validator}
												</Link>
												<CopyAddressButton
													styleVariant="ghost"
													sizeVariant="xsmall"
													address={validator}
													iconOnly
													rounded={false}
													tickColor="colorStrong"
												/>
											</Box>
										}
									/>
								)}

								{pool && (
									<AccountsTransactionInfo
										leftTitle={
											<Text size="xxsmall" color="strong" weight="medium">
												{intl.formatMessage(messages.pool)}
											</Text>
										}
										rightData={
											<Box display="flex" alignItems="flex-end" className={styles.tokenSummaryRightMaxWidth}>
												<Link size="xxsmall" truncate to={`${location.pathname}?query=${encodeURIComponent(pool)}`}>
													{pool}
												</Link>
												<CopyAddressButton
													styleVariant="ghost"
													sizeVariant="xsmall"
													address={pool}
													iconOnly
													rounded={false}
													tickColor="colorStrong"
												/>
											</Box>
										}
									/>
								)}
							</Box>

							{data?.details && DetailsComponent && <DetailsComponent details={data.details} />}

							{roles.length > 0 && (
								<Box display="flex" flexDirection="column">
									<Box paddingTop="xlarge">
										<Text size="large" weight="medium" color="strong">
											{intl.formatMessage(messages.roles)}
										</Text>
									</Box>

									{roles.map(item => (
										<AccountsTransactionInfo
											key={item.role_key.name}
											leftTitle={
												<Box display="flex" alignItems="flex-end" gap="xsmall">
													{!item.updater_roles && (
														<Box>
															<Box className={styles.tokenMetaDataIconWrapper}>
																<LockIcon />
															</Box>
														</Box>
													)}
													<Text size="xxsmall" color="strong" weight="medium">
														{intl.formatMessage(messages[item.role_key.name])}
													</Text>
												</Box>
											}
											rightData={
												<Box display="flex" alignItems="flex-end" className={styles.tokenSummaryRightMaxWidth}>
													{(item.assignment as any)?.explicit_rule?.type === 'DenyAll' ? (
														<Close2Icon />
													) : (
														<Check2Icon />
													)}
												</Box>
											}
										/>
									))}
								</Box>
							)}

							{metadata.length > 0 && (
								<Box display="flex" flexDirection="column">
									<Box paddingTop="xlarge">
										<Text size="large" weight="medium" color="strong">
											{intl.formatMessage(messages.metadata)}
										</Text>
									</Box>

									{metadata.map(item => (
										<AccountsTransactionInfo
											key={item.key}
											leftTitle={
												<Box display="flex" alignItems="flex-end" gap="xsmall">
													{item.is_locked === true && (
														<Box>
															<Box className={styles.tokenMetaDataIconWrapper}>
																<LockIcon />
															</Box>
														</Box>
													)}
													<Text size="xxsmall" color="strong" weight="medium">
														{(item.key as string).toUpperCase()}
													</Text>
												</Box>
											}
											rightData={
												<Box display="flex" alignItems="flex-end" className={styles.tokenSummaryRightMaxWidth}>
													<MetadataValue value={item} />
												</Box>
											}
										/>
									))}
								</Box>
							)}
						</Box>
					</TabsContent>
					<TabsContent value={ACTIVITIES}>
						<ActivityList
							resourceId={resourceId}
							className={styles.activityListResourceWrapper}
							isTitleVisible={false}
						/>
					</TabsContent>
				</Tabs>
			</Box>
		</Box>
	)
}

export default ResourceDetails
