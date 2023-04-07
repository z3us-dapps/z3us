import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as SelectPrimitive from '@radix-ui/react-select'
import React, { useState } from 'react'
import useMeasure from 'react-use-measure'

import { keyframes, sharedItemIndicatorStyles, sharedItemStyles, styled } from '../../theme'
import { Box } from '../atoms/box'
import Button from '../button'

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
	padding: '5px',
	br: '$2',
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

const Content = ({ children, ...props }) => (
	<SelectPrimitive.Portal>
		<StyledContent {...props}>{children}</StyledContent>
	</SelectPrimitive.Portal>
)

const StyledViewport = styled(SelectPrimitive.Viewport, {
	padding: 0,
})

const StyledItem = styled(SelectPrimitive.Item, {
	...sharedItemStyles,
})

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
export const SelectContent = Content
export const SelectViewport = StyledViewport
export const SelectGroup = SelectPrimitive.Group
export const SelectItem = StyledItem
export const SelectItemText = SelectPrimitive.ItemText
export const SelectItemIndicator = StyledItemIndicator
export const SelectLabel = StyledLabel
export const SelectSeparator = StyledSeparator
export const SelectScrollUpButton = StyledScrollUpButton
export const SelectScrollDownButton = StyledScrollDownButton

interface IProps {
	buttonAriaLabel?: string
	selectNameFormatter?: (name: string) => React.ReactNode | string
	selectLabel?: string | undefined
	defaultValue?: string | undefined
	value?: string | undefined
	placeholder?: string | undefined
	onValueChange?: (e: string) => void
	selectOptions: Array<{
		value: string
		name: string
	}>
}

const defaultProps = {
	buttonAriaLabel: undefined,
	selectLabel: undefined,
	defaultValue: undefined,
	value: undefined,
	placeholder: undefined,
	selectNameFormatter: (name: string) => name,
	onValueChange: (value: string) => value,
}

export const SelectBox: React.FC<IProps> = ({
	defaultValue,
	value,
	buttonAriaLabel,
	selectLabel,
	selectOptions,
	placeholder,
	selectNameFormatter,
	onValueChange,
}) => {
	const [measureRef, { width: triggerWidth }] = useMeasure()
	const [open, setOpen] = useState<boolean>(false)

	const handleValueChange = (_value: string) => {
		onValueChange(_value)
		setOpen(false)
	}

	return (
		<Select open={open} defaultValue={defaultValue} value={value} onValueChange={handleValueChange}>
			<SelectTrigger aria-label={buttonAriaLabel} asChild onClick={() => setOpen(true)}>
				<Button
					ref={measureRef}
					color="input"
					size="4"
					fullWidth
					css={{
						'&[data-placeholder]': {
							color: '$txtMuted',
						},
					}}
				>
					<Box css={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
						<SelectValue placeholder={placeholder} />
					</Box>
					<SelectIcon>
						<ChevronDownIcon />
					</SelectIcon>
				</Button>
			</SelectTrigger>
			<SelectContent onPointerDownOutside={() => setOpen(false)}>
				<SelectScrollUpButton>
					<ChevronUpIcon />
				</SelectScrollUpButton>
				<SelectViewport>
					<SelectGroup>
						{selectLabel ? <SelectLabel>{selectLabel}</SelectLabel> : null}
						{selectOptions?.map(({ value: _value, name: _name }) => (
							<SelectItem
								key={_value}
								value={_value}
								css={{
									'span:first-child': {
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
										maxWidth: `${triggerWidth}px`,
									},
								}}
							>
								<SelectItemText>{selectNameFormatter(_name)}</SelectItemText>
								<SelectItemIndicator />
							</SelectItem>
						))}
					</SelectGroup>
				</SelectViewport>
				<SelectScrollDownButton>
					<ChevronDownIcon />
				</SelectScrollDownButton>
			</SelectContent>
		</Select>
	)
}

SelectBox.defaultProps = defaultProps
