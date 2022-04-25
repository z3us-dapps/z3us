import { styled } from '@stitches/react'
import * as TogglePrimitive from '@radix-ui/react-toggle'

const StyledToggle = styled(TogglePrimitive.Root, {
	position: 'relative',
	all: 'unset',
	color: 'grey',
	display: 'flex',
	//alignItems: 'center',
	//justifyContent: 'center',
	//boxShadow: `0 2px 10px grey`,
	border: '1px solid $borderPanel2',
	backgroundColor: '$bgPanel2',
	//'&:hover': { backgroundColor: 'grey' },
	transition: '$default',
	'&[data-state=on]': {
		backgroundColor: '$bgToggleActive',
	},
	'&:focus': { boxShadow: '$buttonFocusShadow' },
	'&:after': {
		left: '0',
		content: '',
		position: 'relative',
		width: '50%',
		height: '100%',
		backgroundColor: '$bgPanel',
		transition: 'left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), padding 0.3s ease, margin 0.3s ease',
		boxShadow: '0 0 0 1px rgb(0 0 0 / 10%), 0 2px 0 rgb(0 0 0 / 8%)',
	},
	variants: {
		size: {
			'1': {
				height: '15px',
				width: '30px',
				borderRadius: '20px',
				'&[data-state=on]': {
					'&:after': {
						left: '15px',
					},
				},
				'&:after': {
					borderRadius: '10px',
				},
			},
			'2': {
				height: '20px',
				width: '40px',
				borderRadius: '20px',
				'&[data-state=on]': {
					'&:after': {
						left: '20px',
					},
				},
				'&:after': {
					borderRadius: '10px',
				},
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
			},
		},
	},
	defaultVariants: {
		size: '1',
	},
})

// Exports
export const Toggle = StyledToggle
