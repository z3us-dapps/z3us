import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useSearchParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { ShareIcon } from 'ui/src/components/icons'
import { AccountsTransactionInfo } from 'ui/src/components/layout/account-transaction-info'
import { SlideOutDialog } from 'ui/src/components/layout/slide-out-dialog'
import { Button } from 'ui/src/components/router-button'
import { TimeFromNow } from 'ui/src/components/time-from-now'
import { TokenPrice } from 'ui/src/components/token-price'
import { ToolTip } from 'ui/src/components/tool-tip'
import { TransactionManifest } from 'ui/src/components/transaction-manifest'
import { Text } from 'ui/src/components/typography'
import Code from 'ui/src/components/typography/code'
import { config } from 'ui/src/constants/config'
import { useKnownAddresses } from 'ui/src/hooks/dapp/use-known-addresses'
import { useTransaction } from 'ui/src/hooks/dapp/use-transactions'
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
	message: {
		id: 'T7Ry38',
		defaultMessage: 'Message',
	},
	manifest: {
		id: 'c+Uxfa',
		defaultMessage: 'Transaction manifest',
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
	const [searchParams, setSearchParams] = useSearchParams()
	const { data: knownAddresses } = useKnownAddresses()

	const transactionId = searchParams.get('tx')
	const isTransactionVisible = !!transactionId

	const { data, isLoading } = useTransaction(transactionId)
	// {"type":"Plaintext","content":{"type":"String","value":"test"},"mime_type":"text/plain"}
	const message = (data?.transaction.message as any)?.content?.value

	const navigateBack = () => {
		searchParams.delete('tx')
		setSearchParams(searchParams)
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
					</Box>
					<Box className={styles.transactionDetailsWrapper}>
						<Box marginTop="xsmall" paddingBottom="medium">
							<Text size="medium" weight="medium" color="strong">
								{intl.formatMessage(messages.details)}
							</Text>
						</Box>
						<Box display="flex" flexDirection="column" gap="medium" width="full">
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
								rightData={<Text size="xsmall">{data?.transaction.transaction_status}</Text>}
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
							<AccountsTransactionInfo
								leftTitle={intl.formatMessage(messages.affected_global_entities)}
								rightData={
									<Box display="flex" flexDirection="column" gap="xsmall">
										{[data?.transaction.affected_global_entities?.[0]]?.map(entity => (
											<Box key={entity} display="flex" alignItems="flex-end" gap="small" justifyContent="flex-end">
												<ToolTip message={entity}>
													<Box>
														<Text size="xsmall">{getShortAddress(entity, 8)}</Text>
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
								}
							/>
							<Box className={styles.transactionExtraRowsWrapper}>
								{data?.transaction.affected_global_entities?.slice(1)?.map(entity => (
									<Box key={entity} display="flex" alignItems="flex-end" gap="small" justifyContent="flex-end">
										<ToolTip message={entity}>
											<Box>
												<Text size="xsmall">{getShortAddress(entity, 8)}</Text>
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

							{message && (
								<>
									<AccountsTransactionInfo leftTitle={intl.formatMessage(messages.message_title)} rightData={null} />

									<Box paddingY="xsmall">
										<Code content={message} className={styles.transactionMessageWrapper} />
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
