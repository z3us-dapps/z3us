import clsx from 'clsx'
import React, { forwardRef } from 'react'

import { sprinkles } from '../system/sprinkles.css'
import * as styles from './link.css'
import type { TextProps } from './text'
import { textStyles } from './text'

export interface Path {
	/**
	 * A URL pathname, beginning with a /.
	 */
	pathname: string
	/**
	 * A URL search string, beginning with a ?.
	 */
	search: string
	/**
	 * A URL fragment identifier, beginning with a #.
	 */
	hash: string
}

export interface LProps {
	href?: string | Partial<Path>
	linkFrameWorkComp?: any
	baseline?: boolean
	underline?: 'always' | 'hover' | 'never'
	variant?: 'link' | 'button'
	size?: TextProps['size']
	weight?: TextProps['weight']
	color?: TextProps['color']
	type?: TextProps['type']
	display?: 'block' | 'flex' | 'inline-flex'
	target?: '_blank' | '_self'
	highlightOnFocus?: boolean
	className?: string | ((props: { isActive: boolean; isPending: boolean }) => string | undefined)
	children?: React.ReactNode | ((props: { isActive: boolean; isPending: boolean }) => React.ReactNode)
}

export const LinkComponent = forwardRef<HTMLAnchorElement, LProps>(
	(props, ref: React.Ref<HTMLAnchorElement | null>) => {
		const {
			href,
			linkFrameWorkComp = 'a',
			baseline = false,
			size = 'medium',
			color = 'neutralLink',
			weight = 'regular',
			underline = 'always',
			type = 'body',
			highlightOnFocus = true,
			display = 'inline-flex',
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

export default LinkComponent
