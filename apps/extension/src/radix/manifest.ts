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
// https://github.com/radixdlt/typescript-radix-engine-toolkit/blob/main/src/lts/toolkit.ts#L108
export const summaryFromInstructions = (instructions: Instruction[]): Summary => {
	let bucketId = 0
	const bucketResources: Record<string, string> = {}
	const proofs: Proof[] = []
	const guarantees: Guarantee[] = []
	const predictedDepositIndexes: { [key: number]: boolean } = {}

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
			case 'CallMethod':
				switch (instruction.methodName) {
					case 'create_proof_of_amount':
						// CALL_METHOD
						// Address("[your_account_address]")
						// "create_proof_of_amount"
						// Address("[badge_address]")
						// Decimal("1");
						const [resourceAddressValue, amountValue] = destructManifestValueTuple(instruction.args)
						const resourceAddress = resolveManifestAddress(
							castValue<'Address'>(resourceAddressValue, 'Address').value,
						).value
						const amount = castValue<'Decimal'>(amountValue, 'Decimal').value
						proofs.push({
							resourceAddress,
							amount: amount.toNumber(),
						})
						break
					case 'create_proof_of_non_fungibles':
						// CALL_METHOD
						// Address("account_rdx16860vss2kr5m6kez28swulaphnjtx4afmqk3r9llgevhwqglg20jwv")
						// "create_proof_of_non_fungibles"
						// Address("resource_rdx1nfyg2f68jw7hfdlg5hzvd8ylsa7e0kjl68t5t62v3ttamtejc9wlxa")
						// Array<NonFungibleLocalId>(
						// 	NonFungibleLocalId("<Member_1312>")
						// )
						const [nftAddressValue, nftIdsValue] = destructManifestValueTuple(instruction.args)
						const nftAddress = resolveManifestAddress(castValue<'Address'>(nftAddressValue, 'Address').value).value
						const ids = castValue<'Array'>(nftIdsValue, 'Array').elements
						proofs.push({
							resourceAddress: nftAddress,
							ids: ids.map((id: Extract<Value, { kind: 'NonFungibleLocalId' }>) => id.value),
						})
						break
					case 'deposit':
						const [bucketValue] = destructManifestValueTuple(instruction.args)
						const bucket = castValue<'Bucket'>(bucketValue, 'Bucket').value
						delete bucketResources[bucket]
						predictedDepositIndexes[index] = isPredicted
						break
					case 'deposit_batch':
						predictedDepositIndexes[index] = true
						break
					default:
						break
				}
				break
			case 'CreateProofFromAuthZoneOfAmount':
				// CREATE_PROOF_FROM_AUTH_ZONE_OF_AMOUNT
				// 	Address("foo")
				// 	Decimal("1.0")
				// 	Proof("proof");
				proofs.push({
					resourceAddress: instruction.resourceAddress,
					amount: instruction.amount.toNumber(),
				})
				break
			case 'CreateProofFromAuthZoneOfNonFungibles':
				// CREATE_PROOF_FROM_AUTH_ZONE_OF_NON_FUNGIBLES
				// 	Address("${non_fungible_resource_address}")
				// 	Array<NonFungibleLocalId>(NonFungibleLocalId("#123#"))
				// 	Proof("proof");
				proofs.push({
					resourceAddress: instruction.resourceAddress,
					ids: instruction.ids,
				})
				break
			case 'CreateProofFromAuthZoneOfAll':
				// CREATE_PROOF_FROM_AUTH_ZONE_OF_ALL
				// 	Address("foo")
				// 	Proof("proof");
				proofs.push({
					resourceAddress: instruction.resourceAddress,
				})
				break
			case 'CreateProofFromBucketOfAmount':
				// CREATE_PROOF_FROM_BUCKET_OF_AMOUNT
				// 	Bucket("bucket")
				// 	Decimal("1.0")
				// 	Proof("proof")
				const [resourceInBucket] = bucketResources[instruction.bucketId]
				proofs.push({
					resourceAddress: resourceInBucket,
					amount: instruction.amount.toNumber(),
				})
				break
			case 'CreateProofFromBucketOfNonFungibles':
				// CREATE_PROOF_FROM_BUCKET_OF_NON_FUNGIBLES
				// 	Bucket("some_xrd")
				// 	Array<NonFungibleLocalId>(NonFungibleLocalId("#123#"))
				// 	Proof("proof1b");
				const [nftInBucket] = bucketResources[instruction.bucketId]
				proofs.push({
					resourceAddress: nftInBucket,
					ids: instruction.ids,
				})
				break
			case 'CreateProofFromBucketOfAll':
				// CREATE_PROOF_FROM_BUCKET_OF_ALL
				// 	Bucket("bucket")
				// 	Proof("proof");
				const [resourceAddress] = bucketResources[instruction.bucketId]
				proofs.push({
					resourceAddress,
				})
				break
			case 'AssertWorktopContains':
				guarantees.push({
					index,
					resourceAddress: instruction.resourceAddress,
					amount: instruction.amount.toNumber(),
				})
				break
			default:
				break
		}
	})
	return { proofs, guarantees, predictedDepositIndexes }
}
