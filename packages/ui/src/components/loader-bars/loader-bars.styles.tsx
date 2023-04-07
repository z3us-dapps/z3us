import { VariantProps, keyframes, styled } from '../../theme'

const barAnimation = keyframes({
	'0%': { opacity: '1.0' },
	'50%': { opacity: '0.5' },
	'100%': { opacity: '1.0' },
})

export const StyledLoaderBars = styled('div', {
	m: 0,
	p: 0,
	position: 'relative',
	display: 'inline-flex',
	'> div': {
		width: '100%',
		height: '100%',
		position: 'relative',
		transform: 'translateZ(0) scale(1)',
		transformOrigin: '0 0',
		backfaceVisibility: 'hidden',
		span: {
			position: 'absolute',
			left: '0',
			height: '100%',
			animationDuration: '1000ms',
			animationName: `${barAnimation}`,
			animationIterationCount: 'infinite',
			'&:nth-child(1)': {
				'animation-delay': '-0.8s',
			},
			'&:nth-child(2)': {
				'animation-delay': '-0.6s',
			},
			'&:nth-child(3)': {
				'animation-delay': '-0.4s',
			},
			'&:nth-child(4)': {
				'animation-delay': '-0.2s',
			},
		},
	},
	variants: {
		color: {
			default: {
				span: {
					'&:nth-child(1)': {
						background: '$buttonBgPrimary',
						border: '1px solid $buttonBgPrimaryHover',
					},
					'&:nth-child(2)': {
						background: '$buttonBgPrimary',
						border: '1px solid $buttonBgPrimaryHover',
					},
					'&:nth-child(3)': {
						background: '$buttonBgPrimary',
						border: '1px solid $buttonBgPrimaryHover',
					},
					'&:nth-child(4)': {
						background: '$buttonBgPrimary',
						border: '1px solid $buttonBgPrimaryHover',
					},
				},
			},
		},
		size: {
			1: {
				width: '36px',
				height: '20px',
				span: {
					width: '5px',
					'&:nth-child(1)': {
						transform: 'translate(0px,0)',
					},
					'&:nth-child(2)': {
						transform: 'translate(9px,0)',
					},
					'&:nth-child(3)': {
						transform: 'translate(18px,0)',
					},
					'&:nth-child(4)': {
						transform: 'translate(27px,0)',
					},
				},
			},
			2: {
				width: '52px',
				height: '30px',
				span: {
					width: '8px',
					'&:nth-child(1)': {
						transform: 'translate(0px,0)',
					},
					'&:nth-child(2)': {
						transform: 'translate(15px,0)',
					},
					'&:nth-child(3)': {
						transform: 'translate(30px,0)',
					},
					'&:nth-child(4)': {
						transform: 'translate(45px,0)',
					},
				},
			},
			3: {
				width: '140px',
				height: '80px',
				span: {
					width: '20px',
					'&:nth-child(1)': {
						transform: 'translate(0px,0)',
					},
					'&:nth-child(2)': {
						transform: 'translate(40px,0)',
					},
					'&:nth-child(3)': {
						transform: 'translate(80px,0)',
					},
					'&:nth-child(4)': {
						transform: 'translate(120px,0)',
					},
				},
			},
			4: {
				width: '140px',
				height: '80px',
				span: {
					width: '20px',
					'&:nth-child(1)': {
						transform: 'translate(0px,0)',
					},
					'&:nth-child(2)': {
						transform: 'translate(40px,0)',
					},
					'&:nth-child(3)': {
						transform: 'translate(80px,0)',
					},
					'&:nth-child(4)': {
						transform: 'translate(120px,0)',
					},
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
	},
	defaultVariants: {
		color: 'default',
	},
})

export type LoaderBarsVariantsProps = VariantProps<typeof StyledLoaderBars>
