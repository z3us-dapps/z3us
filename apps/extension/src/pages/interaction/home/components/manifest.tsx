import type { TransactionPreviewResponse } from '@radixdlt/radix-dapp-toolkit'
import type { Instruction, Intent } from '@radixdlt/radix-engine-toolkit'
import { RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import React, { useEffect } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { Input } from 'ui/src/components/input'
import { Tabs, TabsContent } from 'ui/src/components/tabs'
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
			console.log('buildPreview', response)
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
					<Input value={JSON.stringify(state.preview, undefined, 2)} elementType="textarea" type="textarea" disabled />
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
