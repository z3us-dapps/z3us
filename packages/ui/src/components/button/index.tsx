/* eslint-disable react/jsx-props-no-spreading, react/no-array-index-key */
import React, {
	Children,
	MouseEvent,
	PropsWithoutRef,
	RefAttributes,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'

import { PropsWithCSS } from '../../types'
import { __DEV__ } from '../../utils/assertion'
import { NormalColors, NormalSizes } from '../../utils/prop-types'
import withDefaults from '../../utils/with-defaults'
import StyledButton, { ButtonVariantsProps, StyledLoader, StyledRipple, StyledTextWrapper } from './button.styles'

export interface IProps {
	color?: NormalColors
	size?: NormalSizes
	clickable?: boolean
	showRipple?: boolean
	disabled?: boolean
	loading?: boolean
	iconOnly?: boolean
	circle?: boolean
	fullWidth?: boolean
	active?: boolean
	icon?: React.ReactNode
	iconRight?: React.ReactNode
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	as?: keyof JSX.IntrinsicElements
	className?: string
	href?: string
	target?: string
	download?: string
}

const defaultProps = {
	clickable: true,
	showRipple: true,
	disabled: false,
	loading: false,
	iconOnly: false,
	circle: false,
	fullWidth: false,
	active: false,
}

type NativeAttrs = Omit<React.ButtonHTMLAttributes<unknown>, keyof IProps>

export type ButtonProps = PropsWithCSS<IProps & NativeAttrs & ButtonVariantsProps>

const Button = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<ButtonProps>>(
	(props, ref: React.Ref<HTMLButtonElement | null>) => {
		const {
			children,
			size,
			color,
			disabled,
			loading,
			iconOnly,
			circle,
			fullWidth,
			active,
			onClick,
			href,
			target,
			clickable,
			showRipple,
			css,
			...rest
		} = props
		const [buttonWidth, setButtonWidth] = useState<number>(0)
		const rippleRef = useRef<HTMLElement>(null)
		const buttonRef = useRef<HTMLButtonElement>(null)
		useImperativeHandle(ref, () => buttonRef.current)
		const childArray = Children.toArray(children)

		const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
			const btnBounds = event.currentTarget.getBoundingClientRect()
			const x = event.clientX - btnBounds.left
			const y = event.clientY - btnBounds.top
			if (!disabled) {
				rippleRef.current.style.left = `${x}px`
				rippleRef.current.style.top = `${y}px`
			}

			if (disabled) return

			if (onClick) {
				onClick(event)
			}
		}

		useEffect(() => {
			setButtonWidth((buttonRef.current?.offsetWidth || 0) * 1.1)
		}, [])

		return (
			<StyledButton
				ref={buttonRef}
				size={size}
				color={color}
				disabled={disabled}
				loading={loading}
				iconOnly={iconOnly}
				circle={circle}
				fullWidth={fullWidth}
				onClick={clickHandler}
				clickable={clickable}
				showRipple={showRipple}
				href={href}
				target={target}
				active={active}
				css={{
					...(buttonWidth
						? {
								'&:hover': {
									'&:before': {
										transform: `translateX(${buttonWidth}px) skewX(-15deg)`,
									},
									'&:after': {
										transform: `translateX(${buttonWidth}px) skewX(-15deg)`,
									},
								},
						  }
						: {}),
					...css,
				}}
				{...rest}
			>
				{Children.map(childArray, (child, index) => {
					const isStringChild = typeof child === 'string'
					const isTextWrapped = isStringChild && childArray.length > 1
					return isTextWrapped ? <StyledTextWrapper key={index}>{child}</StyledTextWrapper> : child
				})}
				<StyledLoader />
				<StyledRipple ref={rippleRef} />
			</StyledButton>
		)
	},
)

type ButtonComponent<T, P = unknown> = React.ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>

if (__DEV__) {
	Button.displayName = 'z3us ui - Button'
}

Button.toString = () => '.z3us-ui-button'

export default withDefaults(Button, defaultProps) as ButtonComponent<HTMLButtonElement, ButtonProps>
