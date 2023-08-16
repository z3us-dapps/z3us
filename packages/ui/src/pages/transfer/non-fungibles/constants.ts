import { z } from 'zod'

import { type INft } from './types'

const tokensSchema = z.object({
	name: z.string().min(1, 'Please select nft'),
	address: z.string().min(1, 'Please select nft'),
	id: z.string().min(1, 'Please select nft'),
})

export const sendsSchema = z.object({
	to: z.string().min(1, 'Must include to address'),
	nfts: z.array(tokensSchema),
})

export const transferFormSchema = z.object({
	from: z.string().min(1, 'Must include from address'),
	message: z.string().max(255, 'Message must be less than 255 characters'),
	isMessageEncrypted: z.boolean({
		invalid_type_error: 'must be a boolean',
	}),
	sends: z.array(sendsSchema),
})

export const defaultNft: INft = { address: '', name: '', id: '' }
