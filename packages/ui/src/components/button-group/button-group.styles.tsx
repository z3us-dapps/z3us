/* eslint-disable */
import { VariantProps, styled } from '../../theme'
import StyledButton from '../button/button.styles'

export const StyledButtonGroup = styled('div', {
	m: 0,
	p: 0,
	[`& ${StyledButton}`]: {
		'&:not(:first-child)': {
			btlr: 0, // top-left
			bblr: 0, // bottom-left
		},
		'&:not(:last-child)': {
			btrr: 0, // top-right
			bbrr: 0, // bottom-right
		},
	},
	variants: {
		bordered: {
			true: {
				borderStyle: 'solid',
				borderColor: '$border',
			},
			false: {
				bw: 0,
			},
		},
	},
	compoundVariants: [],
	defaultVariants: {
		bordered: false,
	},
})

export type ButtonGroupVariantsProps = VariantProps<typeof StyledButtonGroup>
