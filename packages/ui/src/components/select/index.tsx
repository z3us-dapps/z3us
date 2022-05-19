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
	//boxShadow: `0 2px 10px ${blackA.blackA7}`,
	//'&:hover': { backgroundColor: 'green' },
	//'&:focus': { boxShadow: `0 0 0 2px black` },
})

const StyledContent = styled(SelectPrimitive.Content, {
	overflow: 'hidden',
	br: '$2',
	padding: '5px',
	backgroundColor: '$bgPanel',
	border: '1px solid $borderPopup',
	boxShadow: '$popup',
	position: 'relative',
	boxSizing: 'border-box',

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
	padding: '0 25px',
	fontSize: 12,
	lineHeight: '25px',
	color: 'brown',
})

const StyledSeparator = styled(SelectPrimitive.Separator, {
	height: 1,
	backgroundColor: 'blue',
	margin: 5,
})

const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator, { ...sharedItemIndicatorStyles })

const scrollButtonStyles = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: 25,
	backgroundColor: 'white',
	color: 'red',
	cursor: 'default',
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
