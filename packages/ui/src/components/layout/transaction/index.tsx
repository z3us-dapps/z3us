import type {
	TransactionFungibleBalanceChanges,
	TransactionFungibleFeeBalanceChanges,
	TransactionNonFungibleBalanceChanges,
} from '@radixdlt/babylon-gateway-api-sdk'
import {
	instanceOfTransactionFungibleBalanceChanges,
	instanceOfTransactionFungibleFeeBalanceChanges,
	instanceOfTransactionNonFungibleBalanceChanges,
} from '@radixdlt/babylon-gateway-api-sdk'
import { useZdtState } from 'packages/ui/src/hooks/zdt/use-zdt'
import React, { useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { AccountCardIcon } from 'ui/src/components/account-cards'
import { Box } from 'ui/src/components/box'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { RadixIcon, Z3usIcon } from 'ui/src/components/icons'
import { AccountsTransactionInfo } from 'ui/src/components/layout/account-transaction-info'
import { SlideOutDialog } from 'ui/src/components/layout/slide-out-dialog'
import { Button } from 'ui/src/components/router-button'
import { TimeFromNow } from 'ui/src/components/time-from-now'
import { TokenPrice } from 'ui/src/components/token-price'
import { ToolTip } from 'ui/src/components/tool-tip'
import { TransactionIcon } from 'ui/src/components/transaction-icon'
import { TransactionManifest } from 'ui/src/components/transaction-manifest'
import { TransactionStatusIcon } from 'ui/src/components/transaction-status-icon'
import { RedGreenText, Text } from 'ui/src/components/typography'
import Code from 'ui/src/components/typography/code'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { DECIMAL_STYLES } from 'ui/src/constants/number'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useKnownAddresses } from 'ui/src/hooks/dapp/use-known-addresses'
import { useDashboardUrl } from 'ui/src/hooks/dapp/use-network'
import { useTransaction } from 'ui/src/hooks/dapp/use-transactions'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'
import { findMetadataValue } from 'ui/src/services/metadata'
import { getShortAddress } from 'ui/src/utils/string-utils'

import { TransactionLoadingSkeleton } from './components/transaction-loading-skeleton'
import * as styles from './styles.css'

const messages = defineMessages({
	fee: {
		id: 'uT4OlP',
		defaultMessage: 'Fee',
	},
	details: {
		id: 'Lv0zJu',
		defaultMessage: 'Details',
	},
	id: {
		id: 'qlcuNQ',
		defaultMessage: 'ID',
	},
	status: {
		id: 'tzMNF3',
		defaultMessage: 'Status',
	},
	version: {
		id: 'TUyQXM',
		defaultMessage: 'State version',
	},
	epoch: {
		id: '8Tzeri',
		defaultMessage: 'Epoch',
	},
	round: {
		id: 'V55xlZ',
		defaultMessage: 'Round',
	},
	date: {
		id: 'P7PLVj',
		defaultMessage: 'Date',
	},
	affected_global_entities: {
		id: 'anjq2Q',
		defaultMessage: 'Affected global entities',
	},
	show_all: {
		id: 'JMac37',
		defaultMessage: 'Show all',
	},
	show_less: {
		id: 'qyJtWy',
		defaultMessage: 'Show less',
	},
	message: {
		id: 'T7Ry38',
		defaultMessage: 'Message',
	},
	manifest: {
		id: 'c+Uxfa',
		defaultMessage: 'Transaction manifest',
	},
	balance_changes: {
		id: 'XJND8b',
		defaultMessage: 'Balance changes',
	},
	message_title: {
		id: 'V9XAYn',
		defaultMessage: 'Transaction message',
	},
	events: {
		defaultMessage: 'Events',
		id: 'ZvKSfJ',
	},
	open_radix_dashboard: {
		id: 'xxuT0a',
		defaultMessage: 'Open in Radix Dashboard',
	},
	open_z3us: {
		id: 'WAHvBA',
		defaultMessage: 'Open in Z3US.com',
	},
})

