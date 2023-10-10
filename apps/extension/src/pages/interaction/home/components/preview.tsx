import type { TransactionPreviewResponse } from '@radixdlt/radix-dapp-toolkit'
import type { Intent } from '@radixdlt/radix-engine-toolkit'
import { FallbackLoading } from 'packages/ui/src/components/fallback-renderer'
import { useNetworkId } from 'packages/ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'
import React, { useEffect } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components/box'
import { ResourceSnippet } from 'ui/src/components/resource-snippet'
import { RedGreenText, Text } from 'ui/src/components/typography'

import { usePreview } from '@src/hooks/transaction/use-preview'
import type { TransactionSettings } from '@src/types/transaction'

const messages = defineMessages({
	resource_changes: {
		id: 'interaction.preview.resource_changes',
		defaultMessage: 'Resource changes',
	},
	fee_summary: {
		id: 'interaction.preview.fee_summary',
		defaultMessage: 'Fee summary',
	},
	xrd_total_execution_cost: {
		id: 'interaction.preview.xrd_total_execution_cost',
		defaultMessage: 'Execution: {cost, number, ::.00#######}',
	},
	xrd_total_finalization_cost: {
		id: 'interaction.preview.xrd_total_finalization_cost',
		defaultMessage: 'Finalization: {cost, number, ::.00#######}',
	},
	xrd_total_royalty_cost: {
		id: 'interaction.preview.xrd_total_royalty_cost',
		defaultMessage: 'Royalty: {cost, number, ::.00#######}',
	},
	xrd_total_storage_cost: {
		id: 'interaction.preview.xrd_total_storage_cost',
		defaultMessage: 'Storage: {cost, number, ::.00#######}',
	},
	xrd_total_tipping_cost: {
		id: 'interaction.preview.xrd_total_tipping_cost',
		defaultMessage: 'Tipping: {cost, number, ::.00#######}',
	},
})

interface IProps {
	intent: Intent
	settings?: TransactionSettings
}

type State = {
	preview?: TransactionPreviewResponse
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
		buildPreview(intent, settings).then(response => {
			setState(draft => {
				draft.preview = response
			})
		})
	}, [intent])

	if (!state.preview) return <FallbackLoading />

	return (
		<Box display="flex" flexDirection="column" gap="large">
			<Box display="flex" flexDirection="column">
				<Text align="center">{intl.formatMessage(messages.resource_changes)}</Text>
				{state.preview?.resource_changes.map((group: any) =>
					group?.resource_changes.map((change: any) => (
						<Box
							key={`${group.index}${change.component_entity.entity_address}${change.resource_address}`}
							display="flex"
							gap="small"
							justifyContent="flex-start"
							flexDirection={accountIndexes[change.component_entity.entity_address] ? 'row' : 'row-reverse'}
						>
							<ResourceSnippet address={change.component_entity.entity_address} />
							<ResourceSnippet address={change.resource_address} />
							<RedGreenText change={parseFloat(change.amount) || 0}>
								{intl.formatNumber(parseFloat(change.amount) || 0, {
									style: 'decimal',
									maximumFractionDigits: 8,
									signDisplay: 'always',
								})}
							</RedGreenText>
						</Box>
					)),
				)}
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
