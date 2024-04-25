import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { vars } from 'ui/src/theme/theme.css'

// TODO: show hide the menu
// export const settingsHomeWrapper = style([
// 	sprinkles({
// 		position: 'relative',
// 		display: {
// 			mobile: 'none',
// 			tablet: 'block',
// 		},
// 	}),
// 	{},
// ])

export const transferRouteWrapper = style([
	sprinkles({
		position: 'relative',
		padding: {
			mobile: 'medium',
			tablet: 'xxlarge',
			desktop: 'xxlarge',
		},
	}),
	{},
])

export const transferUiTextSeparator = style([
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

// TODO: refactor

export const settingsMobileWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const transferDesktopWrapper = style([
	sprinkles({
		display: 'flex',
		justifyContent: 'center',
		paddingX: {
			mobile: 'large',
			desktop: 'xxlarge',
		},
		paddingBottom: {
			mobile: 'large',
			desktop: 'xlarge',
		},
		paddingTop: {
			mobile: 'large',
			desktop: 'xlarge',
		},
		height: 'full',
	}),
	{},
])

export const transferDesktopTitleWrapper = style([
	sprinkles({
		display: {
			mobile: 'none',
			tablet: 'block',
		},
	}),
	{},
])

export const transferDesktopContainerWrapper = style([
	sprinkles({
		width: 'full',
		height: 'full',
		maxWidth: 'xxlarge',
		display: 'flex',
		gap: 'xlarge',
	}),
	{},
])

export const transferDesktopLeftMenu = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		gap: 'medium',
		paddingLeft: 'medium',
	}),
	{
		width: '260px',
		alignItems: 'self-start',
	},
])

export const transferDesktopRightWrapper = style([
	sprinkles({
		position: 'relative',
		flexGrow: 1,
	}),
	{},
])

export const settingsSectionFlexColumnWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		gap: 'xlarge',
	}),
])

export const settingsSectionWrapper = style([
	sprinkles({
		paddingX: {
			mobile: 'xlarge',
			tablet: 'none',
		},
	}),
])

export const settingsSectionBorderWrapper = style([
	sprinkles({
		borderBottom: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
		paddingBottom: 'xlarge',
		paddingX: {
			mobile: 'xlarge',
			tablet: 'none',
		},
	}),
])

export const settingsSectionGridBasic = style([
	sprinkles({
		display: {
			mobile: 'flex',
			tablet: 'grid',
		},
		flexDirection: 'column',
		gap: 'large',
	}),
	{
		gridTemplateColumns: '240px 1fr',
	},
])

export const settingsSectionGridBasicSpacer = style([
	sprinkles({
		display: {
			mobile: 'none',
			tablet: 'flex',
		},
	}),
])

export const settingsMobileIndexLinkWrapper = style([
	sprinkles({
		display: 'flex',
		paddingX: 'large',
		paddingY: 'large',
		gap: 'medium',
		borderBottom: 1,
		borderBottomStyle: 'solid',
		borderColor: 'borderDivider',
		textDecoration: 'none',
		transition: 'fast',
		background: {
			lightMode: 'transparent',
			hover: 'backgroundPrimary',
		},
	}),
	{},
])

export const settingsMobileIndexLinkTextWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		gap: 'xxsmall',
	}),
	{},
])

export const settingsMobileIndexLinkIconWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexShrink: 0,
	}),
	{
		width: '50px',
		height: '50px',
	},
])

export const transferSendingDialog = style([
	sprinkles({}),
	{
		width: '400px',
		height: '400px',
	},
])

export const transferSendingDialogCloseBtn = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		right: 0,
		marginTop: 'medium',
		marginRight: 'medium',
	}),
	{},
])
