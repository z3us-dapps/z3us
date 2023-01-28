import React, { ElementType, ReactNode } from 'react'
import clsx from 'clsx'
import { sprinkles, Sprinkles } from '../system/sprinkles.css'
import { Box, BoxProps } from '../box'
import * as styles from './typography.css'

const colorMap = {
	neutral: { lightMode: 'bleached_silk900', darkMode: 'bleached_silk100' },
	strong: { lightMode: 'bleached_silk900', darkMode: 'bleached_silk100' },
	code: { lightMode: 'bleached_silk900', darkMode: 'bleached_silk100' },
	link: { lightMode: 'bleached_silk900', darkMode: 'bleached_silk100' },
	secondary: { lightMode: 'bleached_silk900', darkMode: 'bleached_silk100' },
	highlight: { lightMode: 'bleached_silk900', darkMode: 'bleached_silk100' },
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
}

export const TextStyles = ({
	size = 'medium',
	color = 'neutral',
	weight = 'regular',
	type = 'body',
	align,
	baseline = true,
	className,
}: TextStyleProps) =>
	clsx(
		styles.font[type],
		baseline ? styles.text[size].trimmed : styles.text[size].untrimmed,
		styles.weight[weight],
		sprinkles({ color: colorMap[color], textAlign: align }),
		className,
	)

const Text = ({
	component = 'span',
	size,
	color,
	weight,
	align,
	baseline = false,
	type,
	display,
	children,
	...rest
}: TextProps) => (
	<Box
		component={component}
		display={display}
		className={TextStyles({ size, color, weight, type, align, baseline })}
		{...rest}
	>
		{children}
	</Box>
)

export default Text

Text.defaultProps = defaultProps
