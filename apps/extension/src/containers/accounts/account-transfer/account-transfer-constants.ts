import { z } from 'zod'

import { type IToken } from './account-transfer-types'

export const transferFormSchema = z.object({
	from: z.string().min(1, 'Must include from address').max(30, 'Must include from address'),
	message: z.string().max(10, 'Message must be less than 10'),
	isMessageEncrypted: z.boolean({
		invalid_type_error: 'must be a boolean',
	}),
})

export const defaultToken: IToken = { token: '', amount: 0 }
