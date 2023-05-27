import { z } from 'zod'

import { type IToken } from './account-transfer-types'

export const transferFormSchema = z.object({
	from: z
		.string()
		.min(2, 'Name must be at least 2 characters long Hurr')
		.max(30, 'Name must be at least 2 characters long DURR'),
})

export const defaultToken: IToken = { token: '', amount: 0 }
