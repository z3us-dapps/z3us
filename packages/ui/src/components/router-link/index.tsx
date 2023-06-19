// @ts-nocheck
// TODO: fix ts
import React, { forwardRef } from 'react'
import { type LinkProps, Link as RouterLink } from 'react-router-dom'

import LinkComponent, { type LProps } from 'ui/src/components/typography/link'

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
