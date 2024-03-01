/* eslint-disable no-case-declarations, no-plusplus */
import {
	type Instruction,
	type ManifestAddress,
	type Value,
	castValue,
	destructManifestValueTuple,
} from '@radixdlt/radix-engine-toolkit'

import type { Guarantee, Proof, Summary } from '@src/types/transaction'

export const resolveManifestAddress = (address: ManifestAddress): Extract<ManifestAddress, { kind: 'Static' }> => {
	if (address.kind === 'Static') {
		return address
	}
	throw new Error('Not a static address')
}

// https://docs.radixdlt.com/docs/specifications
// https://docs.radixdlt.com/docs/account
// https://github.com/radixdlt/typescript-radix-engine-toolkit/blob/main/src/lts/toolkit.ts#L108
export const summaryFromInstructions = (instructions: Instruction[]): Summary => {
	let bucketId = 0
	const bucketResources: Record<string, string> = {}
	const proofs: Proof[] = []
	const guarantees: Guarantee[] = []
	const predictedDepositIndexes: { [key: number]: boolean } = {}
	const needSignatureFrom: { [key: string]: boolean } = {}
	let nftGuaranteesCount = 0
	let tokenGuaranteesCount = 0

	let isPredicted = false

	instructions.forEach((instruction, index) => {
		switch (instruction.kind) {
			case 'TakeFromWorktop':
			case 'TakeNonFungiblesFromWorktop':
				isPredicted = false
				bucketResources[bucketId++] = instruction.resourceAddress
				break
			case 'TakeAllFromWorktop':
				isPredicted = true
				break
			case 'CreateProofFromAuthZoneOfAmount':
				proofs.push({
					resourceAddress: instruction.resourceAddress,
					amount: instruction.amount.toNumber(),
				})
				break
			case 'CreateProofFromAuthZoneOfNonFungibles':
				proofs.push({
					resourceAddress: instruction.resourceAddress,
					ids: instruction.ids,
				})
				break
			case 'CreateProofFromAuthZoneOfAll':
				proofs.push({
					resourceAddress: instruction.resourceAddress,
				})
				break
			case 'CreateProofFromBucketOfAmount':
				const [resourceInBucket] = bucketResources[instruction.bucketId]
				proofs.push({
					resourceAddress: resourceInBucket,
					amount: instruction.amount.toNumber(),
				})
				break
			case 'CreateProofFromBucketOfNonFungibles':
				const [nftInBucket] = bucketResources[instruction.bucketId]
				proofs.push({
					resourceAddress: nftInBucket,
					ids: instruction.ids,
				})
				break
			case 'CreateProofFromBucketOfAll':
				const [resourceAddressFromBucket] = bucketResources[instruction.bucketId]
				proofs.push({
					resourceAddress: resourceAddressFromBucket,
				})
				break
			case 'AssertWorktopContains':
				tokenGuaranteesCount += 1
				guarantees.push({
					index,
					resourceAddress: instruction.resourceAddress,
					amount: instruction.amount.toNumber(),
				})
				break
			case 'AssertWorktopContainsAny':
				tokenGuaranteesCount += 1
				break
			case 'AssertWorktopContainsNonFungibles':
				nftGuaranteesCount += 1
				break
			case 'CallMethod':
				switch (instruction.methodName) {
					case 'create_proof_of_amount':
						const [resourceAddressValue, amountValue] = destructManifestValueTuple(instruction.args)
						const resourceAddress = resolveManifestAddress(
							castValue<'Address'>(resourceAddressValue, 'Address').value,
						).value
						const amount = castValue<'Decimal'>(amountValue, 'Decimal').value
						proofs.push({
							resourceAddress,
							amount: amount.toNumber(),
						})
						needSignatureFrom[instruction.address.value] = true
						break
					case 'create_proof_of_non_fungibles':
						const [nftAddressValue, nftIdsValue] = destructManifestValueTuple(instruction.args)
						const nftAddress = resolveManifestAddress(castValue<'Address'>(nftAddressValue, 'Address').value).value
						const ids = castValue<'Array'>(nftIdsValue, 'Array').elements
						proofs.push({
							resourceAddress: nftAddress,
							ids: ids.map((id: Extract<Value, { kind: 'NonFungibleLocalId' }>) => id.value),
						})
						needSignatureFrom[instruction.address.value] = true
						break
					case 'deposit':
						const [bucketValue] = destructManifestValueTuple(instruction.args)
						const bucket = castValue<'Bucket'>(bucketValue, 'Bucket').value
						delete bucketResources[bucket]
						predictedDepositIndexes[index] = isPredicted
						needSignatureFrom[instruction.address.value] = true
						break
					case 'deposit_batch':
					case 'withdraw':
					case 'withdraw_non_fungibles':
					case 'lock_fee_and_withdraw':
					case 'lock_fee_and_withdraw_non_fungibles':
						needSignatureFrom[instruction.address.value] = true
						predictedDepositIndexes[index] = true
						break
					case 'lock_fee':
					case 'lock_contingent_fee':
					case 'burn':
					case 'burn_non_fungibles':
					case 'set_default_deposit_rule':
					case 'set_resource_preference':
					case 'remove_resource_preference':
					case 'add_authorized_depositor':
					case 'remove_authorized_depositor':
					case 'securify':
					case 'try_deposit_or_refund':
						needSignatureFrom[instruction.address.value] = true
						break
					default:
						break
				}
				break
			default:
				break
		}
	})
	return { proofs, guarantees, predictedDepositIndexes, tokenGuaranteesCount, nftGuaranteesCount, needSignatureFrom }
}
