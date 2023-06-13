import { generateId } from '@src/utils/generate-id'

import type { Toast, ToastsState } from './types'

export const factory = (set): ToastsState => ({
	toasts: [],

	removeToastAction: (id: string) => {
		set(state => {
			state.toasts = state.toasts.filter(toast => toast.id !== id)
		})
	},

	addToastAction: (toast?: Toast) => {
		const id = generateId()
		set(state => {
			state.toasts.push({ id, ...toast })
		})
	},
})
