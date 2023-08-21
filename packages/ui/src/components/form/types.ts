import { type TZodReturnError } from 'ui/src/utils/get-zod-error'

export type FormData<T> = T extends object
	? {
			[K in keyof T]: FormData<T[K]>
	  }
	: any

export type FormErrors = {
	[k: string]: TZodReturnError
}
