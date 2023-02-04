import React from 'react'
import { Button as ButtonComponent, IButtonProps } from 'ui/src/components-v2/button'
import { Link } from 'react-router-dom'

interface IProps extends IButtonProps {
	to?: string
}

const defaultProps = {
	to: undefined,
}

export const Button: React.FC<IProps> = props => {
	const { to } = props
	return to ? <ButtonComponent href={to} linkFrameWorkComp={Link} {...props} /> : <ButtonComponent {...props} />
}

Button.defaultProps = defaultProps
