import { type ZodError, z } from 'zod'

import { transactionFields } from './account-transfer-constants'
import { type ITransaction } from './account-transfer-types'

const transferFormSchema = z.object({
	from: z
		.string()
		.min(2, 'Name must be at least 2 characters long Hurr')
		.max(30, 'Name must be at least 2 characters long DURR'),
})

export type TTransferSchema = z.infer<typeof transferFormSchema>

export const validateTransferForm = (
	transaction: ITransaction,
): { success: true; data: TTransferSchema } | { success: false; error: ZodError } => {
	const result = transferFormSchema.safeParse({
		from: transaction[transactionFields.TRANSACTION_FROM],
	})

	// note: this due to zod issue: https://github.com/colinhacks/zod/issues/1190#issuecomment-1171607138
	if (result.success === false) {
		return { success: false, error: result.error }
	}

	return result
}

// TODO: fix path to be string of
export const getZodErrorMessage = (error: ZodError, path: string): string | null => {
	if (!error) return null
	const matchedError = error.issues.find(err => err.path.includes(path))

	if (matchedError) {
		return matchedError.message
	}

	return null
}
