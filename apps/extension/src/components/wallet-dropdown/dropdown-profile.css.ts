import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'

export const dropdownProfilWrapper = sprinkles({
	display: 'flex',
	position: 'relative',
})

export const dropdownProfileBtnWrapper = sprinkles({
	display: 'flex',
	position: 'relative',
})

export const dropdownProfilAvatarConnectedStatus = style([
	sprinkles({
		borderRadius: 'full',
		position: 'absolute',
		borderColor: 'backgroundPrimary',
		borderStyle: 'solid',
		background: { lightMode: 'green500', darkMode: 'green500' },
	}),
	{
		width: '12px',
		height: '12px',
		borderWidth: '2px',
		bottom: '-0.0rem',
		left: '-0.0rem',
	},
])

export const dropdownProfilAvatarConnectedStatusSmall = style([
	{
		width: '10px',
		height: '10px',
		borderWidth: '2px',
		bottom: '-0.0rem',
		left: '-0.0rem',
	},
])

export const dropdownProfileContentWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		minWidth: '200px',
		paddingTop: 0,
		paddingBottom: 0,
		paddingLeft: 0,
		paddingRight: 0,
	},
	responsiveStyle({
		mobile: { minWidth: '220px' },
		tablet: { minWidth: '220px' },
	}),
])

export const dropdownProfileSimpleBarWrapper = style([
	responsiveStyle({
		mobile: { maxHeight: '460px' },
		tablet: { maxHeight: '70vh' },
	}),
])

export const dropdownProfileScrollAreaWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		height: 'full',
		paddingY: 'small',
		paddingX: 'small',
	}),
	{},
])
