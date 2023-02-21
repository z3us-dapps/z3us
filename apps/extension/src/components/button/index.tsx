import React, { forwardRef } from 'react'
import { Button as ButtonComponent, IButtonProps } from 'ui/src/components-v2/button'
import { Link } from 'react-router-dom'

interface IProps extends IButtonProps {
	to?: string
}

const defaultProps = {
	to: undefined,
}

export const Button = forwardRef<HTMLElement, IProps>((props, ref: React.Ref<HTMLButtonElement | null>) => {
	const { to } = props
	return to ? (
		<ButtonComponent ref={ref} href={to} linkFrameWorkComp={Link} {...props} />
	) : (
		<ButtonComponent ref={ref} {...props} />
	)
})

Button.defaultProps = defaultProps
