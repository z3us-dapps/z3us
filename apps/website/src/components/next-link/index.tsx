import NLink from 'next/link'
import React, { forwardRef } from 'react'

import LinkComponent, { type LProps } from 'ui/src/components/typography/link'

interface ILinkProps extends LProps {
	to?: string
	onClick?: () => void
	onMouseOver?: () => void
	onMouseLeave?: () => void
}

export const NextLink = forwardRef<HTMLAnchorElement, ILinkProps>((props, ref: React.Ref<HTMLAnchorElement | null>) => {
	const { to } = props

	return <LinkComponent ref={ref} href={to} linkFrameWorkComp={NLink} {...props} />
})
