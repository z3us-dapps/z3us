import type { Intent, TransactionSummary } from '@radixdlt/radix-engine-toolkit'
import { LTSRadixEngineToolkit, RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import React, { useEffect, useState } from 'react'

import { Box } from 'ui/src/components/box'
import { Input } from 'ui/src/components/input'
import { Text } from 'ui/src/components/typography'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'

interface IProps {
	intent: Intent
}

export const Manifest: React.FC<IProps> = ({ intent }) => {
	const networkId = useNetworkId()

	const [manifest, setManifest] = useState<string>('')
	const [summary, setSummary] = useState<TransactionSummary | null>(null)

	useEffect(() => {
		RadixEngineToolkit.Instructions.convert(intent.manifest.instructions, networkId, 'String')
			.then(converted => setManifest(converted.value as string))
			.catch(error => {
				console.error(error)
				setManifest('')
			})

		RadixEngineToolkit.Intent.compile(intent)
			.then(compiledIntent => LTSRadixEngineToolkit.Transaction.summarizeTransaction(compiledIntent))
			.then(txSummary => setSummary(txSummary))
			.catch(error => {
				console.error(error)
				setSummary(null)
			})
	}, [networkId, intent])

	return (
		<Box>
			<Box>
				<Input value={manifest} elementType="textarea" type="textarea" disabled />
			</Box>
			<Box>
				<Text>{JSON.stringify(summary)}</Text>
			</Box>
		</Box>
	)
}
