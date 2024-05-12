import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { vars } from 'ui/src/theme/theme.css'

export const searchWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
	}),
])

export const inputSearchClearBtn = style([
	sprinkles({
		position: 'relative',
	}),
])

export const inputSearchButtonWrapper = style([
	sprinkles({
		position: 'relative',
	}),
])

export const inputSearchHidden = style([
	sprinkles({
		display: 'none',
	}),
])

export const inputSearchVisible = style([
	sprinkles({
		display: 'block',
	}),
])

export const inputSearchButtonHiddenWrapper = style([
	sprinkles({
		position: 'relative',
	}),
])

export const inputSearchInputWrapper = style([
	sprinkles({
		display: 'none',
		width: 'full',
		position: 'relative',
	}),
])

globalStyle(`${inputSearchInputWrapper} input[type="text"]`, {
	paddingRight: '36px',
	textOverflow: 'ellipsis',
})

export const inputSearchInputValueWrapper = style([
	sprinkles({
		position: 'relative',
	}),
])

globalStyle(`${inputSearchInputValueWrapper} input[type="text"]`, {
	paddingRight: '96px',
	textOverflow: 'ellipsis',
})

export const inputSearchAbsoluteCloseWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		marginRight: 'xsmall',
	}),
])

export const inputSearchClearWrapper = style([
	sprinkles({
		display: 'flex',
		position: 'relative',
		alignItems: 'center',
		marginRight: 'small',
		paddingRight: 'xsmall',
	}),
])

globalStyle(`${inputSearchClearWrapper} :after`, {
	content: '""',
	position: 'absolute',
	right: `calc(${vars.spacing.xxsmall} * -1)`,
	top: '6px',
	width: '1px',
	height: '14px',
	backgroundColor: vars.color.borderDivider,
	pointerEvents: 'none',
})
