import type { Intent, KnownAddresses, Instruction as ManifestInstruction } from '@radixdlt/radix-engine-toolkit'
import React from 'react'

import { Instruction } from './instruction'

interface IProps {
	intent: Intent
	knownAddresses: KnownAddresses
	instructions: ManifestInstruction[]
}

export const Instructions: React.FC<IProps> = ({ intent, instructions, knownAddresses }) => (
	<>
		{instructions.map((instruction, idx) => (
			// eslint-disable-next-line react/no-array-index-key
			<Instruction key={idx} intent={intent} knownAddresses={knownAddresses} instruction={instruction} />
		))}
	</>
)
