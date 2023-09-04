import type { ZodFormattedError } from 'zod'

export type FormData<T> = T extends object
	? {
			[K in keyof T]: FormData<T[K]>
	  }
	: any

export type FormErrors<T> = ZodFormattedError<T> | {}
