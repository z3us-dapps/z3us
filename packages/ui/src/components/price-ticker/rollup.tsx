import React, { useEffect, useRef, useState } from 'react'

import { domExists } from './utils'

export interface RollupProps {
	widthRef: (node: HTMLDivElement) => void
	setHeight: (height: number) => void
	value: string
	direction: 'up' | 'down'
	speed: number
	dictionary: string[]
	transitionColors: string[]
}

const Rollup: React.FC<RollupProps> = ({
	widthRef,
	setHeight,
	value,
	direction,
	speed,
	dictionary,
	transitionColors,
}) => {
	const visibleValue = useRef<string>(value)
	const valueRef = useRef<HTMLDivElement>(null)
	const [transitioning, setTransitioning] = useState<boolean>(false)
	const [shift, setShift] = useState<number>(0)

	const upColor = transitionColors[0] || 'inherit'
	const downColor = transitionColors[1] || 'inherit'
	const transitionColor = direction === 'down' ? downColor : upColor

	const containerStyle: React.CSSProperties = {
		position: 'relative',
		overflow: 'hidden',
	}

	const valueStyle: React.CSSProperties = {
		opacity: transitioning ? 0 : 1,
	}

	const rollupStyle: React.CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		position: 'absolute',
		top: 0,
		color: transitioning && speed > 0 ? transitionColor : 'inherit',
		opacity: transitioning && speed > 0 ? 1 : 0,
		userSelect: 'none',
		transition: `transform ${speed}ms ease-in-out`,
	}

	useEffect(() => {
		if (!domExists()) {
			return
		}

		let timeout: number

		const frame = window.requestAnimationFrame(() => {
			setTransitioning(true)

			timeout = window.setTimeout(() => {
				setTransitioning(false)
			}, speed)
		})

		// eslint-disable-next-line consistent-return
		return () => {
			if (frame) {
				window.cancelAnimationFrame(frame)
			}

			if (timeout) {
				window.clearTimeout(timeout)
			}
		}
	}, [value])

	useEffect(() => {
		if (valueRef && valueRef.current) {
			const { current: element } = valueRef

			const { height } = element.getBoundingClientRect()
			const rollupMemberLocation = dictionary.findIndex(v => v === value)

			setShift(rollupMemberLocation * height)
			setHeight(height)
		}
	}, [value])

	useEffect(() => {
		// We store the visible value in a ref to prevent flickering from
		// toggling `opacity` between 0 and 1.
		// This ensures we're always rendering the "previous" value of each
		// at the beginning of the animation.
		visibleValue.current = value
	}, [value])

	useEffect(() => {
		if (valueRef && valueRef.current) {
			widthRef(valueRef.current)
		}
	})

	return (
		<div style={containerStyle}>
			<div
				style={{
					...rollupStyle,
					transform: `translate(0px, -${shift}px)`,
				}}
			>
				{dictionary.map(glyph => (
					<div key={glyph}>{glyph}</div>
				))}
			</div>
			<div ref={valueRef} style={valueStyle}>
				{visibleValue.current}
			</div>
		</div>
	)
}

export default Rollup
