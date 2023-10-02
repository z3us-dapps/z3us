export enum DataType {
	ECDSA_SECP_256K1 = 'mnemonic', // value mnemonic due to backward compatibility with olympia wallet
	PRIVATE_KEY = 'private_key',
	EDDSA_ED25519 = 'eddsa_ed25519',
	STRING = 'string',
	NONE = 'none',
}

// https://github.com/bitcoinjs/bip39/tree/master/src/wordlists
export enum Language {
	CZECH,
	CHINESE_SIMPLIFIED,
	CHINESE_TRADITIONAL,
	KOREAN,
	FRENCH,
	ITALIAN,
	SPANISH,
	JAPANESE,
	PORTUGUESE,
	ENGLISH,
}

export interface Data {
	type: DataType
	secret: string
	language?: Language
}
