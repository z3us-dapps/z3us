import { type ZodError, z } from 'zod'

import { transferFormSchema } from './account-transfer-constants'

export interface ITransaction {
	from: string
	message: string
	isMessageEncrypted: boolean
	sends: ISend[]
}

export interface ISend {
	to: string
	tokens: IToken[]
}

export interface IToken {
	token: string
	amount: number
}

export type TITransactionKey = keyof ITransaction

export type TTransferSchema = z.infer<typeof transferFormSchema>

export type TZodValidationError = { success: false; error: ZodError }

export type TZodValidationSuccess = { success: true; data: TTransferSchema }

export type TZodValidation = TZodValidationSuccess | TZodValidationError

export interface IAccountTransferImmer {
	transaction: ITransaction
	slides: [number, number]
	isGroupUiVisible: boolean
	isMessageUiVisible: boolean
	isSubmittingReview: boolean
	initValidation: boolean
	validation: TZodValidation
}
