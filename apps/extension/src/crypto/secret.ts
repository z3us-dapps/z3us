import { entropyToMnemonic, generateMnemonic, mnemonicToEntropy, wordlists } from 'bip39'

import { type Data, DataType, Language } from '@src/types/vault'

export function createMnemonic(language: Language = Language.ENGLISH): string {
	const key = Language[language].toLowerCase()
	return generateMnemonic(256, undefined, wordlists[key])
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
