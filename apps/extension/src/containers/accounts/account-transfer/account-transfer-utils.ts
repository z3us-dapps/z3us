import { transferFormSchema } from './account-transfer-constants'
import { type ITransaction, type TITransactionKey, type TZodValidation, TZodValidationError } from './account-transfer-types'

export const validateTransferForm = (transaction: ITransaction): TZodValidation => {
	// from: string
	// message: string
	// isMessageEncrypted: boolean
	// sends: ISend[]

	const result: TZodValidation = transferFormSchema.safeParse({
		from: transaction.from,
		message: transaction.message,
		isMessageEncrypted: transaction.isMessageEncrypted,
	})

	// note: this due to zod issue: https://github.com/colinhacks/zod/issues/1190#issuecomment-1171607138
	if (result.success === false) {
		return { success: false, error: result.error }
	}

	return { success: true, data: result.data }
}

export const getZodErrorMessage = (validation: TZodValidation, path: TITransactionKey): string | null => {
	const error = (validation as TZodValidationError)?.error;
	if (!error) return null

	const matchedError = error.issues.find(err => err.path.includes(path))

	if (matchedError) {
		return matchedError.message
	}

	return null
}

export const getZodError = (validation: TZodValidation, path: TITransactionKey): boolean => {
	const error = (validation as TZodValidationError)?.error;

	if (!error) return false

	const matchedError = error.issues.find(err => err.path.includes(path))

	return !!matchedError
}
