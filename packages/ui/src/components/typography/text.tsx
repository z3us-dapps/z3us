import clsx from 'clsx'
import type { ElementType, ReactNode } from 'react'
import type { ForwardedRef } from 'react'
import React, { forwardRef } from 'react'

import { Box } from '../box'
import type { Sprinkles } from '../system/sprinkles.css'
import { sprinkles } from '../system/sprinkles.css'
import * as styles from './typography.css'

const colorMap = {
	inherit: 'inherit',
	white: 'white',
	black: 'white',
	neutral: 'colorNeutral',
	strong: 'colorStrong',
	red: { lightMode: 'red500', darkMode: 'red500' },
	green: { lightMode: 'green500', darkMode: 'green400' },
} as const

interface TextStyleProps {
	size?: keyof typeof styles.text
	color?: keyof typeof colorMap
	weight?: keyof typeof styles.weight
	align?: Sprinkles['textAlign']
	baseline?: boolean
	display?: Sprinkles['display']
	type?: Exclude<keyof typeof styles.font, 'brand' | 'heading'>
	className?: string
	capitalizeFirstLetter?: boolean
	capitalize?: boolean
	truncate?: boolean
	blur?: boolean
	underline?: 'always' | 'hover' | 'never'
	inheritColor?: boolean
	lineClamp?: number
}

export interface TextProps extends TextStyleProps {
	component?: ElementType
	children: ReactNode
}

export const textStyles = ({
	size,
	color,
	weight,
	type,
	align,
	baseline,
	className,
	capitalizeFirstLetter,
	capitalize,
	truncate,
	blur,
	underline,
	inheritColor,
	lineClamp,
}: TextStyleProps) =>
	clsx(
		styles.baseTextSprinkles,
		type && styles.font[type],
		baseline && size ? styles.text[size].trimmed : size && styles.text[size].untrimmed,
		weight && styles.weight[weight],
		capitalizeFirstLetter && styles.capitalizeFirstLetter,
		capitalize && styles.capitalize,
		truncate && styles.truncateText,
		blur && styles.blurText,
		lineClamp && styles.lineClamp,
		underline === 'hover' ? styles.underlineOnHover : undefined,
		underline === 'always' ? styles.underlineText : undefined,
		sprinkles({
			...(color && colorMap[color] && !inheritColor
				? {
						color: colorMap[color],
				  }
				: {}),
			textAlign: align,
		}),
		className,
	)

const Text = forwardRef<HTMLElement, TextProps>((props, ref: ForwardedRef<any>) => {
	const {
		component = 'span',
		size = 'medium',
		color = 'neutral',
		weight = 'regular',
		align = 'left',
		baseline,
		type = 'body',
		display,
		children,
		className,
		capitalizeFirstLetter,
		capitalize,
		underline = 'never',
		truncate,
		blur,
		inheritColor,
		lineClamp,
	} = props

	return (
		<Box
			component={component}
			display={display}
			className={textStyles({
				size,
				color,
				weight,
				type,
				align,
				baseline,
				className,
				capitalizeFirstLetter,
				capitalize,
				truncate,
				blur,
				underline,
				inheritColor,
				lineClamp,
			})}
			style={{ ...(lineClamp ? { WebkitLineClamp: lineClamp } : {}) }}
			ref={ref}
		>
			{children}
		</Box>
	)
})

export default Text
