import React, { forwardRef } from 'react'
import { Link } from 'react-router-dom'

import type { IButtonProps } from 'ui/src/components-v2/button';
import { Button as ButtonComponent } from 'ui/src/components-v2/button'

interface IProps extends IButtonProps {
	to?: string
	target?: string
	onMouseOver?: () => void
	onMouseLeave?: () => void
}

const defaultProps = {
	to: undefined,
	target: undefined,
	onMouseOver: undefined,
	onMouseLeave: undefined,
}

// TODO: move to helpers
export const isExternalHref = (href: string) => /(http(s?)):\/\//i.test(href)

export const Button = forwardRef<HTMLElement, IProps>((props, ref: React.Ref<HTMLButtonElement | null>) => {
	const { to } = props

	if (isExternalHref(to)) {
		return <ButtonComponent href={to} ref={ref} {...props} />
	}

	if (to) {
		return <ButtonComponent ref={ref} href={to} linkFrameWorkComp={Link} {...props} />
	}

	return <ButtonComponent ref={ref} {...props} />
})

Button.defaultProps = defaultProps
