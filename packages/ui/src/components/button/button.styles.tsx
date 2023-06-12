import type { VariantProps} from '../../theme';
import { keyframes, sharedFocus, styled } from '../../theme'

const animateRotate = keyframes({
	'0%': { opacity: 1, transform: 'rotate(0deg)' },
	'50%': { opacity: 0.5, transform: 'rotate(180deg)' },
	'100%': { opacity: 1, transform: 'rotate(360deg)' },
})

export const StyledTextWrapper = styled('span', {})

export const StyledRipple = styled('span', {
	display: 'block',
	pe: 'none',
	width: '80px',
	height: '80px',
	position: 'absolute',
	top: '50%',
	left: '50%',
	br: '50%',
	bg: '#c1b2f4',
	opacity: '0.0',
	transform: 'translate(-50%, -50%) scale(1, 1)',
	transition: 'opacity 900ms, transform 300ms',
})

export const StyledLoader = styled('span', {
	pe: 'none',
	top: '0',
	right: '0',
	opacity: '1',
	width: '0px',
	height: '20px',
	transition: '$default',
	flexShrink: '0',
	boxSizing: 'border-box',
	position: 'relative',
	'&:after': {
		content: '',
		opacity: '0',
		border: '3px solid',
		borderTop: '3px solid',
		borderTopColor: 'transparent',
		width: '20px',
		height: '20px',
		position: 'absolute',
		top: '0',
		right: '-50%',
		br: '100%',
		boxSizing: 'border-box',
	},
})

