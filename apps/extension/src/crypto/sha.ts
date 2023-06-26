import * as crypto from 'crypto'

export const sha256 = (message: crypto.BinaryLike) =>
	crypto.createHash('sha256').update(message).digest().toString('hex')
