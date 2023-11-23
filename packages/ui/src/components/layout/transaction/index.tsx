import React, { useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { ShareIcon } from 'ui/src/components/icons'
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
import { config } from 'ui/src/constants/config'
import { useKnownAddresses } from 'ui/src/hooks/dapp/use-known-addresses'
import { useTransaction } from 'ui/src/hooks/dapp/use-transactions'
import { getShortAddress } from 'ui/src/utils/string-utils'

import { ValidationErrorMessage } from '../../validation-error-message'
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
	affected_global_entities_show_all: {
		id: 'JMac37',
		defaultMessage: 'Show all',
	},
	affected_global_entities_show_less: {
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
	explorer: {
		id: 'YnOdQH',
		defaultMessage: 'Open in explorer',
	},
})

export const Transaction = () => {
	const intl = useIntl()
	const location = useLocation()
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const { data: knownAddresses } = useKnownAddresses()
	const [showAllEntities, setShowAllEntities] = useState<boolean>(false)

	const transactionId = searchParams.get('tx')
	const isTransactionVisible = !!transactionId

	const { data, isLoading } = useTransaction(transactionId)
	// {"type":"Plaintext","content":{"type":"String","value":"test"},"mime_type":"text/plain"}
	const message = (data?.transaction.message as any)?.content?.value

	const navigateBack = () => {
		searchParams.delete('tx')
		navigate(`${location.pathname}?${searchParams}`)
	}

	const handleClickViewAllEntities = () => {
		setShowAllEntities(!showAllEntities)
	}

	return (
		<SlideOutDialog
			open={isTransactionVisible}
			onClose={navigateBack}
			headerButtons={
				<ToolTip message={intl.formatMessage(messages.explorer)}>
					<Button
						sizeVariant="small"
						styleVariant="ghost"
						iconOnly
						to={`${config.defaultExplorerURL}/transaction/${transactionId}`}
						target="_blank"
					>
						<ShareIcon />
					</Button>
				</ToolTip>
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
								{intl.formatNumber(parseFloat(data?.transaction.fee_paid) || 0, {
									style: 'decimal',
									maximumFractionDigits: 18,
								})}{' '}
								XRD
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
								<AccountsTransactionInfo leftTitle={intl.formatMessage(messages.balance_changes)} rightData={null} />
							</Box>
							<Box className={styles.balanceChangeItemsFlexWrapper}>
								{/* TODO: iterate here */}
								<Box className={styles.balanceChangeItem}>
									<Box className={styles.balanceChangeItemHeader}>
										<ToolTip message={data?.transaction.intent_hash}>
											<Box>
												<Text size="xsmall">{getShortAddress(data?.transaction.intent_hash, 8)}</Text>
											</Box>
										</ToolTip>
										<CopyAddressButton
											styleVariant="ghost"
											address={data?.transaction.intent_hash}
											sizeVariant="xsmall"
											iconOnly
											rounded={false}
											tickColor="colorStrong"
										/>
									</Box>
									<Box className={styles.balanceChangeItemContent}>
										<Box className={styles.balanceChangeItemContentRow}>
											<Box display="flex" alignItems="center" gap="medium" width="full">
												<TransactionIcon
													size={{ mobile: 'large', tablet: 'large' }}
													address="resource_rdx1t52pvtk5wfhltchwh3rkzls2x0r98fw9cjhpyrf3vsykhkuwrf7jg8"
													transactionType="deposit"
												/>
												<Box flexGrow={1}>
													<Text size="xsmall" truncate>
														Ociswap (ociswap) Ociswap (ociswap) Ociswap (ociswap)
													</Text>
												</Box>
												<Box display="flex" flexDirection="column" gap="xxsmall" flexShrink={0}>
													<RedGreenText change={1} size="xxsmall" align="right">
														0.1234432 XRD
													</RedGreenText>
												</Box>
											</Box>
										</Box>
										<Box className={styles.balanceChangeItemContentRow}>
											<Box display="flex" alignItems="center" gap="medium" width="full">
												<TransactionIcon
													size={{ mobile: 'large', tablet: 'large' }}
													address="resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd"
													// transactionType="withdraw"
												/>
												<Box flexGrow={1}>
													<Text size="xsmall" truncate>
														Ociswap (ociswap) Ociswap (ociswap) Ociswap (ociswap)
													</Text>
												</Box>
												<Box display="flex" flexDirection="column" gap="xxsmall" flexShrink={0}>
													<RedGreenText change={-1} size="xxsmall" align="right">
														0.1234432 XRD
													</RedGreenText>
													<Text size="xxsmall" align="right">
														Transaction fee
													</Text>
												</Box>
											</Box>
										</Box>
									</Box>
								</Box>
								{/* TODO: end iterate here */}
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
													? intl.formatMessage(messages.affected_global_entities_show_less)
													: intl.formatMessage(messages.affected_global_entities_show_all)}
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
