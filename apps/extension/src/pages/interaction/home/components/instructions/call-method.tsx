import type { KnownAddresses, Instruction as ManifestInstruction } from '@radixdlt/radix-engine-toolkit'
import React from 'react'

import { CallMethodDeposit } from './call-method-deposit'
import { CallMethodLockFee } from './call-method-lock-fee'
import { CallMethodWithdraw } from './call-method-withdraw'

interface IProps {
	knownAddresses: KnownAddresses
	instruction: ManifestInstruction
}

export const CallMethod: React.FC<IProps> = ({ instruction, knownAddresses }) => {
	if (instruction.kind !== 'CallMethod') return null

	return (
		<>
			<CallMethodLockFee instruction={instruction} knownAddresses={knownAddresses} />
			<CallMethodWithdraw instruction={instruction} knownAddresses={knownAddresses} />
			<CallMethodDeposit instruction={instruction} knownAddresses={knownAddresses} />
		</>
	)
}
