import clsx from 'clsx'
import React, { ElementType, ReactNode } from 'react'

import { Box } from '../box'
import { Sprinkles, sprinkles } from '../system/sprinkles.css'
import * as styles from './typography.css'

const colorMap = {
	white: 'white',
	black: 'white',
	neutral: 'colorNeutral',
	strong: 'colorStrong',
	red: { lightMode: 'red500', darkMode: 'red500' },
	green: { lightMode: 'green400', darkMode: 'green500' },
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
	firstLetterUppercase?: boolean
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
	firstLetterUppercase: undefined,
}

export const textStyles = ({
	size,
	color,
	weight,
	type,
	align,
	baseline,
	className,
	firstLetterUppercase,
}: TextStyleProps) =>
	clsx(
		styles.baseTextSprinkles,
		styles.font[type],
		baseline ? styles.text[size].trimmed : styles.text[size].untrimmed,
		styles.weight[weight],
		firstLetterUppercase && styles.firstLetterUppercase,
		sprinkles({
			...(colorMap[color]
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
	firstLetterUppercase,
}: TextProps) => (
	<Box
		component={component}
		display={display}
		className={textStyles({ size, color, weight, type, align, baseline, className, firstLetterUppercase })}
	>
		{children}
	</Box>
)

export default Text

Text.defaultProps = defaultProps
