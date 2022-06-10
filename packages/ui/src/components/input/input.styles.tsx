import { styled, VariantProps } from '../../theme'

export const StyledInputWrapper = styled('div', {
	position: 'relative',
	display: 'flex',
})

export const StyledInputPlaceholder = styled('div', {
	position: 'relative',
})

export const StyledInput = styled('input', {
	padding: 0,
	margin: 0,
	bg: '$bgInput',
	border: '1px solid $borderInput',
	color: '$txtDefault',
	br: '3px',
	outline: 'none',
	size: '100%',
	width: '100%',
	fontFamily: 'inherit',
	minWidth: 0,
	boxSizing: 'border-box',
	WebkitAppearance: 'none',
	transition: '$default',
	'&::placeholder': {
		color: 'transparent',
	},
	'@motion': {
		transition: 'none',
		'&::placeholder': {
			transition: 'none',
		},
	},
	'&:disabled': {
		pe: 'none',
		color: '$accents4',
		cursor: 'not-allowed',
	},
	'&:hover': {
		border: '1px solid $borderInputHover',
		boxShadow: '$inputHover',
	},
	'&:focus': {
		border: '1px solid $borderInputFocus',
		boxShadow: '$inputFocus',
	},
	'+ span': {
		transition: '$default',
		opacity: '0.5',
		display: 'block',
		position: 'absolute',
		pe: 'none',
		transform: 'translate(0)',
	},
	'&:not(&:placeholder-shown)': {
		'+ span': {
			opacity: '0',
			transform: 'translate(15px)',
		},
	},
	variants: {
		size: {
			'1': {
				borderRadius: '$2',
				height: '$9',
				fontSize: '13px',
				lineHeight: '13px',
				fontWeight: 'l400',
				px: '10px',
				'+ span': {
					fontSize: '13px',
					lineHeight: '13px',
					fontWeight: '400',
					top: '12px',
					left: '11px',
				},
			},
			'2': {
				borderRadius: '$3',
				height: '$12',
				fontSize: '16px',
				lineHeight: '19px',
				fontWeight: '400',
				px: '16px',
				'+ span': {
					fontSize: '16px',
					lineHeight: '19px',
					fontWeight: '400',
					top: '15px',
					left: '17px',
				},
			},
		},
		isTextarea: {
			true: {
				boxShadow: 'none',
				display: 'block',
				resize: 'none',
				outline: 'none',
				height: '100%',
				// TODO: do a compound variant for both input sizes
				// TODO: fix the placeholder spacing issue
				pt: '$3',
			},
		},
		focused: {
			true: {
				'&::placeholder': {
					opacity: 0,
					transition: 'opacity 0.25s ease 0s',
				},
			},
		},
		error: {
			true: {
				border: '1px solid $borderInputError',
				color: '$txtError',
				'&::placeholder': {
					color: '$txtError',
				},
				'&:hover': {
					border: '1px solid $borderInputError',
					boxShadow: '$inputError',
				},
				'&:focus': {
					border: '1px solid $borderInputError',
					boxShadow: '$inputError',
				},
				'+ span': {
					opacity: '0',
					transform: 'translate(15px)',
				},
			},
		},
		bordered: {
			true: {
				padding: '0 $3',
			},
		},
		rounded: {
			true: {
				padding: '0 $3',
			},
		},
		animated: {
			false: {
				transition: 'none',
				'::placeholder': {
					transition: 'none',
				},
			},
		},
		hasLeftContent: {
			true: {
				ml: 0,
			},
		},
		hasRightContent: {
			true: {
				mr: 0,
			},
		},
		hasValue: {
			true: {
				'+ span': {
					opacity: '0',
					transform: 'translate(10px)',
				},
			},
		},
	},

	compoundVariants: [
		{
			size: '2',
			isTextarea: true,
			css: {
				'+ span': {
					top: '14px',
				},
			},
		},
	],

	defaultVariants: {
		size: '1',
	},
})

export type InputVariantsProps = VariantProps<typeof StyledInput>
