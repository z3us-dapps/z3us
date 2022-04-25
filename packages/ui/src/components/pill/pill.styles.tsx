/* eslint-disable */
import { styled, VariantProps } from '../../theme'

export const StyledPill = styled('div', {
	m: 0,
	p: 0,
	pt: '1px',
	px: '$3',
	br: '30px',
	display: 'flex',
	alignItems: 'center',
	position: 'relative',
	textTransform: 'uppercase',
	fontWeight: 'bold',
	fontSize: '$1',
	lineHeight: '$1',
	height: '20px',
	variants: {
		color: {
			default: {
				color: '$txtDefault',
				background: '$bgPanel2',
			},
			inverse: {
				color: '$buttonTextInverse',
				fill: '$buttonTextInverse',
				bg: '$buttonBgInverse',
			},
			gradientGreen: {
				color: '$white',
				background: 'linear-gradient(132deg, rgba(118,74,247,1) 0%, rgba(89,187,189,1) 100%)',
			},
			gradientOrange: {
				color: '$white',
				background: 'linear-gradient(132deg, rgba(118,74,247,1) 0%, rgba(189,118,89,1) 100%)',
			},
			success: {},
		},
		shadow: {
			true: {
				boxShadow: '$shadowPanel2',
			},
		},
		clickable: {
			true: {
				cursor: 'pointer',
				us: 'none',
				WebkitTapHighlightColor: 'transparent',
				'&:focus:not(&:focus-visible)': {
					boxShadow: 'none',
				},
				'&:focus': {
					outline: 'none',
					boxShadow: '0 0 0 2px $colors$background, 0 0 0 4px $colors$primary',
				},
				'@safari': {
					WebkitTapHighlightColor: 'transparent',
					outline: 'none',
				},
			},
		},
	},
	compoundVariants: [
		{
			color: 'default',
			shadow: true,
			css: {
				$$cardColor: '$colors$background',
				bg: '$$cardColor',
			},
		},
	],
	defaultVariants: {
		color: 'default',
	},
})

export type PillVariantsProps = VariantProps<typeof StyledPill>
