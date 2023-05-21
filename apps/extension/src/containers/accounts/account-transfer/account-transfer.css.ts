import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'
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

export const transferUiTextAreaMessage = style([
	sprinkles({}),
	{
		height: '100px',
	},
])

export const tokenSelectBtnWrapper = style([
	sprinkles({
		position: 'absolute',
	}),
	{
		top: '4px',
		right: '5px',
		borderTopLeftRadius: '30px',
		borderBottomLeftRadius: '30px',
		borderTopRightRadius: '12px',
		borderBottomRightRadius: '12px',
	},

	responsiveStyle({
		mobile: { maxWidth: '140px' },
		tablet: { maxWidth: '140px' },
		desktop: { maxWidth: '140px' },
	}),
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
			darkMode: 'wax500',
		},
	}),
	{
		selectors: {
			'&[data-state="open"]': {
				// boxShadow: `inset 0 0 0 1px ${vars.color.btnSecondaryBorderColor}, ${vars.color.shadowAccordionOpen}`,
				boxShadow: `inset 0 0 0 1px ${vars.color.btnSecondaryBorderColor}`,
			},
		},
	},
])

export const transferAccordionContentWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
	}),
	{},
])
