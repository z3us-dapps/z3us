import type { z } from 'zod';
import { type ZodError } from 'zod'

import type { transferFormSchema } from './account-transfer-constants'

export interface ISend {
	to: string
	tokens: IToken[]
}

export interface IToken {
	token: string
	amount: number
}

export type TTransferSchema = z.infer<typeof transferFormSchema>

export type TZodValidationError = { success: false; error: ZodError }

export type TZodValidationSuccess = { success: true; data: TTransferSchema }

export type TZodValidation = TZodValidationSuccess | TZodValidationError

export interface IAccountTransferImmer {
	transaction: TTransferSchema
	slides: [number, number]
	isGroupUiVisible: boolean
	isMessageUiVisible: boolean
	isSubmittingReview: boolean
	initValidation: boolean
	validation: TZodValidation
}
