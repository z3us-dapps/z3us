import React, { forwardRef } from 'react'
import { type LinkProps, type NavLinkProps, Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom'

import { type LProps, LinkComponent } from 'ui/src/components/typography/link'

import type { TextProps } from '../typography/text'

interface ILinkProps extends LProps {
	to?: string
	onClick?: () => void
	onMouseOver?: () => void
	onMouseLeave?: () => void
}

export const Link = forwardRef<HTMLAnchorElement, ILinkProps>((props, ref: React.Ref<HTMLAnchorElement | null>) => {
	const { to } = props

	return <LinkComponent ref={ref} href={to} linkFrameWorkComp={RouterLink} {...props} />
})

export type TLinkProps = Omit<LinkProps, 'to'> & {
	href: LinkProps['to']
}

interface INavLinkProps extends Omit<LProps, 'children'>, Omit<NavLinkProps, 'color' | 'className'> {
	type?: TextProps['type']
}

export const NavLink = forwardRef<HTMLAnchorElement, INavLinkProps>(
	(props, ref: React.Ref<HTMLAnchorElement | null>) => {
		const { to } = props

		return <LinkComponent ref={ref} href={to} linkFrameWorkComp={RouterNavLink} {...props} />
	},
)
