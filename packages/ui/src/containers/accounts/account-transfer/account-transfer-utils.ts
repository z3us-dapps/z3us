import { getZodError } from 'ui/src/utils/get-zod-error'

import { transferFormSchema } from './account-transfer-constants'
import { type TTransferSchema, type TZodValidation } from './account-transfer-types'

export const validateTransferForm = (transaction: TTransferSchema): TZodValidation => {
	const result: TZodValidation = transferFormSchema.safeParse({
		from: transaction.from,
		message: transaction.message,
		isMessageEncrypted: transaction.isMessageEncrypted,
		sends: transaction.sends,
	})

	// note: need to do this due to Zod issue: https://github.com/colinhacks/zod/issues/1190#issuecomment-1171607138
	if (result.success === false) {
		return { success: false, error: result.error }
	}

	return { success: true, data: result.data }
}

export const getError = (validation: TZodValidation, path: (string | number)[]) =>
	getZodError<TTransferSchema>(validation, path)
