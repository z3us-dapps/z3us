/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import React, { forwardRef } from 'react'
import useMeasure from 'react-use-measure'
import { styled, keyframes } from '@stitches/react'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import type * as Radix from '@radix-ui/react-primitive'
import { Box } from '../atoms/box'
import { CSS } from '../../theme'

const slideDown = keyframes({
	from: { height: 0 },
	to: { height: 'var(--radix-accordion-content-height)' },
})

const slideUp = keyframes({
	from: { height: 'var(--radix-accordion-content-height)' },
	to: { height: 0 },
})

const StyledAccordion = styled(AccordionPrimitive.Root, {
	borderRadius: '$3',
	width: '100%',
	backgroundColor: '$bgAccordion',
	boxShadow: '$shadowPanel2',
	border: '1px solid $borderPanel2',
})

const StyledItem = styled(AccordionPrimitive.Item, {
	overflow: 'hidden',
	marginTop: 1,

	'&:first-child': {
		marginTop: 0,
		borderTopLeftRadius: '$3',
		borderTopRightRadius: '$3',
	},

	'&:last-child': {
		borderBottomLeftRadius: '$3',
		borderBottomRightRadius: '$3',
	},

	'&:focus-within': {
		position: 'relative',
		zIndex: 1,
		boxShadow: '$buttonFocusShadow',
	},

	'&:focus-within:not(&:focus-visible)': {
		boxShadow: 'none',
	},
})

const StyledHeader = styled(AccordionPrimitive.Header, {
	all: 'unset',
	display: 'flex',
})

const StyledTrigger = styled(AccordionPrimitive.Trigger, {
	all: 'unset',
	fontFamily: 'inherit',
	bg: '$bgPanel2',
	padding: '0 15px',
	height: 45,
	flex: 1,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-start',
	fontSize: 13,
	fontWeight: 500,
	lineHeight: 1,
	transition: '$default',

	'&[data-state="closed"]': {
		backgroundColor: '$bgPanel2',
		'&:hover': { backgroundColor: '$bgPanelHover' },
	},
	'&[data-state="open"]': {
		backgroundColor: '$buttonBgPrimary',
		color: '$txtInverse',
		svg: {
			color: '$txtInverse',
			fill: '$txtInverse',
		},
		'&:hover': { backgroundColor: 'buttonBgPrimary', color: '$txtInverse' },
	},
})

const StyledContent = styled(AccordionPrimitive.Content, {
	overflow: 'hidden',
	backgroundColor: '$bgPanel',
	'&[data-state="open"]': {
		animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards`,
	},
	'&[data-state="closed"]': {
		animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards`,
	},
})

const StyledChevron = styled(ChevronDownIcon, {
	color: '$txtDefault',
	transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
	'[data-state=open] &': { transform: 'rotate(180deg)' },
})

export const Accordion = StyledAccordion
export const AccordionItem = StyledItem

export const AccordionTrigger = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Trigger>,
	Radix.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ children }, forwardedRef) => (
	<StyledHeader>
		<StyledTrigger ref={forwardedRef}>
			{children}
			<StyledChevron aria-hidden />
		</StyledTrigger>
	</StyledHeader>
))

AccordionTrigger.displayName = 'AccordionTrigger'

export type AccordionContentProps = { children: any } & { css?: CSS }
export type Ref = HTMLDivElement
export const AccordionContent = forwardRef<Ref, AccordionContentProps>(({ children, css, ...props }, ref) => {
	const [measureRef, { height }] = useMeasure()
	return (
		<StyledContent
			{...props}
			ref={ref}
			css={{
				...(height ? { '--radix-collapsible-content-height': `${height}px !important` } : {}),
				...(css as any),
			}}
		>
			<Box ref={measureRef}>{children}</Box>
		</StyledContent>
	)
})

AccordionContent.displayName = 'AccordionContent'

AccordionContent.defaultProps = {
	css: undefined,
}
