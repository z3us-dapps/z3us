/* eslint-disable import/no-unresolved */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import blake from 'blakejs'
import { Buffer } from 'buffer'

export function hash(input: string): Buffer {
	return Buffer.from(blake.blake2bHex(Buffer.from(input, 'hex'), undefined, 32).toString(), 'hex')
}

export const getDeployPackageManifest = ({
	wasm,
	schema,
	nftAddress,
}: {
	wasm: string
	schema: string
	nftAddress: string
}) => {
	const codeHash: string = hash(wasm).toString('hex')
	const schemaHash: string = hash(schema).toString('hex')
	return `
    PUBLISH_PACKAGE
    Blob("${codeHash}")
    Blob("${schemaHash}")
    Map<String, Tuple>()       # Royalty Configuration
    Map<String, String>()      # Metadata
    Tuple(                     # Access Rules Struct
        Map<Tuple, Enum>(      # Method auth Field
            Tuple(
                Enum("NodeModuleId::SELF"), "set_royalty_config"),
            Enum("AccessRuleEntry::AccessRule",
                Enum(
                    "AccessRule::Protected",
                    Enum(
                        "AccessRuleNode::ProofRule",
                        Enum(
                            "ProofRule::Require",
                            Enum(
                                "SoftResourceOrNonFungible::StaticNonFungible",
                                NonFungibleGlobalId("${nftAddress}")
                            )
                        )
                    )
                )
            ),
            Tuple(
                Enum("NodeModuleId::SELF"),
                "claim_royalty"
            ),
            Enum(
                "AccessRuleEntry::AccessRule",
                Enum(
                    "AccessRule::Protected",
                    Enum(
                        "AccessRuleNode::ProofRule",
                        Enum(
                            "ProofRule::Require",
                            Enum(
                                "SoftResourceOrNonFungible::StaticNonFungible",
                                NonFungibleGlobalId("${nftAddress}")
                            )
                        )
                    )
                )
            ),
            Tuple(
                Enum("NodeModuleId::Metadata"),
                "set"
            ),
            Enum(
                "AccessRuleEntry::AccessRule",
                Enum(
                    "AccessRule::Protected",
                    Enum(
                        "AccessRuleNode::ProofRule",
                        Enum(
                            "ProofRule::Require",
                            Enum(
                                "SoftResourceOrNonFungible::StaticNonFungible",
                                NonFungibleGlobalId("${nftAddress}")
                            )
                        )
                    )
                )
            ),
            Tuple(
                Enum("NodeModuleId::Metadata"),
                "get"
            ),
            Enum(
                "AccessRuleEntry::AccessRule",
                Enum("AccessRule::AllowAll")
            )
        ),
        Map<String, Enum>(),            # Grouped Auth Field
        Enum("AccessRule::DenyAll"),    # Default Auth Field
        Map<Tuple, Enum>(               # Method Auth Mutability Field
            Tuple(
                Enum("NodeModuleId::SELF"),
                "set_royalty_config"
            ),
            Enum(
                "AccessRule::Protected",
                Enum(
                    "AccessRuleNode::ProofRule",
                    Enum(
                        "ProofRule::Require",
                        Enum(
                            "SoftResourceOrNonFungible::StaticNonFungible",
                            NonFungibleGlobalId("${nftAddress}")
                        )
                    )
                )
            ),
            Tuple(
                Enum("NodeModuleId::SELF"),
                "claim_royalty"
            ),
            Enum(
                "AccessRule::Protected",
                Enum(
                    "AccessRuleNode::ProofRule",
                    Enum(
                        "ProofRule::Require",
                        Enum(
                            "SoftResourceOrNonFungible::StaticNonFungible",
                            NonFungibleGlobalId("${nftAddress}")
                        )
                    )
                )
            ),
            Tuple(
                Enum("NodeModuleId::Metadata"),
                "set"
            ),
            Enum(
                "AccessRule::Protected",
                Enum(
                    "AccessRuleNode::ProofRule",
                    Enum(
                        "ProofRule::Require",
                        Enum(
                            "SoftResourceOrNonFungible::StaticNonFungible",
                            NonFungibleGlobalId("${nftAddress}")
                        )
                    )
                )
            ),
            Tuple(
                Enum("NodeModuleId::Metadata"),
                "get"
            ),
            Enum(
                "AccessRule::Protected",
                Enum(
                    "AccessRuleNode::ProofRule",
                    Enum(
                        "ProofRule::Require",
                        Enum(
                            "SoftResourceOrNonFungible::StaticNonFungible",
                            NonFungibleGlobalId("${nftAddress}")
                        )
                    )
                )
            )
        ),
        Map<String, Enum>(),     # Group Auth Mutability Field
        Enum("AccessRule::DenyAll")          # Default Auth Mutability Field
    );`
}
