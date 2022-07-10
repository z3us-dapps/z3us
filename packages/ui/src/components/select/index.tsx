import * as SelectPrimitive from '@radix-ui/react-select'
import { styled, keyframes, sharedItemStyles, sharedItemIndicatorStyles } from '../../theme'

const animateIn = keyframes({
	from: { transform: 'translateY(4px)', opacity: 0 },
	to: { transform: 'translateY(0)', opacity: 1 },
})

const animateOut = keyframes({
	from: { transform: 'translateY(0)', opacity: 1 },
	to: { transform: 'translateY(4px)', opacity: 0 },
})

const StyledTrigger = styled(SelectPrimitive.SelectTrigger, {
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	boxSizing: 'border-box',
	borderRadius: 4,
	fontSize: 13,
	lineHeight: 1,
	height: 35,
	gap: 5,
	backgroundColor: 'white',
	color: 'grey',
})

const StyledContent = styled(SelectPrimitive.Content, {
	overflow: 'hidden',
	br: '$2',
	padding: '5px',
	backgroundColor: '$bgPanel',
	border: '1px solid $borderPopup',
	boxShadow: '$popup',
	boxSizing: 'border-box',
	position: 'relatvie',
	zIndex: '999',

	// TODO: handle the no-motion preference
	'&[data-state="open"]': {
		animation: `${animateIn} 200ms ease`,
	},
	'&[data-state="closed"]': {
		animation: `${animateOut} 200ms ease`,
	},
})

const StyledViewport = styled(SelectPrimitive.Viewport, {
	padding: 0,
})

const StyledItem = styled(SelectPrimitive.Item, { ...sharedItemStyles })

const StyledLabel = styled(SelectPrimitive.Label, {
	...sharedItemStyles,
	fontWeight: 700,
	backgroundColor: '$bgPanelHover',
})

const StyledSeparator = styled(SelectPrimitive.Separator, {
	height: 1,
	backgroundColor: '$borderPanel',
	margin: 5,
})

const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator, { ...sharedItemIndicatorStyles })

const scrollButtonStyles = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: 25,
	color: '$buttonText',
	fill: '$buttonText',
	bg: '$buttonBgTertiary',
	br: '$2',
	cursor: 'default',
	opacity: '0.5',
}

const StyledScrollUpButton = styled(SelectPrimitive.ScrollUpButton, scrollButtonStyles)

const StyledScrollDownButton = styled(SelectPrimitive.ScrollDownButton, scrollButtonStyles)

// Exports
export const Select = SelectPrimitive.Root
export const SelectTrigger = StyledTrigger
export const SelectValue = SelectPrimitive.Value
export const SelectIcon = SelectPrimitive.Icon
export const SelectContent = StyledContent
export const SelectViewport = StyledViewport
export const SelectGroup = SelectPrimitive.Group
export const SelectItem = StyledItem
export const SelectItemText = SelectPrimitive.ItemText
export const SelectItemIndicator = StyledItemIndicator
export const SelectLabel = StyledLabel
export const SelectSeparator = StyledSeparator
export const SelectScrollUpButton = StyledScrollUpButton
export const SelectScrollDownButton = StyledScrollDownButton
