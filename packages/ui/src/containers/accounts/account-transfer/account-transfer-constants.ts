/* eslint-disable */
// @ts-nocheck
// TODO: fix
import { z } from 'zod'

import { type IToken } from './account-transfer-types'

const positiveNumberValidator = (value: number): boolean => value > 0

const tokensSchema = z.object({
	token: z.string().min(1, 'Must include to token').max(30, 'Must include to token'),
	amount: z.number().refine(positiveNumberValidator, { message: 'Please enter a valid amount' }),
})

const sendsSchema = z.object({
	to: z.string().min(1, 'Must include to address').max(99, 'Must include to address'),
	tokens: z.array(tokensSchema),
})

export const transferFormSchema = z.object({
	from: z.string().min(1, 'Must include from address').max(30, 'Must include from address'),
	message: z.string().max(10, 'Message must be less than 10'),
	isMessageEncrypted: z.boolean({
		invalid_type_error: 'must be a boolean',
	}),
	sends: z.array(sendsSchema),
})

export const defaultToken: IToken = { token: '', amount: undefined }
