import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { style } from '@vanilla-extract/css'

export const leftPanel = style([
	sprinkles({
		position: 'relative',
	}),
	{
		alignSelf: 'flex-start',
	},
])

export const rightPanel = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		overflow: 'clip',
	}),
	{
		alignSelf: 'flex-start',
		width: '392px',
		maxHeight: '100%',
	},
])

export const indexAssetsWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const indexAssetWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		width: 'full',
		alignItems: 'center',
		borderTop: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
		paddingTop: 'medium',
		paddingBottom: 'medium',
		gap: 'small',
	}),
	{
		':first-child': {
			borderTop: 'none',
		},
		selectors: {
			// [`.${darkMode} &`]: {},
			// [`${parent} & svg`]: {
			// 	fill: 'backgroundPrimary',
			// },
		},
	},
])

// globalStyle(`${indexAssetWrapper}:first-child > div`, {
// 	borderTop: 'none',
// })

export const indexAssetCircle = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'full',
	}),
	{
		backgroundColor: 'orange',
		width: '40px',
		height: '40px',
	},
])
