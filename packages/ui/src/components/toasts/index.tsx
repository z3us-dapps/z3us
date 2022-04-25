import React, { useEffect, useState, PropsWithoutRef, RefAttributes, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom'
import create from 'zustand'
import shallow from 'zustand/shallow'
import { AnimatePresence } from 'framer-motion'
import { CSS } from '../../theme'
import { __DEV__ } from '../../utils/assertion'
import withDefaults from '../../utils/with-defaults'
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
	children?: React.ReactNode
	config: {
		duration: number
		type?: string
	}
}

const defaultToastProps = {
	uniqueId: undefined,
	config: {},
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>

export type ToastProps = Props & NativeAttrs & { css?: CSS }

const Toast = React.forwardRef<HTMLDivElement, React.PropsWithChildren<ToastProps>>(
	({ uniqueId, config, children }, ref: React.Ref<HTMLDivElement | null>) => {
		const toastRef = useRef<HTMLDivElement>(null)
		useImperativeHandle(ref, () => toastRef.current)

		const [isMounted, setIsMounted] = useState(false)
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
							{isShown && (
								<ToastC key={uniqueId} type={type} onClickClose={() => close(uniqueId)}>
									{children}
								</ToastC>
							)}
						</AnimatePresence>
					</Box>,
					document.querySelector('body'),
			  )
			: null
	},
)

type ToastComponent<T, P = {}> = React.ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>

if (__DEV__) {
	Toast.displayName = 'z3usUI - toast'
}

Toast.toString = () => '.z3us toast'

export default withDefaults(Toast, defaultToastProps) as ToastComponent<HTMLDivElement, ToastProps>

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
