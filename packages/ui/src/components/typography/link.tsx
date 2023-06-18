import clsx from 'clsx'
import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'

import { sprinkles } from '../system/sprinkles.css'
import * as styles from './link.css'
import type { TextProps } from './text'
import { textStyles } from './text'

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
	display?: 'block' | 'flex' | 'inline-flex'
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
	display: 'inline-flex',
	highlightOnFocus: false,
	baseline: false,
	children: 'block',
	type: 'body',
}

export const LinkComponent = forwardRef<HTMLAnchorElement, LProps>(
	(props, ref: React.Ref<HTMLAnchorElement | null>) => {
		const {
			href,
			linkFrameWorkComp,
			baseline = false,
			size = 'medium',
			color = 'neutral',
			weight = 'regular',
			underline,
			type,
			highlightOnFocus = true,
			display,
			className,
			children,
			...restProps
		} = props

		const classNames = clsx(
			sprinkles({ display }),
			styles.defaultLink,
			underline === 'hover' ? styles.underlineOnHover : undefined,
			underline === 'never' ? styles.underlineNever : undefined,
			highlightOnFocus ? styles.highlightOnHover : undefined,
			textStyles({ size, type, color, weight, baseline }),
			className,
		)

		const Component = linkFrameWorkComp

		return (
			<Component ref={ref} href={href} className={classNames} {...restProps}>
				{children}
			</Component>
		)
	},
)

const LinkComponentOld = (props: LProps) => {
	const {
		href,
		linkFrameWorkComp,
		baseline = false,
		size = 'medium',
		color = 'neutral',
		weight = 'regular',
		underline,
		type,
		highlightOnFocus = true,
		display,
		className,
		children,
		...restProps
	} = props

	const classNames = clsx(
		sprinkles({ display }),
		styles.defaultLink,
		underline === 'hover' ? styles.underlineOnHover : undefined,
		underline === 'never' ? styles.underlineNever : undefined,
		highlightOnFocus ? styles.highlightOnHover : undefined,
		textStyles({ size, type, color, weight, baseline }),
		className,
	)

	const Component = linkFrameWorkComp

	return (
		<Component href={href} className={classNames} {...restProps}>
			{children}
		</Component>
	)
}

export default LinkComponent

LinkComponentOld.defaultProps = defaultProps
