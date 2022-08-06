import React, { useEffect, useState, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom'
import create from 'zustand'
import shallow from 'zustand/shallow'
import { AnimatePresence } from 'framer-motion'
import { PropsWithCSS } from '../../types'
import { __DEV__ } from '../../utils/assertion'
import { Toast as ToastC } from './toast'
import { Box } from '../atoms'

export interface ToastsState {
	toastList: Set<string>
	show: (toastId: string) => void
	close: (toastId: string) => void
	closeAll: () => void
}

const useToastStore = create<ToastsState>((set, get) => ({
	toastList: new Set(),
	show(toastId: string) {
		const { toastList } = get()

		const newToastList = new Set(toastList)
		newToastList.add(toastId)

		set({
			toastList: newToastList,
		})
	},
	close(toastId: string) {
		const { toastList } = get()

		const newToastList = new Set(toastList)
		newToastList.delete(toastId)

		set({
			toastList: newToastList,
		})
	},
	closeAll() {
		set({
			toastList: new Set(),
		})
	},
}))

export interface Props {
	uniqueId: string
	config: {
		duration: number
		type: string
	}
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>

const defaultToastProps = {}

export type ToastProps = React.PropsWithChildren<PropsWithCSS<Props & NativeAttrs>>

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(({ uniqueId, config, children }, ref) => {
	const toastRef = useRef<HTMLDivElement>(null)
	useImperativeHandle(ref, () => toastRef.current)

	const [isMounted, setIsMounted] = useState<boolean>(false)
	const { duration = 3500, type } = config

	const { toastList, close } = useToastStore(
		store => ({
			toastList: store.toastList,
			close: store.close,
		}),
		shallow,
	)

	const isShown = toastList.has(uniqueId)

	useEffect(() => {
		if (!isMounted) {
			setIsMounted(true)
		}
		if (!duration || !isShown) {
			return () => {}
		}

		const timeoutId = setTimeout(() => {
			close(uniqueId)
		}, duration)

		return () => clearTimeout(timeoutId)
	}, [uniqueId, isShown, duration, close, isMounted])

	return isMounted
		? createPortal(
				<Box ref={ref} css={{ position: 'fixed', top: '0', width: '360px' }}>
					<AnimatePresence>
						<Box>
							{isShown && (
								<ToastC key={uniqueId} type={type} onClickClose={() => close(uniqueId)}>
									{children}
								</ToastC>
							)}
						</Box>
					</AnimatePresence>
				</Box>,
				document.querySelector('body'),
		  )
		: null
})

if (__DEV__) {
	Toast.displayName = 'z3usUI - toast'
}

Toast.toString = () => '.z3us toast'

Toast.defaultProps = defaultToastProps

export default Toast

export const useToastControls = () => {
	const controls = useToastStore(
		store => ({
			show: store.show,
			close: store.close,
			closeAll: store.closeAll,
		}),
		shallow,
	)

	return controls
}
