import { type ZodError } from 'zod'
import { transferFormSchema } from './account-transfer-constants'
import { type ITransaction, type TITransactionKey, type TZodValidation } from './account-transfer-types'

export const validateTransferForm = (transaction: ITransaction): TZodValidation => {
	const result: TZodValidation = transferFormSchema.safeParse({
		from: transaction.from,
	})

	// note: this due to zod issue: https://github.com/colinhacks/zod/issues/1190#issuecomment-1171607138
	if (result.success === false) {
		return { success: false, error: result.error }
	}

	return { success: true, data: result.data }
}

export const getZodErrorMessage = (error: ZodError, path: TITransactionKey): string | null => {
	if (!error) return null
	const matchedError = error.issues.find(err => err.path.includes(path))

	if (matchedError) {
		return matchedError.message
	}

	return null
}
