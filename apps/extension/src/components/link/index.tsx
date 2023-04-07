import React from 'react'
import { Link as LinkRouter } from 'react-router-dom'

import LinkComponent, { LProps } from 'ui/src/components-v2/typography/link'

interface IProps extends LProps {
	to?: string
	onClick?: () => void
	onMouseOver?: () => void
	onMouseLeave?: () => void
}

const defaultProps = {
	to: undefined,
	onClick: undefined,
	onMouseOver: undefined,
	onMouseLeave: undefined,
}

export const Link: React.FC<IProps> = props => {
	const { to } = props
	return <LinkComponent href={to} linkFrameWorkComp={LinkRouter} {...props} />
}

Link.defaultProps = defaultProps
