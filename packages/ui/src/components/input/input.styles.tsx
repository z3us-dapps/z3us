import { VariantProps, styled } from '../../theme'

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
	outline: 'none',
	size: '100%',
	width: '100%',
	fontFamily: 'inherit',
	minWidth: 0,
	boxSizing: 'border-box',
	WebkitAppearance: 'none',
	transition: '$default',
	'&[type="number"]::-webkit-inner-spin-button': {
		'-webkit-appearance': 'none',
		margin: '0',
	},
	'&[type="number"]::-webkit-outer-spin-button': {
		'-webkit-appearance': 'none',
		margin: '0',
	},
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
		cursor: 'not-allowed',
	},
	'+ span': {
		transition: '$default',
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
				height: '$9',
			},
			'2': {
				height: '$12',
			},
		},
		theme: {
			border: {
				bg: '$bgInput',
				border: '1px solid $borderInput',
				color: '$txtDefault',
				'&:hover': {
					border: '1px solid $borderInputHover',
					boxShadow: '$inputHover',
				},
				'&:focus': {
					border: '1px solid $borderInputFocus',
					boxShadow: '$inputFocus',
				},
				'+ span': {
					opacity: '0.5',
				},
			},
			minimal: {
				bg: 'transparent',
				border: '0px solid',
				color: '$txtDefault',
				p: '0',
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
				color: '$txtError',
				'&::placeholder': {
					color: '$txtError',
				},
				'+ span': {
					opacity: '0',
					transform: 'translate(15px)',
				},
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
			size: '1',
			theme: 'border',
			css: {
				borderRadius: '$2',
				px: '10px',
				fontSize: '13px',
				lineHeight: '13px',
				fontWeight: '400',
				'+ span': {
					fontSize: '13px',
					lineHeight: '13px',
					fontWeight: '400',
					top: '12px',
					left: '11px',
				},
			},
		},
		{
			size: '2',
			theme: 'border',
			css: {
				borderRadius: '$3',
				px: '16px',
				fontSize: '16px',
				lineHeight: '19px',
				fontWeight: '400',
				'+ span': {
					fontSize: '16px',
					lineHeight: '19px',
					fontWeight: '400',
					top: '15px',
					left: '17px',
				},
			},
		},
		{
			size: '2',
			theme: 'minimal',
			css: {
				borderRadius: '$3',
				fontSize: '22px',
				lineHeight: '22px',
				fontWeight: '400',
				'+ span': {
					fontSize: '22px',
					lineHeight: '22px',
					fontWeight: '400',
					top: '13px',
					left: '0px',
				},
			},
		},
		{
			size: '2',
			isTextarea: true,
			css: {
				'+ span': {
					top: '14px',
				},
			},
		},
		{
			theme: 'border',
			error: true,
			css: {
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
	],

	defaultVariants: {
		size: '1',
		theme: 'border',
	},
})

export type InputVariantsProps = VariantProps<typeof StyledInput>
