/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import { styled } from '@stitches/react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

const StyledTabs = styled(TabsPrimitive.Root, {
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	boxShadow: '$shadowPanel2',
	border: '1px solid $borderPanel2',
	borderRadius: '$3',
})

const StyledList = styled(TabsPrimitive.List, {
	flexShrink: 0,
	display: 'flex',
	borderBottom: `1px solid $borderPanel2`,
	borderTopLeftRadius: '$3',
	borderTopRightRadius: '$3',
})

const StyledTrigger = styled(TabsPrimitive.Trigger, {
	all: 'unset',
	fontFamily: 'inherit',
	backgroundColor: '$bgPanel2',
	padding: '0 20px',
	height: 45,
	flex: 1,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontSize: 13,
	fontWeight: 500,
	lineHeight: 1,
	userSelect: 'none',
	transition: '$default',
	'&:first-child': { borderTopLeftRadius: '$3' },
	'&:last-child': { borderTopRightRadius: '$3' },
	'&:hover': {  backgroundColor: '$bgPanelHover' },
	'&[data-state="active"]': {
		color: '$txtDefault',
		boxShadow: 'inset 0 -1px 0 0 #673bdf, 0 1px 0 0 #673bdf',
	},
	'&:focus': {
		position: 'relative',
		//boxShadow: `0 0 0 2px $shadowPanel`,
	},
})

const StyledContent = styled(TabsPrimitive.Content, {
	flexGrow: 1,
	backgroundColor: '$bgPanel',
	borderBottomLeftRadius: '$3',
	borderBottomRightRadius: '$3',
	outline: 'none',
	'&:focus': { boxShadow: `0 0 0 2px $bgPanel` },
})

export const Tabs = StyledTabs
export const TabsList = StyledList
export const TabsTrigger = StyledTrigger
export const TabsContent = StyledContent
