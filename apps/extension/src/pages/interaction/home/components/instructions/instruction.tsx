import type { Intent, KnownAddresses, Instruction as ManifestInstruction } from '@radixdlt/radix-engine-toolkit'
import React from 'react'

import { CallFunction } from './call-function'
import { CallMethod } from './call-method'
import { TakeFromWorktop } from './take-from-worktop'
import { Unknown } from './unknown'

interface IProps {
	intent: Intent
	knownAddresses: KnownAddresses
	instruction: ManifestInstruction
}

// https://docs.radixdlt.com/docs/specifications
export const Instruction: React.FC<IProps> = ({ intent, knownAddresses, instruction }) => {
	switch (instruction.kind) {
		case 'TakeFromWorktop':
			return <TakeFromWorktop instruction={instruction} />
		case 'CallMethod':
			return <CallMethod knownAddresses={knownAddresses} instruction={instruction} />
		case 'CallFunction':
			return <CallFunction instruction={instruction} />
		case 'TakeAllFromWorktop':
		case 'TakeNonFungiblesFromWorktop':
		case 'ReturnToWorktop':
		case 'AssertWorktopContainsAny':
		case 'AssertWorktopContains':
		case 'AssertWorktopContainsNonFungibles':
		case 'PopFromAuthZone':
		case 'PushToAuthZone':
		case 'DropAuthZoneProofs':
		case 'CreateProofFromAuthZoneOfAmount':
		case 'CreateProofFromAuthZoneOfNonFungibles':
		case 'CreateProofFromAuthZoneOfAll':
		case 'CreateProofFromBucketOfAmount':
		case 'CreateProofFromBucketOfNonFungibles':
		case 'CreateProofFromBucketOfAll':
		case 'DropNamedProofs':
		case 'DropAuthZoneRegularProofs':
		case 'DropAuthZoneSignatureProofs':
		case 'BurnResource':
		case 'CloneProof':
		case 'DropProof':
		case 'CallRoyaltyMethod':
		case 'CallMetadataMethod':
		case 'CallRoleAssignmentMethod':
		case 'CallDirectVaultMethod':
		case 'DropAllProofs':
		case 'AllocateGlobalAddress':
		default:
			return <Unknown intent={intent} instruction={instruction} />
	}
}
