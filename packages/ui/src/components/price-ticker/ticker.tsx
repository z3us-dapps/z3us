/* eslint-disable react/jsx-props-no-spreading */
import type { PropsWithoutRef, RefAttributes} from 'react';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'

import type { PropsWithCSS } from '../../types'
import { __DEV__ } from '../../utils/assertion'
import type { PriceTickerVariantsProps} from './price-ticker.styles';
import { StyledPriceWrapper } from './price-ticker.styles'
import Rollup from './rollup'
import { domExists, warnNonProduction } from './utils'

export interface Props {
	as?: keyof JSX.IntrinsicElements
	value: string
	direction?: 'up' | 'down'
	speed?: number
	dictionary?: string[]
	constantKeys?: string[]
	colors?: string[]
	refresh?: any
}

const defaultProps = {
	as: 'span' as keyof JSX.IntrinsicElements,
	speed: 500,
	constantKeys: ['-', '$', '.', '%'],
	direction: 'up',
	refresh: undefined,
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>

export type PriceTickerProps = React.PropsWithChildren<PropsWithCSS<Props & NativeAttrs & PriceTickerVariantsProps>>

const PriceTicker = React.forwardRef<HTMLDivElement, PriceTickerProps>(
	(props, ref: React.Ref<HTMLDivElement | null>) => {
		const {
			as,
			value: valueFromProps,
			direction,
			speed,
			constantKeys,
			dictionary,
			colors,
			refresh,
			css,
			...rest
		} = props
		const wrapperRef = useRef<HTMLDivElement>(null)
		useImperativeHandle(ref, () => wrapperRef.current)

		const initialRender = useRef(true)
		const [height, setHeight] = useState<number>(0)
		const rollups = useRef<HTMLDivElement[]>([])
		const [currentWidths, setCurrentWidths] = useState<number[]>([])
		const value = valueFromProps.split('')

		const characterDictionary = dictionary || '9876543210$-.,'.split('')
		const constants = constantKeys || ['-', '$']

		const transitionColors = colors || []

		// Sets the transition speed of animations to 0 if initially rendered value
		// hasn't been updated yet.
		const transitionSpeedZeroIfInitialRender = initialRender.current ? 0 : speed || 500

		const tickerStyle: React.CSSProperties = {
			display: 'flex',
			width: currentWidths.reduce((total, current) => total + current, 0),
			height,
			transition: `width ${transitionSpeedZeroIfInitialRender}ms ease-in-out`,
		}

		useEffect(() => {
			rollups.current = rollups.current.slice(0, value.length)
		}, [valueFromProps])

		useEffect(() => {
			if (!domExists()) {
				return
			}

			// Do this to force an update that reflects the widths of the
			// elements in the `rollups` ref collection.
			setCurrentWidths(
				rollups.current.map(element => {
					const { width } = element.getBoundingClientRect()

					return width
				}),
			)
		}, [valueFromProps, refresh])

		useEffect(() => {
			if (initialRender.current && currentWidths.length) {
				initialRender.current = false
			}
		}, [currentWidths])

		return (
			<StyledPriceWrapper ref={wrapperRef} as={as} css={{ ...(css as any) }} {...rest}>
				<div style={tickerStyle}>
					{value.map((character, i) => {
						if (!characterDictionary.includes(character)) {
							warnNonProduction(`[Stonk Ticker] '${character}' is not included in the character dictionary.`)
						}

						const constantIndex = constants.findIndex(constant => constant === character)
						const leftRespectiveKey = `${character}-${constantIndex}`
						const placeRespectiveKey = value.length - i - 1

						const key = constantIndex >= 0 ? leftRespectiveKey : placeRespectiveKey

						const reducedWidth = currentWidths.reduce((total, current, index) => {
							if (index > i - 1) {
								return total
							}

							return total + (current || 0)
						}, 0)

						const offsettedRollupStyle: React.CSSProperties = {
							position: 'absolute',
							transform: `translate(${reducedWidth}px, 0px)`,
							transition: `transform ${transitionSpeedZeroIfInitialRender}ms ease-in-out`,
						}

						const heightSetter = (_height: number) => {
							setHeight(prevHeight => Math.max(_height, prevHeight))
						}

						const widthRef = (r: HTMLDivElement) => {
							if (!r) {
								return
							}

							rollups.current[i] = r
						}

						return (
							<div key={key} style={offsettedRollupStyle}>
								<Rollup
									widthRef={widthRef}
									setHeight={heightSetter}
									direction={direction}
									value={character}
									speed={transitionSpeedZeroIfInitialRender}
									dictionary={characterDictionary}
									transitionColors={transitionColors}
								/>
							</div>
						)
					})}
				</div>
			</StyledPriceWrapper>
		)
	},
)

type PriceTickerComponent<T, P = {}> = React.ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>

if (__DEV__) {
	PriceTicker.displayName = 'z3usUI - price ticker'
}

PriceTicker.toString = () => '.z3us price ticker'

PriceTicker.defaultProps = defaultProps as Partial<PriceTickerProps>

export default PriceTicker as PriceTickerComponent<HTMLDivElement, PriceTickerProps>
