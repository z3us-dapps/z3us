import { entropyToMnemonic } from 'bip39'

import { type Data, DataType } from '@src/types/vault'

export function getSecret(data: Data): string {
	switch (data.type) {
		case DataType.MNEMONIC:
			return entropyToMnemonic(Buffer.from(data.secret, 'hex'))
		case DataType.PRIVATE_KEY:
			return data.secret
		case DataType.ECDSA_SECP_256K1:
			return entropyToMnemonic(Buffer.from(data.secret, 'hex'))
		case DataType.EDDSA_ED25519:
			throw new Error('Not implemented!')
		default:
			return null
	}
}
