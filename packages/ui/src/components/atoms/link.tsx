import { styled } from '../../theme'

export const StyledLink = styled('a', {
	boxSizing: 'border-box',
	textDecoration: 'none',
	color: 'inherit',
	cursor: 'pointer',

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
				borderBottom: '1px dotted',
				'&:hover': {
					'&:before': {
						opacity: 0.2,
					},
				},
				'&:before': {
					content: '',
					background: '$bgLink',
					position: 'absolute',
					transition: '$default',
					br: '$2',
					inset: '-0px -4px -5px -4px',
				},
			},
		},
	},
})
