import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { AccountsTransactionInfo } from 'ui/src/components/layout/account-transaction-info'
import { SlideOutDialog } from 'ui/src/components/layout/slide-out-dialog'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { useTransactionStatus } from 'ui/src/hooks/dapp/use-transactions'
import { getShortAddress } from 'ui/src/utils/string'

import { TransactionLoadingSkeleton } from './components/transaction-loading-skeleton'
import * as styles from './styles.css'

const messages = defineMessages({
	id: {
		id: 'qlcuNQ',
		defaultMessage: 'ID',
	},
	details: {
		id: 'Lv0zJu',
		defaultMessage: 'Details',
	},
	intent_status: {
		id: 'sx3OHL',
		defaultMessage: 'Intent status',
	},
	status: {
		id: 'tzMNF3',
		defaultMessage: 'Status',
	},
	explorer: {
		id: 'YnOdQH',
		defaultMessage: 'Open in explorer',
	},
})

interface IProps {
	transactionId: string
	onClose: () => void
}

export const TransactionStatus: React.FC<IProps> = ({ transactionId, onClose }) => {
	const intl = useIntl()

	const { data: status, isLoading } = useTransactionStatus(transactionId)

	return (
		<SlideOutDialog onClose={onClose} open>
			{isLoading ? (
				<TransactionLoadingSkeleton />
			) : (
				<>
					<Box display="flex" flexDirection="column" alignItems="center">
						<Box marginTop="small">
							<Text size="small">{intl.formatMessage(messages.intent_status)}</Text>
						</Box>
						<Box marginTop="xxsmall">
							<Text size="xxxlarge" color="strong">
								{status.intent_status}
							</Text>
						</Box>
						{status.error_message && (
							<Box marginTop="small">
								<Text size="xlarge" align="center" color="red">
									{status.error_message}
								</Text>
							</Box>
						)}
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
										<ToolTip message={transactionId}>
											<Box>
												<Text size="xsmall">{getShortAddress(transactionId)}</Text>
											</Box>
										</ToolTip>
										<Box className={styles.transactionInfoCopyBtnWrapper}>
											<CopyAddressButton
												styleVariant="ghost"
												address={transactionId}
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
								rightData={<Text size="xsmall">{status.status}</Text>}
							/>
						</Box>
					</Box>
				</>
			)}
		</SlideOutDialog>
	)
}
