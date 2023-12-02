export enum DataType {
	MNEMONIC = 'mnemonic',
	PRIVATE_KEY = 'private_key',
	STRING = 'string',
	COMBINED = 'combined',
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
