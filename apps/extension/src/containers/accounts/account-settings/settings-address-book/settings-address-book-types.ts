// import type { z } from 'zod'
// import { type ZodError } from 'zod'

export interface IImmerSettingsGeneralProps {
	deleteAccountId: string | undefined
	editAccountId: string | undefined
	isEditDialogVisible: boolean
	data: any
	editingAddress: any
	initValidation: boolean
	validation: any
	// validation: TZodValidation
}
