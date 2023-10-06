import { type BinaryLike, createHash } from 'crypto'

export const sha256 = (message: BinaryLike) => createHash('sha256').update(message).digest().toString('hex')
