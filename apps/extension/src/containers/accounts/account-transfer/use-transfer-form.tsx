import { z } from 'zod'

import { transactionFields } from './account-transfer-constants'
import { type ITransaction } from './account-transfer-types'

const transferFormSchema = z.object({
	[transactionFields.TRANSACTION_FROM]: z.string().min(2).max(30),
})

export type TTransferSchema = z.infer<typeof transferFormSchema>

export const useTransferForm = () => {
	const validateTransferForm = (transaction: ITransaction, handleSetValidation: any) => {
		const result = transferFormSchema.safeParse({
			[transactionFields.TRANSACTION_FROM]: transaction[transactionFields.TRANSACTION_FROM],
		})

		// note: have to do this due to zod issue: https://github.com/colinhacks/zod/issues/1190#issuecomment-1171607138
		if (result.success === false) {
			handleSetValidation(result)

			return { isValid: result.success, error: result.error }
		}

		handleSetValidation(result)

		return { isValid: result.success }
	}

	// useEffect(() => {
	// 	validateTransferForm()
	// }, [state.transaction.from])

	return { validateTransferForm }
}
