import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

import './text.css'

const cvaVariants = {
	size: {
		tiny: ['z3-c-text--tiny'],
		xs: ['z3-c-text--xs'],
		sm: ['z3-c-text--sm'],
		base: ['z3-c-text--base'],
		lg: ['z3-c-text--lg'],
		xl: ['z3-c-text--xl'],
		xl2: ['z3-c-text--xl2'],
		xl3: ['z3-c-text--xl3'],
		xl4: ['z3-c-text--xl4'],
		xl5: ['z3-c-text--xl5'],
		xl6: ['z3-c-text--xl6'],
		xl7: ['z3-c-text--xl7'],
	},
	block: {
		true: ['z3-c-text--block'],
		false: [''],
	},
	bold: {
		true: ['z3-c-text--bold'],
		false: [''],
	},
	medium: {
		true: ['z3-c-text--medium'],
		false: [''],
	},
	defaultLineHeight: {
		true: ['z3-c-text--line-height'],
		false: [''],
	},
	defaultLetterSpacing: {
		true: ['z3-c-text--letter-spacing'],
		false: [''],
	},
}

const cvaDefaults = {
	size: 'base',
	block: false,
	medium: false,
	bold: false,
	defaultLineHeight: true,
	defaultLetterSpacing: true,
}

export const cvaText = cva('z3-c-text', {
	variants: {
		...cvaVariants,
	},
	defaultVariants: {
		...(cvaDefaults as any),
	},
})

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof cvaText> {}

export const Paragraph: React.FC<TextProps> = ({
	className,
	size,
	block,
	bold,
	medium,
	defaultLineHeight,
	defaultLetterSpacing,
	...props
}) => (
	<p
		className={cvaText({ className, size, block, bold, medium, defaultLineHeight, defaultLetterSpacing })}
		{...props}
	/>
)

export const Text: React.FC<TextProps> = ({
	className,
	size,
	block,
	bold,
	medium,
	defaultLineHeight,
	defaultLetterSpacing,
	...props
}) => (
	<span
		className={cvaText({ className, size, block, bold, medium, defaultLineHeight, defaultLetterSpacing })}
		{...props}
	/>
)
