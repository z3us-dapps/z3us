import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const notificationsDropdownProfileWrapper = sprinkles({
	display: 'flex',
	position: 'relative',
})

export const notificationsDropdownProfileContentWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		minWidth: '260px',
		paddingTop: 0,
		paddingBottom: 0,
		paddingLeft: 0,
		paddingRight: 0,
	},
	responsiveStyle({
		mobile: { minWidth: '260px' },
		tablet: { minWidth: '260px' },
	}),
])

export const notificationsDropdownProfileSimpleBarWrapper = style([
	responsiveStyle({
		mobile: { maxHeight: '460px' },
		tablet: { maxHeight: '30vh' },
	}),
])

export const notificationsDropdownStickyHeader = style([
	sprinkles({
		position: 'sticky',
		background: 'backgroundPrimary',
		zIndex: 1,
	}),
	{
		top: `${vars.spacing.medium}`,
	},
])

export const notificationsDropdownProfileScrollAreaWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		height: 'full',
		paddingY: 'small',
		paddingX: 'small',
	}),
	{},
])
