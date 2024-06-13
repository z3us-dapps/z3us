import type { Instruction, Instructions } from '@radixdlt/radix-engine-toolkit'
import { ValueKind, decimal } from '@radixdlt/radix-engine-toolkit'

export const appendLockFeeInstruction = (instructions: Instructions, feePayer: string, value: number): Instructions => {
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
				fields: [decimal(value)],
			},
		},
		...(instructions.value as Instruction[]).filter(
			instruction => instruction.kind !== 'CallMethod' || instruction.methodName !== 'lock_fee',
		),
	] as Instruction[]

	return instructions
}

export function findInstructionIndex(
	instructions: Instruction[],
	offset: number,
	predicate: (instruction: Instruction) => boolean,
): number {
	const idx = instructions.slice(offset).findIndex(predicate)
	return idx !== -1 ? offset + idx : instructions.length
}

export const appendAssertWorktopContainsFungibles = (
	instructions: Instructions,
	resource: string,
	amount: number,
	beforeIndex: number,
): Instructions => {
	const instruction = {
		kind: 'AssertWorktopContains',
		resourceAddress: resource,
		amount: decimal(amount).value,
	}

	const firstHalf = instructions.value.slice(0, beforeIndex) as Instruction[]
	const secondHalf = instructions.value.slice(beforeIndex) as Instruction[]

	const lastElement = firstHalf.pop()

	if (lastElement.kind === 'AssertWorktopContains' && lastElement.resourceAddress === resource) {
		instructions.value = [...firstHalf, instruction, ...secondHalf] as Instruction[]
	} else {
		instructions.value = [...firstHalf, lastElement, instruction, ...secondHalf] as Instruction[]
	}

	return instructions
}

export const appendAssertWorktopContainsAny = (
	instructions: Instructions,
	resource: string,
	beforeIndex: number,
): Instructions => {
	const instruction = {
		kind: 'AssertWorktopContainsAny',
		resourceAddress: resource,
	}

	const firstHalf = instructions.value.slice(0, beforeIndex) as Instruction[]
	const secondHalf = instructions.value.slice(beforeIndex) as Instruction[]

	const lastElement = firstHalf.pop()
	if (lastElement.kind === 'AssertWorktopContains' && lastElement.resourceAddress === resource) {
		instructions.value = [...firstHalf, instruction, ...secondHalf] as Instruction[]
	} else {
		instructions.value = [...firstHalf, lastElement, instruction, ...secondHalf] as Instruction[]
	}

	return instructions
}
