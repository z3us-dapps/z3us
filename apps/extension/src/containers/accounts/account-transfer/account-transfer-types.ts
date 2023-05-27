import { type ZodError } from 'zod'

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

export interface IAccountTransferImmer {
	transaction: ITransaction
	slides: [number, number]
	isMessageEncrypted: boolean
	isGroupUiVisible: boolean
	isMessageUiVisible: boolean
	isSubmittingReview: boolean
	// TODO: data can be inferred from
	//
	// export type TTransferSchema = z.infer<typeof transferFormSchema>
	validation: { success: true; data: any } | { success: false; error: ZodError }
	// https://zod.dev/?id=safeparse
	// validation: { success: true; data: T; } | { success: false; error: ZodError; }
}
