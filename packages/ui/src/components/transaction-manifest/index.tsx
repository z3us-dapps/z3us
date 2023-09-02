import { RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import React, { useEffect, useState } from 'react'

import { Text } from 'ui/src/components/typography'

import type { TextProps } from '../typography/text'

interface IProps extends Omit<TextProps, 'children'> {
	manifestHex: string
}

export const TransactionManifest: React.FC<IProps> = ({ manifestHex, ...textProps }) => {
	const [manifest, setManifest] = useState<string>('')

	useEffect(() => {
		const decode = async () => {
			if (manifestHex) {
				const intent = await RadixEngineToolkit.Intent.decompile(Buffer.from(manifestHex, 'hex'))
				setManifest(intent.manifest.instructions.value.toString())
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
