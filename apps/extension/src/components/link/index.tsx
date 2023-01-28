import React from 'react'
import LinkComponent, { LProps } from 'ui/src/components-v2/typography/link'
import { Link as LinkRouter } from 'react-router-dom'

interface IProps extends LProps {
	to?: string
}

const defaultProps = {
	to: undefined,
}

export const Link: React.FC<IProps> = props => {
	const { to } = props
	return <LinkComponent href={to} LinkFrameWorkComp={LinkRouter} {...props} />
}

Link.defaultProps = defaultProps
