import type { z } from 'zod'

import { type TZodValidationGeneric } from 'ui/src/utils/get-zod-error'

import type {
	sendsCombinedSchema,
	sendsNftSchema,
	sendsSchema,
	transferFormSchema,
	transferNftFormSchema,
} from './account-transfer-constants'

export interface ISend {
	to: string
	tokens: IToken[]
}

export interface IToken {
	name: string
	symbol: string
	address: string
	amount: number
}

export interface INft {
	name: string
	id: string
	address: string
}

export type TSendSchema = z.infer<typeof sendsSchema>

export type TSendNftSchema = z.infer<typeof sendsNftSchema>

export type TCombinedSendSchema = z.infer<typeof sendsCombinedSchema>

export type TTransferSchema = z.infer<typeof transferFormSchema>

export type TTransferNftSchema = z.infer<typeof transferNftFormSchema>

export type TZodValidation = TZodValidationGeneric<TTransferSchema>

export interface IAccountTransferImmer {
	transaction: TTransferSchema
	slides: [number, number]
	isMessageUiVisible: boolean
	initValidation: boolean
	validation: TZodValidation
}

export interface IAccountTransferNftsImmer {
	transaction: TTransferNftSchema
	slides: [number, number]
	isMessageUiVisible: boolean
	initValidation: boolean
	validation: TZodValidation
}