export const StyledButton = styled(
	'button',
	{
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		dflex: 'center',
		appearance: 'none',
		fontFamily: '$Inter',
		boxSizing: ' border-box',
		us: 'none',
		ta: 'center',
		whiteSpace: 'nowrap',
		transition: '$default',
		position: 'relative',
		overflow: 'hidden',
		textDecoration: 'none',
		border: 'none',
		cursor: 'pointer',
		'&:before': {
			content: '',
			position: 'absolute',
			display: 'none',
			top: '0',
			left: '0',
			background: 'rgba(255, 255, 255, 0.5)',
			width: '60px',
			height: '100%',
			opacity: '0.5',
			transform: 'translateX(-100px) skewX(-15deg)',
			filter: 'blur(30px)',
		},
		'&:after': {
			content: '',
			position: 'absolute',
			display: 'none',
			top: '0',
			left: '30px',
			background: 'rgba(255, 255, 255, 0.2)',
			width: '60px',
			height: '100%',
			opacity: '0',
			transform: 'translateX(-100px) skewX(-15deg)',
			filter: 'blur(5px)',
		},

		'&:hover': {
			'&:before': {
				opacity: '0.6',
				transition: '0.7s',
			},
			'&:after': {
				opacity: '1',
				transition: '0.7s',
			},
		},
		p: 0,
		'@motion': {
			transition: 'none',
		},
		variants: {
			color: {
				default: {
					bg: 'transparent',
					color: '$buttonText',
					fill: '$buttonText',
				},
				input: {
					bg: '$bgInput',
					border: '1px solid $borderInput',
					color: '$txtDefault',
					borderRadius: '$2',
				},
				primary: {
					fill: '$txtButtonPrimary',
					color: '$txtButtonPrimary',
					backgroundColor: '$buttonBgPrimary',
					'&:hover': {
						background: '$buttonBgPrimaryHover',
					},
					'&:before': {
						display: 'block',
					},
					'&:after': {
						display: 'block',
					},
				},
				secondary: {
					color: '$buttonText',
					fill: '$buttonText',
					bg: '$buttonBgSecondary',
					'&:hover': {},
					'&:before': {
						display: 'block',
					},
					'&:after': {
						display: 'block',
					},
				},
				tertiary: {
					color: '$buttonText',
					fill: '$buttonText',
					bg: '$buttonBgTertiary',
					'&:hover': {
						background: '$buttonBgTertiaryHover',
					},
					'&:before': {
						display: 'block',
					},
					'&:after': {
						display: 'block',
					},
				},
				inverse: {
					color: '$buttonTextInverse',
					fill: '$buttonTextInverse',
					bg: '$buttonBgInverse',
					'&:before': {
						display: 'block',
					},
					'&:after': {
						display: 'block',
					},
					'&:hover': {
						opacity: '0.8',
					},
				},
				ghost: {
					transition: '$default',
					bg: '$buttonBgGhost',
					color: '$buttonGhost',
					fill: '$buttonGhost',
					'&:hover': {
						bg: '$buttonBgGhostHover',
					},
				},
				red: {
					color: '$buttonTextRed',
					fill: '$buttonTextRed',
					bg: '$buttonBgRed',
					'&:before': {
						display: 'block',
					},
					'&:after': {
						display: 'block',
					},
				},
			},
			size: {
				'1': {
					borderRadius: '$2',
					height: '$6',
					fontSize: '11px',
					lineHeight: '11px',
					fontWeight: '600',
					px: '8px',
					[`& ${StyledTextWrapper}`]: {
						ml: '4px',
					},
				},
				'2': {
					borderRadius: '$2',
					height: '$7',
					fontSize: '12px',
					lineHeight: '12px',
					fontWeight: '600',
					px: '10px',
					[`& ${StyledTextWrapper}`]: {
						ml: '4px',
					},
				},
				'3': {
					borderRadius: '$2',
					height: '$8',
					fontSize: '13px',
					lineHeight: '13px',
					fontWeight: '600',
					px: '12px',
					[`& ${StyledTextWrapper}`]: {
						ml: '5px',
					},
				},
				'4': {
					borderRadius: '$2',
					height: '$9',
					fontSize: '14px',
					lineHeight: '14px',
					fontWeight: '600',
					px: '14px',
					[`& ${StyledTextWrapper}`]: {
						ml: '6px',
					},
				},
				'5': {
					borderRadius: '$3',
					height: '$11',
					fontSize: '15px',
					lineHeight: '16px',
					fontWeight: '600',
					px: '18px',
					[`& ${StyledLoader}`]: {
						'&:after': {
							border: '3px solid',
							borderTop: '3px solid',
							borderTopColor: 'transparent',
							width: '17px',
							height: '17px',
						},
					},
					[`& ${StyledTextWrapper}`]: {
						ml: '8px',
					},
				},
				'6': {
					borderRadius: '$3',
					height: '$12',
					fontSize: '16px',
					lineHeight: '17px',
					fontWeight: '600',
					px: '20px',
					[`& ${StyledTextWrapper}`]: {
						ml: '8px',
					},
				},
			},
			circle: {
				true: {
					justifyContent: 'center',
					borderRadius: '50% !important',
					py: 0,
					pl: 0,
					pr: 0,
				},
			},
			fullWidth: {
				true: {
					width: '100%',
				},
			},
			rounded: {
				true: {
					borderRadius: '25px',
				},
			},
			active: {
				true: {
					'&:before': {
						display: 'none',
					},
					'&:after': {
						display: 'none',
					},
				},
			},
			iconOnly: {
				true: {
					justifyContent: 'center',
					pl: 0,
					pr: 0,
				},
			},
			disabled: {
				true: {
					cursor: 'not-allowed',
					opacity: 0.8,
					pe: 'auto',
					'&:hover': {
						opacity: 0.8,
						'&:before': {
							display: 'none',
						},
						'&:after': {
							display: 'none',
						},
					},
				},
			},
			loading: {
				true: {
					cursor: 'default',
					pe: 'auto',
					opacity: '0.8',
					'&:hover': {
						opacity: '0.8',
					},
					[`& ${StyledLoader}`]: {
						'&:after': {
							animation: `${animateRotate} infinite linear 1s`,
						},
					},
				},
			},
			clickable: {
				false: {
					'&:active': {
						[`& ${StyledRipple}`]: {
							display: 'none',
						},
					},
					cursor: 'default',
					pe: 'none',
				},
			},
			showRipple: {
				true: {
					'&:active': {
						[`& ${StyledRipple}`]: {
							opacity: '0.3',
							transform: 'translate(-50%, -50%) scale(0)',
							transition: 'transform 0s',
						},
					},
				},
			},
			auto: {
				true: {
					width: 'auto',
					minWidth: 'min-content',
				},
			},
		},
		compoundVariants: [
			{
				size: '1',
				iconOnly: true,
				css: {
					height: '$6',
					width: '$6',
					pl: 0,
					pr: 0,
				},
			},
			{
				size: '2',
				iconOnly: true,
				css: {
					height: '$8',
					width: '$8',
					pl: 0,
					pr: 0,
				},
			},
			{
				size: '3',
				iconOnly: true,
				css: {
					height: '$8',
					width: '$8',
					pl: 0,
					pr: 0,
				},
			},
			{
				size: '4',
				iconOnly: true,
				css: {
					height: '$9',
					width: '$9',
					pl: 0,
					pr: 0,
				},
			},
			{
				size: '5',
				iconOnly: true,
				css: {
					height: '$11',
					width: '$11',
					pl: 0,
					pr: 0,
				},
			},
			{
				size: '6',
				iconOnly: true,
				css: {
					height: '$12',
					width: '$12',
					pl: 0,
					pr: 0,
				},
			},
			{
				size: '1',
				loading: true,
				css: {
					[`& ${StyledLoader}`]: {
						width: '8px',
						height: '8px',
						'&:after': {
							border: '2px solid',
							borderTop: '2px solid',
							borderTopColor: 'transparent',
							width: '8px',
							height: '8px',
						},
					},
				},
			},
			{
				size: '2',
				loading: true,
				css: {
					[`& ${StyledLoader}`]: {
						width: '10px',
						height: '10px',
						'&:after': {
							border: '2px solid',
							borderTop: '2px solid',
							borderTopColor: 'transparent',
							width: '10px',
							height: '10px',
						},
					},
				},
			},
			{
				size: '3',
				loading: true,
				css: {
					[`& ${StyledLoader}`]: {
						width: '12px',
						height: '12px',
						'&:after': {
							border: '2px solid',
							borderTop: '2px solid',
							borderTopColor: 'transparent',
							width: '12px',
							height: '12px',
						},
					},
				},
			},
			{
				size: '4',
				loading: true,
				css: {
					[`& ${StyledLoader}`]: {
						width: '15px',
						height: '15px',
						'&:after': {
							border: '3px solid',
							borderTop: '3px solid',
							borderTopColor: 'transparent',
							width: '15px',
							height: '15px',
						},
					},
				},
			},
			{
				size: '5',
				loading: true,
				css: {
					[`& ${StyledLoader}`]: {
						width: '17px',
						height: '17px',
						'&:after': {
							border: '3px solid',
							borderTop: '3px solid',
							borderTopColor: 'transparent',
							width: '17px',
							height: '17px',
						},
					},
				},
			},
			{
				size: '6',
				loading: true,
				css: {
					[`& ${StyledLoader}`]: {
						width: '20px',
					},
				},
			},
			{
				color: 'primary',
				disabled: true,
				css: {
					'&:hover': {
						backgroundColor: '$buttonBgPrimary',
					},
				},
			},
			{
				color: 'tertiary',
				disabled: true,
				css: {
					'&:hover': {
						backgroundColor: '$buttonBgTertiary',
					},
				},
			},
			{
				color: 'primary',
				active: true,
				css: {
					backgroundColor: '$buttonBgPrimaryHover',
					'&:hover': {
						backgroundColor: '$buttonBgPrimaryHover',
					},
				},
			},
			{
				color: 'tertiary',
				active: true,
				css: {
					backgroundColor: '$buttonBgTertiaryHover',
					'&:hover': {
						backgroundColor: '$buttonBgTertiaryHover',
					},
				},
			},
			{
				color: 'input',
				size: '4',
				css: {
					fontSize: '13px',
					lineHeight: '13px',
					fontWeight: '400',
					pl: '10px',
					pr: '5px',
					justifyContent: 'start',
					ta: 'left',
					'> span:first-child': {
						flex: '1',
					},
				},
			},
			{
				color: 'input',
				size: '6',
				css: {
					fontSize: '16px',
					lineHeight: '16px',
					fontWeight: '400',
					pl: '16px',
					pr: '5px',
					justifyContent: 'start',
					ta: 'left',
					'> span:first-child': {
						flex: '1',
					},
				},
			},
		],
		defaultVariants: {
			color: 'default',
		},
	},
	sharedFocus,
)

export type ButtonVariantsProps = VariantProps<typeof StyledButton>

export default StyledButton
