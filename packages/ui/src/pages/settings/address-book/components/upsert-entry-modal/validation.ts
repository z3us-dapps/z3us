import { z } from 'zod'

import { type TZodValidationGeneric, getZodError } from 'ui/src/utils/error'

export type TAddressBookSchema = z.infer<typeof addressBookSchema>

export type TZodValidation = TZodValidationGeneric<TAddressBookSchema>

export const addressBookSchema = z.object({
	name: z.string().min(1, 'Must include from name'),
	address: z.string().min(1, 'Must include valid address').startsWith('account_'),
})

export const validateAddressBookForm = (address: TAddressBookSchema): TZodValidation => {
	const result: TZodValidation = addressBookSchema.safeParse({
		name: address.name,
		address: address.address,
	})

	// note: need to do this due to Zod issue: https://github.com/colinhacks/zod/issues/1190#issuecomment-1171607138
	if (result.success === false) {
		return { success: false, error: result.error }
	}

	return { success: true, data: result.data }
}

export const getError = (validation: TZodValidation, path: (string | number)[]) =>
	getZodError<TAddressBookSchema>(validation, path)
