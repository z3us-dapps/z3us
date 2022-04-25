/* eslint-disable react/jsx-props-no-spreading, react/no-array-index-key */
import React, {
	Children,
	useEffect,
	useState,
	useRef,
	MouseEvent,
	useImperativeHandle,
	PropsWithoutRef,
	RefAttributes,
} from 'react'
import { CSS } from '../../theme'
import { NormalColors, NormalSizes } from '../../utils/prop-types'
import withDefaults from '../../utils/with-defaults'
import { __DEV__ } from '../../utils/assertion'
import StyledButton, { ButtonVariantsProps, StyledLoader, StyledRipple, StyledTextWrapper } from './button.styles'

export interface IProps {
	color?: NormalColors
	size?: NormalSizes
	clickable?: boolean
	disabled?: boolean
	loading?: boolean
	iconOnly?: boolean
	circle?: boolean
	fullWidth?: boolean
	icon?: React.ReactNode
	iconRight?: React.ReactNode
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	as?: keyof JSX.IntrinsicElements
	className?: string
	href?: string
	target?: string
}

const defaultProps = {
	clickable: true,
	disabled: false,
	loading: false,
	iconOnly: false,
	circle: false,
	fullWidth: false,
}

type NativeAttrs = Omit<React.ButtonHTMLAttributes<unknown>, keyof IProps>

export type ButtonProps = IProps & NativeAttrs & ButtonVariantsProps & { css?: CSS }

const Button = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<ButtonProps>>(
	(
		{
			children,
			size,
			color,
			disabled,
			loading,
			iconOnly,
			circle,
			fullWidth,
			onClick,
			href,
			target,
			clickable,
			css,
			...rest
		},
		ref: React.Ref<HTMLButtonElement | null>,
	) => {
		const [buttonWidth, setButtonWidth] = useState(0)
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
				href={href}
				target={target}
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
					...(css as any),
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
