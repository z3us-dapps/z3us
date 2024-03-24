import React, { forwardRef, useMemo } from 'react'

import { Box } from 'ui/src/components/box'
import { CheckCircleIcon } from 'ui/src/components/icons'
import { type IInputProps } from 'ui/src/components/input'
import { SearchableInput } from 'ui/src/components/searchable-input'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { useDomainDetails } from 'ui/src/hooks/rns/use-domain-details'
import { useDomainResolution } from 'ui/src/hooks/rns/use-domain-resolution'
import { useAddressBookWithAccounts } from 'ui/src/hooks/use-address-book'
import { isValidAddress } from 'ui/src/utils/radix'
import { getShortAddress } from 'ui/src/utils/string-utils'

import { FieldWrapper, type IProps as WrapperProps } from '../../field-wrapper'
import * as styles from './styles.css'

interface IAdapterProps extends Omit<IInputProps, 'onChange'> {
	toolTipMessageKnownAddress?: string
	isKnownAddressVisible?: boolean
	exclude?: string
	onChange?: (value: string) => void
	hasError?: boolean
}

export const SelectAdapter = forwardRef<HTMLInputElement, IAdapterProps>((props, ref) => {
	const {
		onChange,
		value,
		toolTipMessageKnownAddress,
		isKnownAddressVisible = true,
		hasError = false,
		exclude,
		...rest
	} = props

	const strValue = useMemo(() => (value ? (value as string) : ''), [value])
	const addressBook = useAddressBookWithAccounts()
	const { data: domainResolution } = useDomainResolution(strValue, 'receivers', '*')
	const { data: domainDetails } = useDomainDetails(strValue)

	const allEntries = useMemo(() => {
		if (domainResolution) {
			return [
				{
					id: domainResolution,
					account: getShortAddress(domainResolution, 8),
					alias: strValue,
				},
			]
		}

		return Object.values(addressBook)
			.filter(entry => entry.address !== exclude)
			.map(entry => ({
				id: entry.address,
				account: getShortAddress(entry.address, 8),
				alias: entry.name,
			}))
	}, [domainResolution, addressBook])

	const domainName = useMemo(() => (domainDetails as any)?.name || '', [domainDetails])
	const knownAddress = useMemo(() => addressBook[strValue]?.name, [strValue, addressBook])
	const toName = useMemo(
		() => knownAddress || domainName || (isValidAddress(strValue) ? getShortAddress(strValue, 8) : strValue),
		[strValue, knownAddress, domainName],
	)

	const handleChange = (_value: string) => {
		onChange(_value)
	}

	return (
		<>
			{isKnownAddressVisible && (
				<Box className={styles.knownAddressFlexWrapper}>
					<Box className={styles.knownAddressWrapper}>
						{toName && (
							<ToolTip message={value} side="top">
								<Box>
									<Text size="xxsmall" truncate>
										({toName})
									</Text>
								</Box>
							</ToolTip>
						)}
						{!!knownAddress && toolTipMessageKnownAddress && (
							<Box flexShrink={0}>
								<ToolTip message={toolTipMessageKnownAddress} side="top">
									<CheckCircleIcon />
								</ToolTip>
							</Box>
						)}
					</Box>
				</Box>
			)}
			<SearchableInput
				{...rest}
				value={strValue}
				ref={ref}
				onValueChange={handleChange}
				data={allEntries}
				styleVariant={hasError ? 'primary-error' : 'primary'}
			/>
		</>
	)
})

interface IProps extends Omit<IAdapterProps, 'onChange' | 'value' | 'name' | 'label' | 'type'>, WrapperProps {}

export const AddressBookSelect = forwardRef<HTMLInputElement, IProps>((props, ref) => {
	const { validate, name, label, ...rest } = props

	return (
		<FieldWrapper name={name} label={label} validate={validate}>
			<SelectAdapter {...rest} ref={ref} />
		</FieldWrapper>
	)
})
