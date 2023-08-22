import React, { forwardRef, useState } from 'react'

import type { IInputOptionalProps } from '../input'
import { Input } from '../input'

function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max)
}

type Formatter = (value: string | '') => string
type Parser = (value: string | '') => string

interface INumberInputProps extends Omit<IInputOptionalProps, 'onChange'> {
	value: number | string
	onChange?: (value: number) => void

	/** Formats the number into the input */
	formatter?: Formatter

	/** Parses the value from formatter, should be used with formatter at the same time */
	parser?: Parser

	/** Amount of digits after the decimal point  */
	precision?: number

	/** Only works if a precision is given, removes the trailing zeros, false by default */
	removeTrailingZeros?: boolean

	/** The decimal separator */
	decimalSeparator?: string

	/** The thousands separator */
	thousandsSeparator?: string

	/** Prevent value clamp on blur */
	noClampOnBlur?: boolean

	/** Maximum possible value */
	max?: number

	/** Minimal possible value */
	min?: number
}

const DEFAULT_PARSER = num => {
	if (num === '-') {
		return num
	}

	let tempNum = num

	if (tempNum[0] === '.') {
		tempNum = `0${num}`
	}

	const parsedNum = parseFloat(tempNum)

	if (Number.isNaN(parsedNum)) {
		return ''
	}

	return num
}

export const NumberInput = forwardRef<HTMLInputElement, INumberInputProps>(
	(props, ref: React.Ref<HTMLInputElement | null>) => {
		const {
			value,
			onChange = val => val,
			formatter = val => val || '',
			parser = DEFAULT_PARSER,
			precision = 0,
			removeTrailingZeros = true,
			decimalSeparator = '.',
			thousandsSeparator = ',',
			noClampOnBlur = false,
			min = 0,
			max = Infinity,
			...rest
		} = props

		const parsePrecision = (val: number | string) => {
			if (val === '' || typeof val === 'string') return ''

			let result = val.toFixed(precision)

			if (removeTrailingZeros && precision > 0) {
				result = result.replace(new RegExp(`[0]{0,${precision}}$`), '')
				if (result.endsWith('.')) {
					result = result.slice(0, -1)
				}
			}

			return result
		}

		const formatNum = (val: string) => {
			let parsedStr = val
			if (decimalSeparator) {
				parsedStr = parsedStr.replace('.', decimalSeparator)
			}

			return formatter(parsedStr)
		}

		const parseNum = (val: string): string | '' => {
			let num = val

			if (decimalSeparator) {
				num = num.replaceAll(thousandsSeparator, '').replace(decimalSeparator, '.')
			}

			return parser(num)
		}

		const formatInternalValue = (val: string | number) => formatNum(parsePrecision(val))

		const [internalValue, setInternalValue] = useState<string | number>(typeof value === 'number' ? value : '')
		const [inputValue, setInputValue] = useState<string | number>(() => formatInternalValue(internalValue))

		const handleSetInternalValue = (val: number | string) => {
			if (val !== internalValue) {
				setInternalValue(val)
			}
		}

		const minNum = typeof min === 'number' ? min : -Infinity
		const maxNum = typeof max === 'number' ? max : Infinity

		const processInputValue = (newInputValue: string) => {
			let normalizedInputValue = newInputValue
			if (normalizedInputValue[0] === `${decimalSeparator}` || normalizedInputValue[0] === '.') {
				normalizedInputValue = `0${normalizedInputValue}`
			}

			const parsedValue = parseFloat(parsePrecision(parseFloat(parseNum(normalizedInputValue))))
			const clampedValue = !noClampOnBlur ? clamp(parsedValue, minNum, maxNum) : parsedValue
			const finalValue = Number.isNaN(clampedValue) ? '' : clampedValue
			const internalValueChanged = internalValue !== finalValue

			setInputValue(newInputValue)
			handleSetInternalValue(finalValue)

			if (internalValueChanged) {
				onChange?.(finalValue as number)
			}
		}

		const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const evt = event.nativeEvent as InputEvent
			if (evt.isComposing) {
				return
			}

			processInputValue(event.target.value)
		}

		return <Input {...rest} ref={ref} value={inputValue} onChange={handleOnChange} />
	},
)
