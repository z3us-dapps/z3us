import { generateId } from '@src/utils/generate-id'
import { GetState, SetState } from 'zustand'
import { SharedStore, Toast, ToastsStore } from './types'

export const factory = (set: SetState<SharedStore>, get: GetState<SharedStore>): ToastsStore => ({
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

	addConfirmWithHWToastAction: () => {
		const { isHardwareWallet } = get()
		if (isHardwareWallet) {
			set(state => {
				state.toasts.push({
					id: generateId(),
					type: 'success',
					title: 'Please confirm with your device',
					duration: 2000,
				})
			})
		}
	},
})
