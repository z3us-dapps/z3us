export enum DataType {
	ECDSA_SECP_256K1 = 'mnemonic', // value mnemonic due to backward compatibility with olympia wallet
	PRIVATE_KEY = 'private_key',
	EDDSA_ED25519 = 'eddsa_ed25519',
	STRING = 'string',
}

export interface Data {
	type: DataType
	secret: string
}
