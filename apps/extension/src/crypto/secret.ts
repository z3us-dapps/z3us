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

export function getWordList(language: Language = Language.ENGLISH): string[] {
	const key = Language[language].toLowerCase()
	return wordlists[key]
}

export function createMnemonic(language: Language = Language.ENGLISH): string {
	return generateMnemonic(Strength.WORD_COUNT_24, undefined, getWordList(language))
}

export function getSecret(data: Data): string {
	switch (data?.type) {
		case DataType.MNEMONIC:
			return entropyToMnemonic(Buffer.from(data.secret, 'hex'), getWordList(data?.language ?? Language.ENGLISH))
		case DataType.PRIVATE_KEY:
		case DataType.STRING:
			return data.secret
		case DataType.NONE:
			return ''
		case DataType.COMBINED:
			throw new Error(`Can not get secret from data type: ${data.type} directly`)
		default:
			throw new Error(`Unknown data type: ${data.type}`)
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
		case DataType.NONE:
			return {
				type,
				secret: '',
			}
		case DataType.COMBINED:
			throw new Error(`Can not create data from secret type: ${type} directly`)
		default:
			throw new Error(`Unknown data type: ${type}`)
	}
}

export function combineData(...data: Data[]): Data {
	return {
		type: DataType.COMBINED,
		secret: JSON.stringify(data),
	}
}

export function getCombineData(combinedData: Data, key: string): Data {
	if (combinedData.type !== DataType.COMBINED) {
		return combinedData
	}
	return JSON.parse(combinedData.secret)[key]
}
