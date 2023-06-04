import { transferFormSchema } from './account-transfer-constants'
import type { TZodValidationError } from './account-transfer-types';
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

export const getZodErrorMessage = (validation: TZodValidation, path: (string | number)[]): string | null => {
	const error = (validation as TZodValidationError)?.error
	if (!error) return null

	const matchedError = error.issues.find(
		issue =>
			issue.path.length === path.length &&
			issue.path.every((segment, index) => {
				if (typeof path[index] === 'number') {
					return typeof segment === 'number' && segment === path[index]
				}
				return segment === path[index]
			}),
	)

	if (matchedError) {
		return matchedError.message
	}

	return null
}

export const getZodError = (validation: TZodValidation, path: (string | number)[]): boolean => {
	const error = getZodErrorMessage(validation, path)

	if (!error) return false

	return !!error
}
