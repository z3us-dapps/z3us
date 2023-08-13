import { transferFormSchema } from '../constants'
import { type TTransferSchema, type TZodValidation } from '../types'

export const validateTransferForm = (transaction: TTransferSchema): TZodValidation => {
	const result: TZodValidation = transferFormSchema.safeParse(transaction)

	// note: need to do this due to Zod issue: https://github.com/colinhacks/zod/issues/1190#issuecomment-1171607138
	if (result.success === false) {
		return { success: false, error: result.error }
	}

	return { success: true, data: result.data }
}
