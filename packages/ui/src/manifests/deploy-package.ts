import { ManifestSborStringRepresentation, RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import blake from 'blakejs'
import { Buffer } from 'buffer'

export interface DeployPackage {
	account: string
	networkId: number
	wasm: string
	rpd: string
	nftCollection: string
	nftId: string
}

const hash = (input: string) =>
	Buffer.from(blake.blake2bHex(Buffer.from(input, 'hex'), undefined, 32).toString(), 'hex').toString('hex')

const sborDecode = (networkId: number, hexEncodedSchema: string) =>
	RadixEngineToolkit.ManifestSbor.decodeToString(
		Buffer.from(hexEncodedSchema, 'hex'),
		networkId,
		ManifestSborStringRepresentation.ManifestString,
	)

export const getDeployPackageManifest = async ({
	networkId,
	account,
	wasm,
	rpd,
	nftCollection,
	nftId,
}: DeployPackage): Promise<string> => `
    CALL_METHOD
    Address("${account}")
    "create_proof_of_non_fungibles"
    Address("${nftCollection}")
    Array<NonFungibleLocalId>(
        NonFungibleLocalId("${nftId}")
    );

    PUBLISH_PACKAGE_ADVANCED
    Enum<OwnerRole::Fixed>(     # Owner Role
        Enum<AccessRule::Protected>(
            Enum<AccessRuleNode::ProofRule>(
                Enum<ProofRule::Require>(
                    Enum<0u8>(   # ResourceOrNonFungible::NonFungible
                        NonFungibleGlobalId("${nftCollection}:${nftId}")
                    )
                )
            )
        )
    )
    ${await sborDecode(networkId, rpd)}
    Blob("${hash(wasm)}")        # Package Code
    Map<String, Tuple>()         # Metadata
    None;`
