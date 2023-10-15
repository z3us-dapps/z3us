import type { NotarizedTransaction } from '@radixdlt/radix-engine-toolkit'
import { Convert, RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import React, { useEffect, useState } from 'react'

import Code from 'ui/src/components/typography/code'

interface IProps {
	manifestHex: string
}

export const TransactionManifest: React.FC<IProps> = ({ manifestHex }) => {
	const [manifest, setManifest] = useState<string>('')

	useEffect(() => {
		const decode = async () => {
			if (manifestHex) {
				const transactionIntent: NotarizedTransaction = await RadixEngineToolkit.NotarizedTransaction.decompile(
					Convert.HexString.toUint8Array(manifestHex),
					'String',
				)

				const convertedInstructions = await RadixEngineToolkit.Instructions.convert(
					transactionIntent.signedIntent.intent.manifest.instructions,
					transactionIntent.signedIntent.intent.header.networkId,
					'String',
				)

				setManifest(convertedInstructions.value as string)
			} else {
				setManifest('')
			}
		}
		if (manifestHex) {
			decode()
		}
	}, [manifestHex])

	return <Code content={manifest} />
}