function groupBalanceChanges(
	changes: Array<
		TransactionFungibleFeeBalanceChanges | TransactionFungibleBalanceChanges | TransactionNonFungibleBalanceChanges
	>,
) {
	return changes.reduce((rv, change) => {
		rv[change.entity_address] = rv[change.entity_address] || []
		switch (true) {
			case instanceOfTransactionFungibleFeeBalanceChanges(change):
				rv[change.entity_address].push({
					resource_address: change.resource_address,
					entity_address: change.entity_address,
					amount: (change as TransactionFungibleFeeBalanceChanges).balance_change,
					type: (change as TransactionFungibleFeeBalanceChanges).type,
					isFee: true,
				})
				break
			case instanceOfTransactionFungibleBalanceChanges(change):
				rv[change.entity_address].push({
					resource_address: change.resource_address,
					entity_address: change.entity_address,
					amount: (change as TransactionFungibleBalanceChanges).balance_change,
					isFee: false,
				})
				break
			case instanceOfTransactionNonFungibleBalanceChanges(change):
				rv[change.entity_address].push({
					resource_address: change.resource_address,
					entity_address: change.entity_address,
					amount: `${
						(change as TransactionNonFungibleBalanceChanges).added.length -
						(change as TransactionNonFungibleBalanceChanges).removed.length
					}`,
					isFee: false,
				})
				break
			default:
				break
		}
		return rv
	}, {})
}

const BalanceChange = ({ change }) => {
	const intl = useIntl()
	const { data, isLoading } = useEntityDetails(change.resource_address)

	const name = findMetadataValue('name', data?.metadata?.items)
	const symbol = findMetadataValue('symbol', data?.metadata?.items)
	const displayName = symbol?.toUpperCase() || name || getShortAddress(change.resource_address)

	if (isLoading) return <FallbackLoading />

	return (
		<Box className={styles.balanceChangeItemContentRow}>
			<Box display="flex" alignItems="center" gap="medium" width="full">
				<TransactionIcon
					size={{ mobile: 'large', tablet: 'large' }}
					address={change.resource_address}
					transactionType={Number.parseFloat(change.amount) > 0 ? 'deposit' : 'withdraw'}
				/>
				<Box flexGrow={1}>
					<Text size="xsmall" truncate>
						{displayName}
					</Text>
				</Box>
				<Box display="flex" flexDirection="column" gap="xxsmall" flexShrink={0}>
					<RedGreenText change={Number.parseFloat(change.amount) || 0} size="xxsmall" align="right">
						{intl.formatNumber(Number.parseFloat(change.amount) || 0, { signDisplay: 'exceptZero', ...DECIMAL_STYLES })}
					</RedGreenText>
				</Box>
			</Box>
		</Box>
	)
}

const BalanceChangeFee = ({ change }) => {
	const intl = useIntl()
	const { data: knownAddresses } = useKnownAddresses()

	return (
		<Box className={styles.balanceChangeItemContentRow}>
			<Box display="flex" alignItems="center" gap="medium" width="full">
				<TransactionIcon size={{ mobile: 'large', tablet: 'large' }} address={knownAddresses?.resourceAddresses.xrd} />
				<Box flexGrow={1}>
					<Text size="xsmall" truncate>
						{intl.formatMessage(messages.fee)}
					</Text>
				</Box>
				<Box display="flex" flexDirection="column" gap="xxsmall" flexShrink={0}>
					<RedGreenText change={-1} size="xxsmall" align="right">
						{`${intl.formatNumber(Number.parseFloat(change.amount) || 0, DECIMAL_STYLES)} XRD`}
					</RedGreenText>
					<Text size="xxsmall" align="right">
						{change.type}
					</Text>
				</Box>
			</Box>
		</Box>
	)
}

