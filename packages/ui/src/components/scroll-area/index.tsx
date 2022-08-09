import React, { useRef, useEffect } from 'react'
import SimpleBar from 'simplebar-react'
import { useImmer } from 'use-immer'
import { Box } from '../atoms/box'

interface ImmerT {
	isTopShadowVisible: boolean
	isBottmShadowVisible: boolean
}

interface IProps {
	children: React.ReactNode
	scrollableNodeProps?: any
}

const defaultProps = {
	scrollableNodeProps: undefined,
}

export const ScrollArea: React.FC<IProps> = ({ children, scrollableNodeProps }) => {
	const sRef: any = useRef()
	const observer = useRef<ResizeObserver | null>(null)
	const scrollObserver = useRef<ResizeObserver | null>(null)

	const [state, setState] = useImmer<ImmerT>({
		isTopShadowVisible: false,
		isBottmShadowVisible: false,
	})

	const handleScroll = (event: Event) => {
		const target = event.target as Element
		const { scrollHeight, scrollTop, clientHeight } = target
		const isScrollable = scrollHeight > clientHeight
		const isBottomReached = scrollHeight - Math.round(scrollTop) === clientHeight
		const showBottomShadow = isScrollable && !isBottomReached
		const showTopShadow = isScrollable && scrollTop > 0

		setState(draft => {
			draft.isTopShadowVisible = showTopShadow
			draft.isBottmShadowVisible = showBottomShadow
		})
	}

	useEffect(() => {
		const scrollRef = sRef?.current?.getScrollElement()
		const simpleBarContent = scrollRef.getElementsByClassName('simplebar-content')[0]
		scrollRef.addEventListener('scroll', handleScroll, { passive: true })

		observer.current = new ResizeObserver(entries => {
			entries.forEach(entry => {
				const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize
				setState(draft => {
					draft.isBottmShadowVisible = contentBoxSize.blockSize > scrollRef.clientHeight
				})
			})
		})
		scrollObserver.current = new ResizeObserver(entries => {
			entries.forEach(entry => {
				const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize
				setState(draft => {
					draft.isBottmShadowVisible = simpleBarContent.clientHeight > contentBoxSize.blockSize
				})
			})
		})
		if (simpleBarContent) {
			observer.current.observe(simpleBarContent)
		}
		if (scrollRef) {
			scrollObserver.current.observe(scrollRef)
		}
		return () => {
			scrollRef.removeEventListener('scroll', handleScroll)
			if (observer.current) {
				observer.current.disconnect()
			}
			if (scrollObserver.current) {
				scrollObserver.current.disconnect()
			}
		}
	}, [])

	return (
		<Box
			css={{
				position: 'absolute',
				overflow: 'hidden',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
			}}
		>
			{/* @TODO: resolve typescript error, this will be resolved when upgrade to react 18 */}
			{/* @ts-ignore */}
			<SimpleBar
				ref={sRef}
				scrollableNodeProps={scrollableNodeProps}
				style={{
					height: '100%',
					position: 'relative',
				}}
			>
				{children}
			</SimpleBar>
			<Box
				css={{
					position: 'absolute',
					opacity: state.isTopShadowVisible ? '1' : '0',
					transition: '$default',
					top: '0',
					left: '0',
					right: 0,
					height: '10px',
					background: '$bgPanelShadowDown',
					pe: 'none',
				}}
			/>
			<Box
				css={{
					position: 'absolute',
					opacity: state.isBottmShadowVisible ? '1' : '0',
					bottom: '0',
					left: '0',
					right: 0,
					height: '10px',
					background: '$bgPanelShadowUp',
					transition: '$default',
					pe: 'none',
				}}
			/>
		</Box>
	)
}

ScrollArea.defaultProps = defaultProps
