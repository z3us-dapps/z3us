export enum DataType {
	MNEMONIC = 'mnemonic',
	PRIVATE_KEY = 'private_key',
	ECDSA_SECP_256K1 = 'ecdsa_secp256k1',
	EDDSA_ED25519 = 'eddsa_ed25519',
}

export interface Data {
	type: DataType
	secret: string
}
