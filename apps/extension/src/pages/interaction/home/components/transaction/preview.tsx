import type { TransactionPreviewResponse } from '@radixdlt/radix-dapp-toolkit'
import type { Instruction, Intent } from '@radixdlt/radix-engine-toolkit'
import React, { useEffect } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { ResourceSnippet } from 'ui/src/components/resource-snippet'
import { RedGreenText, Text } from 'ui/src/components/typography'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import { usePreview } from '@src/hooks/transaction/use-preview'
import { summaryFromInstructions } from '@src/radix/manifest'
import type { ResourceChanges, Summary, TransactionSettings } from '@src/types/transaction'

const messages = defineMessages({
	resource_changes: {
		id: 'RntCL3',
		defaultMessage: 'Resource changes',
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

	if (!state.preview) return <FallbackLoading />

	return (
		<Box display="flex" flexDirection="column" gap="large">
			<Box display="flex" flexDirection="column">
				<Text align="center">{intl.formatMessage(messages.resource_changes)}</Text>
				{state.flatChanges.map((change, index) => (
					<Box
						// eslint-disable-next-line react/no-array-index-key
						key={`${index}${change.account}${change.resource}`}
						display="flex"
						gap="small"
						justifyContent="flex-start"
						flexDirection={accountIndexes[change.account] ? 'row' : 'row-reverse'}
					>
						<ResourceSnippet address={change.account} />
						<ResourceSnippet address={change.resource} />
						<RedGreenText change={change.amount}>
							{intl.formatNumber(change.amount, {
								style: 'decimal',
								maximumFractionDigits: 8,
								signDisplay: 'always',
							})}
						</RedGreenText>
					</Box>
				))}
			</Box>
			<Box display="flex" flexDirection="column">
				{state.summary?.proofs.map((proof, idx) => (
					<Box
						// eslint-disable-next-line react/no-array-index-key
						key={`${idx}`}
						display="flex"
						gap="small"
					>
						<Text align="center">{intl.formatMessage(messages.proof)}</Text>
						<ResourceSnippet address={proof.resourceAddress} />
					</Box>
				))}
			</Box>
			<Box display="flex" flexDirection="column">
				<Text align="center">{intl.formatMessage(messages.fee_summary)}</Text>
				{(state.preview?.receipt as any)?.fee_summary?.xrd_total_execution_cost !== '0' && (
					<Text>
						{intl.formatMessage(messages.xrd_total_execution_cost, {
							cost: (state.preview?.receipt as any)?.fee_summary?.xrd_total_execution_cost,
						})}
					</Text>
				)}
				{(state.preview?.receipt as any)?.fee_summary?.xrd_total_finalization_cost !== '0' && (
					<Text>
						{intl.formatMessage(messages.xrd_total_finalization_cost, {
							cost: (state.preview?.receipt as any)?.fee_summary?.xrd_total_finalization_cost,
						})}
					</Text>
				)}
				{(state.preview?.receipt as any)?.fee_summary?.xrd_total_royalty_cost !== '0' && (
					<Text>
						{intl.formatMessage(messages.xrd_total_royalty_cost, {
							cost: (state.preview?.receipt as any)?.fee_summary?.xrd_total_royalty_cost,
						})}
					</Text>
				)}
				{(state.preview?.receipt as any)?.fee_summary?.xrd_total_storage_cost !== '0' && (
					<Text>
						{intl.formatMessage(messages.xrd_total_storage_cost, {
							cost: (state.preview?.receipt as any)?.fee_summary?.xrd_total_storage_cost,
						})}
					</Text>
				)}
				{(state.preview?.receipt as any)?.fee_summary?.xrd_total_tipping_cost !== '0' && (
					<Text>
						{intl.formatMessage(messages.xrd_total_tipping_cost, {
							cost: (state.preview?.receipt as any)?.fee_summary?.xrd_total_tipping_cost,
						})}
					</Text>
				)}
			</Box>
		</Box>
	)
}