export const Transaction = () => {
	const intl = useIntl()
	const location = useLocation()
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const dashboardUrl = useDashboardUrl()
	const { data: knownAddresses } = useKnownAddresses()
	const accounts = useWalletAccounts()
	const { isWallet } = useZdtState()

	const [showAllEntities, setShowAllEntities] = useState<boolean>(false)
	const [showAllBalanceChanges, setShowAllBalanceChanges] = useState<boolean>(false)

	const transactionId = searchParams.get('tx')
	const isTransactionVisible = !!transactionId

	const { data, isLoading } = useTransaction(transactionId)

	const message = useMemo(
		// {"type":"Plaintext","content":{"type":"String","value":"test"},"mime_type":"text/plain"}
		() => (data?.transaction.message as any)?.content?.value,
		[data],
	)

	const balanceChanges = useMemo(
		() =>
			groupBalanceChanges([
				...(data?.transaction.balance_changes?.fungible_fee_balance_changes || []),
				...(data?.transaction.balance_changes?.fungible_balance_changes || []),
				...(data?.transaction.balance_changes?.non_fungible_balance_changes || []),
			]),
		[data],
	)

	const navigateBack = () => {
		searchParams.delete('tx')
		navigate(`${location.pathname}?${searchParams}`)
	}

	const handleClickViewAllEntities = () => {
		setShowAllEntities(!showAllEntities)
	}

	const handleClickViewAllBalanceChanges = () => {
		setShowAllBalanceChanges(!showAllBalanceChanges)
	}

	return (
		<SlideOutDialog
			open={isTransactionVisible}
			onClose={navigateBack}
			headerButtons={
				<Box>
					<ToolTip message={intl.formatMessage(messages.open_radix_dashboard)}>
						<Button
							sizeVariant="small"
							styleVariant="ghost"
							iconOnly
							to={`${dashboardUrl}/transaction/${transactionId}`}
							target="_blank"
						>
							<RadixIcon />
						</Button>
					</ToolTip>
					{isWallet && (
						<ToolTip message={intl.formatMessage(messages.open_z3us)}>
							<Button
								sizeVariant="small"
								styleVariant="ghost"
								iconOnly
								to={`https://z3us.com/#/accounts?query=${transactionId}`}
								target="_blank"
							>
								<Z3usIcon />
							</Button>
						</ToolTip>
					)}
				</Box>
			}
		>
			{isLoading ? (
				<TransactionLoadingSkeleton />
			) : (
				<>
					<Box display="flex" flexDirection="column" alignItems="center">
						<Box marginTop="small">
							<Text size="small">{intl.formatMessage(messages.fee)}</Text>
						</Box>
						<Box marginTop="xxsmall">
							<Text size="xxxlarge" color="strong">
								{intl.formatNumber(parseFloat(data?.transaction.fee_paid) || 0, DECIMAL_STYLES)} XRD
							</Text>
						</Box>
						<Box>
							<Text size="xlarge">
								<TokenPrice
									amount={parseFloat(data?.transaction.fee_paid) || 0}
									address={knownAddresses?.resourceAddresses.xrd}
								/>
							</Text>
						</Box>
						<Box width="full" className={styles.transactionErrorMessage}>
							<ValidationErrorMessage align="center" message={data?.transaction?.error_message} />
						</Box>
					</Box>
					<Box className={styles.transactionDetailsWrapper}>
						<Box marginTop="xsmall">
							<Text size="medium" weight="medium" color="strong">
								{intl.formatMessage(messages.details)}
							</Text>
						</Box>
						<Box className={styles.transactionDetailsNoGapWrapper}>
							<AccountsTransactionInfo
								leftTitle={intl.formatMessage(messages.id)}
								rightData={
									<Box display="flex" alignItems="flex-end" gap="small">
										<ToolTip message={data?.transaction.intent_hash}>
											<Box>
												<Text size="xsmall">{getShortAddress(data?.transaction.intent_hash)}</Text>
											</Box>
										</ToolTip>
										<Box className={styles.transactionInfoCopyBtnWrapper}>
											<CopyAddressButton
												styleVariant="ghost"
												address={data?.transaction.intent_hash}
												sizeVariant="xsmall"
												iconOnly
												rounded={false}
												tickColor="colorStrong"
											/>
										</Box>
									</Box>
								}
							/>
							<AccountsTransactionInfo
								leftTitle={intl.formatMessage(messages.status)}
								rightData={
									<Box display="flex" alignItems="flex-end" gap="small">
										<Text size="xsmall">{data?.transaction.transaction_status}</Text>
										<TransactionStatusIcon statusType={data?.transaction.transaction_status} size="small" />
									</Box>
								}
							/>
							<AccountsTransactionInfo
								leftTitle={intl.formatMessage(messages.version)}
								rightData={<Text size="xsmall">{data?.transaction.state_version}</Text>}
							/>

							<AccountsTransactionInfo
								leftTitle={intl.formatMessage(messages.epoch)}
								rightData={<Text size="xsmall">{data?.transaction.epoch}</Text>}
							/>
							<AccountsTransactionInfo
								leftTitle={intl.formatMessage(messages.round)}
								rightData={<Text size="xsmall">{data?.transaction.round}</Text>}
							/>
							<AccountsTransactionInfo
								leftTitle={intl.formatMessage(messages.date)}
								rightData={
									<Text size="xsmall">
										<TimeFromNow date={data?.transaction.confirmed_at} />
									</Text>
								}
							/>
						</Box>

						<Box className={styles.balanceChangeWrapper}>
							<Box className={styles.balanceChangeLabelWrapper}>
								<AccountsTransactionInfo
									leftTitle={intl.formatMessage(messages.balance_changes)}
									rightData={
										Object.keys(balanceChanges).length > 3 ? (
											<Button sizeVariant="xsmall" styleVariant="secondary" onClick={handleClickViewAllBalanceChanges}>
												{showAllBalanceChanges
													? intl.formatMessage(messages.show_less)
													: intl.formatMessage(messages.show_all)}
											</Button>
										) : null
									}
								/>
							</Box>
							<Box className={styles.balanceChangeItemsFlexWrapper}>
								{Object.keys(balanceChanges)
									.slice(0, showAllBalanceChanges ? Object.keys(balanceChanges).length : 3)
									.map(entity_address => (
										<Box key={entity_address} className={styles.balanceChangeItem}>
											<Box className={styles.balanceChangeItemHeader}>
												<ToolTip message={data?.transaction.intent_hash}>
													<Box display="flex" alignItems="center" gap="small">
														{accounts[entity_address] && (
															<Box flexShrink={0}>
																<AccountCardIcon address={entity_address} />
															</Box>
														)}
														<Box flexGrow={1} minWidth={0}>
															<Text truncate size="xsmall">
																{getShortAddress(entity_address)}
															</Text>
														</Box>
													</Box>
												</ToolTip>
												<Box display="flex" alignItems="flex-end" flexGrow={1}>
													<CopyAddressButton
														styleVariant="ghost"
														address={entity_address}
														sizeVariant="xsmall"
														iconOnly
														rounded={false}
														tickColor="colorStrong"
													/>
												</Box>
											</Box>
											<Box className={styles.balanceChangeItemContent}>
												{balanceChanges[entity_address].map((change, idx) => (
													// eslint-disable-next-line react/no-array-index-key
													<React.Fragment key={idx}>
														{change.isFee ? <BalanceChangeFee change={change} /> : <BalanceChange change={change} />}
													</React.Fragment>
												))}
											</Box>
										</Box>
									))}
							</Box>
						</Box>

						<Box className={styles.transactionDetailsGapWrapper}>
							<Box paddingY="xsmall">
								<AccountsTransactionInfo
									leftTitle={intl.formatMessage(messages.affected_global_entities)}
									rightData={
										data?.transaction.affected_global_entities.length > 3 ? (
											<Button sizeVariant="xsmall" styleVariant="secondary" onClick={handleClickViewAllEntities}>
												{showAllEntities
													? intl.formatMessage(messages.show_less)
													: intl.formatMessage(messages.show_all)}
											</Button>
										) : null
									}
								/>
								<Box display="flex" flexDirection="column" gap="xsmall" paddingTop="small" width="full">
									{data?.transaction.affected_global_entities
										?.slice(0, showAllEntities ? data?.transaction.affected_global_entities.length : 3)
										?.map(entity => (
											<Box key={entity} display="flex" alignItems="flex-end" gap="small" justifyContent="flex-start">
												<ToolTip message={entity}>
													<Box>
														<Text size="xsmall">{getShortAddress(entity, 12)}</Text>
													</Box>
												</ToolTip>
												<Box className={styles.transactionInfoCopyBtnWrapper}>
													<CopyAddressButton
														styleVariant="ghost"
														sizeVariant="xsmall"
														address={entity}
														iconOnly
														rounded={false}
														tickColor="colorStrong"
													/>
												</Box>
											</Box>
										))}
								</Box>
							</Box>

							{message && (
								<>
									<AccountsTransactionInfo leftTitle={intl.formatMessage(messages.message_title)} rightData={null} />
									<Box paddingY="xsmall">
										<Code
											content={message}
											className={styles.transactionMessageWrapper}
											isHorizontalScrollEnabled={false}
										/>
									</Box>
								</>
							)}

							<AccountsTransactionInfo leftTitle={intl.formatMessage(messages.manifest)} rightData={null} />

							<Box paddingY="xsmall">
								<TransactionManifest manifestHex={data?.transaction.raw_hex} />
							</Box>

							<AccountsTransactionInfo leftTitle={intl.formatMessage(messages.events)} rightData={null} />

							<Box paddingY="xsmall">
								<Code content={JSON.stringify(data?.transaction.receipt?.events, null, 2)} />
							</Box>
						</Box>
					</Box>
				</>
			)}
		</SlideOutDialog>
	)
}
