import React, { useRef, useEffect } from 'react'
import SimpleBar from 'simplebar-react'
import { useImmer } from 'use-immer'
import { Box } from 'ui/src/components/atoms'

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

	const [state, setState] = useImmer({
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
		const isScrollable = scrollRef.scrollHeight > scrollRef.clientHeight
		setState(draft => {
			draft.isBottmShadowVisible = isScrollable
		})
		scrollRef.addEventListener('scroll', handleScroll, { passive: true })

		observer.current = new ResizeObserver(() => {
			// TODO
			// DETECT finish resize with smart refs and timeouts
			// refresh the the scrollRef
			// update shadow state
		})
		if (scrollRef) {
			observer.current.observe(scrollRef)
		}
		return () => {
			scrollRef.removeEventListener('scroll', handleScroll)
			if (observer.current) {
				observer.current.disconnect()
			}
		}
	}, [])

	return (
		<Box
			css={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
			}}
		>
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
