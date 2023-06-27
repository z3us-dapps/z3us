import { z } from 'zod'

import { type IToken } from './account-transfer-types'

const positiveNumberValidator = (value: number): boolean => value > 0

const tokensSchema = z.object({
	address: z.string().min(1, 'Please select token'),
	name: z.string().min(1, 'Please select token'),
	symbol: z.string().min(1, 'Please select token'),
	amount: z.number().refine(positiveNumberValidator, { message: 'Please enter a valid amount' }),
})

const sendsSchema = z.object({
	to: z.string().min(1, 'Must include to address'),
	tokens: z.array(tokensSchema),
})

export const transferFormSchema = z.object({
	from: z.string().min(1, 'Must include from address'),
	message: z.string().max(255, 'Message must be less than 255 characters'),
	isMessageEncrypted: z.boolean({
		invalid_type_error: 'must be a boolean',
	}),
	sends: z.array(sendsSchema),
})

export const defaultToken: IToken = { address: '', name: '', symbol: '', amount: undefined }
