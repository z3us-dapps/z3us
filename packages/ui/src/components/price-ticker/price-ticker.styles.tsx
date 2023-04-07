import { VariantProps, styled } from '../../theme'

export const StyledPriceWrapper = styled('div', {
	m: 0,
	p: 0,
	variants: {
		color: {
			green: {
				color: '$txtPriceGreen',
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
	},
	defaultVariants: {
		shadow: false,
	},
})

export type PriceTickerVariantsProps = VariantProps<typeof StyledPriceWrapper>
