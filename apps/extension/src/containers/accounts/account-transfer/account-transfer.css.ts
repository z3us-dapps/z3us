import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { vars } from 'ui/src/components-v2/system/theme.css'

export const transferWrapper = style([
	sprinkles({
		padding: {
			mobile: 'medium',
			tablet: 'xlarge',
			desktop: 'xxlarge',
		},
	}),
	{},
])

export const transferUiTextSeperator = style([
	sprinkles({
		height: 'medium',
		background: 'borderDividerSecondary',
	}),
	{
		width: '1px',
	},
])

export const transferAccordionChevron = style([
	sprinkles({
		position: 'relative',
		transition: 'fast',
	}),
	{},
])

export const transferAccordionItemWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		borderRadius: 'large',
		color: 'colorNeutral',
		transition: 'fast',
		background: {
			lightMode: 'bai_pearl500',
			darkMode: 'wax600',
		},
	}),
	{
		selectors: {
			'&[data-state="open"]': {
				boxShadow: `inset 0 0 0 1px ${vars.color.btnSecondaryBorderColor}, ${vars.color.shadowAccordionOpen}`,
				// boxShadow: `inset 0 0 0 1px ${vars.color.btnSecondaryBorderColor}`,
			},
		},
	},
])

globalStyle(`${transferAccordionItemWrapper}[data-state="open"] ${transferAccordionChevron}`, {
	transform: 'rotate(180deg)',
})

export const transferAccordionTriggerWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const transferAccordionDeleteBtn = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		right: 0,
	}),
	{
		marginTop: '8px',
		marginRight: '44px',
	},
])

export const transferAccordionContentWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
	}),
	{},
])

export const panelWrapper = style([
	sprinkles({
		position: 'relative',
		maxWidth: 'medium',
		width: 'full',
		paddingTop: {
			mobile: 'large',
			desktop: 'xxlarge',
		},
	}),
	{},
])
