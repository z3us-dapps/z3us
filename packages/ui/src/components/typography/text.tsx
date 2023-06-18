import clsx from 'clsx'
import type { ElementType, ReactNode } from 'react'
import React from 'react'

import { Box } from '../box'
import type { Sprinkles } from '../system/sprinkles.css'
import { sprinkles } from '../system/sprinkles.css'
import * as styles from './typography.css'

const colorMap = {
	white: 'white',
	black: 'white',
	neutral: 'colorNeutral',
	strong: 'colorStrong',
	red: { lightMode: 'red500', darkMode: 'red500' },
	green: { lightMode: 'green500', darkMode: 'green400' },
	// TODO: add variants
	// link: { lightMode: 'bleached_silk900', darkMode: 'bleached_silk100' },
	// secondary: { lightMode: 'bleached_silk900', darkMode: 'bleached_silk100' },
	// highlight: { lightMode: 'bleached_silk900', darkMode: 'purple500' },
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
	underline?: 'always' | 'hover' | 'never'
	inheritColor?: boolean
	lineClamp?: number
}

export interface TextProps extends TextStyleProps {
	component?: ElementType
	children: ReactNode
}

const defaultProps = {
	component: 'span',
	size: 'medium',
	color: 'neutral',
	weight: 'regular',
	align: 'left',
	baseline: false,
	display: 'block',
	type: 'body',
	className: undefined,
	capitalizeFirstLetter: false,
	capitalize: false,
	truncate: false,
	underline: 'never',
	inheritColor: false,
	lineClamp: undefined,
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
	underline,
	inheritColor,
	lineClamp,
}: TextStyleProps) =>
	clsx(
		styles.baseTextSprinkles,
		styles.font[type],
		baseline ? styles.text[size].trimmed : styles.text[size].untrimmed,
		styles.weight[weight],
		capitalizeFirstLetter && styles.capitalizeFirstLetter,
		capitalize && styles.capitalize,
		truncate && styles.truncateText,
		lineClamp && styles.lineClamp,
		underline === 'hover' ? styles.underlineOnHover : undefined,
		underline === 'always' ? styles.underlineText : undefined,
		sprinkles({
			...(colorMap[color] && !inheritColor
				? {
						color: colorMap[color],
				  }
				: {}),
			textAlign: align,
		}),
		className,
	)

const Text = ({
	component,
	size,
	color,
	weight,
	align,
	baseline,
	type,
	display,
	children,
	className,
	capitalizeFirstLetter,
	capitalize,
	underline,
	truncate,
	inheritColor,
	lineClamp,
}: TextProps) => (
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
			underline,
			inheritColor,
			lineClamp,
		})}
		style={{ ...(lineClamp ? { WebkitLineClamp: lineClamp } : {}) }}
	>
		{children}
	</Box>
)

export default Text

Text.defaultProps = defaultProps
