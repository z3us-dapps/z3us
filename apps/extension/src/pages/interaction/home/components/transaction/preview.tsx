import type { TransactionPreviewResponse } from '@radixdlt/radix-dapp-toolkit'
import type { Instruction, Intent } from '@radixdlt/radix-engine-toolkit'
import clsx from 'clsx'
import { useXRDPriceOnDay } from 'packages/ui/src/hooks/queries/market'
import React, { useEffect } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { AccountsTransactionInfo } from 'ui/src/components/layout/account-transaction-info'
import { AccountSnippet } from 'ui/src/components/snippet/account'
import { ResourceSnippet } from 'ui/src/components/snippet/resource'
import * as plainButtonStyles from 'ui/src/components/styles/plain-button-styles.css'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import { usePreview } from '@src/hooks/transaction/use-preview'
import { summaryFromInstructions } from '@src/radix/manifest'
import type { ResourceChanges, Summary, TransactionSettings } from '@src/types/transaction'

import * as styles from './styles.css'

const messages = defineMessages({
	presenting_proofs_title: {
		id: 'EqXDVC',
		defaultMessage: 'Proofs',
	},
	fee_summary: {
		id: 'LXfC4n',
		defaultMessage: 'Fee summary',
	},
	change_currency_tooltip: {
		id: 'jv7oHw',
		defaultMessage: 'Change currency',
	},
	customize_fee_button_title: {
		id: 'TXpOBi',
		defaultMessage: 'Customize',
	},
	xrd_total_execution_cost: {
		id: '1leDN6',
		defaultMessage: 'Execution',
	},
	xrd_total_finalization_cost: {
		id: '28f5xS',
		defaultMessage: 'Finalization',
	},
	xrd_total_royalty_cost: {
		id: 'vTUL12',
		defaultMessage: 'Royalty',
	},
	xrd_total_storage_cost: {
		id: 'DUIDEq',
		defaultMessage: 'Storage',
	},
	xrd_total_tipping_cost: {
		id: 'MKZX2V',
		defaultMessage: 'Tipping',
	},
	proof: {
		id: 'KBj2VM',
		defaultMessage: 'Presenting proof',
	},
	withdraw: {
		id: 'bAqUW1',
		defaultMessage: 'Withdrawing',
	},
	deposit: {
		id: '7BSUnP',
		defaultMessage: 'Depositing',
	},
})

const feeSummaryDetailKeys = [
	'xrd_total_execution_cost',
	'xrd_total_finalization_cost',
	'xrd_total_royalty_cost',
	'xrd_total_storage_cost',
	'xrd_total_tipping_cost',
]

interface IProps {
	intent: Intent
	settings?: TransactionSettings
}

