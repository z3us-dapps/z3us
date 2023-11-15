import type { Instruction, Instructions } from '@radixdlt/radix-engine-toolkit'
import { ValueKind, decimal } from '@radixdlt/radix-engine-toolkit'

export const appendLockFeeInstruction = (
	instructions: Instructions,
	feePayer: string,
	padding: number,
): Instructions => {
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
				fields: [decimal(padding)],
			},
		},
		...(instructions.value as Instruction[]).filter(
			instruction => instruction.kind !== 'CallMethod' || instruction.methodName !== 'lock_fee',
		),
	] as Instruction[]

	return instructions
}
