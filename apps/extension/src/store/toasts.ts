import { generateId } from '@src/utils/generate-id'
import { Toast, ToastsStore } from './types'

export const factory = (set, get): ToastsStore => ({
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
