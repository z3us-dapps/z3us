import type { Intent } from '@radixdlt/radix-engine-toolkit'
import { InstructionsKind, RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import React, { useEffect } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components/box'
import { Input } from 'ui/src/components/input'
import { Tabs, TabsContent } from 'ui/src/components/tabs'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'

import type { TransactionSettings } from '@src/types/transaction'

import { Preview } from './preview'

const messages = defineMessages({
	tab_preview: {
		id: 'interaction.manifest.tab_preview',
		defaultMessage: 'Preview',
	},
	tab_manifest: {
		id: 'interaction.manifest.tab_manifest',
		defaultMessage: 'Transaction manifest',
	},
	invalid_manifest: {
		id: 'interaction.manifest.invalid_manifest',
		defaultMessage: 'Invalid transaction manifest',
	},
})

const PREVIEW = 'preview'
const MANIFEST = 'manifest'

interface IProps {
	intent: Intent
	settings?: TransactionSettings
	onManifestChange?: (manifest: string) => void
}

type State = {
	manifest?: string
	error?: string
}

export const Manifest: React.FC<IProps> = ({ intent, settings = {}, onManifestChange = () => {} }) => {
	const intl = useIntl()

	const [state, setState] = useImmer<State>({ manifest: '' })

	useEffect(() => {
		RadixEngineToolkit.Instructions.convert(intent.manifest.instructions, intent.header.networkId, 'String').then(
			converted =>
				setState(draft => {
					draft.manifest = converted.value as string
				}),
		)
	}, [intent])

	const handleManifestChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const evt = event.nativeEvent as InputEvent
		if (evt.isComposing) {
			return
		}

		setState(draft => {
			draft.manifest = event.target.value
		})

		try {
			await RadixEngineToolkit.Instructions.convert(
				{
					kind: InstructionsKind.String,
					value: event.target.value,
				},
				intent.header.networkId,
				'Parsed',
			)
			setState(draft => {
				draft.error = ''
			})
			onManifestChange(event.target.value)
		} catch (error) {
			setState(draft => {
				draft.error = intl.formatMessage(messages.invalid_manifest)
			})
		}
	}

	return (
		<Box>
			<Tabs
				list={[
					{ label: intl.formatMessage(messages.tab_preview), value: PREVIEW },
					{ label: intl.formatMessage(messages.tab_manifest), value: MANIFEST },
				]}
				defaultValue={PREVIEW}
			>
				<TabsContent value={PREVIEW}>
					<Preview intent={intent} settings={settings} />
				</TabsContent>
				<TabsContent value={MANIFEST}>
					<ValidationErrorMessage message={state.error} />
					<Input value={state.manifest} elementType="textarea" type="textarea" onChange={handleManifestChange} />
				</TabsContent>
			</Tabs>
		</Box>
	)
}