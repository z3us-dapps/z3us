// TODO: move this to /packages/ui, and add correct default props for optional props
import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { useDebounce } from 'usehooks-ts'
import { PropsWithCSS } from 'ui/src/types'
import Input, { IProps as InputProps } from 'ui/src/components/input'

export type FormElement = HTMLInputElement | HTMLTextAreaElement

interface ImmerProps {
	value: string
}

interface IProps {
	value?: string
	debounce?: number
	onDebounceChange: (value: string) => Promise<void>
}

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof InputProps>

export type InputDebouncedProps = IProps & NativeAttrs & InputProps

export const InputDebounced = React.forwardRef<FormElement, PropsWithCSS<InputDebouncedProps>>(
	(props, ref: React.Ref<FormElement | null>) => {
		const { value, debounce, onDebounceChange, ...rest } = props

		const [state, setState] = useImmer<ImmerProps>({
			value,
		})

		const debouncedValue = useDebounce<string>(state.value, debounce)

		const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			setState(draft => {
				draft.value = event.target.value
			})
		}

		useEffect(() => {
			onDebounceChange(state.value)
		}, [debouncedValue])

		return <Input ref={ref} value={state.value} onChange={handleOnChange} {...rest} />
	},
)
