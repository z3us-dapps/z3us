// TODO

/* eslint-disable import/no-unresolved */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line import/no-extraneous-dependencies
import { createToken } from './tokens'

// TODO: fix type
export const getCreateBadgeManifest = (accountAddress: string, name: string, description: string) =>
	createToken(accountAddress).nft({ name, description, items: [name] })
