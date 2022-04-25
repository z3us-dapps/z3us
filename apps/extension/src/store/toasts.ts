import { generateId } from '@src/utils/generate-id'

interface Toast {
	id?: string
	children?: React.ReactNode
	type: string
	title?: string
	subTitle?: string
	duration?: number
}

export type ToastsStore = {
	toasts: Array<Toast>
	addToastAction: (toast?: Toast) => void
	removeToastAction: (id: string) => void
}

export const createToastsStore = set => ({
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
