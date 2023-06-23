export enum DataType {
	MNEMONIC = 'mnemonic',
	PRIVATE_KEY = 'private_key',
}

export interface Data {
	type: DataType
	secret: string
}
