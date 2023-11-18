import type { Intent, Instruction as ManifestInstruction } from '@radixdlt/radix-engine-toolkit'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { useKnownAddresses } from 'ui/src/hooks/dapp/use-known-addresses'

import { Instruction } from './instruction'

interface IProps {
	intent: Intent
	instructions: ManifestInstruction[]
}

export const Instructions: React.FC<IProps> = ({ intent, instructions }) => {
	const { data: knownAddresses, isLoading: isLoadingKnownAddresses } = useKnownAddresses()

	if (isLoadingKnownAddresses) return <FallbackLoading />

	return (
		<Box display="flex" flexDirection="column" gap="small">
			{instructions.map((instruction, idx) => (
				// eslint-disable-next-line react/no-array-index-key
				<Instruction key={idx} intent={intent} knownAddresses={knownAddresses} instruction={instruction} />
			))}
		</Box>
	)
}
