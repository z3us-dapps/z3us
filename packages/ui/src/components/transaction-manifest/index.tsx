import { RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import React, { useEffect, useState } from 'react'

import { Text } from 'ui/src/components/typography'

interface IProps {
	body: string
}

export const TransactionManifest: React.FC<IProps> = ({ body }) => {
	const [manifest, setManifest] = useState<string>('')

	useEffect(() => {
		const decode = async () => {
			if (body) {
				const intent = await RadixEngineToolkit.decompileUnknownTransactionIntent(Buffer.from(body, 'hex'))
				setManifest(intent.toObject().signed_intent.intent.manifest.instructions.value)
			} else {
				setManifest('')
			}
		}
		if (body) {
			decode()
		}
	}, [body])

	return <Text size="xsmall">{manifest}</Text>
}
