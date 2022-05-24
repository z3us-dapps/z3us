import { generateId } from '@src/utils/generate-id'
import { SetState } from 'zustand'
import { SharedStore, Toast, ToastsStore } from './types'

export const factory = (set: SetState<SharedStore>): ToastsStore => ({
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
