import blake from 'blakejs'
import { Buffer } from 'buffer'

export function hash(input: string): Buffer {
	return Buffer.from(blake.blake2bHex(Buffer.from(input, 'hex'), undefined, 32).toString(), 'hex')
}

export interface DeployPackage {
	wasm: File
	schema: File
	badge: string
}

export const getDeployPackageManifest = async ({ wasm, schema, badge }: DeployPackage): Promise<string> => {
	const manifest = new TextDecoder('utf-8').decode(Buffer.from(await schema.arrayBuffer()))
	const wasmHash = Buffer.from(blake.blake2bHex(Buffer.from(await wasm.arrayBuffer()), undefined, 32).toString(), 'hex')

	return `
	  PUBLISH_PACKAGE_ADVANCED
	  Enum<AccessRule::AllowAll>() # Owner AccessRule
	  ${manifest}
	  Blob("${wasmHash}")    		# Package Code
	  Map<String, Tuple>()         # Metadata
	  None;                        # Address Reservation`
}
