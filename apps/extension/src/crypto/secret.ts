import { entropyToMnemonic } from 'bip39'

import { type Data, DataType } from '@src/types/vault'

export function getSecret(data: Data): string {
	switch (data?.type) {
		case DataType.ECDSA_SECP_256K1:
		case DataType.EDDSA_ED25519:
			return entropyToMnemonic(Buffer.from(data.secret, 'hex'))
		case DataType.PRIVATE_KEY:
		case DataType.STRING:
			return data.secret
		default:
			return ''
	}
}
