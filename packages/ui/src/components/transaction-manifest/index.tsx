import type { NotarizedTransaction } from '@radixdlt/radix-engine-toolkit'
import { Convert, RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import React, { useEffect, useState } from 'react'

import { Text } from 'ui/src/components/typography'

import { useNetworkId } from '../../hooks/dapp/use-network-id'
import type { TextProps } from '../typography/text'

interface IProps extends Omit<TextProps, 'children'> {
	manifestHex: string
}

export const TransactionManifest: React.FC<IProps> = ({ manifestHex, ...textProps }) => {
	const networkId = useNetworkId()
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
					networkId,
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

	return <Text {...textProps}>{manifest}</Text>
}
