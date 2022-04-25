/* eslint-disable */
import { styled, VariantProps } from '../../theme'

export const StyledAlertCard = styled('div', {
	m: 0,
	p: 0,
	py: '$3',
	br: '$2',
	pl: '$2',
	pr: '$1',
	display: 'flex',
	alignItems: 'center',
	position: 'relative',
	boxShadow: '$shadowPanel',
	'&:after': {
		content: '',
		position: 'absolute',
		top: '0',
		left: '0',
		bottom: '0',
		width: '5px',
		pe: 'none',
		borderTopLeftRadius: '20px',
		borderBottomLeftRadius: '20px',
	},

	svg: { flexShrink: 0 },
	variants: {
		color: {
			success: {
				color: '$txtDefault',
				background:
					'linear-gradient(90deg, rgb(136 235 116 / 20%) 0%, rgb(136 235 116 / 0%) 80%, rgb(136 235 116 / 0%) 100%)',
				svg: {
					color: '#13cd19',
				},
				'&:after': {
					backgroundColor: '#13cd19',
				},
			},
			error: {
				color: '$txtDefault',
				background:
					'linear-gradient(90deg, rgb(235 116 116 / 20%) 0%, rgb(235 116 116 / 0%) 80%, rgb(235 116 116 / 0%) 100%)',
				svg: {
					color: '#b01f0c',
				},
				'&:after': {
					backgroundColor: '#b01f0c',
				},
			},
			warning: {
				color: '$txtDefault',
				background:
					'linear-gradient(90deg, rgb(235 196 116 / 20%) 0%, rgb(201 108 72 / 0%) 80%, rgb(233 159 68 / 0%) 100%)',
				svg: {
					color: '#e79154',
				},
				'&:after': {
					backgroundColor: '#e79154',
				},
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
		color: 'default',
		shadow: true,
	},
})

export type AlertCardVariantsProps = VariantProps<typeof StyledAlertCard>
