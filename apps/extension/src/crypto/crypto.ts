const iterations = 10000

export class CryptoService {
	private crypto: Crypto

	constructor(crypto: Crypto) {
		this.crypto = crypto
	}

	encrypt = async <T>(password: string, object: T): Promise<string> => {
		const salt = this.randomSecureBytes(32)

		const key = await this.getKey(password, salt)

		const data = JSON.stringify(object, null, '\t')
		const vector = this.crypto.getRandomValues(new Uint8Array(32))

		const buffer = await this.crypto.subtle.encrypt(
			{
				name: 'AES-GCM',
				iv: vector,
			},
			key,
			Buffer.from(data, 'utf-8'),
		)

		return JSON.stringify({
			data: Buffer.from(new Uint8Array(buffer)).toString('hex'),
			iv: Buffer.from(vector).toString('hex'),
			salt,
		})
	}

	decrypt = async <T>(password: string, data: string): Promise<T | boolean> => {
		const payload = JSON.parse(data) as { data: string; iv: string; salt: string }
		const { salt } = payload
		if (!salt) {
			return false
		}

		const key = await this.getKey(password, salt)

		const encryptedData = Buffer.from(payload.data, 'hex')
		const vector = Buffer.from(payload.iv, 'hex')

		const result = await this.crypto.subtle.decrypt({ name: 'AES-GCM', iv: vector }, key, encryptedData)
		const decrypted = Buffer.from(new Uint8Array(result)).toString('utf-8')
		return JSON.parse(decrypted)
	}

	private getKey = async (password: string, salt: string): Promise<CryptoKey> => {
		const key = await this.crypto.subtle.importKey('raw', Buffer.from(password, 'utf-8'), { name: 'PBKDF2' }, false, [
			'deriveBits',
			'deriveKey',
		])

		const derivedKey = await this.crypto.subtle.deriveKey(
			{
				name: 'PBKDF2',
				salt: Buffer.from(salt, 'base64'),
				iterations,
				hash: 'SHA-256',
			},
			key,
			{ name: 'AES-GCM', length: 256 },
			false,
			['encrypt', 'decrypt'],
		)

		return derivedKey
	}

	randomSecureBytes = (byteCount: number): string => {
		const bytes = this.crypto.getRandomValues(new Uint8Array(byteCount))
		const buffer = Buffer.from(bytes)
		const byteArray = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength / Uint8Array.BYTES_PER_ELEMENT)
		let byteString = ''
		for (let i = 0; i < byteCount; i += 1) {
			byteString += `00${byteArray[i].toString(16)}`.slice(-2)
		}

		return byteString
	}
}
