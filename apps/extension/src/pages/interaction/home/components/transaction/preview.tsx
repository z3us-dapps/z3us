import type { TransactionPreviewResponse } from '@radixdlt/radix-dapp-toolkit'
import type { Instruction, Intent } from '@radixdlt/radix-engine-toolkit'
import React, { useEffect } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { AccountsTransactionInfo } from 'ui/src/components/layout/account-transaction-info'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { ResourceSnippet } from 'ui/src/components/resource-snippet'
import { RedGreenText, Text } from 'ui/src/components/typography'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import { usePreview } from '@src/hooks/transaction/use-preview'
import { summaryFromInstructions } from '@src/radix/manifest'
import type { ResourceChanges, Summary, TransactionSettings } from '@src/types/transaction'

import * as styles from './styles.css'

const messages = defineMessages({
	resource_changes: {
		id: 'RntCL3',
		defaultMessage: 'Resource changes',
	},
	presenting_proofs_title: {
		id: 'EqXDVC',
		defaultMessage: 'Proofs',
	},
	fee_summary: {
		id: 'LXfC4n',
		defaultMessage: 'Fee summary',
	},
	xrd_total_execution_cost: {
		id: 'sonpUJ',
		defaultMessage: 'Execution: {cost, number, ::.00#######}',
	},
	xrd_total_finalization_cost: {
		id: 'k0W1QS',
		defaultMessage: 'Finalization: {cost, number, ::.00#######}',
	},
	xrd_total_royalty_cost: {
		id: 'IbKSny',
		defaultMessage: 'Royalty: {cost, number, ::.00#######}',
	},
	xrd_total_storage_cost: {
		id: 'xFzb3c',
		defaultMessage: 'Storage: {cost, number, ::.00#######}',
	},
	xrd_total_tipping_cost: {
		id: 'hLRL4P',
		defaultMessage: 'Tipping: {cost, number, ::.00#######}',
	},
	proof: {
		id: 'KBj2VM',
		defaultMessage: 'Presenting proof',
	},
})

interface IProps {
	intent: Intent
	settings?: TransactionSettings
}

type State = {
	preview?: TransactionPreviewResponse
	flatChanges?: ResourceChanges
	summary?: Summary
}

function aggregateConsecutiveChanges(
	resourceChanges: TransactionPreviewResponse['resource_changes'],
): State['flatChanges'] {
	if (resourceChanges.length === 0) {
		return []
	}

	const changes: State['flatChanges'] = []
	resourceChanges.map((group: any) =>
		group.resource_changes?.map((change: any) =>
			changes.push({
				account: change.component_entity.entity_address,
				resource: change.resource_address,
				amount: parseFloat(change.amount) || 0,
			}),
		),
	)

	const aggregatedData: State['flatChanges'] = [changes[0]]

	// eslint-disable-next-line no-plusplus
	for (let i = 1; i < changes.length; i++) {
		const currentItem = changes[i]
		const previousItem = aggregatedData[aggregatedData.length - 1]

		if (currentItem.account === previousItem.account && currentItem.resource === previousItem.resource) {
			previousItem.amount += currentItem.amount
		} else {
			aggregatedData.push(currentItem)
		}
	}

	return aggregatedData
}

