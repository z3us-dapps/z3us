// @ts-nocheck
// TODO: fix ts
import clsx, { type ClassValue } from 'clsx'
import React, { useEffect, useRef, useState } from 'react'

import SimpleBar from '../simple-bar'
import { type themeShape } from '../system/theme.css'
import * as styles from './simple-bar-styled.css'

export type TThemeBorderRadius = (typeof themeShape)['border']['radius']

interface IDialogProps {
	children?: any
	className?: ClassValue
}

export const SimpleBarStyled: React.FC<IDialogProps> = props => {
	const { children, className } = props

	const scrollRef = useRef(null)

	const [isBottomShadowVisible, setIsBottomShadowVisible] = useState<boolean>(false)
	const [isTopShadowVisible, setIsTopShadowVisible] = useState<boolean>(false)

	const handleScroll = (event: Event) => {
		const target = event.target as Element
		const { scrollHeight, scrollTop, clientHeight } = target
		const isScrollable = scrollHeight > clientHeight
		const isBottomReached = scrollHeight - Math.round(scrollTop) === clientHeight

		setIsBottomShadowVisible(isScrollable && !isBottomReached)
		setIsTopShadowVisible(isScrollable && scrollTop > 0)
	}

	useEffect(() => {
		const scrollElem = scrollRef.current?.getScrollElement()

		scrollElem.addEventListener('scroll', handleScroll, { passive: true })

		const { scrollHeight, clientHeight } = scrollElem

		setIsBottomShadowVisible(scrollHeight > clientHeight)

		return () => {
			scrollElem?.removeEventListener('scroll', handleScroll)
		}
	}, [scrollRef.current])

	return (
		<SimpleBar
			className={clsx(
				className,
				styles.scrollAreaStyledWrapper,
				isTopShadowVisible && styles.simpleBarStyledTopShadow,
				isBottomShadowVisible && styles.simpleBarStyledBottomShadow,
			)}
			ref={scrollRef}
		>
			{children}
		</SimpleBar>
	)
}
