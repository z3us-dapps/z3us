import { styled } from '../../theme'

export const Text = styled('span', {
	lineHeight: '1',
	margin: '0',
	fontWeight: 400,
	fontVariantNumeric: 'tabular-nums',
	fontFamily: '$HaasGrotTextRound',
	display: 'block',

	variants: {
		color: {
			default: {
				color: '$txtDefault',
			},
			help: {
				color: '$txtHelp',
			},
			muted: {
				color: '$txtMuted',
			},
			red: {
				color: '$txtError',
			},
		},
		size: {
			'1': {
				fontSize: '$1',
				lineHeight: '$1',
			},
			'2': {
				fontSize: '$2',
				lineHeight: '$2',
			},
			'3': {
				fontSize: '$3',
				lineHeight: '$3',
			},
			'4': {
				fontSize: '$4',
				lineHeight: '$4',
			},
			'5': {
				fontSize: '$5',
				lineHeight: '$5',
			},
			'6': {
				fontSize: '$6',
				lineHeight: '$6',
			},
			'7': {
				fontSize: '$7',
				lineHeight: '$7',
			},
			'8': {
				fontSize: '$8',
				lineHeight: '$8',
			},
			'9': {
				fontSize: '$9',
				lineHeight: '$9',
			},
			'10': {
				fontSize: '$10',
				lineHeight: '$10',
			},
			'11': {
				fontSize: '$11',
				lineHeight: '$11',
			},
			'12': {
				fontSize: '$12',
				lineHeight: '$12',
			},
			'13': {
				fontSize: '$13',
				lineHeight: '$13',
			},
			'14': {
				fontSize: '$14',
				lineHeight: '$14',
			},
			'15': {
				fontSize: '$14',
				lineHeight: '$14',
			},
		},
		// should use above > 20px
		centra: {
			true: {
				fontFamily: '$Centra',
			},
		},
		displayRound: {
			true: {
				fontFamily: '$HaasGrotDisplayRound',
			},
		},
		gradient: {
			true: {
				WebkitBackgroundClip: 'text',
				WebkitTextFillColor: 'transparent',
			},
		},
		medium: {
			true: {
				fontWeight: '500',
			},
		},
		regular: {
			true: {
				fontWeight: '400',
			},
		},
		semiBold: {
			true: {
				fontWeight: '600',
			},
		},
		bold: {
			true: {
				fontWeight: '700',
			},
		},
		uppercase: {
			true: {
				textTransform: 'uppercase',
			},
		},
		capitalize: {
			true: {
				textTransform: 'capitalize',
			},
		},
		underline: {
			true: {
				textDecoration: 'underline',
			},
		},
		truncate: {
			true: {
				whiteSpace: 'nowrap',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
			},
		},
	},
	defaultVariants: {
		size: '3',
	},
})