export const Preview: React.FC<IProps> = ({ intent, settings = {} }) => {
	const intl = useIntl()
	const networkId = useNetworkId()
	const buildPreview = usePreview()

	const { accountIndexes } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes[networkId] || {},
	}))

	const [state, setState] = useImmer<State>({})

	useEffect(() => {
		Promise.all([
			buildPreview(intent, settings),
			summaryFromInstructions(intent.manifest.instructions.value as Instruction[]),
		]).then(([preview, summary]) => {
			setState(draft => {
				draft.preview = preview
				draft.flatChanges = aggregateConsecutiveChanges(preview.resource_changes)
				draft.summary = summary
			})
		})
	}, [intent])

	// useEffect(() => {
	// 	if (!state.preview) return

	// 	RadixEngineToolkit.Instructions
	// 		.convert(intent.manifest.instructions, intent.header.networkId, 'String')
	// 		.then(converted => rawRadixEngineToolkit
	// 		.then(ret => ret.executionAnalyze({
	// 				instructions: converted as SerializableInstructions,
	// 				network_id: `${networkId}`,
	// 				preview_receipt: state.preview.encoded_receipt,
	// 			}))
	// 		.then(console.log),
	// 	)
	// }, [state.preview])

	if (!state.preview) return <FallbackLoading />

	return (
		<Box className={styles.transactionPreviewWrapper}>
			{/* --- NEW */}
			<Box className={styles.transactionPreviewBlockWrapper}>
				<Text color="strong" size="xsmall" weight="strong">
					Withdrawing
				</Text>
				<Box className={styles.transactionPreviewBlock}>
					<Box display="flex" alignItems="center" width="full" gap="medium">
						<Box flexShrink={0}>
							<ResourceImageIcon address="hello" size="xlarge" />
						</Box>
						<Box alignItems="center" display="flex" flexGrow={1} justifyContent="space-between" gap="small">
							<Box display="flex" flexDirection="column">
								<Text color="strong" weight="medium" size="small" truncate>
									rUSD
								</Text>
								<Text color="strong" size="small" truncate>
									20.00
								</Text>
							</Box>
							<Box display="flex" flexDirection="column" gap="xsmall">
								<Text align="right" color="strong" weight="medium" size="small" truncate>
									Main account
								</Text>
								<Text align="right" color="strong" size="small" truncate>
									rdx1...lag0
								</Text>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
			<Box className={styles.transactionPreviewBlockWrapper}>
				<Text color="strong" size="xsmall" weight="strong">
					Depositing
				</Text>
				<Box className={styles.transactionPreviewBlock}>
					<Box display="flex" alignItems="center" width="full" gap="medium">
						<Box flexShrink={0}>
							<ResourceImageIcon address="hello" size="xlarge" />
						</Box>
						<Box alignItems="center" display="flex" flexGrow={1} justifyContent="space-between" gap="small">
							<Box display="flex" flexDirection="column">
								<Text color="strong" weight="medium" size="small" truncate>
									hello hello hello hello hello hello hello hello
								</Text>
								<Text color="strong" size="small" truncate>
									hello
								</Text>
							</Box>
							<Box display="flex" flexDirection="column" gap="xsmall">
								<Text align="right" color="strong" weight="medium" size="small" truncate>
									hello hello hello hello hello hello hello hello
								</Text>
								<Text align="right" color="strong" size="small" truncate>
									hello
								</Text>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
			<Box className={styles.transactionPreviewBlockWrapper}>
				<Text color="strong" size="xsmall" weight="strong">
					Fee summary
				</Text>

				<Box className={styles.transactionPreviewBlock}>
					<Box display="flex" flexDirection="column" gap="xsmall">
						<AccountsTransactionInfo
							leftTitle={<Text size="small">Transaction fee</Text>}
							rightData={
								<Text size="small" color="strong">
									0.1 XRD
								</Text>
							}
						/>
						<AccountsTransactionInfo
							leftTitle={<Text size="small">Using Dapps</Text>}
							rightData={
								<Text size="small" color="strong">
									Radiswap
								</Text>
							}
						/>
						<AccountsTransactionInfo
							leftTitle={<Text size="small">Transaction fee</Text>}
							rightData={
								<Text size="small" color="strong">
									0.1 XRD
								</Text>
							}
						/>
					</Box>
				</Box>
			</Box>
			{/* --- NEW */}

			<Box className={styles.transactionPreviewFlexWrapper}>
				<Text color="strong" size="xsmall" weight="strong">
					{intl.formatMessage(messages.resource_changes)}
				</Text>
				{state.flatChanges.map((change, index) => (
					<Box
						// eslint-disable-next-line react/no-array-index-key
						key={`${index}${change.account}${change.resource}`}
						className={styles.transactionPreviewFlatChange}
						flexDirection={accountIndexes[change.account] ? 'row' : 'row-reverse'}
					>
						<ResourceSnippet address={change.account} />
						<ResourceSnippet address={change.resource} />
						<RedGreenText size="xsmall" change={change.amount}>
							{intl.formatNumber(change.amount, {
								style: 'decimal',
								maximumFractionDigits: 8,
								signDisplay: 'always',
							})}
						</RedGreenText>
					</Box>
				))}
			</Box>
			{state.summary?.proofs?.length > 0 && (
				<Box className={styles.transactionPreviewProofsWrapper}>
					{state.summary?.proofs.map((proof, idx) => (
						<Box
							// eslint-disable-next-line react/no-array-index-key
							key={`${idx}`}
							display="flex"
							alignItems="center"
							gap="small"
						>
							<Text color="strong" size="xsmall" weight="strong">
								{intl.formatMessage(messages.proof)}
							</Text>
							<ResourceSnippet address={proof.resourceAddress} />
						</Box>
					))}
				</Box>
			)}
			<Box className={styles.transactionFeeSummaryWrapper}>
				<Text color="strong" size="xsmall" weight="strong">
					{intl.formatMessage(messages.fee_summary)}
				</Text>
				{(state.preview?.receipt as any)?.fee_summary?.xrd_total_execution_cost !== '0' && (
					<Text size="xsmall">
						{intl.formatMessage(messages.xrd_total_execution_cost, {
							cost: (state.preview?.receipt as any)?.fee_summary?.xrd_total_execution_cost,
						})}
					</Text>
				)}
				{(state.preview?.receipt as any)?.fee_summary?.xrd_total_finalization_cost !== '0' && (
					<Text size="xsmall">
						{intl.formatMessage(messages.xrd_total_finalization_cost, {
							cost: (state.preview?.receipt as any)?.fee_summary?.xrd_total_finalization_cost,
						})}
					</Text>
				)}
				{(state.preview?.receipt as any)?.fee_summary?.xrd_total_royalty_cost !== '0' && (
					<Text size="xsmall">
						{intl.formatMessage(messages.xrd_total_royalty_cost, {
							cost: (state.preview?.receipt as any)?.fee_summary?.xrd_total_royalty_cost,
						})}
					</Text>
				)}
				{(state.preview?.receipt as any)?.fee_summary?.xrd_total_storage_cost !== '0' && (
					<Text size="xsmall">
						{intl.formatMessage(messages.xrd_total_storage_cost, {
							cost: (state.preview?.receipt as any)?.fee_summary?.xrd_total_storage_cost,
						})}
					</Text>
				)}
				{(state.preview?.receipt as any)?.fee_summary?.xrd_total_tipping_cost !== '0' && (
					<Text size="xsmall">
						{intl.formatMessage(messages.xrd_total_tipping_cost, {
							cost: (state.preview?.receipt as any)?.fee_summary?.xrd_total_tipping_cost,
						})}
					</Text>
				)}
			</Box>
		</Box>
	)
}
