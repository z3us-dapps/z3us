import bip39 from 'bip39'

export function entropyToMnemonic(entropyHex: string): string {
	const entropy = Buffer.from(entropyHex, 'hex')
	const mnemonic = bip39.entropyToMnemonic(entropy)
	return mnemonic
}
