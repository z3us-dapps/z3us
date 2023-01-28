import React, { ReactNode } from 'react'
import clsx from 'clsx'
import { sprinkles } from '../system/sprinkles.css'

import * as styles from './link.css'
import { TextProps, TextStyles } from './text'

export interface LProps {
	href?: string
	LinkFrameWorkComp?: any
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

const LinkComponent = (props: LProps) => {
	const {
		href,
		LinkFrameWorkComp,
		baseline = false,
		size = 'medium',
		color = 'link',
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
		TextStyles({ size, type, color, weight, baseline }),
		className,
	)

	return (
		<LinkFrameWorkComp href={href} {...restProps} className={classNames}>
			{children}
		</LinkFrameWorkComp>
	)
}

export default LinkComponent
