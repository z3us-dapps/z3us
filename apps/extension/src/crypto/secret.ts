import { entropyToMnemonic, generateMnemonic, mnemonicToEntropy, wordlists } from 'bip39'

import { type Data, DataType, Language } from '@src/types/vault'

export enum Strength {
	/// Entropy of 128 bits
	WORD_COUNT_12 = 128,
	/// Entropy of 160 bits
	WORD_COUNT_15 = 160,
	/// Entropy of 192 bits
	WORD_COUNT_18 = 192,
	/// Entropy of 224 bits
	WORD_COUNT_21 = 224,
	/// Entropy of 256 bits
	WORD_COUNT_24 = 256,
}

export function createMnemonic(language: Language = Language.ENGLISH): string {
	const key = Language[language].toLowerCase()
	return generateMnemonic(Strength.WORD_COUNT_24, undefined, wordlists[key])
}

export function getSecret(data: Data): string {
	const key = Language[data?.language ?? Language.ENGLISH].toLowerCase()
	switch (data?.type) {
		case DataType.MNEMONIC:
			return entropyToMnemonic(Buffer.from(data.secret, 'hex'), wordlists[key])
		case DataType.PRIVATE_KEY:
		case DataType.STRING:
			return data.secret
		default:
			return ''
	}
}

export function secretToData(type: DataType, secret: string = '', language: Language = Language.ENGLISH): Data {
	const key = Language[language].toLowerCase()
	switch (type) {
		case DataType.MNEMONIC:
			return {
				type,
				secret: mnemonicToEntropy(
					secret
						.split(',') // replace commas with spaces
						.join(' ')
						.split(' ') // remove extra spaces
						.filter(char => char !== '')
						.join(' '),
					wordlists[key],
				),
				language,
			}
		case DataType.PRIVATE_KEY:
		case DataType.STRING:
			return {
				type,
				secret,
			}
		default:
			return {
				type,
				secret: '',
			}
	}
}
