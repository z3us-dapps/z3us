import type { Instruction, Instructions } from '@radixdlt/radix-engine-toolkit'
import { ValueKind, decimal } from '@radixdlt/radix-engine-toolkit'

export const appendLockFeeInstruction = (
	transactionManifest: string,
	instructions: Instructions,
	feePayer: string,
): Instructions => {
	if (!transactionManifest.includes('lock_fee')) {
		instructions.value = [
			{
				kind: 'CallMethod',
				address: {
					kind: 'Static',
					value: feePayer,
				},
				methodName: 'lock_fee',
				args: {
					kind: ValueKind.Tuple,
					fields: [decimal(5)],
				},
			},
			...instructions.value,
		] as Instruction[]
	}

	return instructions
}
