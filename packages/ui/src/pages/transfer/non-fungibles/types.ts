import type { z } from 'zod'

import { type TZodValidationGeneric } from 'ui/src/utils/get-zod-error'

import type { sendsSchema, transferFormSchema } from './constants'

export interface INft {
	name: string
	id: string
	address: string
}

export type TSendSchema = z.infer<typeof sendsSchema>

export type TTransferSchema = z.infer<typeof transferFormSchema>

export type TZodValidation = TZodValidationGeneric<TTransferSchema>

export interface IAccountTransferImmer {
	transaction: TTransferSchema
	slides: [number, number]
	isMessageUiVisible: boolean
	initValidation: boolean
	validation: TZodValidation
}
