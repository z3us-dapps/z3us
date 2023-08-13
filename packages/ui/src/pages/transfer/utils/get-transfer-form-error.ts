import { getZodError } from 'ui/src/utils/get-zod-error'

import { type TTransferSchema, type TZodValidation } from '../types'

export const getError = (validation: TZodValidation, path: (string | number)[]) =>
	getZodError<TTransferSchema>(validation, path)
