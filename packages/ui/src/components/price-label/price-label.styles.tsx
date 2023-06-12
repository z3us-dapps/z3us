import type { VariantProps} from '../../theme';
import { styled } from '../../theme'

export const StyledPriceLabel = styled('div', {
	m: 0,
	p: 0,
	position: 'relative',
	borderRadius: '5px',
	display: 'inline-flex',
	padding: ' 1px 4px',
	svg: { flexShrink: 0 },
	variants: {
		color: {
			green: {
				color: '$txtPriceGreen',
				background: '$bgPriceGreen',
				border: '1px solid',
				borderColor: '$borderPriceGreen',
			},
			red: {
				color: '$txtPriceRed',
				background: '$bgPriceRed',
				border: '1px solid',
				borderColor: '$borderPriceRed',
			},
			greenContrast: {
				color: 'rgb(80 216 98)',
				background: 'rgb(5 52 7)',
				border: '1px solid rgb(38 160 38 / 64%)',
			},
			redContrast: {
				color: 'rgb(255 136 136 / 88%)',
				background: 'rgb(70 8 8 / 69%)',
				border: '1px solid rgb(107 13 13 / 64%)',
			},
			warning: {
				color: '#e79154',
				background: 'rgb(0 0 0 / 59%)',
				border: '#e79154',
			},
		},
		shadow: {
			true: {
				boxShadow: '$shadowPanel2',
			},
		},
		bordered: {
			true: {
				borderStyle: 'solid',
				borderColor: '$border',
			},
			false: {
				bw: 0,
			},
		},
		animated: {
			true: {
				transition: '$default',
			},
			false: {
				transition: 'none',
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
		hoverable: {
			true: {
				'&:hover': {
					transform: 'translateY(-2px)',
					boxShadow: '$lg',
				},
			},
		},
	},
	compoundVariants: [
		// color default && shadow && !isDark
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
		color: 'green',
		shadow: false,
	},
})

export type PriceLabelVariantsProps = VariantProps<typeof StyledPriceLabel>
