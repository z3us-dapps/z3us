import { styled, sharedFocus, VariantProps } from '../../theme'

export const StyledButton = styled(
	'button',
	{
		dflex: 'center',
		appearance: 'none',
		boxSizing: ' border-box',
		fontWeight: '$medium',
		us: 'none',
		lineHeight: '$sm',
		textTransform: 'capitalize',
		ta: 'center',
		whiteSpace: 'nowrap',
		transition: '$default',
		position: 'relative',
		overflow: 'hidden',
		border: 'none',
		cursor: 'pointer',
		pe: 'auto',
		p: 0,
		'&:hover': {
			opacity: 0.85,
		},
		'@motion': {
			transition: 'none',
		},
		variants: {
			bordered: {
				true: {
					bg: 'transparent',
					borderStyle: 'solid',
					color: '$text',
				},
			},
			ghost: {
				true: {
					'&:hover': {
						color: '$white',
					},
				},
			},
			color: {
				default: {
					bg: '$primary',
					color: '$white',
				},
				primary: {
					bg: '$primary',
					color: '$white',
				},
				secondary: {
					bg: '$secondary',
					color: '$white',
				},
				success: {
					bg: '$success',
					color: '$white',
				},
				warning: {
					bg: '$warning',
					color: '$white',
				},
				error: {
					bg: '$error',
					color: '$white',
				},
				gradient: {
					bg: '$gradient',
					color: '$white',
				},
			},
			size: {
				xs: {
					$$buttonPadding: '$space$3',
					px: '$3',
					height: '$10',
					lh: '$space$10',
					width: 'auto',
					minWidth: '$20',
					fontSize: '$tiny',
					br: '$xs',
				},
				sm: {
					$$buttonPadding: '$space$5',
					px: '$5',
					height: '$12',
					lh: '$space$14',
					width: 'auto',
					minWidth: '$36',
					fontSize: '$xs',
					br: '$sm',
				},
				md: {
					$$buttonPadding: '$space$7',
					px: '$7',
					height: '$14',
					lh: '$space$14',
					width: 'auto',
					minWidth: '$48',
					fontSize: '$xs',
					br: '$md',
				},
				lg: {
					$$buttonPadding: '$space$9',
					px: '$9',
					height: '$15',
					lh: '$space$15',
					width: 'auto',
					minWidth: '$60',
					fontSize: '$base',
					br: '$base',
				},
				xl: {
					$$buttonPadding: '$space$10',
					px: '$10',
					height: '$17',
					lh: '$space$17',
					width: 'auto',
					minWidth: '$72',
					fontSize: '$sm',
					br: '$xl',
				},
			},
			borderWeight: {
				light: {
					bw: '$light',
				},
				normal: {
					bw: '$normal',
				},
				bold: {
					bw: '$bold',
				},
				extrabold: {
					bw: '$extrabold',
				},
				black: {
					bw: '$black',
				},
			},
			rounded: {
				true: {
					br: '$pill',
				},
			},
			flat: {
				true: {
					color: '$text',
				},
			},
			light: {
				true: {
					bg: 'transparent',
				},
			},
			shadow: {
				true: {
					bs: '$sm',
				},
			},
			disabled: {
				true: {
					bg: '$accents2',
					color: '$accents4',
					cursor: 'not-allowed',
					pe: 'auto',
					'&:hover': {
						opacity: 1,
					},
				},
			},
			clickable: {
				false: {
					cursor: 'default',
					pe: 'none',
				},
			},
			animated: {
				true: {
					'&:active': {
						transform: 'scale(0.97)',
					},
				},
				false: {
					transition: 'none',
				},
			},
			auto: {
				true: {
					width: 'auto',
					minWidth: 'min-content',
				},
			},
		},
		defaultVariants: {
			color: 'default',
			borderWeight: 'normal',
			animated: true,
			size: 'md',
		},
	},
	sharedFocus,
)

export type ButtonVariantsProps = VariantProps<typeof StyledButton>

export default StyledButton
