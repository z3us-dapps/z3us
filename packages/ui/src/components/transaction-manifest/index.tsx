import type { NotarizedTransaction } from '@radixdlt/radix-engine-toolkit'
import { Convert, RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

import {
	ScrollAreaRoot,
	ScrollAreaScrollbar,
	ScrollAreaThumb,
	ScrollAreaViewport,
} from 'ui/src/components/scroll-area-radix'
import { Text } from 'ui/src/components/typography'

import { useNetworkId } from '../../hooks/dapp/use-network-id'
import * as styles from './styles.css'

interface TProps {
	manifestHex: string
}

export const TransactionManifest: React.FC<TProps> = ({ manifestHex }) => {
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

	// eslint-disable-next-line react/jsx-no-useless-fragment
	return <>{manifest}</>
}

interface SProps extends TProps {
	className?: string
}

export const StyledTransactionManifest: React.FC<SProps> = ({ className, ...rest }) => (
	<ScrollAreaRoot className={clsx(styles.transactionManifestWrapper, className)}>
		<ScrollAreaViewport>
			<Text size="xxsmall" className={styles.transactionManifestTextWrapper}>
				<TransactionManifest {...rest} />
			</Text>
		</ScrollAreaViewport>
		<ScrollAreaScrollbar orientation="horizontal">
			<ScrollAreaThumb />
		</ScrollAreaScrollbar>
	</ScrollAreaRoot>
)
