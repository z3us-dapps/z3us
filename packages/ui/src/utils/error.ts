import { type ZodError } from 'zod'

export type TZodValidationGeneric<T> = { success: true; data: T } | { success: false; error: ZodError }

export type TZodReturnError = { message: string | null; error: boolean }

export const getZodError = <T>(validation: TZodValidationGeneric<T>, path: (string | number)[]): TZodReturnError => {
	const error = validation?.success === false ? validation.error : null
	if (!error) return { message: null, error: false }

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
		return { message: matchedError.message, error: true }
	}

	return { message: null, error: false }
}
