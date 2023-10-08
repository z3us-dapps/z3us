import type { Instruction, Intent } from '@radixdlt/radix-engine-toolkit'
import { RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { Input } from 'ui/src/components/input'
import { Tabs, TabsContent } from 'ui/src/components/tabs'
import { useKnownAddresses } from 'ui/src/hooks/dapp/use-known-addresses'

import { Instructions } from './instructions'

const messages = defineMessages({
	tab_summary: {
		id: 'interaction.manifest.tab_summary',
		defaultMessage: 'Preview',
	},
	tab_manifest: {
		id: 'interaction.manifest.tab_manifest',
		defaultMessage: 'Transaction manifest',
	},
})

const SUMMARY = 'summary'
const MANIFEST = 'manifest'

interface IProps {
	intent: Intent
}

export const Manifest: React.FC<IProps> = ({ intent }) => {
	const intl = useIntl()

	const { data: knownAddresses, isLoading: isLoadingKnownAddresses } = useKnownAddresses()

	const [manifest, setManifest] = useState<string>('')

	useEffect(() => {
		RadixEngineToolkit.Instructions.convert(intent.manifest.instructions, intent.header.networkId, 'String').then(
			converted => setManifest(converted.value as string),
		)
	}, [intent])

	if (isLoadingKnownAddresses) return <FallbackLoading />

	return (
		<Box>
			<Tabs
				list={[
					{ label: intl.formatMessage(messages.tab_summary), value: SUMMARY },
					{ label: intl.formatMessage(messages.tab_manifest), value: MANIFEST },
				]}
				defaultValue={SUMMARY}
			>
				<TabsContent value={SUMMARY}>
					<Instructions
						intent={intent}
						knownAddresses={knownAddresses}
						instructions={intent.manifest.instructions.value as Instruction[]}
					/>
				</TabsContent>
				<TabsContent value={MANIFEST}>
					<Input value={manifest} elementType="textarea" type="textarea" disabled />
				</TabsContent>
			</Tabs>
		</Box>
	)
}
