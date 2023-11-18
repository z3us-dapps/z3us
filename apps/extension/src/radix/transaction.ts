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

export const countNftGuarantees = (instructions: Instructions): number =>
	(instructions.value as Instruction[]).reduce(
		(count, instruction) => (instruction.kind === 'AssertWorktopContainsNonFungibles' ? count + 1 : count),
		0,
	)

export const countTokenGuarantees = (instructions: Instructions): number =>
	(instructions.value as Instruction[]).reduce(
		(count, instruction) =>
			instruction.kind === 'AssertWorktopContains' || instruction.kind === 'AssertWorktopContainsAny'
				? count + 1
				: count,
		0,
	)
