import type { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import clsx from 'clsx'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useLocation, useSearchParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Link } from 'ui/src/components/router-link'
import { TimeFromNow } from 'ui/src/components/time-from-now'
import { TokenPrice } from 'ui/src/components/token-price'
import { TransactionIcon } from 'ui/src/components/transaction-icon'
import { TransactionStatusIcon } from 'ui/src/components/transaction-status-icon'
import { Text } from 'ui/src/components/typography'
import { DECIMAL_STYLES } from 'ui/src/constants/number'
import { useKnownAddresses } from 'ui/src/hooks/dapp/use-known-addresses'
import { getShortAddress } from 'ui/src/utils/string-utils'

import * as styles from './styles.css'

const DEFAULT_BALANCE_CHANGE_ITEMS = 3

const BalanceChanges: React.FC<{ transaction: CommittedTransactionInfo }> = ({ transaction }) => {
	const intl = useIntl()

	const { data: knownAddresses } = useKnownAddresses()

	const balanceChanges = useMemo(
		() => [
			...(transaction?.balance_changes?.fungible_balance_changes.map(change => ({
				resource_address: change.resource_address,
				entity_address: change.entity_address,
				amount: change.balance_change,
			})) || []),
			...(transaction?.balance_changes?.non_fungible_balance_changes.map(change => ({
				resource_address: change.resource_address,
				entity_address: change.entity_address,
				amount: `${change.added.length - change.removed.length}`,
			})) || []),
		],
		[transaction],
	)

	if (balanceChanges.length === 0) return null

	return (
		<Box className={styles.activityItemTextEventsWrapper}>
			<Box display="flex" className={styles.activityItemBalanceChangeWrapper}>
				{balanceChanges.slice(0, DEFAULT_BALANCE_CHANGE_ITEMS).map(change => (
					<TransactionIcon
						key={`${change.entity_address}-${change.resource_address}`}
						size={{ mobile: 'medium', tablet: 'medium' }}
						address={change.resource_address}
						transactionType={Number.parseFloat(change.amount) > 0 ? 'deposit' : 'withdraw'}
					/>
				))}
				{balanceChanges.length > DEFAULT_BALANCE_CHANGE_ITEMS && (
					<Box paddingLeft="medium">
						<Text size="xxsmall" weight="medium">
							+ {balanceChanges.length - DEFAULT_BALANCE_CHANGE_ITEMS}
						</Text>
					</Box>
				)}
			</Box>
			<Box className={styles.activityItemTextPriceWrapper}>
				<Box className={styles.activityTokenPriceTextWrapper}>
					<Text size="xsmall">
						<TokenPrice amount={transaction.fee_paid as any} address={knownAddresses?.resourceAddresses.xrd} />
					</Text>
				</Box>
				<Text>&nbsp;&middot;&nbsp;</Text>
				<Text size="xsmall">{`${intl.formatNumber(
					Number.parseFloat(transaction.fee_paid) || 0,
					DECIMAL_STYLES,
				)} XRD`}</Text>
			</Box>
		</Box>
	)
}

interface IPageProps {
	transactions: CommittedTransactionInfo[]
	selected: string
	hovered: string
	setHovered: (_: string) => void
	setSelected: (_: string) => void
}

export const PageWrapper: React.FC<IPageProps> = ({ transactions, selected, hovered, setHovered, setSelected }) => {
	const location = useLocation()
	const [searchParams] = useSearchParams()

	const handleClick = (id: string) => {
		setSelected(id)
		setHovered(null)
	}

	const handleMouseOver = (id: string) => {
		setHovered(id)
		searchParams.set('tx', `${id}`)
	}

	const handleMouseLeave = () => {
		setHovered(null)
		searchParams.delete('tx')
	}

	return (
		<>
			{transactions.map(tx => (
				<Box className={styles.activityItemOuter} key={tx.intent_hash}>
					<Box
						onClick={() => handleClick(tx.intent_hash)}
						className={clsx(
							styles.activityItemInner,
							(selected === tx.intent_hash || hovered === tx.intent_hash) && styles.activityItemInnerSelected,
						)}
					>
						<Link
							to={`${location.pathname}?${searchParams}`}
							underline="never"
							className={styles.activityItemInnerBtn}
							onMouseOver={() => handleMouseOver(tx.intent_hash)}
							onMouseLeave={handleMouseLeave}
						>
							<Box className={styles.activityItemStatusWrapper}>
								<TransactionStatusIcon statusType={tx.transaction_status} size="small" />
							</Box>
							<Box className={styles.activityItemTextWrapper}>
								<Text weight="stronger" size="small" color="strong" truncate>
									{getShortAddress(tx.intent_hash)}
								</Text>
								<Text size="xsmall" truncate>
									<TimeFromNow date={tx.confirmed_at} />
								</Text>
							</Box>
							<BalanceChanges transaction={tx} />
						</Link>
					</Box>
				</Box>
			))}
		</>
	)
}
