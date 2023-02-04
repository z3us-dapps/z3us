import React, { ReactNode } from 'react'
import clsx from 'clsx'
import { sprinkles } from '../system/sprinkles.css'

import * as styles from './link.css'
import { TextProps, textStyles } from './text'

export interface LProps {
	href?: string
	linkFrameWorkComp?: any
	baseline?: boolean
	size?: 'medium' | 'small' | 'xsmall'
	underline?: 'always' | 'hover' | 'never'
	variant?: 'link' | 'button'
	weight?: TextProps['weight']
	color?: TextProps['color']
	type?: TextProps['type']
	inline?: boolean
	highlightOnFocus?: boolean
	className?: string
	children?: ReactNode
}

const defaultProps = {
	href: undefined,
	className: undefined,
	linkFrameWorkComp: undefined,
	size: 'medium',
	underline: 'always',
	variant: 'link',
	color: 'neutral',
	weight: 'regular',
	inline: false,
	highlightOnFocus: false,
	baseline: false,
	children: 'block',
	type: 'body',
}

const LinkComponent = (props: LProps) => {
	const {
		href,
		linkFrameWorkComp,
		baseline = false,
		size = 'medium',
		color = 'neutral',
		weight = 'regular',
		underline = 'hover',
		type = 'body',
		highlightOnFocus = true,
		inline = false,
		className,
		children,
		...restProps
	} = props

	const classNames = clsx(
		inline ? undefined : sprinkles({ display: 'block' }),
		underline === 'hover' ? styles.underlineOnHover : undefined,
		underline === 'never' ? styles.underlineNever : undefined,
		highlightOnFocus ? styles.highlightOnHover : undefined,
		textStyles({ size, type, color, weight, baseline }),
		className,
	)

	const Component = linkFrameWorkComp

	return (
		<Component href={href} {...restProps} className={classNames}>
			{children}
		</Component>
	)
}

export default LinkComponent

LinkComponent.defaultProps = defaultProps
