import { createToken } from './tokens'

export const getCreateBadgeManifest = (accountAddress: string, name: string, description: string) =>
	createToken(accountAddress).nft({ name, description, items: [name] })