type State = {
	preview?: TransactionPreviewResponse
	flatChanges?: ResourceChanges
	summary?: Summary
	currency: 'currency' | 'xrd'
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
	const buildPreview = usePreview()
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))
	const { data: xrdPrice } = useXRDPriceOnDay(currency, new Date())

	const [state, setState] = useImmer<State>({
		currency: 'xrd',
	})

	useEffect(() => {
		Promise.all([
			buildPreview(intent, settings),
			summaryFromInstructions(intent.manifest.instructions.value as Instruction[]),
		]).then(([preview, summary]) => {
			setState(draft => {
				draft.preview = preview
				draft.flatChanges = aggregateConsecutiveChanges(preview.resource_changes).filter(change => change.amount !== 0)
				draft.summary = summary
			})
		})
	}, [intent])

	const handleToggleValue = () => {
		setState(draft => {
			draft.currency = draft.currency === 'currency' ? 'xrd' : 'currency'
		})
	}

	const handleClickCustomize = () => {
		// eslint-disable-next-line no-console
		console.log('click customize')
	}

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

	const receipt = state.preview?.receipt as any

	return (
		<Box className={styles.transactionPreviewWrapper}>
			{state.flatChanges.map((change, index) => (
				// eslint-disable-next-line react/no-array-index-key
				<Box key={`${index}${change.account}${change.resource}`} className={styles.transactionPreviewBlockWrapper}>
					<Text color="strong" size="xsmall" weight="strong">
						{change.amount < 0 ? intl.formatMessage(messages.withdraw) : intl.formatMessage(messages.deposit)}
					</Text>
					<Box className={styles.transactionPreviewBlock}>
						<Box
							display="flex"
							alignItems="center"
							width="full"
							gap="medium"
							flexGrow={1}
							justifyContent="space-between"
						>
							<AccountSnippet address={change.account} />
							<ResourceSnippet address={change.resource} change={change.amount} reversed />
						</Box>
					</Box>
				</Box>
			))}

			{state.summary?.proofs?.length > 0 &&
				state.summary?.proofs.map((proof, idx) => (
					// eslint-disable-next-line react/no-array-index-key
					<Box key={`${idx}`} className={styles.transactionPreviewBlockWrapper}>
						<Text color="strong" size="xsmall" weight="strong">
							{intl.formatMessage(messages.proof)}
						</Text>
						<Box className={styles.transactionPreviewBlock}>
							<Box display="flex" alignItems="center" width="full" gap="medium">
								<Box alignItems="center" display="flex" flexGrow={1} justifyContent="space-between" gap="small">
									<Box display="flex" flexDirection="column" gap="xsmall">
										<ResourceSnippet address={proof.resourceAddress} />
									</Box>
								</Box>
							</Box>
						</Box>
					</Box>
				))}

			<Box className={styles.transactionPreviewBlockWrapper}>
				<Box display="flex" position="relative" width="full">
					<Text color="strong" size="xsmall" weight="strong">
						{intl.formatMessage(messages.fee_summary)}
					</Text>
					<Box className={styles.transactionPreviewFeeLinks}>
						<Box
							component="button"
							display="inline-flex"
							alignItems="center"
							onClick={handleClickCustomize}
							className={clsx(
								plainButtonStyles.plainButtonHoverWrapper,
								plainButtonStyles.plainButtonHoverUnderlineWrapper,
							)}
						>
							<Text color="inherit" size="xsmall" truncate>
								{intl.formatMessage(messages.customize_fee_button_title)}
							</Text>
						</Box>
						<Box className={styles.transactionPreviewLinSeparator} />
						<Box
							component="button"
							display="inline-flex"
							alignItems="center"
							onClick={handleToggleValue}
							className={clsx(
								plainButtonStyles.plainButtonHoverWrapper,
								plainButtonStyles.plainButtonHoverUnderlineWrapper,
							)}
						>
							<Text color="inherit" size="xsmall" truncate>
								{intl.formatMessage(messages.change_currency_tooltip)}
							</Text>
						</Box>
					</Box>
				</Box>

				<Box className={styles.transactionPreviewBlock}>
					<Box display="flex" flexDirection="column" gap="xsmall">
						{feeSummaryDetailKeys.map(key =>
							!receipt?.fee_summary?.[key] ? null : (
								<AccountsTransactionInfo
									key={key}
									leftTitle={<Text size="small">{intl.formatMessage(messages[key])}</Text>}
									rightData={
										<ToolTip
											message={
												state.currency === 'currency'
													? `${intl.formatNumber(receipt.fee_summary[key], {
															style: 'decimal',
															maximumFractionDigits: 18,
													  })} XRD`
													: intl.formatNumber(receipt.fee_summary[key] * xrdPrice, {
															style: 'currency',
															currency,
													  })
											}
										>
											<Box>
												<Text size="small" color="strong">
													{state.currency === 'currency'
														? intl.formatNumber(receipt.fee_summary[key] * xrdPrice, {
																style: 'currency',
																currency,
														  })
														: `${intl.formatNumber(receipt.fee_summary[key], {
																style: 'decimal',
																maximumFractionDigits: 18,
														  })} XRD`}
												</Text>
											</Box>
										</ToolTip>
									}
								/>
							),
						)}
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
