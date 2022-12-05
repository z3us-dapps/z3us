import { styled } from '../../theme'

export const StyledLink = styled('a', {
	boxSizing: 'border-box',
	textDecoration: 'none',
	color: 'inherit',
	cursor: 'pointer',
	p: '0',
	m: '0',
	outline: 'none',
	background: 'none',
	border: 'none',

	variants: {
		underline: {
			true: {
				textDecoration: 'underline',
			},
		},
		underlineOnHover: {
			true: {
				'&:hover': {
					textDecoration: 'underline',
				},
			},
		},
		bubble: {
			true: {
				color: 'inherit',
				display: 'inline-flex',
				textDecoration: 'none',
				position: 'relative',
				cursor: 'pointer',
				'&:hover': {
					'&:before': {
						opacity: 0.2,
					},
				},
				'&:after': {
					content: '',
					position: 'absolute',
					transition: '$default',
					inset: '3px 0',
					borderBottom: '1px dotted',
					pe: 'none',
				},
				'&:before': {
					content: '',
					background: '$bgLink',
					position: 'absolute',
					transition: '$default',
					br: '$2',
					inset: '2px -5px 1px -5px',
					pe: 'none',
				},
			},
		},
	},
})
