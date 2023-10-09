import type { TransactionPreviewResponse } from '@radixdlt/radix-dapp-toolkit'
import type { Instruction, Intent } from '@radixdlt/radix-engine-toolkit'
import { RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import React, { useEffect } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { Input } from 'ui/src/components/input'
import { ResourceSnippet } from 'ui/src/components/resource-snippet'
import { Tabs, TabsContent } from 'ui/src/components/tabs'
import { Text } from 'ui/src/components/typography'
import { useKnownAddresses } from 'ui/src/hooks/dapp/use-known-addresses'

import { usePreview } from '@src/hooks/transaction/use-preview'
import type { TransactionSettings } from '@src/types/transaction'

import { Instructions } from './instructions'

const messages = defineMessages({
	tab_preview: {
		id: 'interaction.manifest.tab_preview',
		defaultMessage: 'Preview',
	},
	tab_summary: {
		id: 'interaction.manifest.tab_summary',
		defaultMessage: 'Summary',
	},
	tab_manifest: {
		id: 'interaction.manifest.tab_manifest',
		defaultMessage: 'Transaction manifest',
	},
	resource_changes: {
		id: 'interaction.manifest.resource_changes',
		defaultMessage: 'Resource changes',
	},
	fee_summary: {
		id: 'interaction.manifest.fee_summary',
		defaultMessage: 'Fee summary',
	},
	xrd_total_execution_cost: {
		id: 'interaction.manifest.xrd_total_execution_cost',
		defaultMessage: 'Execution: {cost}',
	},
	xrd_total_finalization_cost: {
		id: 'interaction.manifest.xrd_total_finalization_cost',
		defaultMessage: 'Finalization: {cost}',
	},
	xrd_total_royalty_cost: {
		id: 'interaction.manifest.xrd_total_royalty_cost',
		defaultMessage: 'Royalty: {cost}',
	},
	xrd_total_storage_cost: {
		id: 'interaction.manifest.xrd_total_storage_cost',
		defaultMessage: 'Storage: {cost}',
	},
	xrd_total_tipping_cost: {
		id: 'interaction.manifest.xrd_total_tipping_cost',
		defaultMessage: 'Tipping: {cost}',
	},
})

const PREVIEW = 'preview'
const SUMMARY = 'summary'
const MANIFEST = 'manifest'

interface IProps {
	intent: Intent
	settings?: TransactionSettings
}

type State = {
	manifest?: string
	preview?: TransactionPreviewResponse
}

export const Manifest: React.FC<IProps> = ({ intent, settings = {} }) => {
	const intl = useIntl()
	const buildPreview = usePreview()

	const { data: knownAddresses, isLoading: isLoadingKnownAddresses } = useKnownAddresses()

	const [state, setState] = useImmer<State>({ manifest: '' })

	useEffect(() => {
		RadixEngineToolkit.Instructions.convert(intent.manifest.instructions, intent.header.networkId, 'String').then(
			converted =>
				setState(draft => {
					draft.manifest = converted.value as string
				}),
		)
	}, [intent])

	useEffect(() => {
		if (!state.manifest) return
		buildPreview(intent.manifest.instructions, state.manifest, settings).then(response => {
			setState(draft => {
				draft.preview = response
			})
		})
	}, [state.manifest])

	if (isLoadingKnownAddresses) return <FallbackLoading />

	return (
		<Box>
			<Tabs
				list={[
					{ label: intl.formatMessage(messages.tab_preview), value: PREVIEW },
					{ label: intl.formatMessage(messages.tab_summary), value: SUMMARY },
					{ label: intl.formatMessage(messages.tab_manifest), value: MANIFEST },
				]}
				defaultValue={PREVIEW}
			>
				<TabsContent value={PREVIEW}>
					{state.preview && (
						<Box display="flex" flexDirection="column">
							<Box display="flex" flexDirection="column">
								<Text>{intl.formatMessage(messages.resource_changes)}</Text>
								{state.preview.resource_changes.map((group: any) =>
									group?.resource_changes.map(change => (
										<Box key={`${group.index}${change.resource_address}`} display="flex" flexDirection="row">
											<ResourceSnippet address={change.component_entity.entity_address} />
											<ResourceSnippet address={change.resource_address} />
											<Text>
												{intl.formatNumber(parseFloat(change.amount) || 0, {
													style: 'decimal',
													maximumFractionDigits: 8,
												})}
											</Text>
										</Box>
									)),
								)}
							</Box>
							<Box display="flex" flexDirection="column">
								<Text>{intl.formatMessage(messages.fee_summary)}</Text>
								<Text>
									{intl.formatMessage(messages.xrd_total_execution_cost, {
										cost: (state.preview.receipt as any)?.fee_summary?.xrd_total_execution_cost,
									})}
								</Text>
								<Text>
									{intl.formatMessage(messages.xrd_total_finalization_cost, {
										cost: (state.preview.receipt as any)?.fee_summary?.xrd_total_finalization_cost,
									})}
								</Text>
								<Text>
									{intl.formatMessage(messages.xrd_total_royalty_cost, {
										cost: (state.preview.receipt as any)?.fee_summary?.xrd_total_royalty_cost,
									})}
								</Text>
								<Text>
									{intl.formatMessage(messages.xrd_total_storage_cost, {
										cost: (state.preview.receipt as any)?.fee_summary?.xrd_total_storage_cost,
									})}
								</Text>
								<Text>
									{intl.formatMessage(messages.xrd_total_tipping_cost, {
										cost: (state.preview.receipt as any)?.fee_summary?.xrd_total_tipping_cost,
									})}
								</Text>
							</Box>
						</Box>
					)}
				</TabsContent>
				<TabsContent value={SUMMARY}>
					<Instructions
						intent={intent}
						knownAddresses={knownAddresses}
						instructions={intent.manifest.instructions.value as Instruction[]}
					/>
				</TabsContent>
				<TabsContent value={MANIFEST}>
					<Input value={state.manifest} elementType="textarea" type="textarea" disabled />
				</TabsContent>
			</Tabs>
		</Box>
	)
}
