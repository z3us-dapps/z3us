import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
//import { violet, blackA } from '@radix-ui/colors';
//import { CheckIcon } from '@radix-ui/react-icons';
import { CheckIcon as CheckIconRadixUi } from '@radix-ui/react-icons'
import { CSS, styled } from '@stitches/react'
import React from 'react'

import { Box } from '../atoms/box'

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
	all: 'unset',
	backgroundColor: '$bgPanel2',
	width: 25,
	height: 25,
	borderRadius: '$1',
	display: 'flex',
	alignItems: 'center',
	position: 'relative',
	justifyContent: 'center',
	border: '1px solid $borderInput',
	transition: '$default',
	'&:hover': {
		border: '1px solid $borderInputHover',
		boxShadow: '$inputHover',
	},
	'&:focus': {
		border: '1px solid $borderInputHover',
		boxShadow: '$inputFocus',
	},
	//'&:focus:not(&:focus-visible)': {
	//boxShadow: 'none',
	//},
	'&[data-state="checked"]': {
		border: '1px solid $borderInputHover',
		div: {
			opacity: '1',
		},
	},

	variants: {
		size: {
			'1': {
				borderRadius: '$1',
				width: 18,
				height: 18,
				div: {
					marginTop: '-7px',
				},
			},
			'2': {
				borderRadius: '$1',
				width: 25,
				height: 25,
				div: {
					marginTop: '-7px',
					transform: 'scale(1.2)',
				},
			},
		},
	},

	defaultVariants: {
		size: '1',
	},
})

const StyledCheckIcon = ({ css }: CSS) => (
	<Box
		as="div"
		css={{
			position: 'absolute',
			display: 'flex',
			pe: 'none',
			opacity: '0',
			top: '50%',
			left: '50%',
			marginTop: '-8px',
			marginLeft: '-8px',
			width: '16px',
			height: '16px',
			transition: '$default',
			//transition: 'opacity 150ms 200ms, background-color 150ms 200ms, transform 350ms cubic-bezier(.78,-1.22,.17,1.89)',
			transform: 'scale(1)',
			...(css as any),
		}}
	>
		<CheckIconRadixUi />
	</Box>
)

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
	color: 'grey',
})

// Exports
export const Checkbox = StyledCheckbox
export const CheckboxIndicator = StyledIndicator
export const CheckIcon = StyledCheckIcon
